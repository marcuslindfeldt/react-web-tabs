import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabSelection from './TabSelection';


export const TabSelectionContext = React.createContext({
  selection: {},
});

class TabProvider extends Component {
  static defaultProps = {
    defaultTab: undefined,
    onChange: undefined,
    vertical: false,
    collapsible: false,
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    defaultTab: PropTypes.string,
    vertical: PropTypes.bool,
    collapsible: PropTypes.bool,
    onChange: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.selection = new TabSelection({
      defaultTab: props.defaultTab,
      vertical: props.vertical,
      collapsible: props.collapsible,
      onChange: props.onChange,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.defaultTab !== nextProps.defaultTab && !this.selection.isSelected(nextProps.defaultTab)) {
      this.selection.select(nextProps.defaultTab);
    }
  }

  render() {
    const { children } = this.props;
    return (
      <TabSelectionContext.Provider value={this.selection}>
        {children}
      </TabSelectionContext.Provider>
    );
  }
}

export default TabProvider;
