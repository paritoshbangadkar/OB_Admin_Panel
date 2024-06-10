import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BusinessService } from '@services/businessType/business.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { businessTypeErrors } from 'src/app/core/helpers/formErrors.helpers';
import { Location } from '@angular/common';
import { validateField } from 'src/app/core/validators/form.validator';
import { UserService } from 'src/app/core/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-version',
  templateUrl: './update-version.component.html',
  styleUrls: ['./update-version.component.scss']
})
export class UpdateVersionComponent implements OnInit {
  params: any;
  submitted = false;
  errorMessages: any = businessTypeErrors;
  displayMessage: string = null;
  selectedRow: any = {};
  pinCode: number = null;
  versionForm = this.formBuilder.group({
    customerAppAndroid: new FormControl('',),
    customerAppIos: new FormControl(''),
    shopAppAndroid: new FormControl(''),
    shopAppIos: new FormControl(''),
  });
  constructor(
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.getVersion();
  }

  ngOnDestroy(): void {
    this.pinCode = null;
  }

  get form() {
    return this.versionForm.controls;
  }

  getVersion() {
    this.userService.getVersion().subscribe((success) => {
      console.log("userService", success);
      this.versionForm.controls.customerAppAndroid.setValue(success?.custAndroidVersion);
      this.versionForm.controls.customerAppIos.setValue(success?.custIosVersion);
      this.versionForm.controls.shopAppAndroid.setValue(success?.shopAndroidVersion);
      this.versionForm.controls.shopAppIos.setValue(success?.shopIosVersion);
    });
  }

  update() {
    if (this.versionForm.invalid) {
      validateField(this.versionForm);
      return;
    }
    this.spinner.show();
    this.userService.updateVersion(this.versionForm.getRawValue()).subscribe(data => {
      this.spinner.hide();
      this.toastService.success(data?.message);
      this.modalService.dismissAll();
      this.location.back();
    }, (error) => {
      this.toastService.error(error);
      this.spinner.hide();
    });
  }

  goBack() {
    this.location.back();
  }

  open(content) {
    this.modalService.open(content, { centered: true });
  }

  verifyPin() {
    this.spinner.show();
    this.userService.verifyPin({ pinCode: this.pinCode }).subscribe(data => {
      this.spinner.hide();
      this.toastService.success(data?.message);
      this.update();
    }, (error) => {
      this.toastService.error(error.message);
      this.spinner.hide();
    });
  }
}
