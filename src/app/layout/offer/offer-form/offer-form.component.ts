import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OfferService } from '../../../services/offer/offer.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { validateField } from 'src/app/core/validators/form.validator';
import { offerFormErrors } from 'src/app/core/helpers/formErrors.helpers';
import { UploadService } from '@services/uploadService/upload.service';
import { OPTIONS } from 'src/app/core/helpers/constants.helper';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss'],
})
export class OfferFormComponent implements OnInit {
  params: any;
  errorMessages = offerFormErrors;
  displayMessage: string = null;
  filePath: string = "";
  document: any = null;
  files: any[] = [];
  todayDate = null;
  count: number = 0;

  offerForm = this.formBuilder.group({
    id: new FormControl(),
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    shopId: new FormControl(),
    categoryId: new FormControl(),
  });
  shopData: any = [];
  categoryData: any = [];
  search: any = '';
  page = 1;
  pageSize = 50;
  collection: any;
  pageShop: number = 1;
  isCategory: boolean = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private offerService: OfferService,
    private actRoutes: ActivatedRoute,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private calendar: NgbCalendar,
    private uploadService: UploadService
  ) {
    this.todayDate = calendar.getToday();

  }

  ngOnInit(): void {
    this.getAllShop();
    this.getAllCategory();
    this.actRoutes.queryParams.subscribe((params) => {
      if (params.isCategory) {
        this.isCategory = params.isCategory == 'true' ? true : false
      } else {
        this.isCategory = false;
      }
      if (params.id) {
        this.getById(params.id);
      }
    });
  }

  get form() {
    return this.offerForm.controls;
  }
  onScrollShop() {
    if (this.count > this.shopData.length) {
      this.page++;
      this.getAllShop();
    }
  }

  onScrollCategory() {
    if (this.count > this.categoryData.length) {
      this.page++;
      this.getAllCategory();
    }
  }

  getAllCategory() {
    this.spinner.show();
    let obj = {
      page: this.page,
      pageSize: this.pageSize,
      search: this.search,
    }
    this.offerService.getAllCategory(obj).subscribe((success: any) => {
      this.count = success.count
      if (this.page > 1) {
        this.categoryData = [...this.categoryData, ...success.data];
      } else {
        this.categoryData = success.data;
      }
      this.spinner.hide();
    });
  }

  setCategory(item) {
    this.offerForm.controls.categoryId.setValue(item);
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

  setShop(item) {
    this.offerForm.controls.shopId.setValue(item);
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
    if (typeof (this.offerForm.value.startDate) !== 'string') {
      this.offerForm.value.startDate = `${this.offerForm.value.startDate.year}-${this.offerForm.value.startDate.month}-${this.offerForm.value.startDate.day}`;
    }
    if (typeof (this.offerForm.value.endDate) !== 'string') {
      this.offerForm.value.endDate = `${this.offerForm.value.endDate.year}-${this.offerForm.value.endDate.month}-${this.offerForm.value.endDate.day}`;
    }
  }
  create() {
    if (this.offerForm.invalid) {
      validateField(this.offerForm);
      return;
    }
    this.formatDate();
    this.offerService.create(this.offerForm.value).subscribe(data => {
      this.spinner.hide();
      this.toastService.success(data?.message);
      if (this.isCategory) {
        this.router.navigate(['/category/offers']);
      } else {
        this.router.navigate(['/offer/offer-list']);
      }
    }, (error) => {
      this.toastService.success(error);
      this.spinner.hide();
    });
  }
  update() {
    this.formatDate();
    this.offerService.update(this.offerForm.value).subscribe(data => {
      this.spinner.hide();
      this.toastService.success(data?.message);
      if (this.isCategory) {
        this.router.navigate(['/category/offers']);
      } else {
        this.router.navigate(['/offer/offer-list']);
      }
    }, (error) => {
      this.toastService.success(error);
      this.spinner.hide();
    });
  }
  getById(id) {
    this.offerService.getById(id).subscribe((success) => {
      if (success.shopId) {
        success = { ...success, ...{ shopId: success.shopId[0] }, ...{ categoryId: success.categoryId }, ...{ startDate: this.setDisplayDate(success.startDate) }, ...{ endDate: this.setDisplayDate(success.endDate) } };
      } else {
        success = { ...success, ...{ categoryId: success.categoryId }, ...{ startDate: this.setDisplayDate(success.startDate) }, ...{ endDate: this.setDisplayDate(success.endDate) } };

      }
      this.offerForm.patchValue(success);
    });
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
            this.offerForm.controls.image.setValue(data?.result?.cdn);
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
}
