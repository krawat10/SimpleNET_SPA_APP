namespace MateuszKrawczykTask
{
    public class Loan
    {
        public Loan(string name, decimal interestRate)
        {
            Name = name;
            InterestRate = interestRate;
        }

        public string Name { get; }
        public decimal InterestRate { get; }
    }
}