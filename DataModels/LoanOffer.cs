using System;

namespace MateuszKrawczykTask
{
    public class LoanOffer
    {
        public LoanOffer(Loan loan, decimal amount, uint period)
        {
            Loan = loan;

            var monthlyPayment = GetMonthlyPayment(loan, amount, period);
            MonthlyPayment = monthlyPayment;
            TotalPayment = Math.Round(monthlyPayment * period, 2);
        }

        public Loan Loan { get; }

        public decimal MonthlyPayment { get; set; }
        public decimal TotalPayment { get; }

        private decimal GetMonthlyPayment(Loan loan, decimal amount, uint period)
        {
            var monthsInYear = 12M;
            var nominator = amount * loan.InterestRate * 0.01M;
            var denominator = monthsInYear *
                              (1M - (decimal) Math.Pow((double) monthsInYear / ((double) monthsInYear + (double) loan.InterestRate * 0.01), period));
            return Math.Round(nominator / denominator, 2);
        }
    }
}