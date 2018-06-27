import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabPanelComponent from './TabPanelComponent';
import withTabSelection from './withTabSelection';

/* eslint-disable no-nested-ternary */
class TabPanel extends Component {
  static propTypes = {
    selection: PropTypes.shape({
      subscribe: PropTypes.func.isRequired,
      unsubscribe: PropTypes.func.isRequired,
      isSelected: PropTypes.func.isRequired,
    }).isRequired,
    tabId: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.props.selection.subscribe(this.update);
  }

  componentWillUnmount() {
    this.props.selection.unsubscribe(this.update);
  }

  update() {
    this.forceUpdate();
  }

  render() {
    const {
      tabId,
      ...props
    } = this.props;

    const selected = this.props.selection.isSelected(tabId);

    return (
      <TabPanelComponent
        tabId={tabId}
        selected={selected}
        {...props}
      />
    );
  }
}

export default withTabSelection(TabPanel);
