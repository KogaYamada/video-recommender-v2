import React, { FC } from 'react';

import './input.styles.scss';

interface FormInputProps {
  name: string;
  label?: string;
  defaultValue?: string;
  value?: string;
  type?: string;
  error?: boolean;
  ref?: any;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: FC<FormInputProps> = ({
  handleChange,
  label,
  error,
  name,
  value,
  ref,
  type,
}): JSX.Element => {
  return (
    <div className="group">
      <input
        className="form-input"
        onChange={handleChange}
        value={value}
        type={type}
        name={name}
        ref={ref}
      />
      {label ? (
        <label className={`${value?.length ? 'shrink' : ''} form-input-label`}>
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default FormInput;
