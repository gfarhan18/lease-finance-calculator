// components/LeaseSummary.tsx
import React from "react";
import { LeaseFormData } from "../LeaseForm/Form";

interface LeaseSummaryProps {
  formData: LeaseFormData;
}

const LeaseSummary: React.FC<LeaseSummaryProps> = ({ formData }) => {
  const { msrp, sellingPrice, residual, moneyFactor, taxRate, leaseTerm } =
    formData;

  let residualValue = 0;
  let depreciationCost = 0;
  let interestCost = 0;
  let totalWithoutTax = 0;
  let monthlyPayment = 0;
  let tax = 0;
  if (msrp && sellingPrice && residual && moneyFactor && taxRate && leaseTerm) {
    residualValue = msrp * (residual / (100)); //

    // Calculate depreciation cost
    depreciationCost = (sellingPrice - residualValue) / leaseTerm;

    // Calculate interest cost

    interestCost = (sellingPrice + residualValue) * moneyFactor;

    // Calculate total without tax
    totalWithoutTax = depreciationCost + interestCost;

    tax = totalWithoutTax * (taxRate/100);
    // Calculate monthly payment
    monthlyPayment = tax + totalWithoutTax;
  }
  // Calculate residual value

  return (
    <div className="bg-yellow-200 rounded-md p-4 shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Lease Summary</h2>
      <div className="grid grid-cols-2 gap-4">
    {/* left column */}

        <div className="">
          <div className="card mb-2">
            <p className="text-lg font-medium">Residual Value:</p>
            <p className="text-lg">${residualValue.toFixed(2)}</p>
          </div>
          <div className="card mb-2">
            <p className="text-lg font-medium">Interest Cost:</p>
            <p className="text-lg">${interestCost.toFixed(2)}</p>
          </div>
          <div className="card mb-2">
            <p className="text-lg font-medium">Depreciation Cost:</p>
            <p className="text-lg">${depreciationCost.toFixed(2)}</p>
          </div>
        </div>
    {/* right column */}
        <div className="right-col font-bold">
          <div className="card mb-2">
            <p className="text-lg font-bolder">Base monthly Payment:</p>
            <p className="text-lg">${totalWithoutTax.toFixed(2)}</p>
          </div>
          <div className="card mb-2">
            <p className="text-lg font-bolder">Tax:</p>
            <p className="text-lg">${tax.toFixed(2)}</p>
          </div>
          <div className="card mb-2">
            <p className="text-lg font-bolder">Total Monthly Payment:</p>
            <p className="text-lg">${monthlyPayment.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaseSummary;
