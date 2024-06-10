import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from 'src/app/core/services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  params: any;
  userDetails: any = [];

  constructor(
    private userService: UserService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.userDetails = this.userService.getCurrentUser();
   }

  goBack() {
    this.location.back();
  }
}
