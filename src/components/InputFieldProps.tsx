import React from 'react';

interface InputFieldProps {
  type: string;
  name: string;
  className: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  name,
  className,
  placeholder,
  required,
  value,
  onChange
}) => {
  return (
    <input
      type={type}
      name={name}
      className={className}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputField;