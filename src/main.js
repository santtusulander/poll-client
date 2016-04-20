/*eslint no-undef: 0*/

import React from 'react';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { buildStore } from './helpers/store';
import { App } from './components/app/app';
import { PollContainer } from './components/poll/poll';

const store = buildStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={PollContainer}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
