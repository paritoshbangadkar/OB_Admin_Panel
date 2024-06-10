import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdvertiseService } from '@services/advertise/advertise.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { momentDateTime } from 'src/app/core/helpers/utils.helper';

@Component({
  selector: 'app-category-advertise-list',
  templateUrl: './category-advertise-list.component.html',
  styleUrls: ['./category-advertise-list.component.scss']
})
export class CategoryAdvertiseListComponent implements OnInit {
  selectedRow: any = {};
  advertiseArr: any = [];
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
    private advertiseService: AdvertiseService, private calendar: NgbCalendar,
  ) {
    this.todayDate = calendar.getToday();

  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(filters = {}): void {
    this.spinner.show();
    let obj: any = {
      page: this.page,
      pageSize: this.pageSize,
      search: this.search,
      ...(this.fromDate && { startDate: momentDateTime(this.fromDate) }),
      ...(this.toDate && { endDate: momentDateTime(this.toDate) }),
      ...filters,
    };
    this.advertiseService
      .getAllCategoryAd(obj)
      .subscribe((success) => {
        this.advertiseArr = success.data.map(x => {
          x.contentType = x.image.slice(x.image.lastIndexOf('.'));
          return x;
        });
        this.collection = success.count;
        this.spinner.hide();
      });
  }

  view(item) {
    if (item) {
      this.router.navigate(['/advertise/advertise-form'], { queryParams: { id: item._id, isCategory: true } });
    } else {
      this.router.navigate(['/advertise/advertise-form'], { queryParams: { isCategory: true } });
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
    this.advertiseService.changeStatus(_id).subscribe(success => {
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
    this.advertiseService
      .delete(this.selectedRow._id).subscribe(
        (success: any) => {
          this.toastService.success("Category Advertise Deleted Successfully !!");
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
