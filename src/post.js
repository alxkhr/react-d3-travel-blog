import React, { PropTypes, Component } from 'react';
import posts from '../content/_posts.json';
import '../theme/post.scss';

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
      previews: [],
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
    suggestions.map(key => {
      const { folder: sugFolder, preview: sugPreview } = posts[key];
      import(`../content${sugFolder}${sugPreview}`)
        .then(preview => this.setState(({ previews }) => {
          previews.push(preview);
          return previews;
        }))
        .catch(err => console.log(`Failed to load markdown file "../content${sugFolder}${sugPreview}"`, err));
    });
  }

  render() {
    const { content, previews } = this.state;
    return (
      <div>
        <div
          ref={c => { if (c) this.ref = c; }}
          className="post"
          dangerouslySetInnerHTML={content ? { __html: content } : undefined}
        />
        <div>
          {previews.map(preview => (
            <div
              className="post__suggestion"
              dangerouslySetInnerHTML={{ __html: preview }}
            />
          ))}
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  match: PropTypes.object.isRequired,
}
