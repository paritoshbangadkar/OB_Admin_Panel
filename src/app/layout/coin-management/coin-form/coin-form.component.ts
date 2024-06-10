import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CoinManagementService } from '@services/coinManagement/coinmanagement.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { coinFormErrors } from 'src/app/core/helpers/formErrors.helpers';
import { validateField } from 'src/app/core/validators/form.validator';
import { Location } from '@angular/common';
import { defaultStatus } from 'src/app/core/helpers';

@Component({
  selector: 'app-coin-form',
  templateUrl: './coin-form.component.html',
  styleUrls: ['./coin-form.component.scss']
})
export class CoinFormComponent implements OnInit {
  params: any;
  errorMessages = coinFormErrors;
  displayMessage: string = null;

  eventType: any = [
    { label: 'Daily Check in', value: 'daily_check_in' },
    { label: 'Registration', value: 'registration' },
    { label: 'Place Order', value: 'place_order' },
  ];
  coinForm = this.formBuilder.group({
    id: new FormControl(),
    eventTitle: new FormControl('', [Validators.required]),
    coin: new FormControl(null, [Validators.required]),
    status: new FormControl(defaultStatus.ACTIVE),

  });
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location,
    private actRoutes: ActivatedRoute,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private coinService: CoinManagementService,
  ) { }

  ngOnInit(): void {
    this.actRoutes.queryParams.subscribe((params) => {
      if (params.id) {
        this.getById(params.id);
      }
    });
  }


  get form() {
    return this.coinForm.controls;
  }

  create() {
    if (this.coinForm.invalid) {
      validateField(this.coinForm);
      return;
    }
    this.coinService.create(this.coinForm.value).subscribe(data => {
      this.spinner.hide();
      this.toastService.success(data?.message);
      this.router.navigate(['/coin-management/list']);
    }, (error) => {
      this.toastService.success(error);
      this.spinner.hide();
    });
  }
  update() {
    this.coinService.update(this.coinForm.value).subscribe(data => {
      this.spinner.hide();
      this.toastService.success(data?.message);
      this.router.navigate(['/coin-management/list']);
    }, (error) => {
      this.toastService.success(error);
      this.spinner.hide();
    });
  }

  getById(_id) {
    this.coinService.getById(_id).subscribe((success) => {
      this.coinForm.patchValue(success);
    });
  }

  goBack() {
    this.location.back();
  }
}
