import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DiscountService } from '@services/discount/discount.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { defaultStatus, getSubCategoryTypeArray, getPlanTypeArray } from 'src/app/core/helpers';
import { discountFormErrors } from 'src/app/core/helpers/formErrors.helpers';
import { validateField } from 'src/app/core/validators/form.validator';
import { Location } from '@angular/common';

@Component({
  selector: 'app-subscription-discount-form',
  templateUrl: './subscription-discount-form.component.html',
  styleUrls: ['./subscription-discount-form.component.scss']
})
export class SubscriptionDiscountFormComponent implements OnInit {

  discountForm = new FormGroup({
    id: new FormControl(),
    subCategoryType: new FormControl('', [Validators.required]),
    planType: new FormControl('', [Validators.required]),
    discount: new FormControl('',[Validators.required]),
    status: new FormControl(defaultStatus.ACTIVE),
  });


  subcategoryType = getSubCategoryTypeArray();
  planType = getPlanTypeArray();
  errorMessages: any = discountFormErrors;
  displayMessage: string = null;
  search: any = '';
  page = 1;
  pageSize = 50;
  collection: any;
  count: number = 0;


  constructor(
    private router: Router,
    private location: Location,
    private discountService: DiscountService,
    private actRoutes: ActivatedRoute,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
  ) {

  }

  ngOnInit(): void {
    this.actRoutes.queryParams.subscribe((params) => {
      if (params.id) {
        this.getById(params.id);
      }
    });
  }
  get form() {
    return this.discountForm.controls;
  }

  create() {
    if (this.discountForm.invalid) {
      validateField(this.discountForm);
      return;
    }
    this.discountService.create(this.discountForm.value).subscribe(data => {
      this.spinner.hide();
      this.toastService.success(data?.message);
      this.router.navigate(['/plan/plan-discount']);
    }, (error) => {
      this.spinner.hide();
    });
  }

  update() {
    if (this.discountForm.invalid) {
      validateField(this.discountForm);
      return;
    }
    this.discountService.update(this.discountForm.value).subscribe(data => {
      this.spinner.hide();
      this.toastService.success(data?.message);
      this.router.navigate(['/plan/plan-discount']);
    }, (error) => {
      // this.toastService.success(error);
      this.spinner.hide();
    });
  }

  getById(id) {
    this.discountService.getById(id).subscribe((success) => {
      this.discountForm.patchValue(success);
      this.discountForm.get('subCategoryType').disable();
      this.discountForm.get('planType').disable();
    });
  }

  goBack() {
    this.location.back();
  }

}
