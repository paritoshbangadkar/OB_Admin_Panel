import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExotelCallingHistoryRoutingModule } from './exotel-calling-history-routing.module';
import { ExotelCallingHistorylistComponent } from './exotel-calling-historylist/exotel-calling-historylist.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [
    ExotelCallingHistorylistComponent
  ],
  imports: [
    CommonModule,
    ExotelCallingHistoryRoutingModule,
    NgxSpinnerModule,CoreModule.forRoot(),NgbModule
  ]
})
export class ExotelCallingHistoryModule { }
