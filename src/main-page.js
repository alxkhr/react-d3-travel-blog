import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Globe from './globe';
import Post from './post';
import '../theme/main-page.scss';

export default function MainPage() {
  return (
    <Router>
      <div className="main-page">
        <div className="main-page__title"><h1>Eli around the world</h1></div>
        <Route path="/" component={Globe} />
        <Route exact path="/" render={() => <div>overview</div>}/>
        <Route path="/:postKey" component={Post}/>
      </div>
    </Router>
  );
}
