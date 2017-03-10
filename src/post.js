import React, { PropTypes } from 'react';

export default function Post({ date, name, post }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{date}</p>
      <p>{post}</p>
    </div>
  );
}

Post.propTypes = {
  date: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  post: PropTypes.string.isRequired,
}
