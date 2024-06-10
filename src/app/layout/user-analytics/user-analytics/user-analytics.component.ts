import { Component, OnInit } from '@angular/core';
import { UserAnalyticsService } from '../../../services/userAnalytics/user-analytics.service'
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-analytics',
  templateUrl: './user-analytics.component.html',
  styleUrls: ['./user-analytics.component.scss']
})
export class UserAnalyticsComponent implements OnInit {

  search: any = '';
  page = 1;
  pageSize = 25;
  collection: number = 0;
  userAnalyticsList: any = [];

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private userAnalyticsService: UserAnalyticsService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.spinner.show();
    let obj: any = {
      page: this.page,
      pageSize: this.pageSize,
      search: this.search,
    };
    this.userAnalyticsService
      .getAll(obj)
      .subscribe((success) => {
        this.userAnalyticsList = success.data;
        this.collection = success.count;
        this.spinner.hide();
      }, (error: any) => {
        this.spinner.hide();
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

// to remove _ from action type
  transformUserActionType(actionType: string): string {
    if (!actionType) {
      return '';
    }
    const words = actionType.split('_');
    const titleCasedWords = words.map(word => {
      const lowerCaseWord = String(word).toLowerCase();
      return lowerCaseWord.charAt(0).toUpperCase() + lowerCaseWord.slice(1);
    });
    return titleCasedWords.join(' ');
  }




}
