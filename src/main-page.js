import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Globe from './globe';
import Post from './post';
import '../theme/main-page.scss';

export default function MainPage() {
  return (
    <div className="main-page">
      <div className="main-page__title"><h1>Eli around the world</h1></div>
      <Router history={browserHistory}>
        <Route path="/" component={Globe}>
          <Route path="/:postKey" component={Post}/>
        </Route>
      </Router>
    </div>
  );
}
