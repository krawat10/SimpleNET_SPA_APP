import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CurrencyPipe} from '@angular/common';
import {LoanOffer} from '../../shared/models/loan-offer';
import {LoanCalculatorService} from './loan-calculator.service';

@Component({
  selector: 'app-loan-calculator',
  templateUrl: './loan-calculator.component.html',
  styleUrls: ['./loan-calculator.component.css'],
  providers: [CurrencyPipe]
})
export class LoanCalculatorComponent implements OnInit {
  calculatorForm: FormGroup;
  offers: LoanOffer[] = [];
  loadingOffers = false;

  settings = {
    maxYearsPeriod: 30,
    minYearsPeriod: 5,
    minLoanAmount: 50000,
    maxLoanAmount: 5000000,
  };


  constructor(private currencyPipe: CurrencyPipe, private loanCalculatorService: LoanCalculatorService) {
  }

  ngOnInit(): void {
    this.calculatorForm = new FormGroup({
      'amount': new FormControl(null, [
        Validators.required,
        Validators.min(this.settings.minLoanAmount),
        Validators.max(this.settings.maxLoanAmount)]
      ),
      'period': new FormControl(null, [
        Validators.required,
        Validators.min(this.settings.minYearsPeriod),
        Validators.max(this.settings.maxLoanAmount)]
      )
    });

    this.calculatorForm.valueChanges.subscribe(form => {
      if (form.amount) {
        this.calculatorForm.patchValue({
          'amount': this.currencyPipe.transform(
            form.amount
              .replace(/\D/g, '')
              .replace(/^0+/, ''),
            'USD',
            'symbol',
            '1.00'
          )
        }, {emitEvent: false});
      }
    });
  }

  async onSubmit() {
    if (this.calculatorForm.valid) {
      this.loadingOffers = true;
      const amount = +this.calculatorForm.get('amount').value
        .replace(/\D/g, '')
        .replace(/^0+/, '');
      const years = +this.calculatorForm.get('period').value;
      this.offers = await this.loanCalculatorService.fetchLoanOffers(amount, years * 12);

      // Simulate longer loading
      await setTimeout(async () => {
        this.loadingOffers = false;
      }, 2000);


    }
  }
}
