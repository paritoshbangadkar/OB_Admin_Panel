import { Component, Input, OnInit } from '@angular/core';
import { NgbModalConfig, NgbDropdownConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements OnInit {
  @Input() viewOrderData: any = null;
  @Input() id: String = null;
  constructor(
    configModal: NgbModalConfig,
    config: NgbDropdownConfig,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
  ) {
    config.autoClose = true;
    configModal.backdrop = 'static';
    configModal.keyboard = false;
  }

  ngOnInit(): void {
    console.log("viewOrderData..", this.viewOrderData);
  }


  /**
   * close modal
   */
  closeModal() {
    this.activeModal.close('close with cancel button');
  }

}
