import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../services/category/category.service';
import { BusinessService } from '@services/businessType/business.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  selectedRow: any = {};
  categoryArr: any = [];
  businessArr: any = [];
  search: any = '';
  // businessTypeId = '';
  businessTypeId = null;
  page = 1;
  pageSize = 50;
  collection: number = 0;


  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private categoryService: CategoryService,
    private businessService: BusinessService,

  ) { }




  ngOnInit(): void {
    this.getAll();
    this.getAllBusinessType()
  }

  getAll() {
    this.spinner.show();
    let obj: any = {
      page: this.page,
      pageSize: this.pageSize,
      search: this.search,
      ...(this.businessTypeId && { businessTypeId: this.businessTypeId }),
    };
    this.categoryService
      .getAllTable(obj)
      .subscribe(({ data, count }) => {
        this.categoryArr = data;
        this.collection = count;
        this.spinner.hide();
      }, (error: any) => {
        this.spinner.hide();
      })
  }

  view(id) {
    if (id) {
      this.router.navigate(['/category/category-form'], { queryParams: { id } });
    } else {
      this.router.navigate(['/category/category-form']);
    }
  }

  refreshList(title) {
    this.businessTypeId = null;
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
    this.categoryService.changeStatus(_id).subscribe(success => {
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
    this.categoryService.delete(this.selectedRow._id).subscribe(
      (success: any) => {
        this.toastService.success(" Category Deleted Successfully !!");
        this.modalService.dismissAll();
        this.spinner.hide();
        this.getAll();
      },
      (error: any) => {
        console.log("error", error);

      }
    )
  }


  getAllBusinessType() {
    this.spinner.show();
    let obj: any = {
      // page: this.page,
      // pageSize: this.pageSize,
      // search: this.search,
      // businessTypeId: this.businessTypeId,
    };
    this.businessService
      .getAll(obj)
      .subscribe((success) => {
        this.businessArr = success.data;
        this.spinner.hide();
      });
  }

  addOffers() {
    this.router.navigate(['/offer/offer-form'], { queryParams: { isCategory: true } });
  }
  addAdvertise() {
    this.router.navigate(['/advertise/advertise-form'], { queryParams: { isCategory: true } });
  }
  addDeals() {
    this.router.navigate(['/seasonal-offer/details'], { queryParams: { isCategory: true } });
  }

}
