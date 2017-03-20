import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import '../theme/preview.scss';

export default class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      content: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { preview, previewImage, folder } = this.props;
    import(`../content${folder}${preview}`)
      .then(content => this.setState({ content }))
      .catch(err => console.log(`Failed to load markdown file "../content${folder}${preview}"`, err));
    import(`../content${folder}${previewImage}`)
      .then(image => this.setState({ image }))
      .catch(err => console.log(`Failed to load image "../content${folder}${previewImage}"`, err));
  }

  handleClick(event) {
    if (
      !event.defaultPrevented && // onClick prevented default
      event.button === 0 // ignore right clicks
    ) {
      event.preventDefault();
      this.context.router.history.push(this.props.href);
    }
  }

  render() {
    const { fullWidth, href, onClick } = this.props;
    const { content, image } = this.state;
    return (
      <div className={classNames('preview', { 'preview--full-width': fullWidth })}>
        <div className="preview__image">
          <a onClick={this.handleClick} href={href}><img src={image} /></a>
        </div>
        <div className="preview__content">
          <div dangerouslySetInnerHTML={content ? { __html: content } : undefined} />
          <p className="preview__more-link">
            <a onClick={this.handleClick} href={href}>Mehr lesen</a>
          </p>
        </div>
      </div>
    );
  }
}

Preview.propTypes = {
  href: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  previewImage: PropTypes.string.isRequired,
  folder: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
};

Preview.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};
