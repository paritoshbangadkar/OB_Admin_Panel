import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ShopService } from '@services/shop/shop.service';
import { porterStatus } from 'src/app/core/helpers';
@Component({
  selector: 'app-porter-form',
  templateUrl: './porter-form.component.html',
  styleUrls: ['./porter-form.component.scss']
})
export class PorterFormComponent implements OnInit {
  shopId: string = '';
  isPorterService: any;
  isPorterRequest: any;
  porterStatus = [
    // porterStatus.PENDING,
    porterStatus.ACCEPTED
  ]
  request: any;

  constructor(
    private location: Location,
    private actRoutes: ActivatedRoute,
    private toastService: ToastrService,
    private shopService: ShopService,
  ) { }

  ngOnInit(): void {
    this.actRoutes.queryParams.subscribe((params) => {
      this.shopId = params.id
      this.request = params.request
    });
  }

  updatePorterService() {
    let payload = {
      shopId: this.shopId,
      isPorterService: this.isPorterService,
      isPorterRequest:this.isPorterRequest
    }
    this.shopService.addPorterService(payload).subscribe(
      async (success) => {
        this.toastService.success('Porter Service Deactivated Successfully successfully');
        this.goBack();
      },
      async (error) => {
        this.toastService.error(error);
      }
    );
  }

  goBack() {
    this.location.back();
  }
}
