import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DiscountService } from '@services/discount/discount.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subscription-discount',
  templateUrl: './subscription-discount.component.html',
  styleUrls: ['./subscription-discount.component.scss']
})
export class SubscriptionDiscountComponent implements OnInit {
  selectedRow: any = {};
  discountArr: any = [];
  search: any = '';
  page = 1;
  pageSize = 25;
  collection: number = 0;
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private discountService: DiscountService,
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.spinner.show();
    let obj: any = {
      page: this.page,
      pageSize: this.pageSize,
      search: this.search,
    };
    this.discountService.getAll(obj).subscribe((success) => {
      this.discountArr = success.data;
      this.collection = success.count;
      this.spinner.hide();
    }, (error: any) => {
      this.spinner.hide();
    })
  }

  view(id) {
    if (id) {
      this.router.navigate(['/plan/add'], { queryParams: { id } });
    } else {
      this.router.navigate(['/plan/add']);
    }
  }
  refreshList(title) {
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
    this.discountService.changeStatus(_id).subscribe(success => {
      this.getAll();
      this.selectedRow = {};
      this.modalService.dismissAll();
      this.toastService.success(success.message);
      this.spinner.hide()
    },
      (error) => {
        this.selectedRow = {};
        this.modalService.dismissAll();
      }
    )
  }

  open(u, content) {
    this.selectedRow = u;
    this.modalService.open(content, { centered: true });
  }

  delete() {
    this.spinner.show();
    this.discountService.delete(this.selectedRow._id).subscribe(
      (success: any) => {
        this.toastService.success(success.message);
        this.modalService.dismissAll();
        this.spinner.hide();
        this.getAll();
      },
      (error: any) => {
        this.toastService.error(error)
      }
    )
  }

}
