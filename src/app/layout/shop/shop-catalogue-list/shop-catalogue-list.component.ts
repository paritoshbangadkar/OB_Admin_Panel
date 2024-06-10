import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CatalogueService } from '../../../services/catalogue/catalogue.service';
import { SubCategoryService } from '@services/subCategory/sub-category.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShopService } from '@services/shop/shop.service';
@Component({
  selector: 'app-shop-catalogue-list',
  templateUrl: './shop-catalogue-list.component.html',
  styleUrls: ['./shop-catalogue-list.component.scss']
})
export class ShopCatalogueListComponent implements OnInit {
  selectedRow: any = {};
  catalogueArr: any = [];
  search: any = '';
  page = 1;
  pageSize = 25;
  collection: number = 0;
  image: any = [];
  catalogueImgArr: any;
  rows: any;
  imgUrl: string;
  imagescataloge: any;
  subCategoryArr: any;
  subCategoryId = null;
  shopArr: any = [];
  shopId: number;
  shopData: any = {};

  constructor(private router: Router,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private catalogueService: CatalogueService,
    private actRoutes: ActivatedRoute,
    private location: Location,
    private shopService: ShopService,
    private subCategoryService: SubCategoryService) { }

  ngOnInit(): void {
    this.actRoutes.queryParams.subscribe((params) => {
      this.shopId = params.id;
      if (params.id) {
        this.getShop(this.shopId);
      }
    });
    this.getAll();
    // this.getAllSubCategory();
  }
  getAll() {
    this.spinner.show();
    let obj = {
      page: this.page,
      pageSize: this.pageSize,
      search: this.search,
      shopId: this.shopId, //user table id
      shopUserId: this.shopData?._id //shop table id
    };
    this.catalogueService.getAll(obj).subscribe((success) => {
      // this.catalogueArr =  success.data
      this.catalogueArr = success.data.map(x => {
        x.contentType = x.image?.slice(x.image.lastIndexOf('.'));
        return x;
      });
      this.collection = success.count;
      this.spinner.hide();
    });
  }
  getShop(id: any) {
    this.shopService.getById(id).subscribe(data => {
      this.shopData = data?.shopDetails;
      this.getAll();
      this.getAllSubCategory(this.shopData?._id)

    })
  }
  getAllSubCategory(id: any) {
    this.spinner.show();
    let obj: any = {
      shopId: id,

    };
    this.subCategoryService.getCategory(obj).subscribe((success) => {
      this.subCategoryArr = success[0].subCategory;
      this.spinner.hide();
    });
  }
  view(x) {
    this.router.navigate(['shop/shop-catalogue-form'], { queryParams: { _id: x._id, shopId: this.shopId } });
  }
  add() {
    this.router.navigate(['shop/shop-catalogue-form'], { queryParams: { shopId: this.shopId } });
  }

  refreshList(title) {
    this.search = title == 'clear' ? '' : this.search;
    this.subCategoryId = null;
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
  changeProductStatus(_id) {
    this.spinner.show();
    this.catalogueService.changeStatus(_id).subscribe(success => {
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
    this.catalogueService.delete(this.selectedRow._id).subscribe(
      (success: any) => {
        this.toastService.success(' Product Deleted Successfully !!');
        this.modalService.dismissAll();
        this.spinner.hide();
        this.getAll();
      },
      (error: any) => {
        console.log('error', error);
      }
    );
  }

  async getPreviewImages(content2) {
    this.modalService.open(content2, { centered: true });
  }
  goBack() {
    this.location.back();
  }
}
