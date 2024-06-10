import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WebLinkDetailsComponent } from '../web-link-details/web-link-details.component';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { WebLinkService } from '../../services/webLink/webLink.service';
@Component({
  selector: 'app-web-link-list',
  templateUrl: './web-link-list.component.html',
  styleUrls: ['./web-link-list.component.scss'],
})
export class WebLinkListComponent implements OnInit, OnChanges {
  @Input() shopId: string = '';
  dataList: any = [];
  selectedRow: any = {};
  constructor(
    private spinner: NgxSpinnerService,
    private toastService: ToastrService,
    private modalService: NgbModal,
    private webLinkService: WebLinkService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['shopId'] && this.shopId) {
      this.shopId = changes['shopId'].currentValue
      this.getList();
    }
  }

  getList(): void {
    this.webLinkService.getAll(this.shopId).subscribe(success => {
      this.dataList = success;
    })
  }

  addEdit(item = {}): void {
    const modalRef = this.modalService.open(WebLinkDetailsComponent, {
      centered: true,
    });
    modalRef.componentInstance.shopId = this.shopId;
    modalRef.componentInstance.modelData = item;
    modalRef.result.then(
      (result) => { },
      (dismiss) => {
        this.getList();
      }
    );
  }

  open(item, content) {
    this.selectedRow = item;
    this.modalService.open(content, { centered: true });
  }

  delete() {
    console.log('this.selectedRow._id',this.selectedRow._id);
    this.spinner.show();
    this.webLinkService.delete(this.selectedRow._id).subscribe(
      (success: any) => {
      this.toastService.success(' Web Link Deleted Successfully !!');
        this.modalService.dismissAll();
        this.spinner.hide();
        this.getList();
      },
      (error: any) => {
        console.log('error', error);
      }
    );
  }
}
