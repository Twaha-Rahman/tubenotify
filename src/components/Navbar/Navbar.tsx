import * as React from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faInfoCircle, faCog, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as Router from 'react-router-dom';

interface INavbarProps {
  return?: boolean;
  location: any;
}

const Navbar: React.SFC<INavbarProps> = props => {
  if (props.location.pathname !== `/`) {
    return (
      <div className="navbar">
        <div className="child-one">
          <Router.Link to="/">
            <FontAwesomeIcon icon={faChevronLeft} />
          </Router.Link>
        </div>
        <span className="center-brand">
          <h1>TubeNotify</h1>
        </span>
        <div className="child-two">
          <span>
            <Router.Link to="add">
              <FontAwesomeIcon icon={faPlus} />
            </Router.Link>
          </span>
          <span>
            <Router.Link to="delete">
              <FontAwesomeIcon icon={faTrash} />
            </Router.Link>
          </span>
          <span>
            <Router.Link to="settings">
              <FontAwesomeIcon icon={faCog} />
            </Router.Link>
          </span>
          <span>
            <Router.Link to="about">
              <FontAwesomeIcon icon={faInfoCircle} />
            </Router.Link>
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="navbar">
      <span className="center-brand">
        <h1>TubeNotify</h1>
      </span>
      <div className="child-two">
        <span>
          <Router.Link to="add">
            <FontAwesomeIcon icon={faPlus} />
          </Router.Link>
        </span>
        <span>
          <Router.Link to="delete">
            <FontAwesomeIcon icon={faTrash} />
          </Router.Link>
        </span>
        <span>
          <Router.Link to="settings">
            <FontAwesomeIcon icon={faCog} />
          </Router.Link>
        </span>
        <span>
          <Router.Link to="about">
            <FontAwesomeIcon icon={faInfoCircle} />
          </Router.Link>
        </span>
      </div>
    </div>
  );
};

export default Navbar;
