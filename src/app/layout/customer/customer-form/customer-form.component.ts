import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '@services/customer/customer.service';
import { UploadService } from '@services/uploadService/upload.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { OPTIONS, ROLES, defaultStatus } from 'src/app/core/helpers/constants.helper';
import { validateField } from 'src/app/core/validators/form.validator';
import { customerFormErrors } from 'src/app/core/helpers/formErrors.helpers';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { DeviceInfoComponent } from '../device-info/device-info.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/core/services';
import { AddressListComponent } from '../address-list/address-list.component';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit {

  errorMessages = customerFormErrors;
  displayMessage: string = null;


  customerForm = this.formBuilder.group({
    id: new FormControl(),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    countryCode: new FormControl('IN'),
    mobileNumber: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    profilePicture: new FormControl('', [Validators.required]),
    registrationPlatform: new FormControl('web'),
    status: new FormControl(defaultStatus.ACTIVE, Validators.required),
    // address: new FormGroup({
    //   line1: new FormControl('', [Validators.required]),
    //   line2: new FormControl(''),
    //   city: new FormControl('', [Validators.required]),
    //   state: new FormControl('', [Validators.required]),
    //   country: new FormControl('India'),
    //   pinCode: new FormControl('', [Validators.required]),
    // }),
    role: new FormControl(ROLES.CUSTOMER),
    gender: new FormControl(''),
  });
  customerInfo: any;

  get form() {
    return this.customerForm.controls;
  }
  constructor(
    private spinner: NgxSpinnerService,
    private customerService: CustomerService,
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private actRoutes: ActivatedRoute,
    private toastService: ToastrService,
    private uploadService: UploadService,
    private modalService: NgbModal,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.actRoutes.queryParams.subscribe((params) => {
      if (params.id) {
        this.getById(params.id);
      }
    });
  }

  create() {
    if (this.customerForm.invalid) {
      validateField(this.customerForm);
      return;
    }
    this.spinner.show();
    this.customerService.create(this.customerForm.getRawValue()).subscribe(data => {
      this.toastService.success(data?.message);
      this.spinner.hide();
      this.router.navigate(['customer/customer-list']);
    }, (error) => {
      this.toastService.error(error.error.message);
      this.spinner.hide();
    });
  }
  update() {
    if (this.customerForm.invalid) {
      validateField(this.customerForm);
      return;
    }
    this.spinner.show();
    this.customerService.update(this.customerForm.getRawValue()).subscribe(data => {
      this.toastService.success(data?.message);
      this.spinner.hide();
      this.router.navigate(['customer/customer-list']);
    }, (error) => {
      // this.toastService.error(error);
      this.spinner.hide();
    });
  }

  getById(id) {
    this.customerService.getById(id).subscribe((success) => {
      this.customerInfo = success;
      this.customerForm.patchValue(success);
      this.customerForm.controls.status.setValue(defaultStatus.ACTIVE);
    });
  }

  goBack() {
    this.location.back();
  }

  uploadFile(file: File) {
    this.spinner.show();
    if (this.uploadService.checkImageType(file) && this.uploadService.checkFileSize(file)) {
      let formData = new FormData();
      formData.append('file', file);
      this.uploadService.uploadFile(formData)
        .subscribe(
          (data: any) => {
            this.customerForm.controls.profilePicture.setValue(data?.result?.cdn);
            this.spinner.hide();
          },
          (error: any) => {
            this.toastService.error(error);
            this.spinner.hide();
          }
        );
    }

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

  removeUploadedImage() {
    this.uploadService.deleteUploadedImage({ filePath: this.form.profilePicture.value })
      .subscribe(
        (data: any) => {
          this.form.profilePicture.reset(null)
          this.toastService.success("Image removed");
          this.spinner.hide();
        },
        (error: any) => {
          this.toastService.error(error);
          this.spinner.hide();
        }
      );
  }


  deviceInfo() {
    const modalRef = this.modalService.open(DeviceInfoComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.deviceData = this.customerInfo;
    modalRef.result.then((result) => {
    }, (dismiss) => {
    })
  }

  /**
* open modal of view address
*/
  openAddress() {
    const modalRef = this.modalService.open(AddressListComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.userId = this.customerInfo?._id;
    modalRef.result.then((result) => {
    }, (dismiss) => {
    })
  }
}
