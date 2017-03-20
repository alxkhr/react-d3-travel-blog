import React, { PropTypes } from 'react';
import Preview from './preview';
import posts from '../content/_posts.json';
import introduction from '../content/introduction.md';
import '../theme/blog.scss';

export default function Blog({ history }) {
  return (
    <div className="blog">
      <div
        className="blog__introduction"
        dangerouslySetInnerHTML={{ __html: introduction }}
      />
      <div className="blog__title">
        <h1>Blog</h1>
      </div>
      <div className="blog__previews">
        {Object.keys(posts).map(key => {
          const { preview, previewImage, folder } = posts[key];
          return (
            <Preview
              href={`/${key}`}
              key={`preview${key}`}
              {...{ preview, folder, previewImage }}
            />
          );
        })}
      </div>
    </div>
  )
}
