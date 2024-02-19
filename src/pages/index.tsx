// pages/index.tsx
import { useEffect, useState } from "react";
import LeaseForm, { LeaseFormData } from "@/components/LeaseForm/Form";
import Tab from "@/components//Tab/Tab";
import FinanceForm, { FinanceFormData } from "@/components/FinanceForm/Form";
import LeaseSummary from "@/components/LeaseSummary/LeaseSummary";
import FinanceSummary from "@/components/FinanceSummary/FinanceSummary";
import LeaseFinanceComparison from "@/components/LeaseFinanceComparison/LeaseFinanceComparison";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [LeaseFormData, setLeaseFormData] = useState<LeaseFormData>({
    residual: null,
    moneyFactor: null,
    msrp: null,
    sellingPrice: null,
    taxRate: null,
    leaseTerm: null,
  });
  const [FinanceFormData, setFinanceFormData] = useState<FinanceFormData>({
    carPrice: null,
    downPayment: null,
    interestRate: null,
    numberOfMonths: null,
  });
  console.log(FinanceFormData, "financeFormData");
  console.log(LeaseFormData, "leaseFormData");

  const [selectedTabSecondColumn, setSelectedTabSecondColumn] =
    useState(selectedTab);

  useEffect(() => {
    if (selectedTab !== selectedTabSecondColumn) {
      setSelectedTabSecondColumn(selectedTab);
    }
  }, [selectedTab]);
  const handleTabChange = (tabIndex: number) => {
    setSelectedTab(tabIndex);
  };

  const handleFormSubmit1 = (formData: LeaseFormData) => {
    setLeaseFormData(formData);
  };

  const handleFormSubmit2 = (formData: FinanceFormData) => {
    setFinanceFormData(formData);
  };
  let leaseResidualValue = 0;
  let leaseDepreciationCost = 0;
  let leaseInterestCost = 0;
  let leaseTotalWithoutTax = 0;
  let leaseTax = 0;
  let leaseMonthlyPayment = 0;
  let leaseTotalCost = 0;

  if (
    LeaseFormData.msrp &&
    LeaseFormData.sellingPrice &&
    LeaseFormData.residual &&
    LeaseFormData.moneyFactor &&
    LeaseFormData.taxRate && LeaseFormData.leaseTerm
  ) {
    leaseResidualValue = LeaseFormData.msrp * (LeaseFormData.residual / (100*100));
    leaseDepreciationCost =
      (LeaseFormData.sellingPrice - leaseResidualValue) / LeaseFormData.leaseTerm;
    leaseInterestCost =
      (LeaseFormData.sellingPrice + leaseResidualValue) *
      LeaseFormData.moneyFactor;
    leaseTotalWithoutTax = leaseDepreciationCost + leaseInterestCost;
    leaseTax = leaseTotalWithoutTax * ((LeaseFormData.taxRate/100) || 0);
    leaseMonthlyPayment = leaseTax + leaseTotalWithoutTax;
    // leaseTotalCost = leaseMonthlyPayment * LeaseFormData.numberOfMonths;
  }

  // Calculate formulas for finance
  let financeMonthlyPayment = 0;
  let financeTotalPaid = 0;
  let financeCostOfFinance = 0;
  let financeTotalCost = 0;

  if (
    FinanceFormData.carPrice &&
    FinanceFormData.downPayment &&
    FinanceFormData.interestRate &&
    FinanceFormData.numberOfMonths
  ) {
    const financeLoanAmount =
      FinanceFormData.carPrice - FinanceFormData.downPayment;
    const financeMonthlyInterestRate =
      FinanceFormData.interestRate / (100 * 12); // Convert interest rate to monthly decimal
    const financeTotalMonths = FinanceFormData.numberOfMonths;

    financeMonthlyPayment =
      (financeLoanAmount * financeMonthlyInterestRate) /
      (1 - Math.pow(1 + financeMonthlyInterestRate, -financeTotalMonths));
    financeTotalPaid =
      financeMonthlyPayment * financeTotalMonths + FinanceFormData.downPayment;
    financeCostOfFinance = financeTotalPaid - FinanceFormData.carPrice;
    financeTotalCost = financeMonthlyPayment * financeTotalMonths;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="max-w-sm ml-auto bg-yellow-200 shadow-xl rounded-lg overflow-hidden">
            <div className="p-4">
              <Tab
                tabs={["LEASE", "FINANCE"]}
                onSelectTab={handleTabChange}
                activeTab={selectedTab}
              />
              {selectedTab === 0 && (
                <LeaseForm
                  onSubmit={handleFormSubmit1}
                  onUpdateFormData={handleFormSubmit1}
                  formData={LeaseFormData}
                />
              )}
              {selectedTab === 1 && (
                <FinanceForm
                  onSubmit={handleFormSubmit2}
                  onUpdateFormData={handleFormSubmit2}
                  formData={FinanceFormData}
                />
              )}
              {selectedTab === 2 && (
                <LeaseForm
                  onSubmit={handleFormSubmit1}
                  onUpdateFormData={handleFormSubmit1}
                  formData={LeaseFormData}
                />
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="max-w-lg mx-right-auto bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
              <Tab
                tabs={["LEASE", "FINANCE", "LEASE vs FINANCE"]}
                onSelectTab={handleTabChange}
                activeTab={selectedTabSecondColumn}
              />
              {selectedTabSecondColumn === 0 && (
                <LeaseSummary formData={LeaseFormData} />
              )}
              {selectedTabSecondColumn === 1 && (
                <FinanceSummary formData={FinanceFormData} />
              )}
              {selectedTabSecondColumn === 2 && (
                <>
                  <LeaseFinanceComparison
                    leaseMonthlyPayment={leaseMonthlyPayment}
                    financeMonthlyPayment={financeMonthlyPayment}
                    leaseTotalCost={leaseTotalCost}
                    financeTotalCost={financeTotalCost}
                  />
                </>
              )}
              <blockquote className="pt-2 text-xs italic">
                *Disclaimer: This calculator is provided as a bonus tool to
                assist you in your car purchase. Values displayed are for
                illustrations only. The values and output payments on this
                calculator are hypothetical only and should serve as examples.
                You should enter figures that are appropriate to your individual
                situation. This calculator does not guarantee the actual results
                of your intended car payment. Tax, title, and tags, dealer
                incentives, rebates, and fees vary by state and manufacturer.
                They are not taken into consideration at this time. This content
                is intended to provide general information and shouldn't be
                considered legal, tax, or financial advice. Dealertactics.com
                and its affiliates are not tax or legal advisers.
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
