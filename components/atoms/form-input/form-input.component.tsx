import React, { FC } from 'react';

import './form-input.styles.scss';

interface FormInputProps {
  name?: string;
  label?: string;
  value: string;
  type?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
}

const FormInput: FC<FormInputProps> = ({
  handleChange,
  label,
  ...otherProps
}): JSX.Element => {
  console.log({ ...otherProps });
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
    </div>
  );
};

export default FormInput;
