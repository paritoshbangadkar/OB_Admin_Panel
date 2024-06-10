import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormArray,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessService } from '@services/businessType/business.service';
import { ShopService } from '@services/shop/shop.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { shopFormErrors } from 'src/app/core/helpers/formErrors.helpers';
import { UploadService } from '@services/uploadService/upload.service';
import {
  OPTIONS,
  ROLES,
  registrationPlatform,
} from '../../../core/helpers/constants.helper';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { SubCategoryService } from '@services/subCategory/sub-category.service';
import { ToastrService } from 'ngx-toastr';
import { validateField } from 'src/app/core/validators/form.validator';
import { CategoryService } from '@services/category/category.service';
import { porterStatus } from 'src/app/core/helpers';
import { UserService } from 'src/app/core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShopDeviceInfoComponent } from '../shop-device-info/shop-device-info.component';

@Component({
  selector: 'app-shop-form',
  templateUrl: './shop-form.component.html',
  styleUrls: ['./shop-form.component.scss'],
})
export class ShopFormComponent implements OnInit {
  bannerImages: any = null;
  errorMessages = shopFormErrors;
  displayMessage: string = null;
  filePath: string = '';
  businessArr = [];
  businessTypeId: any;
  key: any;
  shopDetailsId: string;
  shopId: string;
  subCategoryArr: [];
  categoryList: [];
  porterToken: string = null;
  catalogueBtn: string = null;
  serviceBtn: string = null;
  placeOrderBtn: string = null;
  proceedToCheckoutBtn: string = null;
  proceedToBuyBtn: string = null;
  deliveryAddressConfirmBtn: string = null;
  discountMessage: string = null;

  porterStatus = [
    // porterStatus.PENDING,
    porterStatus.ACCEPTED,
  ];

