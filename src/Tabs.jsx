import React from 'react';
import PropTypes from 'prop-types';
import TabProvider from './TabProvider';

const Tabs = ({ children, defaultTab, onChange, className, ...props }) => (
  <TabProvider defaultTab={defaultTab} onChange={onChange}>
    <div className={`rwt__tabs ${className || ''}`} {...props}>
      {children}
    </div>
  </TabProvider>
);

Tabs.defaultProps = {
  defaultTab: undefined,
  className: '',
  onChange: undefined,
};

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
  defaultTab: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

export default Tabs;
