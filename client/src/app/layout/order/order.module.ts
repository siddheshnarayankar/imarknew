import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { ReactiveFormsModule } from '@angular/forms'
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { SharedService, PageHeaderModule, AlertModule } from './../../shared';
import { OrderService } from './order.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CreateFieldsDialog } from './components/create-fields.component'
import { TitleCasePipe } from './titlecase.pipe'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        OrderRoutingModule,
        PageHeaderModule,
        DataTablesModule,
        MatDialogModule,
        MatTabsModule,
        AlertModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatStepperModule,
        MatIconModule,
        MatTableModule
    ],
    declarations: [
        OrderComponent,
        CreateFieldsDialog,
        TitleCasePipe
    ],
    providers: [
        OrderService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SharedService,
            multi: true
        },
        TitleCasePipe
    ],
    entryComponents: [
        CreateFieldsDialog
    ],
    exports: [
        TitleCasePipe
    ]
})
export class OrderModule { }
