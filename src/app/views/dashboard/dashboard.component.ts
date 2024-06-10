import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  userDetails: any = {};
  dashboardData: any = {};
  totalCustomers: any;
  totalShops: any;
  orderData: any = {};
  transactionData: any = {};

  constructor(
    private userService: UserService,
    private dashboardService: DashboardService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDashboardData();
    this.getOrderData();
    this.getOrderTransaction();
    this.userDetails = this.userService.getCurrentUser();
  }

  getDashboardData(): void {
    this.spinner.show();
    this.dashboardService.getAll({}).subscribe((success) => {
      this.totalCustomers = success.user;
      this.totalShops = success.shop;
      this.spinner.hide();
    });
  }

  getOrderData(): void {
    this.spinner.show();
    this.dashboardService.getAllOrders({}).subscribe((success) => {
      this.orderData = success;
      this.spinner.hide();
    });
  }

  getOrderTransaction(): void {
    this.spinner.show();
    this.dashboardService.getOrdersTransaction({}).subscribe((success) => {
      this.transactionData = success?.totalEarning[0];
      this.spinner.hide();
    });
  }
  navigateTo() {
    this.router.navigate(['order/list']);
  }
}
