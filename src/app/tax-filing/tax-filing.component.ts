import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { taxData } from '../core/models/tax-data';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-tax-filing',
  templateUrl: './tax-filing.component.html',
  styleUrls: ['./tax-filing.component.scss']
})
export class TaxFilingComponent implements OnInit {

  numberValue: number = 0;
  current: number = 0;

  monthSelect: any[] = [];
  yearSelect: any[] = [];

  currentMonth: number = 0;
  currentYear: number = 0;

  taxForm: FormGroup;
  months: any = [];
  taxData: any;

  _taxAmount: number = 0;

  typeOfFilingSelect: any[] = [
    {
      value: '0',
      label: 'Ordinary Filing'
    },
    {
      value: '1',
      label: 'Additional Filing'
    },
  ];

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private modal: NzModalService,
  ) {
    this.taxForm = fb.group({
      filingType: new FormControl('0', Validators.required),
      month: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      type: new FormControl(''),
      saleAmount: new FormControl('', Validators.required),
      taxAmount: new FormControl('', Validators.required),
      surcharge: new FormControl('', Validators.required),
      penalty: new FormControl(200.00),
      totalAmount: new FormControl(''),
    })
  }

  formatterPrice = (value: number): string =>
    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  ngOnInit(): void {
    const currentDate = new Date();
    this.currentMonth = currentDate.getMonth() + 1; // +1 เพื่อเริ่มต้นนับเดือนที่ 1
    this.currentYear = currentDate.getFullYear();
    console.log(this.currentMonth);

    for (let i = 1; i <= 12; i++) {
      const monthName = this.datePipe.transform(new Date(2000, i - 1), 'MMMM');
      this.monthSelect.push({
        label: monthName,
        value: i < 10 ? `0${i}` : `${i}`,
      });
    }
    console.log(this.monthSelect)

    for (let i = 2020; i <= this.currentYear; i++) {
      this.yearSelect.push(i);
    }
  }

  selectMonth(e: any) {
    console.log(typeof e);
  }

  selectType(e: any) {
    if (e === '0') {
      this.calVat(this.taxForm.value.saleAmount);
    } else {
      this.taxForm.get('surcharge')?.setValue(0.00);
      this.taxForm.get('penalty')?.setValue(0.00);
      this.taxForm.get('totalAmount')?.setValue(0.00);
    }
  }

  calVat(val: number): void {
    console.log(val);
    let tax_amount = val * 0.07
    let surcharge = 0.00;
    let totalAmount = 0.00;
    let penalty = 0.00

    if (this.taxForm.value.filingType === '0') {
      surcharge = tax_amount * 0.1;
      penalty = 200.00;
      totalAmount = tax_amount + surcharge + penalty;
    }

    this.taxForm.patchValue({
      saleAmount: (val.toFixed(2)),
      taxAmount: (tax_amount.toFixed(2)),
      surcharge: (surcharge.toFixed(2)),
      penalty: (penalty.toFixed(2)),
      totalAmount: (totalAmount.toFixed(2)),
    })
    this.taxForm.get('saleAmount')?.updateValueAndValidity();
    this.taxForm.get('taxAmount')?.updateValueAndValidity();
    this._taxAmount = parseFloat(tax_amount.toFixed(2));
  }

  checkVat(val: any): void {
    console.log(val);
    console.log(this._taxAmount);
    if (val < (this._taxAmount - 20.00) || val > (this._taxAmount + 20.00)) {
      this.taxForm.controls['taxAmount'].setErrors({ 'incorrect': true });
      this.taxForm.controls['taxAmount']?.markAsDirty();
    } else {
      console.log('tg')
      this.taxForm.patchValue({
        taxAmount: val.toFixed(2),
      })
    }
    console.log(this.taxForm);
    // this.taxForm.get('taxAmount')?.updateValueAndValidity();
  }

  back(): void {
    this.current = 0;
  }

  next(): void {
    if (this.taxForm.valid) {
      this.current = 1;
    } else {
      Object.values(this.taxForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  confirmAndSubmit(): void {
    this.taxData = this.taxForm.value;

    this.modal.success({
      nzTitle: 'This is Tax Data',
      nzContent: JSON.stringify(this.taxData)
    });
  }

}
