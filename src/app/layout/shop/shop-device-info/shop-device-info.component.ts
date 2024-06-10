import { Component, Input, OnInit } from '@angular/core';
import { NgbModalConfig, NgbDropdownConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shop-device-info',
  templateUrl: './shop-device-info.component.html',
  styleUrls: ['./shop-device-info.component.scss']
})
export class ShopDeviceInfoComponent implements OnInit {
  @Input() deviceData: any = null;

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
    console.log("deviceData..", this.deviceData);
  }


  /**
   * close modal
   */
  closeModal() {
    this.activeModal.close('close with cancel button');
  }

  seeLocation() {
    window.open(`https://maps.google.com/?q=${this.deviceData?.deviceInfo?.geoLocation?.latitude},${this.deviceData?.deviceInfo?.geoLocation?.longitude}`, "_blank");
  }

}
