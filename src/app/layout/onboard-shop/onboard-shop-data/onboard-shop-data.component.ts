import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OnboardShopService } from '@services/onboardShop/onboardShop.service';
import { UploadService } from '@services/uploadService/upload.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-onboard-shop-data',
  templateUrl: './onboard-shop-data.component.html',
  styleUrls: ['./onboard-shop-data.component.scss']
})
export class OnboardShopDataComponent implements OnInit {
  @Input() shopData: any = {};

  selectedRow: any = {};
  validShopData: any = [];
  inValidShopData: any = [];
  search: any = '';
  page = 1;
  pageSize = 10;
  collection: number = 0;
  constructor(
    public modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private router: Router,
    private onboardShopService: OnboardShopService,
    private uploadService: UploadService,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.getShopData();
  }

  getShopData() {
    this.inValidShopData = this.shopData?.data?.inValidShopData;
    this.validShopData = this.shopData?.data?.validShopData;
    this.collection = this.shopData?.data?.inValidShopData.length
  }

  saveShopData() {
    this.spinner.show();
    this.onboardShopService.insertShopData(this.shopData.data).subscribe(
      (data: any) => {
        this.toastService.success(data.message);
        this.dismissModal();
        this.router.navigate(['/onboard-shop/onboard-shop-list'],
          { queryParams: { refresh: true, } });
        this.spinner.hide();
      },
      (error: any) => {
        this.toastService.error(error);
        this.spinner.hide();
      }
    )

  }

  onChangePage(pageNo) {
    if (pageNo > 0) {
      this.page = pageNo;
    }
  }

  dismissModal() {
    this.modalService.dismissAll('dismiss with cross click');
  }

}
