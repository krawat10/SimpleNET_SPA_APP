using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MateuszKrawczykTask.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoanOffersController : ControllerBase
    {
        // Should be DB
        private static readonly Loan[] Loans = new[]
        {
            new Loan("Alior Bank", 5.14M),
            new Loan("Nordea Bank", 4.14M),
            new Loan("Chase Bank", 2.14M),
            new Loan("PKO BP Bank", 1.4M)
        };

        private readonly ILogger<LoanOffersController> _logger;

        public LoanOffersController(ILogger<LoanOffersController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public IEnumerable<LoanOffer> Post([FromBody]CreateLoanOffersRequest request)
        {
            var offers = new List<LoanOffer>();

            foreach (var loan in Loans)
            {
                offers.Add(new LoanOffer(loan, request.Amount, request.Period));
            }

            return offers;
        }
    }
}