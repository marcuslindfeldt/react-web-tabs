import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* eslint-disable no-nested-ternary */
class TabPanelComponent extends Component {
  static defaultProps = {
    className: '',
    component: null,
    children: null,
    render: null,
    selected: false,
  }

  static propTypes = {
    tabId: PropTypes.string.isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.func,
    render: PropTypes.func,
    selected: PropTypes.bool,
  }

  render() {
    const {
      component,
      render,
      tabId,
      children,
      className,
      selected,
      ...props
    } = this.props;

    const childProps = { selected };
    return (
      <div
        {...props}
        id={tabId}
        role="tabpanel"
        aria-expanded={selected}
        aria-hidden={!selected}
        aria-labelledby={`${tabId}-tab`}
        hidden={!selected}
        className={`rwt__tabpanel ${className || ''}`}
      >
        {component ? (
          React.createElement(component, childProps)
        ) : render ? (
          render(childProps) : null
        ) : children ? (
          children : null
        ) : null}
      </div>
    );
  }

}

export default TabPanelComponent;
