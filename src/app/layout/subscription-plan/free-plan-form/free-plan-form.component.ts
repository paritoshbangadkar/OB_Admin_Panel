import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FreePlanService } from '@services/freePlan/freePlan.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { defaultStatus, getDurationArray, getPlanTypeArray } from 'src/app/core/helpers';
import { freePlanFormErrors } from 'src/app/core/helpers/formErrors.helpers';
import { validateField } from 'src/app/core/validators/form.validator';
import { Location } from '@angular/common';

@Component({
  selector: 'app-free-plan-form',
  templateUrl: './free-plan-form.component.html',
  styleUrls: ['./free-plan-form.component.scss']
})
export class FreePlanFormComponent implements OnInit {

  discountForm = new FormGroup({
    id: new FormControl(),
    planTitle: new FormControl('', [Validators.required]),
    subscriptionPrice: new FormControl('', [Validators.required]),
    planType: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required]),
    interval: new FormControl('', [Validators.required]),
    status: new FormControl(defaultStatus.ACTIVE),
  });


  planType = ['free_plan'];

  duration = getDurationArray();
  errorMessages: any = freePlanFormErrors;
  displayMessage: string = null;
  search: any = '';
  page = 1;
  pageSize = 50;
  collection: any;
  count: number = 0;


  constructor(
    private router: Router,
    private location: Location,
    private freePlanService: FreePlanService,
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
    this.freePlanService.create(this.discountForm.value).subscribe(data => {
      this.spinner.hide();
      this.toastService.success(data?.message);
      this.router.navigate(['/plan/free-plan']);
    }, (error) => {
      this.spinner.hide();
    });
  }

  update() {
    if (this.discountForm.invalid) {
      validateField(this.discountForm);
      return;
    }
    this.freePlanService.update(this.discountForm.value).subscribe(data => {
      this.spinner.hide();
      this.toastService.success(data?.message);
      this.router.navigate(['/plan/free-plan']);
    }, (error) => {
      this.toastService.success(error);
      this.spinner.hide();
    });
  }

  getById(id) {
    this.freePlanService.getById(id).subscribe((success) => {
      this.discountForm.patchValue(success);
    });
  }

  goBack() {
    this.location.back();
  }

}
