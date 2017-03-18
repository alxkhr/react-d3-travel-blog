import React from 'react';
import Preview from './preview';
import posts from '../content/_posts.json';
import introduction from '../content/introduction.md';
import '../theme/blog.scss';

export default function Blog() {
  return (
    <div className="blog">
      <div
        className="blog__introduction"
        dangerouslySetInnerHTML={{ __html: introduction }}
      />
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
