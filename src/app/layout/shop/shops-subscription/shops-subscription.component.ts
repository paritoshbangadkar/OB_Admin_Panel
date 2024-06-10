import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionService } from '@services/subscriptionPlan/subscription.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { defaultStatus } from 'src/app/core/helpers';
import { ShopsSubscriptionPlanComponent } from '../shops-subscription-plan/shops-subscription-plan.component';
@Component({
  selector: 'app-shops-subscription',
  templateUrl: './shops-subscription.component.html',
  styleUrls: ['./shops-subscription.component.scss'],
})
export class ShopsSubscriptionComponent implements OnInit {
  search: any = '';
  page = 1;
  pageSize = 25;
  dataList: any = [];
  collection: any;
  userId: any = {};
  currentPlan: any = {};
  defaultStatus = defaultStatus
  recurringSubscriptionList: any
  constructor(
    private router: Router,
    private toastService: ToastrService,
    private subscriptionService: SubscriptionService,
    private spinner: NgxSpinnerService,
    private actRoutes: ActivatedRoute,
    private location: Location,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.actRoutes.queryParams.subscribe((params) => {
      this.userId = params.id;
      if (params.id) {
        this.getCurrentPlan();
        this.loadData();
        this.recurringSubscription();
      }
    });
  }

  /**
  * normal subscription
 */
  loadData(): void {
    let params = {
      page: this.page,
      pageSize: this.pageSize,
      search: this.search,
      userId: this.userId,
    };
    this.spinner.show();
    this.subscriptionService.subscriptionList(params).subscribe(
      (success) => {
        this.dataList = success.data;
        this.collection = success.count;
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        this.toastService.error(error);
      }
    );
  }

  /**
 * recurring subscription
*/
  recurringSubscription(): void {
    let params = {
      page: this.page,
      pageSize: this.pageSize,
      search: this.search,
      userId: this.userId,
    };
    this.spinner.show();
    this.subscriptionService.recurringSubscriptionList(params).subscribe(
      (success) => {
        this.recurringSubscriptionList = success.data;
        console.log('this.recurringSubscriptionList', this.recurringSubscriptionList);
        this.collection = success.count;
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        this.toastService.error(error);
      }
    );
  }

  onChangePage(pageNo) {
    if (pageNo > 0) {
      this.page = pageNo;
    }
    this.loadData();
    this.recurringSubscription();
  }

  goBack() {
    this.location.back();
  }
  removedUnderScore(type): string {
    return type?.replace('_', ' ');
  }

  /**
* current subscription
*/
  getCurrentPlan() {
    this.subscriptionService
      .currentSubscription({
        userId: this.userId,
        // role: 'shop',
      })
      .subscribe((result) => {
        this.currentPlan = result;
      });
  }

  openSubscription() {
    const modalRef = this.modalService.open(ShopsSubscriptionPlanComponent, {
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.userId = this.userId;
    modalRef.result.then(
      (result) => { },
      (dismiss) => {
        this.getCurrentPlan();
        this.loadData();
        this.recurringSubscription();
      }
    );
  }
}
