import { FC } from 'react';

import './button.styles.scss';

interface ButtonBlackProps {
  type: 'button' | 'submit' | 'reset';
  color?: 'black' | 'white';
  size?: 'small' | 'medium' | 'large';
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
}

const Button: FC<ButtonBlackProps> = ({
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
