import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShopService } from '@services/shop/shop.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shop-group-info',
  templateUrl: './shop-group-info.component.html',
  styleUrls: ['./shop-group-info.component.scss']
})
export class ShopGroupInfoComponent implements OnInit {

  @Input() groupId: string = null;
  @Input() shopId: string = null;
  @Input() groupName: string = null;
  groupInfo: any = {};

  constructor(
    private modalService: NgbModal,
    private toastService: ToastrService,
    private shopService: ShopService,
  ) { }

  ngOnInit(): void {
    this.groupInformation();
  }

  groupInformation() {
    let payload = {
      groupId: this.groupId,
      shopId: this.shopId,
    }
    this.shopService.getGroupInfo(payload).subscribe(
      async (success: any) => {
        this.groupInfo = success[0];
        console.log('this.groupInfo',this.groupInfo);

      },
      async (error) => {
        this.toastService.error(error)
      }
    )
  }

  dismiss() {
    this.modalService.dismissAll();
  }

}
