import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ShopService } from '@services/shop/shop.service';

@Component({
  selector: 'app-shops-view',
  templateUrl: './shops-view.component.html',
  styleUrls: ['./shops-view.component.scss'],
  providers: [NgbModalConfig, NgbModal]

})
export class ShopsViewComponent implements OnInit {

  shopData: any = {};
  activeTab: string = null;
  dtElement: any;
  dtInstance: any;
  @Input() isEditable: boolean = false;
  params: any = null;

  links = [
    { title: 'Information', fragment: `shop-form` },
    { title: 'catalogue', fragment: `shop-catalogue-list` },
    { title: 'KYC Document', fragment: `shop-kyc` },
    { title: 'subscription', fragment: `subscription` },
    { title: 'favorites', fragment: `favorites` },
    { title: 'schedule', fragment: `shop-schedule-list` },
    { title: 'employee', fragment: `shop-employee-list` },
    { title: 'Bank Detail', fragment: `bank-detail` },
  ];


  constructor(private shopService: ShopService, private router: Router, public route: ActivatedRoute,) {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      let active = this.links.filter(x => evt.url.match(x.fragment));
      if (active && active.length) {
        this.activeTab = `${active[0].fragment}`;
        this.route.queryParams.subscribe(params => {
          if (this.params) {
            this.getShop(this.params);
          }
        })
      }
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params?.id) {
        this.params = params.id;
        this.getShop(params['id']);
      }
    })
  }

  getShop(id: number) {
    this.shopService.getById(id).subscribe(data => {
      this.shopData = data;
    })
  }

  get getUrl() {
    return 'assets/img/placeholder_banner.jpg' ?? 'assets/img/placeholder_banner.jpg';
  }

  goBack() {
    this.router.navigateByUrl('/shop/shop-list')
  }
}
