import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SupportService } from '../../../services/support/support.service'
@Component({
  selector: 'app-support-list',
  templateUrl: './support-list.component.html',
  styleUrls: ['./support-list.component.scss']
})
export class SupportListComponent implements OnInit {
  page = 1;
  pageSize = 25;
  collection: any;
  search: any = '';
  selectedRow: any = {};
  supportArr: any = [];
  constructor(
    private router: Router,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private supportService: SupportService

  ) { }

  ngOnInit(): void {

    this.getAll();

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

  getAll() {
    this.spinner.show();
    let obj: any = {
      page: this.page,
      pageSize: this.pageSize,
      search: this.search,
    };
    this.supportService.getAll(obj)
      .subscribe(({ data, count }) => {
        this.supportArr = data;
        this.collection = count;
        this.spinner.hide();
      }, (error: any) => {
        this.spinner.hide();
      })
  }
}
