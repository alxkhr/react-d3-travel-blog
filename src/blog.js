import React from 'react';
import Preview from './preview';
import posts from '../content/_posts.json';

export default function Blog() {
  return (
    <div>
      {Object.keys(posts).map(key => {
        const { title, preview, folder } = posts[key];
        return <Preview key={`preview${key}`} {...{ preview, folder }} path={`/${key}`} />;
      })}
    </div>
  )
}
