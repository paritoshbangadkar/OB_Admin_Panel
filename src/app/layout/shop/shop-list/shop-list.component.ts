import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ShopService } from '@services/shop/shop.service';
import { SafeUrl } from '@angular/platform-browser';
import { saveAs } from 'file-saver';
import { defaultStatus, kycStatus, ROLES } from 'src/app/core/helpers';
import { UploadService } from '@services/uploadService/upload.service';
import * as moment from "moment";

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss'],
})
export class ShopListComponent implements OnInit {
  selectedRow: any = {};
  shopArr: any = [];
  search: any = '';
  page = 1;
  pageSize = 50;
  collection: number = 0;
  userDetails: any = {};
  public qrCodeDownloadLink: SafeUrl = '';
  url: string;
  shopName: string;
  qrImage: any;
  statusFilter: any = [];
  statusList = [
    defaultStatus.ACTIVE,
    defaultStatus.INACTIVE
  ]
  ROLES = ROLES;

  kycFilter: any = [];
  kycDocumentList = [
    kycStatus.YES,
    kycStatus.No
  ]

  constructor(
    private shopService: ShopService,
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private uploadService: UploadService,
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.spinner.show();
    this.shopService
      .getAll({
        page: this.page,
        pageSize: this.pageSize,
        search: this.search || this.kycFilter,
        status: this.statusFilter,
      })
      .subscribe(
        ({ data, count }) => {
          this.shopArr = data;
          this.collection = count;
          this.spinner.hide();
        },
        (error: any) => {
          this.spinner.hide();
        }
      );
  }

  view(item) {
    if (item?.id) {
      this.router.navigate(['shop/shop-form'], {
        queryParams: { id: item.id, shopDetailsId: item.shopDetails._id },
      });
    } else {
      this.router.navigate(['shop/shop-form']);
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

  changeShopStatus(_id) {
    this.spinner.show();
    this.shopService.changeStatus(_id).subscribe(
      (success) => {
        this.getAll();
        this.selectedRow = {};
        this.modalService.dismissAll();
        this.toastService.success(success.message);
        this.spinner.hide();
      },
      (error) => {
        this.selectedRow = {};
        this.modalService.dismissAll();
      }
    );
  }

  open(u, content) {
    this.selectedRow = u;
    this.modalService.open(content, { centered: true });
  }

  deleteUser(_id) {
    this.shopService.delete(_id).subscribe(
      (success) => {
        this.getAll();
        this.selectedRow = {};
        this.modalService.dismissAll();
        this.toastService.success(success.message);
      },
      (error) => {
        this.selectedRow = {};
        this.modalService.dismissAll();
      }
    );
  }

  QRCode(u, content) {
    this.shopName = u?.shopDetails?.shopName;
    this.modalService.open(content, { centered: true });
    this.getQrImage(u.id);
  }

  getQrImage(_id) {
    this.spinner.show();
    this.shopService.getQrCode(_id).subscribe((success: any) => {
      this.qrImage = success.qrImage;
      this.spinner.hide();
    });
  }

  // download
  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

  async downloadDoc(qrImage) {
    saveAs(qrImage, `${this.shopName}_QR_Code`, { autoBom: true });
  }

  navigateToGuest() {
    this.router.navigate(['shop/guest-shop']);
  }

  navigateToKYC(item) {
    if (item?.id) {
      this.router.navigate(['shop/shop-kyc'], {
        queryParams: { id: item.id },
      });
    }
  }
  tableSetFilter($event, value) {
    if ($event.target.checked) {
      this.statusFilter.push(value)
    }
    else {
      this.statusFilter = this.statusFilter.filter((e: string) => e !== value);
    }
    this.getAll();
  }

  tableKycFilter($event, value) {
    if ($event.target.checked) {
      this.kycFilter.push(value)
    }
    else {
      this.kycFilter = this.kycFilter.filter((e: string) => e !== value);
    }
    this.getAll();
  }

  exportShopUser() {
    this.spinner.show();
    let params = {
      role: ROLES.SHOP,
    };
    this.uploadService.generateExport(params).subscribe(
      (result) => {
        saveAs(result, `Shop List ${moment().format("DD-MM-YYYY hh:mm a")}`);
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        this.toastService.error(error);
      }
    );
  }
}
