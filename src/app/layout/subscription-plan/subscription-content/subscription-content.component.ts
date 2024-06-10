import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-subscription-content',
  templateUrl: './subscription-content.component.html',
  styleUrls: ['./subscription-content.component.scss']
})
export class SubscriptionContentComponent implements OnInit {
  links = [
    { title: 'plan', fragment: '/plan/plan', image: 'assets/icons/gallery.svg' },
    { title: 'free plan', fragment: '/plan/free-plan', image: 'assets/icons/gallery.svg' },
    { title: 'advertisement plan', fragment: '/plan/advertisement-plan', image: 'assets/icons/cart-blue.svg' },
    { title: 'discount', fragment: '/plan/plan-discount', image: 'assets/icons/cart-blue.svg' }
  ];
  activeTab: string = '/plan/plan';
  constructor(
    public route: ActivatedRoute, private router: Router,
  ) {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      let active = this.links.filter(x => x.fragment.match(evt.url));
      if (active && active.length) {
        this.activeTab = active[0].fragment;
      }
    });
  }

  ngOnInit(): void {
  }

}
