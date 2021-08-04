import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Loan, LoanOffer} from '../../shared/models/loan-offer';

@Injectable({
  providedIn: 'root'
})
export class LoanCalculatorService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private apiUrl: string) {
  }

  public fetchLoans(ticket: string, interval = '1d', period = '100d'): Promise<Loan[]> {
    return this.http
      .get<Loan[]>(this.apiUrl + `api/loans/`)
      .toPromise();
  }

  public fetchLoanOffers(moneyToLoan: number, periodOfLoan: number ): Promise<LoanOffer[]> {
    return this.http
      .post<LoanOffer[]>(this.apiUrl + `api/loanOffers/`, {
        amount: moneyToLoan,
        period: periodOfLoan
      })
      .toPromise();
  }
}
