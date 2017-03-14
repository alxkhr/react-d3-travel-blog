import React, { PropTypes, Component } from 'react';
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
    const { post, folder } = this.meta;
    import(`../content${folder}${post}`)
      .then(post => this.setState({ content: post }))
      .catch((err, post) => console.log(`Failed to load markdown file "../content${folder}${post}"`, err));
  }

  render() {
    const { date, title } = this.meta;
    const { content } = this.state;
    return (
      <div ref={c => { if (c) this.ref = c; }} className="post">
        <h2>{title}</h2>
        <p>{date}</p>
        {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
      </div>
    );
  }
}

Post.propTypes = {
  match: PropTypes.object.isRequired,
}
