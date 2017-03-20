import React, { PropTypes, Component } from 'react';
import Preview from './preview';
import posts from '../content/_posts.json';
import '../theme/post.scss';

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
    };
    this.ref = null;
    this.meta = posts[props.match.params.postKey];
    this.loadPost = this.loadPost.bind(this);
  }

  componentDidMount() {
    this.loadPost();
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.match.params.postKey !== this.props.match.params.postKey) {
      this.meta = posts[nextProps.match.params.postKey];
      this.loadPost();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.content !== this.state.content && this.ref) {
      this.ref.scrollIntoView();
    }
  }

  loadPost() {
    const { post, folder, suggestions } = this.meta;
    import(`../content${folder}${post}`)
      .then(content => this.setState({ content }))
      .catch(err => console.log(`Failed to load markdown file "../content${folder}${post}"`, err));
  }

  render() {
    const { content } = this.state;
    const { suggestions } = this.meta;
    return (
      <div className="post">
        <div
          ref={c => { if (c) this.ref = c; }}
          className="post__content"
          dangerouslySetInnerHTML={content ? { __html: content } : undefined}
        />
        {suggestions && suggestions.length > 0 &&
          <h1>Empfohlene Artikel</h1>
        }
        <div className="post__suggestions">
          {suggestions.map(key => {
            const { folder, preview, previewImage } = posts[key];
            return <Preview fullWidth key={`preview${key}`} {...{ preview, folder, previewImage }} href={`/${key}`} />
          })}
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  match: PropTypes.object.isRequired,
}
