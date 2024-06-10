import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { OnboardShopService } from '@services/onboardShop/onboardShop.service';
import { OnboardShopBulkUploadComponent } from '../onboard-shop-bulk-upload/onboard-shop-bulk-upload.component';
import * as moment from "moment";
import { saveAs } from "file-saver";
import { UploadService } from '@services/uploadService/upload.service';
import { OnboardShopDataComponent } from '../onboard-shop-data/onboard-shop-data.component';
@Component({
  selector: 'app-onboard-shop-list',
  templateUrl: './onboard-shop-list.component.html',
  styleUrls: ['./onboard-shop-list.component.scss']
})
export class OnboardShopComponent implements OnInit {
  selectedRow: any = {};
  onboardShopList: any = [];
  search: any = '';
  page = 1;
  pageSize = 10;
  collection: number = 0;

  constructor(
    private onboardShopService: OnboardShopService,
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private uploadService: UploadService,
    private actRoutes: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getAll();
    this.actRoutes.queryParams.subscribe((params: any) => {
      const refresh = (params?.refresh === 'true') ? true : false;
      if (refresh) {
        setTimeout(() => {
          this.getAll();
        }, 200000);
      }


    });
  }

  getAll() {
    this.spinner.show();
    this.onboardShopService
      .getAll({
        page: this.page,
        pageSize: this.pageSize,
        search: this.search,
      })
      .subscribe((success) => {
        this.onboardShopList = success.data;
        this.onboardShopList=[...this.onboardShopList];
        this.collection = success.count;
        this.spinner.hide();
      });
  }

  /**
   * open modal to upload onboard shop list
   */
  openBulkUpload() {
    const modalRef = this.modalService.open(OnboardShopBulkUploadComponent, { centered: true, size: 'lg' });
    modalRef.result.then((result) => {
    }, (dismiss) => {
      this.getAll();
    })
  }



  open(item, content) {
    this.selectedRow = item;
    this.modalService.open(content, { centered: true });
  }

  delete(_id) {
    this.spinner.show();
    this.onboardShopService
      .delete(this.selectedRow._id).subscribe(
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

  view(item) {
    if (item._id) {
      this.router.navigate(['/onboard-shop/onboard-shop-form'],
        { queryParams: { id: item._id, } });
    } else {
      this.router.navigate(['/onboard-shop/onboard-shop-form']);
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

  exportCategoryAndSubCategory() {
    this.spinner.show();
    this.uploadService.generateCategorySubCategoryExcel().subscribe(
      (result) => {
        saveAs(result, `Category & Sub Category List ${moment().format("DD-MM-YYYY hh:mm a")}`);
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        this.toastService.error(error);
      }
    );
  }

  exportBusinessType() {
    this.spinner.show();
    this.uploadService.generateBusinessTypeExcel().subscribe(
      (result) => {
        saveAs(result, `Business Type List ${moment().format("DD-MM-YYYY hh:mm a")}`);
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        this.toastService.error(error);
      }
    );
  }

  inValidShop() {
    this.router.navigate(['/onboard-shop/invalid-shop']);
  }
}
