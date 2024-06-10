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
import { SeasonalOfferService } from '../../../services/seasonalOffer/seasonalOffer.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { OPTIONS, defaultStatus } from '../../../core/helpers/constants.helper';
import { UploadService } from '@services/uploadService/upload.service';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { validateField } from 'src/app/core/validators/form.validator';
import { seasonalOfferFormErrors } from 'src/app/core/helpers/formErrors.helpers';
import { OfferService } from '@services/offer/offer.service';
import { SubscriptionService } from '../../../services/subscriptionPlan/subscription.service';

@Component({
  selector: 'app-subscription-plan-form',
  templateUrl: './subscription-plan-form.component.html',
  styleUrls: ['./subscription-plan-form.component.scss'],
})
export class SubscriptionPlanFormComponent implements OnInit {
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
  count: number = 0;
  isCategory: boolean = false;

  subscriptionPlanType: any = [
    { label: 'ADVERTISEMENT', value: 'ADVERTISEMENT' },
    { label: 'OFFER', value: 'OFFER' },
    { label: 'DEAL', value: 'DEAL' },
  ];
  slotEnum: any = [
    { label: '1st', value: '1st' },
    { label: '2nd', value: '2nd' },
    { label: '3rd', value: '3rd' },
  ];
  durationEnum: any = [
    { label: 'month', value: 'month' },
    { label: 'week', value: 'week' },
    { label: 'days', value: 'days' },
  ];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private actRoutes: ActivatedRoute,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private subscriptionService: SubscriptionService
  ) { }

  subscriptionForm = new FormGroup({
    id: new FormControl(),
    planType: new FormControl('', [Validators.required]),
    slot: new FormControl(''),
    amount: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required]),
    status: new FormControl(''),
  });

  get form() {
    return this.subscriptionForm.controls;
  }

  ngOnInit(): void {
    this.actRoutes.queryParams.subscribe((params) => {
      if (params.id) {
        this.getById(params.id);
      }
    });
  }

  create() {
    if (this.subscriptionForm.invalid) {
      validateField(this.subscriptionForm);
      return;
    }
    this.subscriptionService.create(this.subscriptionForm.value).subscribe(
      (data) => {
        this.spinner.hide();
        this.toastService.success(data?.message);
        this.router.navigate(['/plan/advertisement-plan']);
      },
      (error) => {
        this.toastService.warning(error.error);
        this.spinner.hide();
      }
    );
  }

  update() {
    this.subscriptionService.update(this.subscriptionForm.value).subscribe(
      (data) => {
        this.spinner.hide();
        this.toastService.success(data?.message);
        this.router.navigate(['/plan/advertisement-plan']);
      },
      (error) => {
        this.toastService.warning(error.error);
        this.spinner.hide();
      }
    );
  }

  getById(_id) {
    this.subscriptionService.getById(_id).subscribe((success) => {
      this.subscriptionForm.patchValue(success);
      if (this.form['planType'].value == 'DEAL') {
        this.form['slot'].setValue(null);

        this.form['slot'].disable();
      } else {
        this.form['slot'].enable();

      }

    });
  }

  goBack() {
    this.location.back();
  }

  setSlotField(ev: any) {
    if (ev && ev.value == 'DEAL') {
      this.form['slot'].disable();
    } else {
      this.form['slot'].enable();

    }
  }
}
