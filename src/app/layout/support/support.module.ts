import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportListComponent } from './support-list/support-list.component';
import { SupportRoutingModule } from './support-routing.module'
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NgSelectModule } from '@ng-select/ng-select';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [
    SupportListComponent
  ],
  imports: [
    CommonModule,
    SupportRoutingModule,
    NgxSpinnerModule, NgxFileDropModule,
    NgSelectModule,
    NgbModule,
    CoreModule.forRoot()
  ]
})
export class SupportModule { }
