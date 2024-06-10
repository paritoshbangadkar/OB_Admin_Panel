import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UploadService } from '@services/uploadService/upload.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { OnboardShopService } from '@services/onboardShop/onboardShop.service';
import { Location } from '@angular/common';
import { OPTIONS, ROLES, defaultStatus, registrationPlatform } from 'src/app/core/helpers/constants.helper';
import { validateField } from 'src/app/core/validators/form.validator';
import { shopFormErrors } from 'src/app/core/helpers/formErrors.helpers';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { CategoryService } from '@services/category/category.service';
import { SubCategoryService } from '@services/subCategory/sub-category.service';
import { BusinessService } from '@services/businessType/business.service';

@Component({
  selector: 'app-onboard-shop-form',
  templateUrl: './onboard-shop-form.component.html',
  styleUrls: ['./onboard-shop-form.component.scss']
})
export class OnboardShopFormComponent implements OnInit {

  errorMessages = shopFormErrors;
  displayMessage: string = null;
  bannerImages: any = null;
  filePath: string = '';
  shopDetailsId: string;
  businessTypeId: any;
  key: any;
  shopId: string;
  businessArr = [];
  subCategoryArr: [];
  categoryList: [];
  onboardShopId: string = null;

  onboardShopForm = new FormGroup({
    _id: new FormControl(),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    countryCode: new FormControl('IN'),
    mobileNumber: new FormControl('', [Validators.required]),
    profilePicture: new FormControl(''),
    status: new FormControl(defaultStatus.ACTIVE),
    role: new FormControl(ROLES.SHOP),
    registrationPlatform: new FormControl(registrationPlatform.WEB),
    address: new FormGroup({
      line1: new FormControl(''),
      line2: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl('India'),
      pinCode: new FormControl(''),
    }),
    shopDetails: new FormGroup({
      shopName: new FormControl('', [Validators.required]),
      shopDetailsId: new FormControl(''),
      businessTypeId: new FormControl([], [Validators.required]),
      subCategoryId: new FormControl([], [Validators.required]),
      categoryId: new FormControl([Validators.required]),
      keyword: new FormControl(''),
      aboutUs: new FormControl(''),
      isBookingService: new FormControl(false),
      isChangeLocation: new FormControl(false),
      bannerImages: new FormControl(''),
      status: new FormControl(defaultStatus.PREONBOARD),
      links: new FormGroup({
        facebook: new FormControl(''),
        instagram: new FormControl(''),
        youtube: new FormControl(''),
      }),
      lat: new FormControl(null),
      lng: new FormControl(null),
    }),
  });
  invalidShop: boolean = false;

  get form() {
    return this.onboardShopForm.controls;
  }

  get shopDetailForm() {
    return (this.onboardShopForm.get('shopDetails') as FormGroup).controls;
  }
  constructor(
    private router: Router,
    private location: Location,
    private onboardShopService: OnboardShopService,
    private actRoutes: ActivatedRoute,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private businessService: BusinessService,
    private uploadService: UploadService,
    private subCategoryService: SubCategoryService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getAllCategory();
    this.getAllBusinessType();
    this.actRoutes.queryParams.subscribe((params: any) => {
      if (params?.invalidShop) {
        this.invalidShop = (params?.invalidShop === 'true') ? true : false;
        this.shopDetailForm.lat.setValidators(Validators.required)
        this.shopDetailForm.lat.updateValueAndValidity();
        this.shopDetailForm.lng.setValidators(Validators.required)
        this.shopDetailForm.lng.updateValueAndValidity();
      }

      if (params.id) {
        this.getById(params.id);
      }
      if (params.rawShopId) {
        this.getRawShop(params.rawShopId);
      }
    });
  }


  getRawShop(id) {
    this.onboardShopService.getRawShopById(id).subscribe((success) => {
      success.categoryId = success.subCategory?.parentId;
      this.shopDetailForm.shopName.setValue(success.shopName);
      this.shopDetailForm.bannerImages.setValue(success.bannerImages);
      this.shopDetailForm.categoryId.setValue(success.categoryId);
      this.shopDetailForm.subCategoryId.setValue(success.subCategoryId);
      this.shopDetailForm.businessTypeId.setValue(success.businessTypeId);
      this.getAllSubCategory({ _id: success.categoryId });
      this.onboardShopForm.patchValue(success);
    });
  }

  getById(id) {
    this.onboardShopService.getById(id).subscribe((success) => {
      this.shopDetailsId = success.shopDetails._id;
      success.shopDetails.categoryId = success.shopDetails.subCategory?.parentId;
      this.shopDetailForm.categoryId.setValue(success.shopDetails.categoryId);
      this.getAllSubCategory({ _id: success.shopDetails.categoryId });
      this.onboardShopForm.patchValue(success);
    });
  }
  /**
 * to upload image file to database
*/
  getAllBusinessType() {
    this.spinner.show();
    this.businessService.getAll({}).subscribe(
      (success) => {
        this.businessArr = success.data;
        this.spinner.hide();
      },
      (error: any) => {
        this.spinner.hide();
      }
    );
  }

  async getAllCategory() {
    this.categoryService.getAll({ pageSize: 200 }).subscribe(async (success) => {
      this.categoryList = success.data;
      await this.spinner.hide();
    });
  }

  getAllSubCategory(item) {
    this.spinner.show();
    let obj = {
      parentId: item._id,
      pageSize: 500,
    };
    this.subCategoryService.getAll(obj).subscribe((success) => {
      this.subCategoryArr = success.data;
      this.spinner.hide();
    });
  }

  goBack() {
    this.location.back();
  }


  update() {
    if (this.onboardShopForm.invalid) {
      validateField(this.onboardShopForm);
      return;
    }
    let formData: any = this.onboardShopForm.value;
    formData.shopDetails.location = {
      type: 'Point',
      coordinates: [this.shopDetailForm.lat.value, this.shopDetailForm.lng.value]
    }
    this.onboardShopService.update(formData).subscribe(
      (data) => {
        this.spinner.hide();
        this.toastService.success(data?.message);
        this.router.navigate(['onboard-shop/onboard-shop-list']);
      },
      (error) => {
        this.toastService.error(error);
        this.spinner.hide();
      }
    );
  }

  changeShopStatus(_id) {
    this.spinner.show();
    this.onboardShopService.changeStatus(_id).subscribe(success => {
      this.spinner.hide()
    },
      (error) => {
        this.toastService.error(error);
      }
    )
  }

  public dropped(files: NgxFileDropEntry[], key) {
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          if (
            this.uploadService.checkImageType(file) &&
            this.uploadService.checkFileSize(file)
          ) {
            this.uploadFile(file, key);
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

  uploadFile(file: File, key) {
    this.spinner.show();
    if (
      this.uploadService.checkImageType(file) &&
      this.uploadService.checkFileSize(file)
    ) {
      let formData = new FormData();
      formData.append('file', file);
      this.uploadService.uploadFile(formData).subscribe(
        (data: any) => {
          this.filePath = data?.result?.cdn;
          if (key === 'bannerImages') {
            this.shopDetailForm.bannerImages.setValue(this.filePath);
          } else {
            this.form.profilePicture.setValue(this.filePath);
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

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  removeUploadedImage(key) {
    this.uploadService
      .deleteUploadedImage({ filePath: this.shopDetailForm.bannerImages.value })
      .subscribe(
        (data: any) => {
          if (key == 'bannerImages') {
            this.shopDetailForm.bannerImages.reset(null);
            this.toastService.success('Image removed');
          } else {
            this.form.profilePicture.reset(null);
            this.toastService.success('Image removed');
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
