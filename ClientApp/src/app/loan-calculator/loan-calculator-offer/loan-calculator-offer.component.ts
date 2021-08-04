import {Component, Input} from '@angular/core';
import {LoanOffer} from '../../../shared/models/loan-offer';

@Component({
  selector: 'app-loan-calculator-offer',
  templateUrl: './loan-calculator-offer.component.html'
})
export class LoanCalculatorOfferComponent {
 @Input() offer: LoanOffer;


}
