import React from 'react';
import PropTypes from 'prop-types';

const TabList = ({ children, className, ...props }) => (
  <div {...props} role="tablist" className={`rwt__tablist ${className || ''}`}>
    {children}
  </div>
);

TabList.defaultProps = {
  className: '',
};

TabList.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default TabList;
