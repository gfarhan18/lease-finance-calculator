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
      <h2 className="text-lg font-semibold mb-4 text-center">
        Lease vs Finance
      </h2>
      <table className="w-full">
        <thead className="text-lg font-semibold mb-4text-center bg-gray-900 text-white">
          <th></th>
          <th className="p-2">Lease</th>
          <th className="p-2">Finance</th>
        </thead>
        <tbody>
          <tr className="border-b border-gray-300">
            <td className="bg-yellow-500  p-4 text-left">Monthly Payment</td>
            <td className="bg-yellow-500  p-4 text-right">
              ${leaseMonthlyPayment.toFixed(2)}
            </td>
            <td className="bg-yellow-500  p-4 text-right">
              ${financeMonthlyPayment.toFixed(2)}
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="bg-yellow-500  p-4 text-left">Total Cost</td>
            <td className="bg-yellow-500  p-4 text-right">
              ${leaseTotalCost.toFixed(2)}
            </td>
            <td className="bg-yellow-500  p-4 text-right">
              ${financeTotalCost.toFixed(2)}
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="bg-yellow-500  p-4 text-left">
              Effective Monthly Cost
            </td>
            <td className="bg-yellow-500  p-4 text-right">
              ${effectiveMonthlyCostLease.toFixed(2)}
            </td>
            <td className="bg-yellow-500  p-4 text-right">
              ${effectiveMonthlyCostFinance.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LeaseFinanceComparison;
