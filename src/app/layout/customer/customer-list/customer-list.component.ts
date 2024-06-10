import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/core/services';
import { CustomerService } from '../../../services/customer/customer.service';
import { saveAs } from 'file-saver';
import { ROLES } from 'src/app/core/helpers';
import { UploadService } from '@services/uploadService/upload.service';
import * as moment from "moment";
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  selectedRow: any = {};
  customer: any = [];
  search: any = '';
  page = 1;
  pageSize = 50;
  collection: number = 0;
  userDetails: any = {};

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private storageService: StorageService,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private uploadService: UploadService,
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.spinner.show();
    this.customerService
      .getAll({
        page: this.page,
        pageSize: this.pageSize,
        search: this.search,
      })
      .subscribe((success) => {
        this.customer = success.data;
        this.collection = success.count;
        this.spinner.hide();
      });
  }

  view(id) {
    if (id) {
      this.router.navigate(['customer/customer-form'], { queryParams: { id } });
    } else {
      this.router.navigate(['customer/customer-form']);
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

  changeCustomerStatus(id) {
    this.spinner.show();
    this.customerService.changeStatus(id).subscribe(success => {
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

  delete(id) {
    this.customerService.delete(id).subscribe(
      (success) => {
        this.getAll();
        this.selectedRow = {};
        this.modalService.dismissAll();
        this.toastService.success(success.message);
      },
      (error) => {
        this.selectedRow = {};
        this.modalService.dismissAll();
      }
    );
  }

  exportUser() {
    this.spinner.show();
    let params = {
      role: ROLES.CUSTOMER,
    };
    this.uploadService.generateExport(params).subscribe(
      (result) => {
        saveAs(result, `Customer List ${moment().format("DD-MM-YYYY hh:mm a")}`);
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        this.toastService.error(error);
      }
    );
  }
}
