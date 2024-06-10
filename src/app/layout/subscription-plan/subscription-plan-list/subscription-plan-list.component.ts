import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SubscriptionService } from '../../../services/subscriptionPlan/subscription.service';


@Component({
  selector: 'app-subscription-plan-list',
  templateUrl: './subscription-plan-list.component.html',
  styleUrls: ['./subscription-plan-list.component.scss'],
})
export class SubscriptionPlanListComponent implements OnInit {
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
    private subscriptionService: SubscriptionService
  ) { }

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
    this.subscriptionService.getAll(obj).subscribe((success) => {
      this.tableData = success.data;
      this.collection = success.count;
      this.spinner.hide();
    });
  }

  view(item) {
    if (item) {
      if (item.categoryId) {
        this.router.navigate(['/plan/view'], {
          queryParams: { id: item._id, isCategory: true },
        });
      } else {
        this.router.navigate(['/plan/view'], {
          queryParams: { id: item._id },
        });
      }
    } else {
      this.router.navigate(['/plan/new']);
    }
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
  openConfirmStatusChange(u: any, content) {
    this.selectedRow = u;
    this.modalService.open(content, { centered: true });
  }
  changeCustomerStatus(_id) {
    this.spinner.show();
    this.subscriptionService.changeStatus(_id).subscribe(
      (success) => {
        this.getAll();
        this.selectedRow = {};
        this.modalService.dismissAll();
        this.toastService.success(success.message);
        this.spinner.hide();
      },
      (error) => {
        this.selectedRow = {};
        this.modalService.dismissAll();
      }
    );
  }

  open(u, content) {
    this.selectedRow = u;
    this.modalService.open(content, { centered: true });
  }

  delete() {
    this.spinner.show();
    this.subscriptionService.delete(this.selectedRow._id).subscribe(
      (success: any) => {
        this.toastService.success('Deleted Successfully !!');
        this.modalService.dismissAll();
        this.spinner.hide();
        this.getAll();
      },
      (error: any) => {
        console.log('error', error);
      }
    );
  }
}
