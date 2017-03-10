import React from 'react';
import Globe from './globe';
import Blog from './blog';

export default function MainPage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Globe />
      <Blog />
    </div>
  );
}
