// components/Form.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import Input from "../Input/Input";

interface FormProps {
  onSubmit: (formData: FinanceFormData) => void;
  onUpdateFormData: (formData: FinanceFormData) => void;
  formData: FinanceFormData;
}

export interface FinanceFormData {
  carPrice: number | null;
  downPayment: number | null;
  interestRate: number | null;
  numberOfMonths: number | null;
}

const FinanceForm: React.FC<FormProps> = ({
  onSubmit,
  onUpdateFormData,
  formData,
}) => {
  const [formDataState, setFormDataState] = useState<FinanceFormData>(formData);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataState({ ...formDataState, [name]: parseFloat(value) });
    onUpdateFormData({ ...formDataState, [name]: parseFloat(value) });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formDataState); // Pass form data to parent component
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto mt-4">
      <div className="mb-4">
        <Input
          type="number"
          placeholder="Selling Price"
          name="carPrice"
          value={formDataState.carPrice || ""}
          onChange={handleChange}
          onBlur={handleChange}
        />
      </div>
      <div className="mb-4">
        <Input
          type="number"
          placeholder="Down payment"
          name="downPayment"
          value={formDataState.downPayment || ""}
          onChange={handleChange}
          onBlur={handleChange}
        />
      </div>
      <div className="mb-4">
        <Input
          type="number"
          placeholder="Interest Rate (%)"
          name="interestRate"
          value={formDataState.interestRate || ""}
          onChange={handleChange}
          onBlur={handleChange}
          tooltip="Please enter Interest Rate in %"
        />
      </div>
      <div className="mb-4">
        <Input
          type="number"
          placeholder="Term (Months)"
          name="numberOfMonths"
          value={formDataState.numberOfMonths || ""}
          onChange={handleChange}
          onBlur={handleChange}
        />
      </div>
      {/* <button type="submit" 
        className="bg-yellow-500 text-white px-4 py-2 mt-4 rounded-full hover:bg-yellow-600">
        Submit
      </button> */}
    </form>
  );
};

export default FinanceForm;
