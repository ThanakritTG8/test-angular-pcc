import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

// lib
import { MatInputModule } from '@angular/material/input';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { MatRadioModule } from '@angular/material/radio';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommaFormatDirective } from './core/directive/comma-format.directive';
import { TaxFilingComponent } from './tax-filing/tax-filing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CommaFormatDirective,
    TaxFilingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    NzStepsModule,
    MatRadioModule,
    NzInputNumberModule,
    NzFormModule,
    NzModalModule,
    NzSelectModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
