import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router-dom';
import '../theme/preview.scss';

export default class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
    };
  }

  componentDidMount() {
    const { preview, folder } = this.props;
    import(`../content${folder}${preview}`)
      .then(content => this.setState({ content }))
      .catch(err => console.log(`Failed to load markdown file "../content${folder}${preview}"`, err));
  }

  render() {
    const { path } = this.props;
    const { content } = this.state;
    return (
      <div className="preview">
        <div
          className="preview__content"
          dangerouslySetInnerHTML={content ? { __html: content } : undefined}
        />
        <Link to={path}>Mehr lesen</Link>
      </div>
    );
  }
}

Preview.propTypes = {
  preview: PropTypes.string.isRequired,
  folder: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
