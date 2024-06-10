import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from '@services/orders/order.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/core/services';
import { OrderViewComponent } from '../order-view/order-view.component';
import { defaultStatus, orderStatus } from 'src/app/core/helpers';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  search: any = '';
  page = 1;
  pageSize = 25;
  collection: any;
  orderArr: any = [];
  statusFilter: any = [];
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private orderService: OrderService,
    private modalService: NgbModal,
    private userService: UserService
  ) {
    this.userService.populate()
  }

  statusList = [
    orderStatus.NEW,
    orderStatus.ACTIVE,
    orderStatus.COMPLETED,
    orderStatus.CANCEL,
  ]
  ngOnInit(): void {
    this.getAllOrders();
    let data = this.userService.currentUser.subscribe();

  }

  navChange() {
    this.getAllOrders();
  }
  getAllOrders(): void {
    this.spinner.show();
    let obj: any = {
      page: this.page,
      pageSize: this.pageSize,
      search: this.search,
      status: this.statusFilter,
    };
    this.orderService
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

  tableSetFilter($event, value) {
    if ($event.target.checked) {
      this.statusFilter.push(value)
    }
    else {
      this.statusFilter = this.statusFilter.filter((e: string) => e !== value);
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
