import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BusinessService } from '@services/businessType/business.service';
import { CategoryService } from '@services/category/category.service';
import { OnboardShopService } from '@services/onboardShop/onboardShop.service';
import { SubCategoryService } from '@services/subCategory/sub-category.service';
import { UploadService } from '@services/uploadService/upload.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-onboard-invalid-shop',
  templateUrl: './onboard-invalid-shop.component.html',
  styleUrls: ['./onboard-invalid-shop.component.scss']
})
export class OnboardInvalidShopComponent implements OnInit {
  shopList: any = [];
  search: any = '';
  page = 1;
  pageSize = 10;
  collection: number = 0;
  selectedRow: any = {};
  selectAll: boolean = false;
  selectedCheckboxes: any[] = [];
  constructor(
    private onboardShopService: OnboardShopService,
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private uploadService: UploadService,
  ) { }

  ngOnInit(): void {
    this.getAll();

  }

  getAll() {
    // this.spinner.show();
    this.onboardShopService
      .getAllInvalidRowShops({
        page: this.page,
        pageSize: this.pageSize,
        search: this.search,
      })
      .subscribe((success) => {

        this.shopList = success.data.map(x => {

          x.isSelected = false;
          return x;

        })
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

  view(item) {
    if (item._id) {
      this.router.navigate(['/onboard-shop/onboard-shop-form'],
        { queryParams: { rawShopId: item._id, invalidShop: true } });
    } else {
      this.router.navigate(['/onboard-shop/onboard-shop-form']);
    }
  }

  delete(_id) {
    // this.spinner.show();
    this.onboardShopService
      .deleteRawShop(this.selectedRow._id).subscribe(
        (success: any) => {
          this.toastService.success(success.message);
          this.modalService.dismissAll();
          this.spinner.hide();
          this.getAll();
        },
        (error: any) => {
          console.log("error", error);
        }
      )
  }

  open(item, content) {
    this.selectedRow = item;
    this.modalService.open(content, { centered: true });
  }

  selectUnselectAll(event: any) {
    // Set isSelected flag to true if selectAll checkbox is checked
    // Otherwise set it to false
    for (let i = 0; i < this.shopList.length; i++) {
      // Check or uncheck
      this.shopList[i]['isSelected'] = event.target.checked;
    }
    this.updateSelectedShop();
  }

  updateSelectedShop() {
    this.selectedCheckboxes = this.shopList.filter(item => item.isSelected);

    if (this.shopList.length == this.selectedCheckboxes.length) {
      this.selectAll = true;
    } else {
      this.selectAll = false;
    }
  }
  singleChange(event, itemId) {
    // Get the index of current checked/unchecked checkbox
    const idx = this.shopList.findIndex(item => item.id == itemId);
    // Set 'isSelected' flag to true or false based on
    // the current state of the checkbox
    this.shopList[idx]['isSelected'] = event.target.checked;
    this.updateSelectedShop();

  }

  deleteShop() {
    if (this.selectedCheckboxes.length == 0) {
      this.toastService.error('Select at least one user');
      return;
    }
    const deleteIds = this.selectedCheckboxes.map(x => x._id);
    this.onboardShopService
      .deleteManyRawShop({ ids: deleteIds }).subscribe(
        (success: any) => {
          this.selectAll = false;
          this.selectedCheckboxes = [];
          this.toastService.success(success.message);
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
