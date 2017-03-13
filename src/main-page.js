import React from 'react';
import Globe from './globe';
import Blog from './blog';
import '../theme/main-page.scss';

export default function MainPage() {
  return (
    <div className="main-page">
      <div className="main-page__title"><h1>Eli around the world</h1></div>
      <Globe />
      <Blog />
    </div>
  );
}
