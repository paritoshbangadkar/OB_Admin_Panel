import {
  Component,
  OnInit,
  Input,
  ElementRef,
  HostListener,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReportService } from '@services/report/report.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ROLES } from 'src/app/core/helpers';
import {
  videoExtension,
  fileExtension,
  imageExtension,
  messageCategory,
} from 'src/app/core/helpers/constants.helper';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-order-chat',
  templateUrl: './order-chat.component.html',
  styleUrls: ['./order-chat.component.scss'],
})
export class OrderChatComponent implements OnInit {
  @Input() orderId: string;
  @Input() orderNumber: string;
  messageData: any = [];
  page = 1;
  pageSize = 10;
  collection: any;
  search: any = '';
  ROLES = ROLES;
  videoExtension = videoExtension;
  fileExtension = fileExtension;
  imageExtension = imageExtension;
  messageCategory = messageCategory;

  constructor(
    public modalService: NgbModal,
    private reportService: ReportService,
    private spinner: NgxSpinnerService,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.getAllChatMessage();
  }

  getAllChatMessage() {
    this.spinner.show();
    let obj: any = {
      page: this.page,
      pageSize: this.pageSize,
      search: this.search,
    };
    this.reportService
      .getAllChatMessage(this.orderId, obj)
      .subscribe((success: any) => {
        if (this.page == 1) {
          this.messageData = success.data;
        } else {
          this.messageData = [...this.messageData, ...success.data];
        }
        console.log('this.messageData-----------', this.messageData);
        this.spinner.hide();
      });
  }

  async openGoogleMap(location) {
    if (location) {
      const destination = `${location.coordinates[0]},${location.coordinates[1]}`;
      window.open(
        'https://www.google.com/maps/search/?api=1&query=' + destination
      );
    }
    return;
  }

  async downloadDoc(data) {
    let fileName = data.split('post/')[1];
    saveAs(data, fileName, { autoBom: true });
  }

  onScroll = () => {
    this.page++;
    this.getAllChatMessage();
  };

  dismissModal() {
    this.modalService.dismissAll('dismiss with cross click');
  }
}
