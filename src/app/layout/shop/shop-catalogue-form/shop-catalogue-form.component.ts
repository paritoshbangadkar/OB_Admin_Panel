import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CatalogueService } from '../../../services/catalogue/catalogue.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UploadService } from '@services/uploadService/upload.service';
import {
  OPTIONS,
  UNITS,
  defaultStatus,
} from '../../../core/helpers/constants.helper';
import { validateField } from 'src/app/core/validators/form.validator';
import { catalogueFormErrors } from 'src/app/core/helpers/formErrors.helpers';
import { SubCategoryService } from '@services/subCategory/sub-category.service';
import { ShopService } from '@services/shop/shop.service';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-shop-catalogue-form',
  templateUrl: './shop-catalogue-form.component.html',
  styleUrls: ['./shop-catalogue-form.component.scss'],
})
export class ShopCatalogueFormComponent implements OnInit {
  subCategoryArr: any = [];
  params: any;
  image: any;
  filePath: any = [];
  errorMessages: any = catalogueFormErrors;
  displayMessage: string = null;
  fileUploaded: boolean = false;
  shopArr: any = [];
  getAllSubCategoryByShop: any;
  subCategory: any;
  SubCategoryArr: any = [];
  shopId: any;
  shopData: any = {};
  contentType: string = '';
  brandObject: any = {};
  brandArr: any;
  unitsList = UNITS;
  label = '';
  value = '';
  addMediaCount: number = 0;
  todayDate = null;

  catalogueForm = new FormGroup({
    id: new FormControl(),
    shopId: new FormControl(''),
    subCategoryId: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    price: new FormControl(''),
    description: new FormControl(''),
    media: new FormArray([]),
    unitType: new FormControl(null),
    brand: new FormControl({}),
    productDetail: new FormControl(''),
    isMultiSelect: new FormControl(false),
    discount: new FormControl('', this.maxDiscountValidator),
    discountMessage: new FormControl(''),
    offerMedia: new FormControl(),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    isSpecialOffer: new FormControl(false),
  });
  fileData: { image: any; fileName: string; fileType: any; fileSize: any };
  file: any = '';

  get form() {
    return this.catalogueForm.controls;
  }

  get media() {
    return this.catalogueForm.controls['media'] as FormArray;
  }

  constructor(
    private router: Router,
    private location: Location,
    private catalogueService: CatalogueService,
    private actRoutes: ActivatedRoute,
    private toastService: ToastrService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private uploadService: UploadService,
    private subCategoryService: SubCategoryService,
    private shopService: ShopService,
    private calendar: NgbCalendar
  ) {
    this.todayDate = calendar.getToday();
  }

  ngOnInit(): void {
    this.getAllShop();
    this.actRoutes.queryParams.subscribe((params) => {
      this.catalogueForm.controls.shopId.setValue(params.shopId);
      this.shopId = params.shopId;
      if (params.shopId) {
        this.getShop(params.shopId);
      }
      if (params._id) {
        this.getById(params._id);
      }
    });
  }

  maxDiscountValidator(control: FormControl) {
    const value = control.value;
    if (value !== null && (isNaN(value) || value > 100)) {
      return { maxDiscount: true };
    }
    return null;
  }

  addMedia(item) {
    if (this.addMediaCount < 5) {
      const mediaForm = this.formBuilder.group({
        id: new FormControl(null),
        image: new FormControl(item ? item.image : null),
        status: new FormControl(item ? item.status : null),
        fileType: new FormControl(item ? item.fileType : null),
        fileSize: new FormControl(item ? item.fileSize : null),
        fileName: new FormControl(item ? item.fileName : null),
      });
      this.media.push(mediaForm);
      this.addMediaCount++;
    }
  }

  deleteMedia(item: any, index: number) {
    if (item.get('id').value) {
      item.get('status').setValue(defaultStatus.DELETED);
    } else {
      this.media.removeAt(index);
    }
  }

  getShop(id: any) {
    this.shopService.getById(id).subscribe((data) => {
      this.shopData = data?.shopDetails;
      this.getAllSubCategory(this.shopData?._id);
    });
  }

  getById(_id) {
    this.catalogueService.getById(_id).subscribe((success) => {
      for (let i = 0; i < success.media.length; i++) {
        this.addMedia(success.media);
      }
      this.catalogueForm.patchValue(success);
      this.form.startDate.setValue(this.setDisplayDate(success?.startDate));
      this.form.endDate.setValue(this.setDisplayDate(success?.endDate));
      this.brandArr = success.brand;
      success.media.forEach((x) => {
        if (x.image) {
          this.contentType = x.image.slice(x.image.lastIndexOf('.'));
        }
      });
      this.file = success?.offerMedia[0]?.image;
    });
  }

  getAllShop() {
    this.spinner.show();
    this.catalogueService
      .getAllSubCategoryByShopId(this.shopId)
      .subscribe((success) => {
        this.shopArr = success.rows;
        this.spinner.hide();
      });
  }

  setDisplayDate(value: string) {
    let newDate = new Date(value);
    if (value) {
      return {
        day: newDate.getDate(),
        month: newDate.getMonth() + 1,
        year: newDate.getFullYear(),
      };
    }
    return null;
  }

