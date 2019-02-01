import * as React from 'react';
import './InfoToggler.css';

interface IInfoTogglerProps {
  title: string;
  imgLink: string;
  num: number;
  textColor: string;
  backgroundColor: string;
}

const InfoToggler: React.SFC<IInfoTogglerProps> = props => {
  return (
    <div className="info-card" id={props.num.toString()} style={{ backgroundColor: props.backgroundColor }}>
      <img className="card-img" src={props.imgLink} alt="give me a break" />
      <h1 id={props.num.toString()} style={{ color: props.textColor }}>
        {props.title}
      </h1>
    </div>
  );
};

export default InfoToggler;
