import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SubCategoryService } from '../../../services/subCategory/sub-category.service';
import { BusinessService } from '@services/businessType/business.service';
import { CategoryService } from '@services/category/category.service';

@Component({
  selector: 'app-sub-category-list',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.scss'],
})
export class SubCategoryListComponent implements OnInit {
  selectedRow: any = {};
  subCategoryArr: any = [];
  search: any = '';
  page = 1;
  pageSize = 50;
  collection: number = 0;
  // businessTypeId: any='';
  // categoryId: any='';
  categoryId = null;
  businessTypeId = null;
  businessArr: any = [];
  categoryArr: any = [];

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private businessService: BusinessService,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService
  ) { }

  ngOnInit(): void {
    // this.getAllBusinessWithCategory();
    this.getAllCategory();
    this.getAll(null);
  }

  getAll(parentId) {
    this.spinner.show();
    let obj: any = {
      page: this.page,
      pageSize: this.pageSize,
      search: this.search,
      ...(this.businessTypeId && { businessTypeId: this.businessTypeId }),
      ...(this.categoryId && { parentId: this.categoryId }),
    };
    if (parentId) {
      obj.parentId = parentId
    }
    this.subCategoryService.getAll(obj).subscribe(({ data, count }) => {
      this.subCategoryArr = data;
      this.collection = count;
      this.spinner.hide();
    }, (error: any) => {
      this.spinner.hide();
    })
  }

  view(_id) {
    if (_id) {
      this.router.navigate(['/subCategory/subCategory-form'], { queryParams: { _id } });
    } else {
      this.router.navigate(['/subCategory/subCategory-form']);
    }
  }
  refreshList(title) {
    this.businessTypeId = null;
    this.categoryId = null;
    // this.businessTypeId = '';
    // this.categoryId = '';
    this.search = title == 'clear' ? '' : this.search;
    this.getAll(null);
    this.getAllCategory();
  }

  searchCategory(parentId) {
    this.getAll(parentId);
  }

  onChangePage(pageNo) {
    if (pageNo > 0) {
      this.page = pageNo;
    }
    this.getAll(null);
  }

  getAllCategory() {
    this.spinner.show();
    let obj: any = {
      page: this.page,
      pageSize: 300,
      // search: this.search,
      ...(this.businessTypeId && { businessTypeId: this.businessTypeId }),
    };
    this.categoryService
      .getAllTable(obj)
      .subscribe(({ data }) => {
        this.categoryArr = data;
        this.spinner.hide();
      }, (error: any) => {
        this.spinner.hide();
      })
  }
  openConfirmStatusChange(u: any, content) {
    this.selectedRow = u;
    this.modalService.open(content, { centered: true });
  }
  changeSubcategoryStatus(_id) {
    this.spinner.show();
    this.subCategoryService.changeStatus(_id).subscribe(success => {
      this.getAll(null);
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
    this.subCategoryService.delete(this.selectedRow._id).subscribe(
      (success: any) => {
        this.toastService.success(' Sub Category Deleted Successfully !!');
        this.modalService.dismissAll();
        this.spinner.hide();
        this.getAll(null);
      },
      (error: any) => {
        this.spinner.hide();
      }
    );
  }

  getAllBusinessWithCategory() {
    this.spinner.show();
    this.businessService
      .getAllBusinessWithCategory()
      .subscribe((success) => {
        this.businessArr = success.rows;
        this.spinner.hide();
      }, (error: any) => {
        this.spinner.hide();
      })
  }

  getAllCategoryByBusinessTypeId(businessTypeId) {
    this.categoryArr =
      this.subCategoryArr.find((x) => x._id == businessTypeId)?.categories ?? [];
    this.getAll(null);
  }
}
