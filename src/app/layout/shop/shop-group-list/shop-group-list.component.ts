import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShopService } from '@services/shop/shop.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { ShopGroupInfoComponent } from '../shop-group-info/shop-group-info.component';

@Component({
  selector: 'app-shop-group-list',
  templateUrl: './shop-group-list.component.html',
  styleUrls: ['./shop-group-list.component.scss']
})
export class ShopGroupListComponent implements OnInit {
  selectedRow: any = {};

  search: any = '';
  page = 1;
  pageSize = 25;
  collection: any;
  groupArr: any = [];
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
      this.shopId = params.shopDetailsId;
      if (params.shopDetailsId) {
        this.getAll();
      }
    });
  }

  getAll() {
    this.spinner.show();
    let obj: any = {
      page: this.page,
      pageSize: this.pageSize,
      search: this.search,
      shopId: this.shopId,
    };
    this.shopService.getAllGroup(obj).subscribe((success) => {
      this.groupArr = success.data
      this.collection = success.count;
      this.spinner.hide();
    });
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

  goBack() {
    this.location.back();
  }

  viewGroupInfo(item) {
    const modalRef = this.modalService.open(ShopGroupInfoComponent, {
      centered: true,
      size: 'md',
    });
    modalRef.componentInstance.groupId = item._id;
    modalRef.componentInstance.shopId = this.shopId;
    modalRef.componentInstance.groupName = item.groupName;
    modalRef.result.then(
      (result) => { },
      (dismiss) => {
        this.getAll();
      }
    );
  }
}
