import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubscriptionService } from '@services/subscriptionPlan/subscription.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services';

@Component({
  selector: 'app-subscription-pricing',
  templateUrl: './subscription-pricing.component.html',
  styleUrls: ['./subscription-pricing.component.scss']
})
export class SubscriptionPricingComponent implements OnInit {
  selectedRow: any = {};
  tableData: any = [];
  search: any = '';
  page = 1;
  pageSize = 25;
  collection: any;
  todayDate = null;
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private subscriptionService: SubscriptionService,
    public userService: UserService
  ) {
    this.userService.populate();
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(filters = {}): void {
    this.spinner.show();
    let obj: any = {
      page: this.page,
      pageSize: this.pageSize,
      search: this.search,
    };
    this.subscriptionService.getAllSubscription(obj).subscribe((success) => {
      this.tableData = success.data;
      this.collection = success.count;
      this.spinner.hide();
    });
  }

  refreshList(title) {
    this.search = title == 'clear' ? '' : this.search;
    this.getAll();
  }

  resetFilter(title) {
    this.search = title == 'clear' ? '' : this.search;

    this.getAll();
  }
  onChangePage(pageNo) {
    if (pageNo > 0) {
      this.page = pageNo;
    }
    this.getAll();
  }

  open(content) {
    this.modalService.open(content, { centered: true });
  }

  removedUnderScore(type): string {
    return type.replace('_', ' ');
  }
  createPlan() {
    // return this.toastService.success('ok call');
    this.spinner.show();
    this.subscriptionService.createPlan({}).subscribe((success) => {
      console.log("success", success);
      this.toastService.success(success);
      this.modalService.dismissAll();
      this.spinner.hide();
    });
  }
}
