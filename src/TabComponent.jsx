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

  render() {
    const {
      tabFor,
      children,
      className,
      selected,
      focusable,
      tabRef,
      onClick,
      onKeyDown,
      ...props
    } = this.props;

    return (
      <button
        {...props}
        id={`${tabFor}-tab`}
        role="tab"
        aria-selected={selected}
        aria-controls={tabFor}
        onClick={onClick}
        onKeyDown={onKeyDown}
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
