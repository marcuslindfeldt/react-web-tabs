import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const KeyCode = {
  END: 35,
  HOME: 36,
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39,
};

class Tab extends Component {
  constructor(props, context) {
    super(props, context);
    this.update = this.update.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    if (this.context.selection) {
      context.selection.register(props.tabFor);
    }
  }

  componentDidMount() {
    if (this.context.selection) {
      this.context.selection.subscribe(this.update);
    }
  }

  componentWillUnmount() {
    if (this.context.selection) {
      this.context.selection.unsubscribe(this.update);
      this.context.selection.unregister(this.props.tabFor);
    }
  }

  update({ focus } = {}) {
    this.forceUpdate();
    if (focus && this.context.selection.isSelected(this.props.tabFor)) {
      this.tab.focus();
    }
  }

  handleClick(event) {
    if (this.context.selection) {
      this.context.selection.select(this.props.tabFor);
    }

    if (this.props.onClick) {
      this.props.onClick(event);
    }
  }

  handleKeyDown(e) {
    switch (e.keyCode) {
      case KeyCode.LEFT_ARROW:
        this.context.selection.selectPrevious({ focus: true });
        break;
      case KeyCode.RIGHT_ARROW:
        this.context.selection.selectNext({ focus: true });
        break;
      case KeyCode.HOME:
        this.context.selection.selectFirst({ focus: true });
        break;
      case KeyCode.END:
        this.context.selection.selectLast({ focus: true });
        break;
      default:
    }
  }

  render() {
    const { tabFor, children, className, selected, ...props } = this.props;

    const isSelected = this.context.selection !== undefined ?
      this.context.selection.isSelected(tabFor) :
      selected;

    return (
      <button
        {...props}
        id={`${tabFor}-tab`}
        role="tab"
        aria-selected={isSelected}
        aria-controls={tabFor}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        tabIndex={isSelected ? '0' : '-1'}
        className={`rwt__tab ${className || ''}`}
        ref={(e) => { this.tab = e; }}
      >
        {children}
      </button>
    );
  }
}

Tab.contextTypes = {
  selection: React.PropTypes.object,
};

Tab.defaultProps = {
  className: '',
  selected: false,
  onClick: undefined,
};

Tab.propTypes = {
  tabFor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Tab;
