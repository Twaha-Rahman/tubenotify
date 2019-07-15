import * as React from 'react';
import './main.css';
import { connect } from 'react-redux';
import mapStateToProps from './utilities/mapStateToProp';
import dbRef from './modules/dbOpener';
import dbReader from './modules/dbReader';

class App extends React.Component<any> {
  constructor(props: any) {
    super(props); // store and route is in the props
    const reply = dbReader(dbRef);

    console.log(reply);
  }

  public render() {
    return (
      <div className="App">
        <h1>Don't make any binding issues!!!</h1>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
