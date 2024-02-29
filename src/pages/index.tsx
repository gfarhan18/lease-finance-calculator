"use client";
import Tab from "@/components//Tab/Tab";
import Disclaimer from "@/components/Disclaimer/Disclaimer";
import FinanceForm, { FinanceFormData } from "@/components/FinanceForm/Form";
import FinanceSummary from "@/components/FinanceSummary/FinanceSummary";
import LeaseFinanceComparison from "@/components/LeaseFinanceComparison/LeaseFinanceComparison";
import LeaseForm, { LeaseFormData } from "@/components/LeaseForm/Form";
import LeaseSummary from "@/components/LeaseSummary/LeaseSummary";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface UserData {
  user: {
    unsafeMetadata: {
      status: string;
      // Add other properties if needed
    }
    // Add other properties if needed
  }
  // Add other properties if needed
}

export default function Home() {
  console.log("env", process.env)
  const [selectedTab, setSelectedTab] = useState(0);
  const router = useRouter();
  const [user,setUser] = useState<UserData | null>(null)
  const [userStatus, setUserStatus] = useState<string>('');
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

  useEffect(() => {
    const checkUser = async () => {
        try {
          //for setting the unsafe metadata
          const addMetaData = await fetch(`/api/private`);

          //for checking if user exists or not
          const clerkresponse = await fetch(`/api/auth`);

          if(clerkresponse.ok) {
            setUser(await clerkresponse.json());
          }
          setUserStatus(user?.user?.unsafeMetadata.status ?? 'block');  
        } catch (error) {
          console.error("Error decoding token or fetching user:", error);
          router.push("/login");
        }
      // }
    };

    checkUser();
  }, [userStatus]);

  console.log(user, "user details", user?.user?.unsafeMetadata.status , "" , userStatus)
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
    LeaseFormData.taxRate &&
    LeaseFormData.leaseTerm
  ) {
    leaseResidualValue = LeaseFormData.msrp * (LeaseFormData.residual / 100);
    leaseDepreciationCost =
      (LeaseFormData.sellingPrice - leaseResidualValue) /
      LeaseFormData.leaseTerm;
    leaseInterestCost =
      (LeaseFormData.sellingPrice + leaseResidualValue) *
      LeaseFormData.moneyFactor;
    leaseTotalWithoutTax = leaseDepreciationCost + leaseInterestCost;
    leaseTax = leaseTotalWithoutTax * (LeaseFormData.taxRate || 0);
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
      {!userStatus && (
        <div className="text-center">
          <p className="text-4xl text-yellow-500 mb-4">
            In order to see the calculator, please login.
          </p>
          <Link
            href="/sign-in"
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-2"
          >
            Go to Login
          </Link>
        </div>
      )}
      {userStatus === "active" ? (
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
                      leaseMonthlyPayment={leaseTotalWithoutTax}
                      financeMonthlyPayment={financeMonthlyPayment}
                    />
                  </>
                )}
                <Disclaimer />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-4xl text-yellow-500 mb-4">
            Access is currently unavailable, please contact{" "}
            <a
              href="https://www.dealertactics.com"
              target="_blank"
              className="underline"
            >
              DealerTactics
            </a>{" "}
            for further assistance.

          </p>
        </div>
      )}
    </div>
  );
}
