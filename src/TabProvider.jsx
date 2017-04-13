import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabSelection from './TabSelection';

class TabProvider extends Component {
  static childContextTypes = {
    selection: React.PropTypes.object,
  }

  static defaultProps = {
    defaultTab: undefined,
    onChange: undefined,
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    defaultTab: PropTypes.string,
    onChange: PropTypes.func,
  }

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
    if (!this.selection.isSelected(nextProps.defaultTab)) {
      this.selection.select(nextProps.defaultTab);
    }
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

export default TabProvider;
