import React from 'react';
import Preview from './preview';
import posts from '../content/_posts.json';
import '../theme/blog.scss';

export default function Blog() {
  return (
    <div className="blog">
      <p>Hier steht ein persönlicher Text über die Autorin, in zwei Spalten. Hier steht ein persönlicher Text über die Autorin, in zwei Spalten. Hier steht ein persönlicher Text über die Autorin, in zwei Spalten. Hier steht ein persönlicher Text über die Autorin, in zwei Spalten. Hier steht ein persönlicher Text über die Autorin, in zwei Spalten. Hier steht ein persönlicher Text über die Autorin, in zwei Spalten.</p>
      <h1>Blog</h1>
      <div className="blog__previews">
        {Object.keys(posts).map(key => {
          const { title, preview, folder } = posts[key];
          return <Preview key={`preview${key}`} {...{ preview, folder }} path={`/${key}`} />;
        })}
      </div>
    </div>
  )
}
