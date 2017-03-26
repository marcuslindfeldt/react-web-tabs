import React, { PropTypes, Component } from 'react';
import TabSelection from './TabSelection';

class TabProvider extends Component {
  constructor(props) {
    super(props);

    this.selection = new TabSelection(props.defaultTab, props.onChange);
  }

  getChildContext() {
    return {
      selection: this.selection,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.selection.selected !== nextProps.defaultTab) {
      this.selection.select(nextProps.defaultTab);
    }
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

TabProvider.childContextTypes = {
  selection: React.PropTypes.object,
};

TabProvider.defaultProps = {
  defaultTab: undefined,
  onChange: undefined,
};

TabProvider.propTypes = {
  children: PropTypes.node.isRequired,
  defaultTab: PropTypes.string,
  onChange: PropTypes.func,
};

export default TabProvider;
