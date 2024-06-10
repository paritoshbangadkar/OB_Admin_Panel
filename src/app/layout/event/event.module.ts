import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventListComponent } from './event-list/event-list.component';
import {EventRoutingModule } from './event-routing.module'
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    EventListComponent,
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    SharedModule,
    CoreModule.forRoot()
  ]
})
export class EventModule { }
