import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PorterService } from '../../../services/porter/porter.service';

@Component({
  selector: 'app-porter-list',
  templateUrl: './porter-list.component.html',
  styleUrls: ['./porter-list.component.scss']
})
export class PorterListComponent implements OnInit {
  active = 1;
  porterDeactivationList: any = [];
  search: any = '';
  page = 1;
  pageSize = 25;
  collection: number = 0;
  porterDServiceList: any;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private porterService: PorterService,
  ) { }

  ngOnInit(): void {
    this.deactivatePorterRequestList();
    this.porterServicesList();
  }

  deactivatePorterRequestList(): void {
    this.spinner.show();
    let obj: any = {
      page: this.page,
      pageSize: this.pageSize,
      search: this.search,
    };
    this.porterService
      .getAll(obj)
      .subscribe((success) => {
        this.collection = success.count;
        this.porterDeactivationList = success.data;
        this.spinner.hide();
      });
  }

  view(shopId) {
    if (shopId) {
      this.router.navigate(['/porter/porter-form'], { queryParams: { id: shopId, } });
    }
  }

  navigateToOrder() {
    this.router.navigate(['/porter/order']);
  }

  porterServicesList(): void {
    this.spinner.show();
    let obj: any = {
      page: this.page,
      pageSize: this.pageSize,
      search: this.search,
    };
    this.porterService
      .porterService(obj)
      .subscribe((success) => {
        this.collection = success.count;
        this.porterDServiceList = success.data;
        this.spinner.hide();
      });
  }

  onChangePage(pageNo) {
    if (pageNo > 0) {
      this.page = pageNo;
    }
    this.deactivatePorterRequestList();
    this.porterServicesList();
  }

  refreshList(title) {
    this.search = title == 'clear' ? '' : this.search;
    this.porterServicesList();
    this.deactivatePorterRequestList();
  }

  navigateTo(shopId, request) {
    if (shopId) {
      this.router.navigate(['/porter/porter-form'], { queryParams: { id: shopId, request: request } });
    }
  }
}
