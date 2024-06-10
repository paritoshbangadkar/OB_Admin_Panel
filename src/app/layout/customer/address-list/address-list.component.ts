import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '@services/customer/customer.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {
  @Input() userId: String = null;
  addressData: any = [];

  constructor(
    public activeModal: NgbActiveModal,
    private customerService: CustomerService,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.addressList();
  }

  /**
 * close modal
 */
  closeModal() {
    this.activeModal.close('close with cancel button');
  }

  addressList() {
    this.spinner.show()
    this.customerService.getAddress(this.userId).subscribe(
      (success) => {
        this.addressData = success
        this.spinner.hide()
      },
      (error) => {
        this.spinner.hide();
        this.toastService.error(error);
      }
    );
  }
}
