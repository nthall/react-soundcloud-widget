/**
 * Module dependencies
 */

import React from 'react';
import PropTypes from 'prop-types';
import createWidget from './lib/createWidget';

/**
 * Create a new `SoundCloud` component.
 *
 * This is essentially a glorified wrapper over the existing
 * HTML5 widget from SoundCloud. Programmatic control not included.
 *
 * NOTE: Changing `props.url` will cause the component to load it.
 * Unfortunately, SoundCloud adds an entry to `window.history` every time
 * a new url is loaded, so changing `props.url` __will__ break the back button.
 */

class SoundCloud extends React.Component {

  /**
   * @param {Object} props
   */

  constructor(props) {
    super(props);
    this._internalWidget = null;
  }

  componentDidMount() {
    this._createWidget();
  }

  /**
   * @param {Object} nextProps
   * @returns {Boolean}
   */

  shouldComponentUpdate(nextProps) {
    return nextProps.url !== this.props.url;
  }

  componentDidUpdate() {
    this._reloadWidget();
  }

  componentWillUnmount() {
    this._unbindEvents();
  }

  /**
   * Called on the initial render, this uses the rendered iframe
   * as a base for creating a new `_internalWidget`.
   */

  _createWidget() {
    createWidget(this.props.id, (widget) => {
      this._setupWidget(widget);
      this._reloadWidget();
    });
  }

  /**
   * Integrate a newly created `widget` with the rest of the component.
   *
   * @param {Object} Widget
   */

  _setupWidget(widget) {
    this._internalWidget = widget;
    this._bindEvents();
  }

  /**
   * This is the only way to manipulate the embedded iframe, it's essentially
   * refreshed and reloaded.
   *
   * NOTE: SoundCloud adds an entry to `window.history` after reloading. This is
   * __really__ annoying, but unavoidable at the moment, so basically every
   * time the url changes it breaks the back button. Super bummer.
   */

  _reloadWidget() {
    this._internalWidget.load(this.props.url, this.props.opts);
  }

  /**
   * Listen for events coming from `widget`, and pass them up the
   * chain to the parent component if needed.
   */

  _bindEvents() {
    this._internalWidget.bind(window.SC.Widget.Events.PLAY, this.props.onPlay);
    this._internalWidget.bind(window.SC.Widget.Events.PAUSE, this.props.onPause);
    this._internalWidget.bind(window.SC.Widget.Events.FINISH, this.props.onEnd);
  }

  /**
   * Remove all event bindings.
   */

  _unbindEvents() {
    this._internalWidget.unbind(window.SC.Widget.Events.PLAY);
    this._internalWidget.unbind(window.SC.Widget.Events.PAUSE);
    this._internalWidget.unbind(window.SC.Widget.Events.FINISH);
  }

  /**
   * @returns {Object}
   */

  render() {
    return (
      <iframe id={this.props.id}
              width="100%"
              height={this.props.height || (this.props.opts.visual ? '450' : '166')}
              scrolling="no"
              frameBorder="no"
              src="https://w.soundcloud.com/player/?url="
      />
    );
  }
}

SoundCloud.propTypes = {
  // url to play. It's kept in sync, changing it will
  // cause the widget to refresh and play the new url.
  url: PropTypes.string.isRequired,

  // custom ID for widget iframe element
  id: PropTypes.string,

  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),

  // widget parameters: appearance, auto play, and callback for SC.Widget.load()
  opts: PropTypes.shape({
    auto_play: PropTypes.bool,
    visual: PropTypes.bool,
    buying: PropTypes.bool,
    liking: PropTypes.bool,
    download: PropTypes.bool,
    sharing: PropTypes.bool,
    show_artwork: PropTypes.bool,
    show_comments: PropTypes.bool,
    show_playcount: PropTypes.bool,
    show_user: PropTypes.bool,
    show_reposts: PropTypes.bool,
    hide_related: PropTypes.bool,
    callback: PropTypes.func
  }),

  // event subscriptions
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onEnd: PropTypes.func,
};

SoundCloud.defaultProps = {
  id: 'react-sc-widget',
  opts: {},
  onPlay: () => {},
  onPause: () => {},
  onEnd: () => {},
};

/**
 * Expose `SoundCloud` component
 */

export default SoundCloud;
