import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Layout } from 'antd';
import PageHeader from './components/header';
import Dashboard from './components/dashboard';
import { ROOT_PATH } from './_utils/constats';

export default () => (
  <BrowserRouter>
    <Switch>
      <Layout className='layout' style={{ minHeight: '100vh' }}>
        <Route component={PageHeader} />
        <Route exact path={`${ROOT_PATH}`} component={() => <Dashboard />} />
      </Layout>
    </Switch>
  </BrowserRouter>
);
