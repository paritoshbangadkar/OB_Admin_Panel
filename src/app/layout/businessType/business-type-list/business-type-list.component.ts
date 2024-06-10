import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BusinessService } from '../../../services/businessType/business.service';
@Component({
  selector: 'app-business-type-list',
  templateUrl: './business-type-list.component.html',
  styleUrls: ['./business-type-list.component.scss']
})
export class BusinessTypeListComponent implements OnInit {

  selectedRow: any = {};
  businessArr: any = [];
  search: any = '';
  page = 1;
  pageSize = 25;
  collection: number = 0;


  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private businessService: BusinessService
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
    this.businessService
      .getAll(obj)
      .subscribe((success) => {
        this.businessArr = success.data;
        this.collection = success.count;
        this.spinner.hide();
      }, (error: any) => {
        this.spinner.hide();
      })
  }

  view(id) {
    if (id) {
      this.router.navigate(['/businessType/business-form'], { queryParams: { id } });
    } else {
      this.router.navigate(['/businessType/business-form']);
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
    this.businessService.changeStatus(_id).subscribe(success => {
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
    this.businessService.delete(this.selectedRow._id).subscribe(
      (success: any) => {
        this.toastService.success(" Business Deleted Successfully !!");
        this.modalService.dismissAll();
        this.spinner.hide();
        this.getAll();
      },
      (error: any) => {
        console.log("error", error);
      }
    )
  }


}
