import React, { FC } from 'react';

import './form-input.styles.scss';

interface FormInputProps {
  name?: string;
  label?: string;
  value: string;
  type?: string;
  required: boolean;
  error?: boolean;
  message?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: FC<FormInputProps> = ({
  handleChange,
  label,
  error,
  message,
  ...otherProps
}): JSX.Element => {
  return (
    <div className="group">
      <input className="form-input" onChange={handleChange} {...otherProps} />
      {label ? (
        <label
          className={`${
            otherProps.value.length ? 'shrink' : ''
          } form-input-label`}>
          {label}
        </label>
      ) : null}
      {error && message ? <div className="error-message">{message}</div> : null}
    </div>
  );
};

export default FormInput;
