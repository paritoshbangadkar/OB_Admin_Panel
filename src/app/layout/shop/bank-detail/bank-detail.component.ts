import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventService } from '@services/event/event.service';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '@services/shop/shop.service';

@Component({
  selector: 'app-bank-detail',
  templateUrl: './bank-detail.component.html',
  styleUrls: ['./bank-detail.component.scss'],
})
export class BankDetailComponent implements OnInit {

  accountDetails: any = {};
  shopUserId: string = null;
  shopData: any = {};

  constructor(
    private eventService: EventService,
    private spinner: NgxSpinnerService,
    private actRoutes: ActivatedRoute,
    private shopService: ShopService,
  ) { }

  ngOnInit(): void {
    this.actRoutes.queryParams.subscribe((params) => {
      this.shopUserId = params.id;
      if (params.id) {
        this.getShop(this.shopUserId);
      }
    });
  }

  getShop(id: any) {
    this.shopService.getById(id).subscribe(data => {
      this.shopData = data?.shopDetails;
      this.getAccountDetails();
    })
  }

  getAccountDetails() {
    this.spinner.show();
    let params = {
      shopId: this.shopData?._id
    }
    this.eventService.getById(params).subscribe((success: any) => {
      this.accountDetails = success;
      this.spinner.hide();
    });
  }
}
