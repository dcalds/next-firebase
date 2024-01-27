import React from 'react';

interface InputFieldProps {
  name: string;
  label: string;
  register: any;
  type: string;
  placeholder: string;
  required?: boolean;
  error?: string | undefined;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  register,
  type,
  placeholder,
  required = false,
  error,
}) => {
  return (
    <div>
      <label htmlFor={name} className="block mb-2">
        {label}
      </label>
      <input
        {...register}
        className={`w-full p-3 border rounded-lg mt-1 ${error ? 'border-red-500' : 'border-gray-300'}`}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
      />
      {error && (
        <p className="text-red-500 text-sm mt-2">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
