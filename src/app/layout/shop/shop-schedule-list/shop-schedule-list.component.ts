import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ScheduleService } from '../../../services/schedule/schedule.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShopService } from '@services/shop/shop.service';
@Component({
  selector: 'app-shop-schedule-list',
  templateUrl: './shop-schedule-list.component.html',
  styleUrls: ['./shop-schedule-list.component.scss']
})
export class ShopScheduleListComponent implements OnInit {
  selectedRow: any = {};

  search: any = '';
  page = 1;
  pageSize = 25;
  collection: any;
  scheduleArr: any = [];
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
    private scheduleService: ScheduleService
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
      this.shopData = data?.shopDetails;
      this.getAll();
    })
  }

  getAll() {
    this.spinner.show();
    let obj: any = {
      page: this.page,
      pageSize: this.pageSize,
      search: this.search,
      shopId: this.shopData._id,
    };
    this.scheduleService.getAll(obj).subscribe((success) => {
      this.scheduleArr = success.data
      this.collection = success.count;
      this.spinner.hide();
    });
  }

  view(x) {
    this.router.navigate(['shop/shop-schedule-form'], { queryParams: { _id: x._id, shopId: this.shopId } });
  }
  add() {
    this.router.navigate(['shop/shop-schedule-form'], { queryParams: { shopId: this.shopData._id } });
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
  changeScheduleStatus(_id) {
    this.spinner.show();
    this.scheduleService.changeStatus(_id).subscribe(success => {
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
    this.scheduleService.delete(this.selectedRow._id).subscribe(
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
