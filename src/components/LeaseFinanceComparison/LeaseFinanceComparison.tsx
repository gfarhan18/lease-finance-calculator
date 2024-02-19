import React from "react";

interface ComparisonProps {
  leaseMonthlyPayment: number;
  financeMonthlyPayment: number;
  leaseTotalCost: number;
  financeTotalCost: number;
}

const LeaseFinanceComparison: React.FC<ComparisonProps> = ({
  leaseMonthlyPayment,
  financeMonthlyPayment,
  leaseTotalCost,
  financeTotalCost,
}) => {
  const effectiveMonthlyCostLease = leaseTotalCost / 36;
  const effectiveMonthlyCostFinance = financeTotalCost / 36;

  return (
    <div className="bg-gray-200 rounded-md p-4 shadow-md">
      <div className="text-center  border-b border-gray-300">
        <h2 className="text-xl text-yellow-500 font-bold mb-2">Lease vs Finance</h2>
        <p className="text-sm text-gray-600 mb-2 font-bold">Monthly Payment</p>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex-1 text-center font-bold">
          <p>
            ${leaseMonthlyPayment.toFixed(2)} vs $
            {financeMonthlyPayment.toFixed(2)}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeaseFinanceComparison;
