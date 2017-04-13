import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TabList extends Component {
  static defaultProps = {
    className: '',
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
  }

  render() {
    const { children, className, ...props } = this.props;
    return (
      <div {...props} role="tablist" className={`rwt__tablist ${className || ''}`}>
        {children}
      </div>
    );
  }
}


export default TabList;
