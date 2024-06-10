import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoinListComponent } from './coin-list/coin-list.component';
import { CoinFormComponent } from './coin-form/coin-form.component';
import { CoinManagementRoutingModule } from './coin-management-routing.module';
import { CoreModule } from "../../core/core.module";
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
    declarations: [
        CoinListComponent,
        CoinFormComponent
    ],
    imports: [
        CommonModule,
        CoinManagementRoutingModule,
        CoreModule,
        NgSelectModule,

    ]
})
export class CoinManagementModule { }
