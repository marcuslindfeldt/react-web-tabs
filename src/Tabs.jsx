import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabProvider from './TabProvider';

class Tabs extends Component {
  static defaultProps = {
    defaultTab: undefined,
    className: '',
    vertical: false,
    collapsible: false,
    onChange: undefined,
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    defaultTab: PropTypes.string,
    className: PropTypes.string,
    vertical: PropTypes.bool,
    collapsible: PropTypes.bool,
    onChange: PropTypes.func,
  }

  render() {
    const {
      children,
      defaultTab,
      onChange,
      vertical,
      collapsible,
      className,
      ...props
    } = this.props;

    return (
      <TabProvider
        defaultTab={defaultTab}
        onChange={onChange}
        vertical={vertical}
        collapsible={collapsible}
      >
        <div {...props} data-rwt-vertical={vertical} className={`rwt__tabs ${className || ''}`}>
          {children}
        </div>
      </TabProvider>
    );
  }
}

export default Tabs;
