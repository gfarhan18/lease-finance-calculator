// components/Form.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import Input from "../Input/Input";

interface FormProps {
  onSubmit: (formDataState: LeaseFormData) => void;
  onUpdateFormData: (formDataState: LeaseFormData) => void;
  formData: LeaseFormData;
}

export interface LeaseFormData {
  residual: number | null;
  moneyFactor: number | null;
  msrp: number | null;
  sellingPrice: number | null;
  taxRate: number | null;
  leaseTerm: number | null;
}

const LeaseForm: React.FC<FormProps> = ({
  onSubmit,
  onUpdateFormData,
  formData,
}) => {
  const [formDataState, setFormData] = useState<LeaseFormData>(formData);
  const [residualPercentage, setResidualPercentage] = useState<number | null>(
    null
  );
  const [taxRatePercentage, setTaxRatePercentage] = useState<number | null>(
    null
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formDataState, [name]: parseFloat(value) });
    if (name === "residual") {
      setResidualPercentage(parseFloat(value) / 100);
    }
    if (name === "taxRate") {
      setTaxRatePercentage(parseFloat(value) / 100);
    }
    onUpdateFormData({ ...formDataState, [name]: parseFloat(value) });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formDataState);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto mt-4">
      <div className="mb-4">
        <Input
          type="number"
          placeholder="MSRP"
          name="msrp"
          value={formDataState.msrp || ""}
          onChange={handleChange}
          onBlur={handleChange}
        />
      </div>
      <div className="mb-4">
        <Input
          type="number"
          placeholder="Selling Price"
          name="sellingPrice"
          value={formDataState.sellingPrice || ""}
          onChange={handleChange}
          onBlur={handleChange}
        />
      </div>
      <div className="mb-4">
        <div>
          <Input
            type="number"
            placeholder="Residual (%)"
            name="residual"
            value={formDataState.residual || ""}
            onChange={handleChange}
            onBlur={handleChange}
          />
        </div>
        {/* <div>
          <Input
            type="number"
            placeholder="Residual "
            name="residualPercentage"
            onBlur={handleChange}
            value={residualPercentage ? residualPercentage.toString() : ''}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              setResidualPercentage(value);
              setFormData({ ...formDataState, residual: value * 100 });
            }}
          />
        </div> */}
      </div>
      <div className="mb-4">
        <Input
          type="number"
          placeholder="Money Factor"
          name="moneyFactor"
          value={formDataState.moneyFactor || ""}
          onChange={handleChange}
          onBlur={handleChange}
        />
      </div>

      <div className="mb-4">
        <div>
          <Input
            type="number"
            placeholder="Tax Rate (%)"
            name="taxRate"
            value={formDataState.taxRate || ""}
            onChange={handleChange}
            onBlur={handleChange}
          />
        </div>
        {/* <div>
          <Input
            type="number"
            placeholder="Tax Rate Percentage"
            name="taxRatePercentage"
            value={taxRatePercentage ? taxRatePercentage.toString() : ''}
            onBlur={handleChange}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              setTaxRatePercentage(value);
              setFormData({ ...formDataState, taxRate: value * 100 });
            }}
          />
        </div> */}
      </div>
      <div className="mb-4">
        <Input
          type="number"
          placeholder="Lease Term (Months)"
          name="leaseTerm"
          value={formDataState.leaseTerm || ""}
          onChange={handleChange}
          onBlur={handleChange}
        />
      </div>
      {/* <button
        type="submit"
        className="bg-yellow-500 text-white px-4 py-2 mt-4 rounded-full hover:bg-yellow-600"
      >
        Submit
      </button> */}
    </form>
  );
};

export default LeaseForm;
