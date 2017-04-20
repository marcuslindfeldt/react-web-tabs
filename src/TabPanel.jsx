import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* eslint-disable no-nested-ternary */
class TabPanel extends Component {
  static contextTypes = {
    selection: PropTypes.object,
  }

  static defaultProps = {
    selected: false,
    className: '',
    component: null,
    children: null,
    render: null,
  }

  static propTypes = {
    tabId: PropTypes.string.isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
    selected: PropTypes.bool,
    component: PropTypes.func,
    render: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    if (this.context.selection) {
      this.context.selection.subscribe(this.update);
    }
  }

  componentWillUnmount() {
    if (this.context.selection) {
      this.context.selection.unsubscribe(this.update);
    }
  }

  update() {
    this.forceUpdate();
  }

  render() {
    const {
      component,
      render,
      tabId,
      children,
      selected,
      className,
      ...props
    } = this.props;

    const isSelected = this.context.selection !== undefined ?
      this.context.selection.isSelected(tabId) :
      selected;

    const childProps = { selected: isSelected };

    return (
      <div
        {...props}
        id={tabId}
        role="tabpanel"
        aria-expanded={isSelected}
        aria-hidden={!isSelected}
        aria-labelledby={`${tabId}-tab`}
        hidden={!isSelected}
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

export default TabPanel;
