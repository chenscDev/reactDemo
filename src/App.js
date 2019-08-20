import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './containers/home';
import Module from './containers/module';


export default function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/module/:apiName" component={Module} />
        </Switch>
      </Router>
    </div>
  );
}
