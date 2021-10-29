import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Home } from 'pages/Home';
import { NotFound } from 'pages/NotFound';
import { Layout } from './Layout';
export const history = require('history').createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <React.Fragment>
      <Layout>
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Layout>
    </React.Fragment>
  </Router>
);

export default AppRouter;
