import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PorterService } from '@services/porter/porter.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderViewComponent } from '../order-view/order-view.component';
import { UserService } from 'src/app/core/services';

@Component({
  selector: 'app-customer-order',
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.scss']
})
export class CustomerOrderComponent implements OnInit {
  search: any = '';
  page = 1;
  pageSize = 25;
  collection: any;
  orderArr: any = [];
  active = 1;
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private porterService: PorterService,
    private modalService: NgbModal,
    private userService: UserService
  ) {
    this.userService.populate()
  }

  ngOnInit(): void {
    this.getAllOrders();
    let data = this.userService.currentUser.subscribe();

  }

  navChange() {
    console.log("THIS.ACIVE", this.active);
    this.getAllOrders();
  }
  getAllOrders(): void {
    this.spinner.show();
    let obj: any = {
      page: this.page,
      pageSize: this.pageSize,
      search: this.search,
      role: this.active == 1 ? 'CUSTOMER' : 'SHOP'
    };
    this.porterService
      .getAllOrders(obj)
      .subscribe((success) => {
        this.collection = success.count;
        this.orderArr = success.data;
        this.spinner.hide();
      });
  }

  refreshList(item) {
    this.search = item == 'clear' ? '' : this.search;
    this.getAllOrders();
  }

  onChangePage(pageNo) {
    if (pageNo > 0) {
      this.page = pageNo;
    }
    this.getAllOrders();
  }


  /**
* open modal of add product
*/
  open(item) {
    if (this.userService?.currentUserSubject?.value?.role == 'SUPER_ADMIN' || this.userService?.currentUserSubject?.value?.role == 'ADMIN') {
      const modalRef = this.modalService.open(OrderViewComponent, { centered: true, size: 'lg' });
      modalRef.componentInstance.id = item?.id;
      modalRef.componentInstance.viewOrderData = item;
      modalRef.result.then((result) => {
      }, (dismiss) => {
        this.getAllOrders();
      })
    }

  }
}

