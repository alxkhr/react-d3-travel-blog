import React from 'react';
import Post from './post';
import posts from './posts.json';

export default function Blog() {
  return (
    <div>
      {Object.keys(posts).map(key => {
        const { date, name, post } = posts[key];
        return <Post key={`post${key}`} {...{ date, name, post }} />;
      })}
    </div>
  )
}
