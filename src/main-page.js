import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Globe from './globe';
import Blog from './blog';
import Post from './post';
import { title } from '../content/_main.json';
import '../theme/main-page.scss';

export default function MainPage() {
  return (
    <Router>
      <div className="main-page">
        <div className="main-page__title"><h1>{title}</h1></div>
        <Route path="/" component={Globe} />
        <Route exact path="/" component={Blog}/>
        <Route path="/:postKey" component={Post}/>
      </div>
    </Router>
  );
}
