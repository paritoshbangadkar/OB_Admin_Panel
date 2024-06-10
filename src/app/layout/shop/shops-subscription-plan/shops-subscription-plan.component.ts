import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FreePlanService } from '@services/freePlan/freePlan.service';
import { SubscriptionService } from '@services/subscriptionPlan/subscription.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { validateField } from 'src/app/core/validators/form.validator';

@Component({
  selector: 'app-shops-subscription-plan',
  templateUrl: './shops-subscription-plan.component.html',
  styleUrls: ['./shops-subscription-plan.component.scss'],
})
export class ShopsSubscriptionPlanComponent implements OnInit {
  planList: any = [];
  @Input() currentPlan: any = {};
  @Input() userId: any = {};
  subscriptionForm = new FormGroup({
    planId: new FormControl('', [Validators.required]),
    state: new FormControl(),
    userId: new FormControl(''),
    amount: new FormControl(''),
    duration: new FormControl(''),
    interval: new FormControl(''),
  });
  params: any = {};
  freePlanList: any = [];
  selectedPlanId: any;
  constructor(
    public modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastService: ToastrService,
    private subscriptionService: SubscriptionService,
    private freePlanService: FreePlanService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params?.id) {
        this.params = params;
        this.form?.id?.setValue(this.params?.id);
      }
    });
    this.getAll();
  }

  get form() {
    return this.subscriptionForm.controls;
  }

  getAll(): void {
    this.spinner.show();
    let obj: any = {};
    this.freePlanService.getAllActiveFreePlan(obj).subscribe((success) => {
      this.freePlanList = success.data;
      this.spinner.hide();
    });
  }

  removedUnderScore(type): string {
    return type?.replace('_', ' ');
  }

  selectPlan(data) {
    this.selectedPlanId = data.id;
    this.form.planId.setValue(data._id);
    this.form.userId.setValue(this.userId);
    this.form.amount.setValue(data.subscriptionPrice);
    this.form.duration.setValue(data.duration);
    this.form.interval.setValue(data.interval);
  }

  onSubmit() {
    if (this.subscriptionForm.invalid) {
      validateField(this.subscriptionForm);
      return;
    }
    this.spinner.show();
    this.subscriptionService
      .createFreePlan(this.subscriptionForm.value)
      .subscribe(
        (data: any) => {
          this.spinner.hide();
          this.toastService.success(data?.message);
          this.dismissModal();
        },
        (error: any) => {
          this.spinner.show();
          this.toastService.error(error);
        }
      );
  }

  /**
   * dismiss modal
   */
  dismissModal() {
    this.modalService.dismissAll('dismiss with cross click');
  }
  /**
   * close modal
   */
  closeModal() {
    this.activeModal.close('close with cancel button');
  }
}