  shopForm = this.formBuilder.group({
    _id: new FormControl(),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    gender: new FormControl(''),
    email: new FormControl('', [
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    countryCode: new FormControl('IN'),
    mobileNumber: new FormControl('', [Validators.required]),
    profilePicture: new FormControl('', [Validators.required]),
    registrationPlatform: new FormControl(registrationPlatform.WEB),
    role: new FormControl(ROLES.SHOP),
    address: new FormGroup({
      line1: new FormControl('', [Validators.required]),
      line2: new FormControl(''),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      country: new FormControl('India'),
      pinCode: new FormControl('', [Validators.required]),
    }),
    shopDetails: new FormGroup({
      shopName: new FormControl('', [Validators.required]),
      shopDetailsId: new FormControl(''),
      businessTypeId: new FormControl([], [Validators.required]),
      subCategoryId: new FormControl([], [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
      keyword: new FormControl(''),
      aboutUs: new FormControl(''),
      gstNumber: new FormControl(''),
      // eWallet: new FormControl(''),
      isBookingService: new FormControl(false),
      trackLiveLocation: new FormControl(false),
      isChangeLocation: new FormControl(false),
      bannerImages: new FormControl('', [Validators.required]),
      links: new FormGroup({
        facebook: new FormControl(''),
        instagram: new FormControl(''),
        youtube: new FormControl(''),
      }),
      lat: new FormControl(0),
      lng: new FormControl(0),
      deliveryService: new FormGroup({
        isPorterRequest: new FormControl(''),
        isDeliveryService: new FormControl(),
        isDeliveryServiceByShop: new FormControl(),
        isPorterService: new FormControl(),
        GSTCertificate: new FormControl(),
      }),
    }),
  });
  userDetails: any = {};
  shopDeviceData: any = {};

  get form() {
    return this.shopForm.controls;
  }

  get shopDetailForm() {
    return (this.shopForm.get('shopDetails') as FormGroup).controls;
  }

  constructor(
    private spinner: NgxSpinnerService,
    private toastService: ToastrService,
    private shopService: ShopService,
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private actRoutes: ActivatedRoute,
    private businessService: BusinessService,
    private uploadService: UploadService,
    private subCategoryService: SubCategoryService,
    private categoryService: CategoryService,
    public userService: UserService,
    private modalService: NgbModal
  ) {
    this.userService.populate();
  }

  ngOnInit() {
    this.getAllCategory();
    this.getAllBusinessType();
    this.actRoutes.queryParams.subscribe((params) => {
      this.shopId = params.shopDetailsId;
      if (params.id) {
        this.getById(params.id);
      }
    });
  }

  formatTime() {
    if (typeof this.shopDetailForm.startTime == 'string') {
      this.shopDetailForm.schedule.value.startTime = `${this.shopDetailForm.schedule.value.startTime}`;
    }
    if (typeof this.shopDetailForm.endTime == 'string') {
      this.shopDetailForm.schedule.value.endTime = `${this.shopDetailForm.schedule.value.endTime}`;
    }
  }

  create() {
    if (this.shopForm.invalid) {
      validateField(this.shopForm);
      return;
    }
    this.formatTime();
    let formData: any = this.shopForm.value;
    delete formData.shopDetails.lat;
    delete formData.shopDetails.lng;
    formData.shopDetails.location = {
      type: 'Point',
      coordinates: [
        this.shopDetailForm.lat.value,
        this.shopDetailForm.lng.value,
      ],
    };
    this.spinner.show();
    this.shopService.create(formData).subscribe(
      (data) => {
        this.spinner.hide();
        this.toastService.success(data?.message);
        this.router.navigate(['shop/shop-list']);
      },
      (error) => {
        this.toastService.error(error.error.message);
        this.spinner.hide();
      }
    );
  }

  update() {
    // if (this.shopForm.invalid) {
    //   validateField(this.shopForm);
    //   return;
    // }
    this.formatTime();
    let formData: any = this.shopForm.value;
    delete formData.shopDetails.lat;
    delete formData.shopDetails.lng;
    formData.shopDetails.location = {
      type: 'Point',
      coordinates: [
        this.shopDetailForm.lat.value,
        this.shopDetailForm.lng.value,
      ],
    };
    this.spinner.show();
    this.shopService.update(formData).subscribe(
      (data) => {
        this.spinner.hide();
        this.toastService.success(data?.message);
        this.router.navigate(['shop/shop-list']);
      },
      (error) => {
        // this.toastService.error(error);
        this.spinner.hide();
      }
    );
  }

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
    this.categoryService
      .getAll({ pageSize: 200 })
      .subscribe(async (success) => {
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

  getById(_id) {
    this.shopService.getById(_id).subscribe((success: any) => {
      this.shopDeviceData = success;
      this.shopDetailsId = success.shopDetails._id;
      this.porterToken = success.shopDetails.porterToken;
      this.catalogueBtn = success.shopDetails.catalogueBtn;
      this.serviceBtn = success.shopDetails.serviceBtn;
      this.placeOrderBtn = success.shopDetails.placeOrderBtn;
      this.proceedToCheckoutBtn = success.shopDetails.proceedToCheckoutBtn;
      this.proceedToBuyBtn = success.shopDetails.proceedToBuyBtn;
      this.deliveryAddressConfirmBtn = success.shopDetails.deliveryAddressConfirmBtn;
      this.discountMessage = success.shopDetails.discountMessage;
      success.shopDetails.categoryId =
        success.shopDetails.subCategory?.parentId;
      this.shopDetailForm.categoryId.setValue(success.shopDetails.categoryId);
      this.getAllSubCategory({ _id: success.shopDetails.categoryId });
      this.shopForm.patchValue(success);
      if (success.shopDetails?.location?.coordinates?.length > 0) {
        const lat = success.shopDetails?.location?.coordinates[0];
        const lng = success.shopDetails?.location?.coordinates[1];
        this.shopDetailForm.lat.setValue(lat);
        this.shopDetailForm.lng.setValue(lng);
      }
    });
  }

  goBack() {
    this.location.back();
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

  removeImageFromDb(key) {
    if (key == 'bannerImages') {
      let obj = {
        bannerImages: this.shopDetailForm.bannerImages.value,
        shopId: this.shopDetailsId,
      };
      // this.shopService.deleteImage(obj).subscribe((success: any) => {
      //   console.log(success);
      // }, (error) => {
      //   console.log(error);

      // })
    }
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

  updatePorterRequest() {
    let isPorterRequest = this.shopForm.get(
      'shopDetails.deliveryService.isPorterRequest'
    ).value;
    let payload = {
      shopId: this.shopId,
      isPorterRequest: isPorterRequest,
    };
    this.shopService.addPorterRequest(payload).subscribe(
      async (success) => {
        this.toastService.success('Porter Request updated successfully');
      },
      async (error) => {
        this.toastService.error(error);
      }
    );
  }

  addPorterToken() {
    let payload = {
      shopId: this.shopId,
      porterToken: this.porterToken,
    };
    this.shopService.addPorterToken(payload).subscribe(
      async (success) => {
        this.toastService.success(success.message);
      },
      async (error) => {
        this.toastService.error(error);
      }
    );
  }

  addCatalogueBtn() {
    let payload = {
      shopId: this.shopId,
      catalogueBtn: this.catalogueBtn,
    };
    this.shopService.addCatalogueBtn(payload).subscribe(
      async (success) => {
        this.toastService.success(success.message);
      },
      async (error) => {
        this.toastService.error(error);
      }
    );
  }

  addServiceBtn() {
    let payload = {
      shopId: this.shopId,
      serviceBtn: this.serviceBtn,
    };
    this.shopService.addServiceBtn(payload).subscribe(
      async (success) => {
        this.toastService.success(success.message);
      },
      async (error) => {
        this.toastService.error(error);
      }
    );
  }

  addProceedToCheckoutBtn() {
    let payload = {
      shopId: this.shopId,
      proceedToCheckoutBtn: this.proceedToCheckoutBtn,
    };
    this.shopService.addProceedToCheckoutBtn(payload).subscribe(
      async (success) => {
        this.toastService.success(success.message);
      },
      async (error) => {
        this.toastService.error(error);
      }
    );
  }

  addProceedToBuyBtn() {
    let payload = {
      shopId: this.shopId,
      proceedToBuyBtn: this.proceedToBuyBtn,
    };
    this.shopService.addProceedToBuyBtn(payload).subscribe(
      async (success) => {
        this.toastService.success(success.message);
      },
      async (error) => {
        this.toastService.error(error);
      }
    );
  }

  addDeliveryAddressConfirmBtn() {
    let payload = {
      shopId: this.shopId,
      deliveryAddressConfirmBtn: this.deliveryAddressConfirmBtn,
    };
    this.shopService.addDeliveryAddressConfirmBtn(payload).subscribe(
      async (success) => {
        this.toastService.success(success.message);
      },
      async (error) => {
        this.toastService.error(error);
      }
    );
  }

  addPlaceOrderBtn() {
    let payload = {
      shopId: this.shopId,
      placeOrderBtn: this.placeOrderBtn,
    };
    this.shopService.addPlaceOrderBtn(payload).subscribe(
      async (success) => {
        this.toastService.success(success.message);
      },
      async (error) => {
        this.toastService.error(error);
      }
    );
  }

  addDiscountMessage() {
    let payload = {
      shopId: this.shopId,
      discountMessage: this.discountMessage,
    };
    this.shopService.addDiscountMessage(payload).subscribe(
      async (success) => {
        this.toastService.success(success.message);
      },
      async (error) => {
        this.toastService.error(error);
      }
    );
  }

  deviceInfo() {
    const modalRef = this.modalService.open(ShopDeviceInfoComponent, {
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.deviceData = this.shopDeviceData;
    modalRef.result.then(
      (result) => {},
      (dismiss) => {}
    );
  }
}
