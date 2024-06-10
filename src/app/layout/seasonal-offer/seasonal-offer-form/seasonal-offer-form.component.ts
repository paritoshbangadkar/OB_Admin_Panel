import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SeasonalOfferService } from '../../../services/seasonalOffer/seasonalOffer.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { OPTIONS, defaultStatus } from '../../../core/helpers/constants.helper';
import { UploadService } from '@services/uploadService/upload.service';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { validateField } from 'src/app/core/validators/form.validator';
import { seasonalOfferFormErrors } from 'src/app/core/helpers/formErrors.helpers';
import { OfferService } from '@services/offer/offer.service';
import { AdvertiseService } from '@services/advertise/advertise.service';

@Component({
  selector: 'app-seasonal-offer-form',
  templateUrl: './seasonal-offer-form.component.html',
  styleUrls: ['./seasonal-offer-form.component.scss']
})
export class SeasonalOfferFormComponent implements OnInit {
  search: any = '';
  page = 1;
  pageSize = 50;
  collection: any;
  pageShop: number = 1;
  title: FormArray;
  image: FormArray;
  todayDate = null;
  errorMessages: any = seasonalOfferFormErrors;
  displayMessage: string = null;
  shopData: any = [];
  count: number = 0;
  categoryData: any = [];
  isCategory: boolean = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private seasonalOfferService: SeasonalOfferService,
    private actRoutes: ActivatedRoute,
    private toastService: ToastrService,
    private calendar: NgbCalendar,
    private spinner: NgxSpinnerService,
    private uploadService: UploadService,
    private offerService: OfferService,
    private advertiseService: AdvertiseService,


  ) {
    this.todayDate = calendar.getToday();
  }

  seasonalOfferForm = new FormGroup({
    id: new FormControl(),
    heading: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    media: new FormArray([], [Validators.required]),
    categoryId: new FormControl(),
  });

  get form() {
    return this.seasonalOfferForm.controls;
  }

  get media() {
    return this.seasonalOfferForm.controls["media"] as FormArray;
  }

  ngOnInit(): void {
    this.getAllShop();
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
    if (typeof (this.seasonalOfferForm.value.startDate) !== 'string') {
      this.seasonalOfferForm.value.startDate = `${this.seasonalOfferForm.value.startDate.year}-${this.seasonalOfferForm.value.startDate.month}-${this.seasonalOfferForm.value.startDate.day}`;
    }
    if (typeof (this.seasonalOfferForm.value.endDate) !== 'string') {
      this.seasonalOfferForm.value.endDate = `${this.seasonalOfferForm.value.endDate.year}-${this.seasonalOfferForm.value.endDate.month}-${this.seasonalOfferForm.value.endDate.day}`;
    }
    this.media.controls.forEach(x => {
      if (typeof (x.value.startDate) !== 'string') {
        x.value.startDate = `${x.value.startDate.year}-${x.value.startDate.month}-${x.value.startDate.day}`;
      }

      if (typeof (x.value.endDate) !== 'string') {
        x.value.endDate = `${x.value.endDate.year}-${x.value.endDate.month}-${x.value.endDate.day}`;
      }
    });

  }
  addMedia(item) {
    const mediaForm = this.formBuilder.group({
      id: new FormControl(item ? item.id : null),
      title: new FormControl(item ? item.title : null),
      image: new FormControl(item ? item.image : null),
      startDate: new FormControl(item ? item.startDate : null),
      endDate: new FormControl(item ? item.endDate : null),
      shopId: new FormControl([item ? item.shopId : null]),
      status: new FormControl(item ? item.status : null),
    });
    this.media.push(mediaForm);
  }

  deleteMedia(item: any, index: number) {
    if (item.get('id').value) {
      item.get('status').setValue(defaultStatus.DELETED);
    }
    else {
      this.media.removeAt(index);
    }
  }

  create() {
    if (this.seasonalOfferForm.invalid) {
      validateField(this.seasonalOfferForm);
      return;
    }
    this.formatDate();
    this.seasonalOfferService.create(this.seasonalOfferForm.value).subscribe(data => {
      this.spinner.hide();
      this.toastService.success(data?.message);
      if (this.isCategory) {
        this.router.navigate(['/category/deals']);
      } else {
        this.router.navigate(['/seasonal-offer/list']);
      }
    }, (error) => {
      this.toastService.success(error);
      this.spinner.hide();
    });
  }

  update() {
    this.formatDate();
    this.seasonalOfferService.update(this.seasonalOfferForm.value).subscribe(data => {
      this.spinner.hide();
      this.toastService.success(data?.message);
      if (this.isCategory) {
        this.router.navigate(['/category/deals']);
      } else {
        this.router.navigate(['/seasonal-offer/list']);
      }
    }, (error) => {
      this.toastService.success(error);
      this.spinner.hide();
    });
  }

  getById(_id) {
    this.seasonalOfferService.getById(_id).subscribe((success) => {
      for (let i = 0; i < success.media.length; i++) {
        let obj = success.media[i];
        success.media[i].startDate = this.setDisplayDate(obj.startDate);
        success.media[i].endDate = this.setDisplayDate(obj.endDate);
        this.addMedia(success.media[i]);
      }
      this.seasonalOfferForm.patchValue(success);
      this.form.startDate.setValue(this.setDisplayDate(success.startDate));
      this.form.endDate.setValue(this.setDisplayDate(success.endDate));
    });
  }


  public dropped(files: NgxFileDropEntry[], index) {
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          if (this.uploadService.checkImageType(file) && this.uploadService.checkFileSize(file)) {
            this.uploadFile(file, index)
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
  uploadFile(file: File, index: number) {
    this.spinner.show();
    if (this.uploadService.checkImageType(file) && this.uploadService.checkFileSize(file)) {
      let formData = new FormData();
      formData.append('file', file);
      this.uploadService.uploadFile(formData)
        .subscribe(
          (data: any) => {
            this.seasonalOfferForm.controls.media['controls'][index]['controls']['image'].setValue(data?.result?.cdn);
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

  removeUploadedImage(index: number) {
    this.uploadService.deleteUploadedImage({ filePath: this.media.value[index].image })
      .subscribe(
        (data: any) => {
          this.media.controls[index]['controls'].image.setValue(null);
          this.toastService.success("Image removed");
          this.spinner.hide();
        },
        (error: any) => {
          this.toastService.error(error);
          this.spinner.hide();
        }
      );
  }

  setShop(item, i) {
    this.seasonalOfferForm.value.media[i].shopId = item;
  }

  onScrollShop() {
    if (this.count > this.shopData.length) {
      this.page++;
      this.getAllShop();
    }
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
    this.seasonalOfferForm.controls.categoryId.setValue(item);
  }

}