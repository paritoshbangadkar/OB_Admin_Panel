import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShopService } from '@services/shop/shop.service';
import { SubCategoryService } from '@services/subCategory/sub-category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-shop-favorites-list',
  templateUrl: './shop-favorites-list.component.html',
  styleUrls: ['./shop-favorites-list.component.scss']
})
export class ShopFavoritesListComponent implements OnInit {
  selectedRow: any = {};
  userArray: any = [];
  search: any = '';
  page = 1;
  pageSize = 25;
  collection: any;
  rows: any;
  shopId: number;
  shopData: any = {};
  constructor(
    private modalService: NgbModal,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private actRoutes: ActivatedRoute,
    private location: Location,
    private shopService: ShopService,
    private subCategoryService: SubCategoryService
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


  getAll() {
    let obj = {
      page: this.page,
      pageSize: this.pageSize,
      search: this.search,
      shopId: this.shopData.id,
    };
    this.shopService.getAllFavorite(obj).subscribe((success) => {
      this.userArray = success.data
      this.collection = success.count;
      this.spinner.hide();
    });
  }


  goBack() {
    this.location.back();
  }
}
