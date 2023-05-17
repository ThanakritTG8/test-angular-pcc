import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxFilingComponent } from './tax-filing/tax-filing.component';

const routes: Routes = [
  {
    path: '',
    component: TaxFilingComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
