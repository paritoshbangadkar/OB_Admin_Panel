import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '@services/report/report.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderChatComponent } from '../../report/order-chat/order-chat.component';

// import { OrderChatComponent } from '../../order-chat/order-chat/order-chat.component';
@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {

  page = 1;
  pageSize = 25;
  collection: number = 0;
  search: any = '';
  selectedRow: any = {};
  reportArr: any = [];
  constructor(
    private router: Router,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private reportService: ReportService,
    private modalService: NgbModal,


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
    this.reportService.getAll(obj)
      .subscribe(({ data, count }) => {
        this.reportArr = data;
        this.collection = count;
        this.spinner.hide();
      }, (error: any) => {
        this.spinner.hide();
      })
  }


  openChatModal(orderId:string,orderNumber:string) {
    const modalRef = this.modalService.open(OrderChatComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.orderId = orderId;
    modalRef.componentInstance.orderNumber = orderNumber;
    modalRef.result.then((result) => {
    }, (dismiss) => {
    })
  }


}
