import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NotificationsService } from '../../../services/notifications/notification.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent implements OnInit {
  notificationList: any = [];
  search: any = '';
  page = 1;
  pageSize = 25;
  collection: number = 0;
  constructor(
    private router: Router,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private notificationsService: NotificationsService,
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
    this.notificationsService
      .getAll(obj)
      .subscribe((success) => {
        this.notificationList = success.data;
        this.collection = success.count;
        this.spinner.hide();
      });
  }
  navigateTo(path, id) {
    if (id) {
      this.router.navigate([path], { queryParams: { id } });
    } else {
      this.router.navigate([path]);
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
}
