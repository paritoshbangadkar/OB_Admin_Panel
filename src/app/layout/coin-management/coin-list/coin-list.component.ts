import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CoinManagementService } from '../../../services/coinManagement/coinmanagement.service'
@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss']
})
export class CoinListComponent implements OnInit {
  selectedRow: any = {};
  offerArr: any = [];
  search: any = '';
  page = 1;
  pageSize = 25;
  collection: any;
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private coinService: CoinManagementService
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
      ...filters,
    };
    this.coinService.getAll(obj).subscribe((success) => {
      this.offerArr = success.data;
      this.collection = success.count;
      this.spinner.hide();
    });
  }

  view(item) {
    if (item) {
      this.router.navigate(['/coin-management/form'], { queryParams: { id: item._id } });
    } else {
      this.router.navigate(['/coin-management/form']);
    }
  }

  refreshList(title) {
    this.search = title == 'clear' ? '' : this.search;
    this.getAll();
  }

  resetFilter() {
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
    this.coinService.changeStatus(_id).subscribe(success => {
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
    this.coinService.delete(this.selectedRow._id).subscribe(
      (success: any) => {
        this.toastService.success(success?.message || success?.error);
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
