import { FC } from 'react';

import './button.module.scss';

type button = 'button' | 'submit' | 'reset';
type color = 'black' | 'white';
type size = 'small' | 'medium' | 'large';

interface ButtonBlackProps {
  type: button;
  color?: color;
  size?: size;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
}

const ButtonBlack: FC<ButtonBlackProps> = ({
  type,
  color = 'black',
  size = 'medium',
  children,
}): JSX.Element => {
  console.log(color);
  return (
    <button className={`base ${size} ${color}`} type={type}>
      {children}
    </button>
  );
};

export default ButtonBlack;
