import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EventService } from '../../../services/event/event.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  eventList: any = [];
  search: any = '';
  page = 1;
  pageSize = 25;
  collection: number = 0;
  selectedRow: any;

  constructor(
    private eventService: EventService,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.spinner.show();
    let payload = {
      page: this.page,
      pageSize: this.pageSize,
      search: this.search,
    }
    this.eventService.getAll(payload).subscribe(
      (success) => {
        this.eventList = success.data;
        this.collection = success.count;
        this.spinner.hide()
      },
      (error) => {
        this.spinner.hide();
        this.toastService.error(error);
      }
    );
  }

  openConfirmStatusChange(u: any, content) {
    this.selectedRow = u;
    this.modalService.open(content, { centered: true });
  }

  changeEventStatus(_id) {
    this.spinner.show();
    this.eventService.changeStatus(_id).subscribe(success => {
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
