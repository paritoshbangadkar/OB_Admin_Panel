import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionPlanListComponent } from './subscription-plan-list/subscription-plan-list.component';
import { SubscriptionPlanFormComponent } from './subscription-plan-form/subscription-plan-form.component';
import{SubscriptionPlanRoutingModule} from './subscription-plan-routing.module'
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxFileDropModule } from 'ngx-file-drop';
import { UploadService } from '@services/uploadService/upload.service';
import { CoreModule } from '../../core/core.module';
import { SubscriptionContentComponent } from './subscription-content/subscription-content.component';
import { SubscriptionPricingComponent } from './subscription-pricing/subscription-pricing.component';
import { SubscriptionDiscountComponent } from './subscription-discount/subscription-discount.component';
import { SubscriptionDiscountFormComponent } from './subscription-discount-form/subscription-discount-form.component';
import { FreePlanListComponent } from './free-plan-list/free-plan-list.component';
import { FreePlanFormComponent } from './free-plan-form/free-plan-form.component';


@NgModule({
  declarations: [
    SubscriptionPlanListComponent,
    SubscriptionPlanFormComponent,
    SubscriptionContentComponent,
    SubscriptionPricingComponent,
    SubscriptionDiscountComponent,
    SubscriptionDiscountFormComponent,
    FreePlanListComponent,
    FreePlanFormComponent
  ],
  imports: [
    CommonModule,SubscriptionPlanRoutingModule, NgxSpinnerModule,NgxFileDropModule,
    NgSelectModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
     CoreModule.forRoot()
  ], providers:[UploadService]
})
export class SubscriptionPlanModule { }
