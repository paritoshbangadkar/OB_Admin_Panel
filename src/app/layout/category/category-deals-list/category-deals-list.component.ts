import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SeasonalOfferService } from '@services/seasonalOffer/seasonalOffer.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { momentDateTime } from 'src/app/core/helpers/utils.helper';

@Component({
  selector: 'app-category-deals-list',
  templateUrl: './category-deals-list.component.html',
  styleUrls: ['./category-deals-list.component.scss']
})
export class CategoryDealsListComponent implements OnInit {
  selectedRow: any = {};
  seasonalOffer: any = [];
  search: any = '';
  page = 1;
  pageSize = 25;
  collection: any;
  hoveredDate: NgbDate | null = null;
  fromDate = null;
  toDate = null;
  todayDate = null;
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private seasonalOfferService: SeasonalOfferService,
    private calendar: NgbCalendar,
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
    this.seasonalOfferService
      .getAllCategoryDeals(obj)
      .subscribe((success) => {
        this.seasonalOffer = success.data;
        this.collection = success.count;
        this.spinner.hide();
      });
  }

  view(item) {
    if (item) {
      this.router.navigate(['/seasonal-offer/details'], { queryParams: { id: item._id, isCategory: true } });
    } else {
      this.router.navigate(['/seasonal-offer/details'], { queryParams: { isCategory: true } });
    }
  }

  refreshList(title) {
    this.search = title == 'clear' ? '' : this.search;
    this.getAll();
  }

  resetFilter(title) {
    this.search = title == 'clear' ? '' : this.search;
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
    this.seasonalOfferService.changeStatus(_id).subscribe(success => {
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
    this.seasonalOfferService
      .delete(this.selectedRow._id).subscribe(
        (success: any) => {
          this.toastService.success("Category Offer Deleted Successfully !!");
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
