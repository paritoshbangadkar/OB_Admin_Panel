import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InAppAdModalService } from '@services/inAppAdModal/inAppAdModal.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { momentDateTime } from 'src/app/core/helpers/utils.helper';

@Component({
  selector: 'app-in-app-ad-modal-list',
  templateUrl: './in-app-ad-modal-list.component.html',
  styleUrls: ['./in-app-ad-modal-list.component.scss']
})
export class InAppAdModalListComponent implements OnInit {

  selectedRow: any = {};
  inAppAdArr: any = [];
  search: any = '';
  page = 1;
  pageSize = 25;
  collection: number = 0;
  hoveredDate: NgbDate | null = null;
  fromDate = null;
  toDate = null;
  todayDate = null;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private inAppAdModalService: InAppAdModalService,
    private calendar: NgbCalendar,
  ) {
    this.todayDate = calendar.getToday();
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(filters = {}): void {
    console.log('getAlllllllllllllllllllllllllllllllllllll',);

    this.spinner.show();
    let obj: any = {
      page: this.page,
      pageSize: this.pageSize,
      search: this.search,
      ...(this.fromDate && { startDate: momentDateTime(this.fromDate) }),
      ...(this.toDate && { endDate: momentDateTime(this.toDate) }),
      ...filters,
    };
    this.inAppAdModalService
      .getAll(obj)
      .subscribe((success) => {
        this.inAppAdArr = success.data.map(x => {
          x.contentType = x.image.slice(x.image.lastIndexOf('.'));
          return x;
        });
        console.log('success',success);

        this.collection = success.count;
        this.spinner.hide();
      });
  }

  view(item) {
    if (item?._id) {
      this.router.navigate(['/in-app-ad-modal/in-app-ad-modal-form'], { queryParams: { id: item._id } });
    } else {
      this.router.navigate(['/in-app-ad-modal/in-app-ad-modal-form']);
    }
  }

  refreshList(title) {
    this.search = title == 'clear' ? '' : this.search;
    this.getAll();
  }

  resetFilter() {
    this.fromDate = null;
    this.toDate = null;
    this.getAll();
  }
  onChangePage(pageNo) {
    if (pageNo > 0) {
      this.page = pageNo;
    }
    this.getAll();
  }
  openConfirmStatusChange(u: any, content) {
    this.selectedRow = u;
    this.modalService.open(content, { centered: true });
  }
  changeCustomerStatus(_id) {
    this.spinner.show();
    this.inAppAdModalService.changeStatus(_id).subscribe(success => {
      this.getAll();
      this.selectedRow = {};
      this.modalService.dismissAll();
      this.toastService.success(success.message);
      this.spinner.hide()
    },
      (error) => {
        this.selectedRow = {};
        this.modalService.dismissAll();
      }
    )
  }

  open(u, content) {
    this.selectedRow = u;
    this.modalService.open(content, { centered: true });
  }
  delete() {
    this.spinner.show();
    this.inAppAdModalService
      .delete(this.selectedRow._id).subscribe(
        (success: any) => {
          this.toastService.success(success.message);
          this.modalService.dismissAll();
          this.spinner.hide();
          this.getAll();
        },
        (error: any) => {
          console.log("error", error);
        }
      )
  }


}
