import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { CoreModule } from '../../core/core.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserAnalyticsComponent } from './user-analytics/user-analytics.component';
import { UserAnalyticsRoutingModule } from './user-analytics-routing.module';

@NgModule({
  declarations: [
    UserAnalyticsComponent
  ],

  imports: [
    CommonModule,
    UserAnalyticsRoutingModule,
    NgxSpinnerModule,
    NgxSpinnerModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    CoreModule.forRoot(),
  ]
})
export class UserAnalyticsModule { }