  formatDate() {
    const startDateValue = this.catalogueForm.value.startDate;
    if (startDateValue && typeof startDateValue !== 'string') {
      this.catalogueForm.controls['startDate'].setValue(
        `${startDateValue?.year}-${startDateValue?.month}-${startDateValue?.day}`
      );
    } else {
      this.catalogueForm.controls['startDate'].setValue(null);
    }

    const endDateValue = this.catalogueForm.value.endDate;
    if (endDateValue && typeof endDateValue !== 'string') {
      this.catalogueForm.controls['endDate'].setValue(
        `${endDateValue?.year}-${endDateValue?.month}-${endDateValue?.day}`
      );
    } else {
      this.catalogueForm.controls['endDate'].setValue(null);
    }
  }

  create() {
    if (this.catalogueForm.invalid) {
      validateField(this.catalogueForm);
      return;
    }
    this.formatDate();
    this.catalogueForm.controls.brand.setValue(this.brandArr);
    this.catalogueService.create(this.catalogueForm.getRawValue()).subscribe(
      (data) => {
        this.spinner.hide();
        this.toastService.success(data?.message);
        this.goBack();
      },
      (error) => {
        this.toastService.success(error);
        this.spinner.hide();
      }
    );
  }

  update() {
    if (this.catalogueForm.invalid) {
      validateField(this.catalogueForm);
      return;
    }
    this.formatDate();
    this.catalogueForm.controls.brand.setValue(this.brandArr);
    this.catalogueService.update(this.catalogueForm.value).subscribe(
      (data) => {
        this.spinner.hide();
        this.toastService.success(data?.message);
        this.goBack();
      },
      (error) => {
        this.toastService.success(error);
        this.spinner.hide();
      }
    );
  }

  goBack() {
    this.location.back();
  }

  public dropped(files: NgxFileDropEntry[], index, imageType: string) {
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          if (
            this.uploadService.checkImageType(file) &&
            this.uploadService.checkFileSize(file)
          ) {
            this.uploadFile(file, index, imageType);
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
  uploadFile(file: File, index: number, imageType: string) {
    this.spinner.show();
    if (
      this.uploadService.checkImageType(file) &&
      this.uploadService.checkFileSize(file)
    ) {
      let formData = new FormData();
      formData.append('file', file);
      this.uploadService.uploadFile(formData).subscribe(
        (data: any) => {
          if (imageType === 'offerMedia') {
            this.file = data?.result?.cdn;
            this.fileData = {
              image: data?.result?.data?.key,
              fileName: data?.result?.data?.key,
              fileType: data?.result?.data?.contentType,
              fileSize: data?.result?.data?.size,
            };
            this.catalogueForm.controls.offerMedia.setValue(this.fileData);
          } else {
            this.contentType = data?.result?.cdn.slice(
              data?.result?.cdn.lastIndexOf('.')
            );
            this.catalogueForm.controls.media['controls'][index]['controls'][
              'image'
            ].setValue(data?.result?.cdn);
            this.catalogueForm.controls.media['controls'][index]['controls'][
              'fileType'
            ].setValue(data?.result?.data.contentType);
            this.catalogueForm.controls.media['controls'][index]['controls'][
              'fileSize'
            ].setValue(data?.result?.data.size);
            this.catalogueForm.controls.media['controls'][index]['controls'][
              'fileName'
            ].setValue(data?.result?.data.key.split('post/')[1]);
          }

          this.spinner.hide();
        },
        (error: any) => {
          this.toastService.error(error);
          this.spinner.hide();
        }
      );
    }
  }

  removeUploadedImage(index: any, imageType: string) {
    this.uploadService
      .deleteUploadedImage({ filePath: this.getImagePath(index, imageType) })
      .subscribe(
        (data: any) => {
          if (imageType === 'offerMedia') {
            // this.form.controls.offerMedia.setValue(null);
            this.form.offerMedia.setValue(null);
          } else if (imageType === 'media') {
            this.media.controls[index]['controls'].image.setValue(null);
          }
          this.toastService.success('Image removed');
          this.spinner.hide();
        },
        (error: any) => {
          this.toastService.error(error);
          this.spinner.hide();
        }
      );
  }

  getImagePath(index: number, imageType: string): string {
    if (imageType === 'offerMedia') {
      return this.form.offerMedia.value;
    } else if (imageType === 'media') {
      return this.media.value[index].image;
    }
    return null;
  }

  getAllSubCategoryByShopId(shopId) {
    this.SubCategoryArr =
      this.shopArr.find((x) => x._id == shopId)?.subCategoryId ?? [];
    this.getAllShop();
  }

  getAllSubCategory(id: any) {
    this.spinner.show();
    let obj: any = {
      shopId: id,
    };
    this.subCategoryService.getCategory(obj).subscribe((success) => {
      this.subCategoryArr = success[0].subCategory;
      this.spinner.hide();
    });
  }

  // Brand Value
  addUpdateBrand() {
    const { label, value } = this;
    if (label.trim() && value.trim()) {
      this.brandArr = this.brandArr || [];
      const existingIndex = this.brandArr.findIndex(
        (item) => item.label === label
      );
      if (existingIndex !== -1) {
        this.brandArr[existingIndex].value = value;
      } else {
        this.brandArr.push({ label, value });
      }
      this.updateBrand();
    }
    this.label = '';
    this.value = '';
  }

  edit(item) {
    this.label = item.label;
    this.value = item.value;
  }

  remove(item) {
    this.brandArr = this.brandArr.filter((brand) => brand.label !== item.label);
  }

  updateBrand() {
    this.brandObject = this.brandArr.reduce((obj, item) => {
      obj[item.label] = item.value;
      return obj;
    }, {});
  }

  onUnitTypeChange() {
    const selectedValue = this.catalogueForm.get('unitType').value;
    if (selectedValue === 'clear') {
      this.catalogueForm.get('unitType').setValue('');
    }
  }
}
