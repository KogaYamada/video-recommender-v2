import { FC } from 'react';

import './button.styles.scss';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  color?: 'black' | 'white' | 'red' | 'blue';
  size?: 'small' | 'medium' | 'large';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<ButtonProps> = ({
  type,
  color = 'black',
  size = 'medium',
  onClick,
  children,
}): JSX.Element => {
  return (
    <button onClick={onClick} className={`base ${size} ${color}`} type={type}>
      {children}
    </button>
  );
};

export default Button;
