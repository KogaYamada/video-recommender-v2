import { FC } from 'react';

import './card.styles.scss';

interface CardProps {}

const Card = (props): JSX.Element => {
  console.log(props);
  return <div className="card-container">{props.children}</div>;
};

export default Card;
