import { Component, OnInit } from '@angular/core';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import {
  navItemsAdmin,
  navItemsMarketing,
  navItemsSales,
} from '../../_nav';
import { ROLES } from 'src/app/core/helpers/constants.helper';
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  userDetails: any = [];
  userRole: any = [];


  constructor(
    public userService: UserService,
    private router: Router,
  ) {
    this.userDetails = this.userService.getCurrentUser();
    if (this.userDetails?.role == 'MARKETING') {
      this.navItems = navItemsMarketing;
    } else if (this.userDetails?.role == 'ADMIN') {
      this.navItems = navItemsAdmin;
    } else if (this.userDetails?.role == 'SALES') {
      this.navItems = navItemsSales;
    } else {
      this.navItems = navItems;
    }

  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  ngOnInit(): void { }

  viewProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    this.router.navigate([`/login`]);
    this.userService.purgeAuth();
  }
}
