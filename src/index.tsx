import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Add from 'src/pages/Add/Add';
import Loading from './components/Loading/Loading';
import Settings from 'src/pages/Settings/Settings';
import About from 'src/pages/About/About';
import App from './App';
import Navbar from './components/Navbar/Navbar';
import ErrorPage from 'src/pages/ErrorPage/ErrorPage';
import Selector from 'src/pages/Selector/Selector';
import FinalStep from 'src/pages/FinalStep/FinalStep';

import { Provider } from 'react-redux';
import * as Router from 'react-router-dom';
import Store from './store';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={Store}>
    <Router.BrowserRouter>
      <div className="main-body">
        <Router.Route exact={true} component={Navbar} />
        <Router.Route exact={true} path="/" component={App} />
        <Router.Route exact={true} path="/add" component={Add} />
        <Router.Route exact={true} path="/delete" component={Loading} />
        <Router.Route exact={true} path="/settings" component={Settings} />
        <Router.Route exact={true} path="/about" component={About} />
        <Router.Route exact={true} path="/error" component={ErrorPage} />
        <Router.Route exact={true} path="/selector" component={Selector} />
        <Router.Route exact={true} path="/final" component={FinalStep} />
      </div>
    </Router.BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
