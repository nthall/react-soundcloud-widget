import React from 'react';
import PropTypes from 'prop-types';
import SoundCloud from '../../';

export default class CustomWidget extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    opts: PropTypes.array.isRequired,
  };

  componentDidUpdate() {
    // otherwise it would only update when `url` changes.
    this.refs.widget.forceUpdate();
  }

  render() {
    const opts = this.props.opts.reduce((all, param) => {
      return {
        ...all,
        [param.name]: param.toggled,
      };
    }, {});

    return (
      <SoundCloud
        url={this.props.url}
        id={this.props.id}
        opts={opts}
        ref="widget"
      />
    );
  }
}
