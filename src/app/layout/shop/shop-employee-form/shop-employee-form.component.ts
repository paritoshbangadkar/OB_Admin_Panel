import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ShopService } from '@services/shop/shop.service';
import { validateField } from 'src/app/core/validators/form.validator';
import { ROLES } from 'src/app/core/helpers';
import { employeeFormErrors } from 'src/app/core/helpers/formErrors.helpers';
@Component({
  selector: 'app-shop-employee-form',
  templateUrl: './shop-employee-form.component.html',
  styleUrls: ['./shop-employee-form.component.scss']
})
export class ShopEmployeeFormComponent implements OnInit {
  shopId: any;
  errorMessages = employeeFormErrors;
  employeeForm = new FormGroup({
    id: new FormControl(null),
    firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*')]),
    lastName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*')]),
    countryCode: new FormControl('91'),
    mobileNumber: new FormControl('', [Validators.required, Validators.pattern('^[7-9][0-9]{9}$')]),
    designation: new FormControl('', [Validators.required]),
    role: new FormControl(ROLES.EMPLOYEE),
    // accessAllotment: new FormControl([],),
    shopId: new FormControl(),
    employeeRole: new FormControl(),
  })

  employeeRole = ['ADMIN', 'MEMBER'];

  get form() {
    return this.employeeForm.controls;
  }

  get session() {
    return this.employeeForm.controls['session'] as FormArray;
  }
  constructor(
    private location: Location,
    private actRoutes: ActivatedRoute,
    private toastService: ToastrService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private shopService: ShopService
  ) { }

  ngOnInit(): void {
    this.actRoutes.queryParams.subscribe((params) => {
      this.shopId = params.shopId;
      if (params.shopId) {
        // this.getById(params.shopId);
        this.employeeForm.controls.shopId.setValue(params.shopId)
      }
      if (params.employeeId) {
        this.getEmployee(params.employeeId)
      }
    });
  }

  // getById(_id) {
  //   this.shopService.getById(_id).subscribe((success) => {
  //     console.log("success shop data", success);
  //     this.employeeForm.patchValue(success);
  //   });
  // }

  getEmployee(id) {
    this.shopService.viewEmployee(id).subscribe((success) => {
      this.employeeForm.patchValue(success);
      this.employeeForm.controls.designation.patchValue(success.employeeId.designation);
      this.employeeForm.controls.employeeRole.setValue(success.employeeId.employeeRole);
      this.form.id.patchValue(success.id);
    });
  }

  async update() {
    if (this.employeeForm.invalid) {
      validateField(this.employeeForm);
      return;
    }
    this.shopService.updateEmployee(this.employeeForm.value).subscribe(
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
}
