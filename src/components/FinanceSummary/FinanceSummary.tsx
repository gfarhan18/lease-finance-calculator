// components/FinanceSummary.tsx
import React from "react";
import { FinanceFormData } from "../FinanceForm/Form";

interface FinanceSummaryProps {
  formData: FinanceFormData;
}

const FinanceSummary: React.FC<FinanceSummaryProps> = ({ formData }) => {
  const { carPrice, downPayment, interestRate, numberOfMonths } = formData;

  let loanAmount = 0;
  let totalPaid = 0;
  let costOfFinance = 0;
  let monthlyPayment = 0;
  if (carPrice && downPayment && interestRate && numberOfMonths) {
    loanAmount = carPrice - downPayment;

    // Calculate monthly payment using Excel's PMT function
    const calculateMonthlyPayment = () => {
      const monthlyInterestRate = interestRate / (100 * 12); // Convert interest rate to monthly decimal
      const totalMonths = numberOfMonths;

      // PMT function calculation
      const monthlyPayment =
        (loanAmount * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -totalMonths));

      return monthlyPayment;
    };

    monthlyPayment = calculateMonthlyPayment();

    // Calculate total paid
    totalPaid = calculateMonthlyPayment() * numberOfMonths + downPayment;

    // Calculate cost of finance
    costOfFinance = totalPaid - carPrice;
  }

  return (
    <div className="bg-yellow-200 rounded-md p-4 shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Finance Summary</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* left column */}
        <div>
          <div className="mb-2">
            <p className="text-lg font-medium">Loan Amount:</p>
            <p className="text-lg">${loanAmount.toFixed(2)}</p>
          </div>
          <div className="mb-2">
            <p className="text-lg font-medium">Cost of Finance:</p>
            <p className="text-lg">
              ${isNaN(costOfFinance) ? 0.0 : costOfFinance.toFixed(2)}
            </p>
          </div>
          <div className="mb-2">
            <p className="text-lg font-medium">Total Paid:</p>
            <p className="text-lg">
              ${isNaN(totalPaid) ? 0.0 : totalPaid.toFixed(2)}
            </p>
          </div>
        </div>
        {/* right column */}

        <div className="text-right">
          <div className="font-bold">
            <p className="text-lg font-bolder">Monthly Payment:</p>
            <p className="text-lg">
              ${isNaN(monthlyPayment) ? "0.00" : monthlyPayment.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceSummary;
