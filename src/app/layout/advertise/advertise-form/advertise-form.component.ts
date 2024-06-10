import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdvertiseService } from '../../../services/advertise/advertise.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UploadService } from '@services/uploadService/upload.service';
import { OPTIONS } from '../../../core/helpers/constants.helper';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { validateField } from 'src/app/core/validators/form.validator';
import { advertiseFormErrors } from 'src/app/core/helpers/formErrors.helpers';



@Component({
  selector: 'app-advertise-form',
  templateUrl: './advertise-form.component.html',
  styleUrls: ['./advertise-form.component.scss'],
})

export class AdvertiseFormComponent implements OnInit {
  contentType: string = ''
  advertiseForm = new FormGroup({
    id: new FormControl(),
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    image: new FormControl('', [Validators.required]),
    startDate: new FormControl("", [Validators.required]),
    endDate: new FormControl("", [Validators.required]),
    categoryId: new FormControl(),
  });

  errorMessages: any = advertiseFormErrors;
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

  constructor(
    private router: Router,
    private location: Location,
    private advertiseService: AdvertiseService,
    private actRoutes: ActivatedRoute,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private calendar: NgbCalendar,
    private uploadService: UploadService
  ) {
    this.todayDate = calendar.getToday();
  }

  ngOnInit(): void {
    this.getAllCategory();
    this.actRoutes.queryParams.subscribe((params) => {
      if (params.id) {
        this.getById(params.id);
      }
      if (params.isCategory) {
        this.isCategory = params.isCategory == 'true' ? true : false
      } else {
        this.isCategory = false;
      }
    });
  }
  get form() {
    return this.advertiseForm.controls;
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
    if (typeof (this.advertiseForm.value.startDate) !== 'string') {
      this.advertiseForm.value.startDate = `${this.advertiseForm.value.startDate.year}-${this.advertiseForm.value.startDate.month}-${this.advertiseForm.value.startDate.day}`;
    }
    if (typeof (this.advertiseForm.value.endDate) !== 'string') {
      this.advertiseForm.value.endDate = `${this.advertiseForm.value.endDate.year}-${this.advertiseForm.value.endDate.month}-${this.advertiseForm.value.endDate.day}`;
    }
  }

  create() {
    if (this.advertiseForm.invalid) {
      validateField(this.advertiseForm);
      return;
    }
    this.formatDate();
    this.advertiseService.create(this.advertiseForm.value).subscribe(data => {
      this.spinner.hide();
      this.toastService.success(data?.message);
      if (this.isCategory) {
        this.router.navigate(['/category/advertise']);
      } else {
        this.router.navigate(['/advertise/advertise-list']);
      }
    }, (error) => {
      this.toastService.success(error);
      this.spinner.hide();
    });
  }
  update() {
    this.formatDate();
    this.advertiseService.update(this.advertiseForm.value).subscribe(data => {
      this.spinner.hide();
      this.toastService.success(data?.message);
      if (this.isCategory) {
        this.router.navigate(['/category/advertise']);
      } else {
        this.router.navigate(['/advertise/advertise-list']);
      }
    }, (error) => {
      this.toastService.success(error);
      this.spinner.hide();
    });
  }
  getById(id) {
    this.advertiseService.getById(id).subscribe((success) => {
      this.contentType = success.image.slice(success.image.lastIndexOf('.'));
      this.advertiseForm.patchValue(success);
      this.form.startDate.setValue(this.setDisplayDate(success.startDate));
      this.form.endDate.setValue(this.setDisplayDate(success.endDate));
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
            this.contentType = data?.result?.cdn.slice(data?.result?.cdn.lastIndexOf('.'));
            this.advertiseForm.controls.image.setValue(data?.result?.cdn);
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
    this.advertiseService.getAllCategory(obj).subscribe((success: any) => {
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
    this.advertiseForm.controls.categoryId.setValue(item);
  }

}
