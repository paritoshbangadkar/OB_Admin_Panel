import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FreePlanService } from '@services/freePlan/freePlan.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-free-plan-list',
  templateUrl: './free-plan-list.component.html',
  styleUrls: ['./free-plan-list.component.scss'],
})
export class FreePlanListComponent implements OnInit {
  selectedRow: any = {};
  tableData: any = [];
  search: any = '';
  page = 1;
  pageSize = 25;
  collection: any;
  todayDate = null;
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private freePlanService: FreePlanService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  removedUnderScore(type): string {
    return type?.replace('_', ' ');
  }
  getAll(): void {
    this.spinner.show();
    let obj: any = {
      page: this.page,
      pageSize: this.pageSize,
      search: this.search,
    };
    this.freePlanService.getAll(obj).subscribe((success) => {
      this.tableData = success.data;
      this.collection = success.count;
      this.spinner.hide();
    });
  }

  view(id) {
    if (id) {
      this.router.navigate(['/plan/add-free-plan'], {
        queryParams: { id: id },
      });
    } else {
      this.router.navigate(['/plan/add-free-plan']);
    }
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
  openConfirmStatusChange(u: any, content) {
    this.selectedRow = u;
    this.modalService.open(content, { centered: true });
  }
  changeCustomerStatus(_id) {
    this.spinner.show();
    this.freePlanService.changeStatus(_id).subscribe(
      (success) => {
        this.getAll();
        this.selectedRow = {};
        this.modalService.dismissAll();
        this.toastService.success(success.message);
        this.spinner.hide();
      },
      (error) => {
        this.selectedRow = {};
        this.modalService.dismissAll();
      }
    );
  }

  open(u, content) {
    this.selectedRow = u;
    this.modalService.open(content, { centered: true });
  }

  delete() {
    this.spinner.show();
    this.freePlanService.delete(this.selectedRow._id).subscribe(
      (success: any) => {
        this.toastService.success('Deleted Successfully !!');
        this.modalService.dismissAll();
        this.spinner.hide();
        this.getAll();
      },
      (error: any) => {
        console.log('error', error);
      }
    );
  }
}
