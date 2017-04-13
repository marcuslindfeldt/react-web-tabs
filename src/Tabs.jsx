import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabProvider from './TabProvider';

class Tabs extends Component {
  static defaultProps = {
    defaultTab: undefined,
    className: '',
    onChange: undefined,
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    defaultTab: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
  }

  render() {
    const { children, defaultTab, onChange, className, ...props } = this.props;
    return (
      <TabProvider defaultTab={defaultTab} onChange={onChange}>
        <div className={`rwt__tabs ${className || ''}`} {...props}>
          {children}
        </div>
      </TabProvider>
    );
  }
}

export default Tabs;
