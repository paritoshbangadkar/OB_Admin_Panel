import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { UploadService } from '@services/uploadService/upload.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { validateField } from 'src/app/core/validators/form.validator';
import { InAppAdModalService } from '../../../services/inAppAdModal/inAppAdModal.service';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { OPTIONS, defaultStatus } from 'src/app/core/helpers';
import { Location } from '@angular/common';
import { inAppAdModalFormErrors } from 'src/app/core/helpers/formErrors.helpers';
import { OfferService } from '@services/offer/offer.service';
// import { inAppAdModalFormErrors } from 'src/app/core/helpers/formErrors.helpers';

@Component({
  selector: 'app-in-app-ad-modal-form',
  templateUrl: './in-app-ad-modal-form.component.html',
  styleUrls: ['./in-app-ad-modal-form.component.scss']
})
export class InAppAdModalFormComponent implements OnInit {
  contentType: string = ''

  inAppAdModalForm = new FormGroup({
    id: new FormControl(),
    title: new FormControl('', [Validators.required]),
    // description: new FormControl(''),
    image: new FormControl('', [Validators.required]),
    startDate: new FormControl("", [Validators.required]),
    endDate: new FormControl("", [Validators.required]),
    shopId: new FormControl(""),
    status: new FormControl(defaultStatus.ACTIVE),

  });

  errorMessages: any = inAppAdModalFormErrors;
  displayMessage: string = null;
  document: any = null;
  files: any[] = [];
  todayDate = null;
  categoryData: any = [];
  isCategory: boolean = false;
  search: any = '';
  page = 1;
  pageSize = 50;
  collection: any;
  count: number = 0;
  shopData: any = [];

  constructor(
    private router: Router,
    private location: Location,
    private inAppAdModalService: InAppAdModalService,
    private actRoutes: ActivatedRoute,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private calendar: NgbCalendar,
    private uploadService: UploadService,
    private offerService: OfferService,
  ) {
    this.todayDate = calendar.getToday();
  }

  ngOnInit(): void {
    this.getAllShop();
    this.actRoutes.queryParams.subscribe((params) => {
      if (params.id) {
        this.getById(params.id);
      }
    });
  }
  get form() {
    return this.inAppAdModalForm.controls;
  }

  setDisplayDate(value: string) {
    let newDate = new Date(value);
    if (value) {
      return {
        day: newDate.getDate(),
        month: newDate.getMonth() + 1,
        year: newDate.getFullYear()
      };
    }
    return null;
  }

  formatDate() {
    if (typeof (this.inAppAdModalForm.value.startDate) !== 'string') {
      this.inAppAdModalForm.value.startDate = `${this.inAppAdModalForm.value.startDate.year}-${this.inAppAdModalForm.value.startDate.month}-${this.inAppAdModalForm.value.startDate.day}`;
    }
    if (typeof (this.inAppAdModalForm.value.endDate) !== 'string') {
      this.inAppAdModalForm.value.endDate = `${this.inAppAdModalForm.value.endDate.year}-${this.inAppAdModalForm.value.endDate.month}-${this.inAppAdModalForm.value.endDate.day}`;
    }
  }

  create() {
    if (this.inAppAdModalForm.invalid) {
      validateField(this.inAppAdModalForm);
      return;
    }
    this.formatDate();
    this.inAppAdModalService.create(this.inAppAdModalForm.value).subscribe(data => {
      this.spinner.hide();
      this.toastService.success(data?.message);
      this.router.navigate(['/in-app-ad-modal/in-app-ad-modal-list']);
    }, (error) => {
      this.toastService.success(error);
      this.spinner.hide();
    });
  }
  update() {
    this.formatDate();
    this.inAppAdModalService.update(this.inAppAdModalForm.value).subscribe(data => {
      this.spinner.hide();
      this.toastService.success(data?.message);
      this.router.navigate(['/in-app-ad-modal/in-app-ad-modal-list']);
    }, (error) => {
      this.toastService.success(error);
      this.spinner.hide();
    });
  }
  getById(id) {
    this.inAppAdModalService.getById(id).subscribe((success) => {
      this.contentType = success.image.slice(success.image.lastIndexOf('.'));
      this.inAppAdModalForm.patchValue(success);
      this.form.startDate.setValue(this.setDisplayDate(success.startDate));
      this.form.endDate.setValue(this.setDisplayDate(success.endDate));
    });
  }

  onScrollShop() {
    if (this.count > this.shopData.length) {
      this.page++;
      this.getAllShop();
    }
  }

  setShop(item) {
    this.inAppAdModalForm.controls.shopId.setValue(item);
  }

  public dropped(files: NgxFileDropEntry[]) {
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          if (this.uploadService.checkImageType(file) && this.uploadService.checkFileSize(file)) {
            this.uploadFile(file)
          } else {
            if (!this.uploadService.checkImageType(file)) {
              this.toastService.error(OPTIONS.imageType);
              this.spinner.hide();
              return;
            }
            if (!this.uploadService.checkFileSize(file)) {
              this.toastService.error(OPTIONS.sizeLimit);
              this.spinner.hide();
              return;
            }
          }
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }
  public fileOver(event) {
    console.log(event);
  }
  public fileLeave(event) {
    console.log(event);
  }

  /**
   * to upload image file to database
  */
  uploadFile(file: File) {
    this.spinner.show();
    if (this.uploadService.checkImageType(file) && this.uploadService.checkFileSize(file)) {
      let formData = new FormData();
      formData.append('file', file);
      this.uploadService.uploadFile(formData)
        .subscribe(
          (data: any) => {
            this.contentType = data?.result?.cdn.slice(data?.result?.cdn.lastIndexOf('.'));
            this.inAppAdModalForm.controls.image.setValue(data?.result?.cdn);
            this.spinner.hide();
          },
          (error: any) => {
            this.toastService.error(error);
            this.spinner.hide();
          }
        );
    }
  }
  
  goBack() {
    this.location.back();
  }

  removeUploadedImage() {
    this.uploadService.deleteUploadedImage({ filePath: this.form.image.value })
      .subscribe(
        (data: any) => {
          this.form.image.reset(null)
          this.toastService.success("Image removed");
          this.spinner.hide();
        },
        (error: any) => {
          this.toastService.error(error);
          this.spinner.hide();
        }
      );
  }

  getAllShop() {
    this.spinner.show();
    let obj = {
      page: this.page,
      pageSize: this.pageSize,
      search: this.search,
    }
    this.offerService.getAllShops(obj).subscribe((success: any) => {
      this.count = success.count
      if (this.page > 1) {
        this.shopData = [...this.shopData, ...success.data];
      } else {
        this.shopData = success.data;
      }
      this.spinner.hide();
    });
  }

}
