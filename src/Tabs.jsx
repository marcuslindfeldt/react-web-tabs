import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabProvider from './TabProvider';

class Tabs extends Component {
  static defaultProps = {
    defaultTab: undefined,
    className: '',
    vertical: false,
    onChange: undefined,
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    defaultTab: PropTypes.string,
    className: PropTypes.string,
    vertical: PropTypes.bool,
    onChange: PropTypes.func,
  }

  render() {
    const { children, defaultTab, onChange, vertical, className, ...props } = this.props;
    return (
      <TabProvider defaultTab={defaultTab} onChange={onChange} vertical={vertical}>
        <div {...props} data-rwt-vertical={vertical} className={`rwt__tabs ${className || ''}`}>
          {children}
        </div>
      </TabProvider>
    );
  }
}

export default Tabs;
