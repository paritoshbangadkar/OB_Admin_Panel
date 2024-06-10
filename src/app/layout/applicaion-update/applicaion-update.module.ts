import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateVersionComponent } from './update-version/update-version.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CoreModule } from 'src/app/core/core.module';
import { ApplicationUpdateRoutingModule } from './application-update-routing.module'

@NgModule({
  declarations: [
    UpdateVersionComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    NgxSpinnerModule,
    NgbModule,
    FormsModule,
    CoreModule.forRoot(),
    ReactiveFormsModule,
    NgxFileDropModule,
    ApplicationUpdateRoutingModule,
    CoreModule.forRoot()],
})
export class ApplicaionUpdateModule { }
