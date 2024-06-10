import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SubscriptionService } from '../../../services/subscriptionPlan/subscription.service';

@Component({
  selector: 'app-payment-transaction-list',
  templateUrl: './payment-transaction-list.component.html',
  styleUrls: ['./payment-transaction-list.component.scss'],
})
export class PaymentTransactionListComponent implements OnInit {
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

  getAll(): void {
    this.spinner.show();
    let obj: any = {
      page: this.page,
      pageSize: this.pageSize,
      search: this.search,
    };
    this.subscriptionService.getAllTransaction(obj).subscribe((success) => {
      console.log('success---------------',success);
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
}
