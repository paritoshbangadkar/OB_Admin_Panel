import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ExotelCallingService } from 'src/app/services/exotelCalling/exotelCalling.service'
@Component({
  selector: 'app-exotel-calling-historylist',
  templateUrl: './exotel-calling-historylist.component.html',
  styleUrls: ['./exotel-calling-historylist.component.scss']
})
export class ExotelCallingHistorylistComponent implements OnInit {
  tableData: any = [];
  search: any = '';
  page = 1;
  pageSize = 25;
  collection: any;
  todayDate = null;
  constructor(
    private modalService: NgbModal,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private callingService: ExotelCallingService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.spinner.show();
    let obj: any = {
      page: this.page,
      pageSize: this.pageSize,
      search: this.search,
    };
    this.callingService.getAll(obj).subscribe((success) => {
      console.log('success---------------', success);
      this.tableData = success.data;
      this.collection = success.count;
      this.spinner.hide();
    });
  }

  refreshList(title) {
    this.search = title == 'clear' ? '' : this.search;
    this.getAll();
  }

  resetFilter(title) {
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
