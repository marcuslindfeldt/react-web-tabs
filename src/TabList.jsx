import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabListComponent from './TabListComponent';
import withTabSelection from './withTabSelection';

class TabList extends Component {
  static defaultProps = {
    className: '',
  }

  static propTypes = {
    selection: PropTypes.shape({
      isVertical: PropTypes.func.isRequired,
    }).isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
  }

  render() {
    const { selection, children, className, ...props } = this.props;
    const verticalOrientation = selection.isVertical();

    return (
      <TabListComponent
        {...props}
        verticalOrientation={verticalOrientation}
        className={className}
      >
        {children}
      </TabListComponent>
    );
  }
}


export default withTabSelection(TabList);
