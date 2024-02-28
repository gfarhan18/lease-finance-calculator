// components/Input.tsx
import React, { ChangeEvent } from 'react';

interface InputProps {
  type: string;
  placeholder: string;
  value: any;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
  tooltip?: string;

}

const Input: React.FC<InputProps> = ({ type, placeholder,name, value, onChange, onBlur,tooltip }) => {
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-1 font-bold text-gray-700 px-1">{placeholder}</label> {/* Render the label */}
      <input
        type={type}
        placeholder={placeholder}
        value={value  || ''}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        className="border-b border-gray-400 py-2 text-black w-full bg-yellow-200 px-1 outline-none drop-shadow-sm transition-all duration-200 ease-in-out text-sm font-semibold"
        title={tooltip}
      />
    </div>
  );
};

export default Input;
