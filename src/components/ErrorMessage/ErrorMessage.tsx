import * as React from 'react';
import './ErrorMessage.css';
import Button from '../Button/Button';
import { faUndoAlt } from '@fortawesome/free-solid-svg-icons';
import * as Router from 'react-router-dom';

interface IErrorMessageProps {
  refToDispatcher?: any;
}

const ErrorMessage: React.SFC<IErrorMessageProps> = props => {
  // props[`refToDispatcher`]({
  //  type: `errorToggler`
  // });
  return (
    <div className="error">
      <h1>Whoops! We did an oopsie!</h1>
      <Router.Link to="/add">
        <Button buttonIcon={faUndoAlt} buttonMessage="Retry" />
      </Router.Link>
    </div>
  );
};

export default ErrorMessage;
