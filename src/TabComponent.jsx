import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TabComponent extends Component {
  static defaultProps = {
    className: '',
    selected: false,
    focusable: false,
    onClick: undefined,
    onKeyDown: undefined,
    tabRef: undefined,
  }

  static propTypes = {
    tabFor: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    selected: PropTypes.bool,
    focusable: PropTypes.bool,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    tabRef: PropTypes.func,
  }

  handleClick = (e) => {
    const { onClick } = this.props;
    if (onClick) onClick(e);
  }

  handleKeyDown = (e) => {
    const { onKeyDown } = this.props;
    if (onKeyDown) onKeyDown(e);
  }

  render() {
    const { tabFor, children, className, selected, focusable, tabRef, ...props } = this.props;

    return (
      <button
        {...props}
        id={`${tabFor}-tab`}
        role="tab"
        aria-selected={selected}
        aria-controls={tabFor}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        tabIndex={focusable || selected ? '0' : '-1'}
        className={`rwt__tab ${className || ''}`}
        ref={tabRef}
      >
        {children}
      </button>
    );
  }

}

export default TabComponent;
