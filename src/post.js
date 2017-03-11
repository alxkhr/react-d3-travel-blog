import React, { PropTypes, Component } from 'react';
import '../theme/post.scss';

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
    };
  }

  componentDidMount() {
    import(`../content/${this.props.post}`)
      .then(post => this.setState({ content: post }))
      .catch(err => console.log(`Failed to load image "../content/${this.props.post}"`, err));
  }

  render() {
    const { date, name } = this.props;
    const { content } = this.state;
    return (
      <div className="post">
        <h2>{name}</h2>
        <p>{date}</p>
        {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
      </div>
    );
  }
}

Post.propTypes = {
  date: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  post: PropTypes.string.isRequired,
}
