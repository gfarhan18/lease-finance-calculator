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
      <h2 className="text-2xl font-semibold mb-4 text-center">Finance Summary</h2>
      <div className="grid grid-cols-5 gap-2">
        {/* left column */}
        <div className="w-40 col-span-2">
          <div className="mb-2">
            <p className="text-lg font-medium">Loan Amount:</p>
            <p className="text-lg">${loanAmount.toFixed(2)}</p>
          </div>
          <div className="mb-2">
            <p className="text-lg font-medium">Finance Cost:</p>
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

        <div className="text-left col-span-3">
          <div className="font-bold">
            <p className="text-lg font-bolder"> Base Monthly Payment: ${isNaN(monthlyPayment) ? "0.00" : monthlyPayment.toFixed(2)}</p>
            <small className="text-xs text-gray-500">*Tax not included</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceSummary;
