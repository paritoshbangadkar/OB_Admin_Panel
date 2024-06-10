import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShopService } from '@services/shop/shop.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-deleted-business-list',
  templateUrl: './deleted-business-list.component.html',
  styleUrls: ['./deleted-business-list.component.scss']
})
export class DeletedBusinessListComponent implements OnInit {
  selectedRow: any = {};
  shopArr: any = [];
  search: any = '';
  page = 1;
  pageSize = 50;
  collection: number = 0;
  constructor(
    private shopService: ShopService,
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.spinner.show();
    this.shopService
      .getAllDeletedBusiness({
        page: this.page,
        pageSize: this.pageSize,
        search: this.search
      })
      .subscribe(
        ({ data, count }) => {
          this.shopArr = data;
          console.log(' this.shopArr ', this.shopArr);
          this.collection = count;
          this.spinner.hide();
        },
        (error: any) => {
          this.spinner.hide();
        }
      );
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
