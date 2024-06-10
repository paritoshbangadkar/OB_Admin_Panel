import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WebLinkDetailsComponent } from './web-link-details/web-link-details.component';
import { WebLinkListComponent } from './web-link-list/web-link-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { EPochDatePipe } from '../pipes/ePochDate.pipe';
import { RupeesPipe } from '../pipes/ruppes.pipe';
import { DateAgoPipe } from '../pipes/date-ago.pipe';
import { RemoveUnderScorePipe } from '../pipes/remove-underscore.pipe';
import { TimeFormatPipe } from '../pipes/time-format.pipe';

const PIPES = [TruncatePipe, CapitalizePipe, DateAgoPipe, RemoveUnderScorePipe, EPochDatePipe, RupeesPipe,TimeFormatPipe];

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    WebLinkDetailsComponent,
    WebLinkListComponent,
    ...PIPES
  ],
  exports: [
    WebLinkDetailsComponent,
    WebLinkListComponent,
    ...PIPES
  ]
})
export class SharedModule { }
