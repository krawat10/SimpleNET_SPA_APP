export class LoanOffer {
  monthlyPayment: number;
  totalPayment: number;
  loan: Loan;
}

export class Loan {
  name: string;
  interestRate: number;
}
