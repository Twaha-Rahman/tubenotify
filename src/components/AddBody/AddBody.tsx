import * as React from 'react';
import './AddBody.css';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';

interface IAddBodyProps {
  refToThis: any;
  mainText: string;
  inputFieldText: string;
}

const AddBody: React.SFC<IAddBodyProps> = props => {
  return (
    <div className="wrapper">
      <h1>{props.mainText}</h1>
      <input id="input" type="text" placeholder={props.inputFieldText} />
      <br />
      <div id="input-msg-container-container">
        <div className="input-msg-container">
          <span id="input-msg">The link you have entered is not valid.</span>
        </div>
      </div>
      <br />
      <div onClick={props.refToThis.submitter}>
        <Button buttonIcon={faArrowRight} buttonMessage="Next" />
      </div>
    </div>
  );
};

export default AddBody;
