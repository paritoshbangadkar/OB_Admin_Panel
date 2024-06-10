import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShopService } from '@services/shop/shop.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-shop-employee-list',
  templateUrl: './shop-employee-list.component.html',
  styleUrls: ['./shop-employee-list.component.scss']
})
export class ShopEmployeeListComponent implements OnInit {
  selectedRow: any = {};

  search: any = '';
  page = 1;
  pageSize = 25;
  collection: any;
  employeeArr: any = [];
  shopId: number;
  shopData: any = {};
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private actRoutes: ActivatedRoute,
    private location: Location,
    private shopService: ShopService,
  ) { }

  ngOnInit(): void {
    this.actRoutes.queryParams.subscribe((params) => {
      this.shopId = params.id;
      if (params.id) {
        this.getShop(this.shopId);
      }
    });
  }


  getShop(id: any) {
    this.shopService.getById(id).subscribe(data => {
      this.shopData = data;
      console.log(" this.shopData", this.shopData);
      this.getAll();
    })
  }

  getAll() {
    this.spinner.show();
    let obj: any = {
      page: this.page,
      pageSize: this.pageSize,
      search: this.search,
      shopId: this.shopData.shopDetails?._id,
    };
    this.shopService.getAllShopEmployee(obj).subscribe((success) => {
      this.employeeArr = success.data
      this.collection = success.count;
      this.spinner.hide();
    });
  }
  view(x) {
    this.router.navigate(['shop/shop-employee-form'], { queryParams: { shopId: this.shopData?.shopDetails?._id, employeeId: x?.shopEmployee?._id } });
  }
  add() {
    this.router.navigate(['shop/shop-employee-form'], { queryParams: { shopId: this.shopData._id } });
  }

  navigateTo() {
    this.router.navigate(['shop/list'], { queryParams: { shopId: this.shopData._id, shopDetailsId: this.shopData?.shopDetails?._id } });
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
    this.selectedRow = u?.shopEmployee;
    this.modalService.open(content, { centered: true });
  }
  EmployeeChangeStatus(_id) {
    this.spinner.show();
    this.shopService.employeeChangeStatus(_id).subscribe(success => {
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
    this.selectedRow = u?.shopEmployee;
    this.modalService.open(content, { centered: true });
  }

  delete() {
    this.spinner.show();
    this.shopService.deleteEmployee(this.selectedRow._id).subscribe(
      (success: any) => {
        this.toastService.success(success.message);
        this.modalService.dismissAll();
        this.spinner.hide();
        this.getAll();
      },
      (error: any) => {
        console.log('error', error);
      }
    );
  }

  goBack() {
    this.location.back();
  }
}
