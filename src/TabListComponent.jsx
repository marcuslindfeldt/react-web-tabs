import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* eslint-disable jsx-a11y/role-supports-aria-props */
class TabListComponent extends Component {
  static defaultProps = {
    className: '',
    verticalOrientation: false,
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    verticalOrientation: PropTypes.bool,
  }

  render() {
    const { children, className, verticalOrientation, ...props } = this.props;

    return (
      <div
        {...props}
        role="tablist"
        aria-orientation={verticalOrientation ? 'vertical' : ''}
        className={`rwt__tablist ${className || ''}`}
      >
        {children}
      </div>
    );
  }

}

export default TabListComponent;
