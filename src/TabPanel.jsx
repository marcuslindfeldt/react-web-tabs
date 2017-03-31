import React, { PropTypes, Component } from 'react';

class TabPanel extends Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    if (this.context.selection) {
      this.context.selection.subscribe(this.update);
    }
  }

  componentWillUnmount() {
    if (this.context.selection) {
      this.context.selection.unsubscribe(this.update);
    }
  }

  update() {
    this.forceUpdate();
  }

  render() {
    const { tabId, children, selected, className, ...props } = this.props;
    const isSelected = this.context.selection !== undefined ?
      this.context.selection.isSelected(tabId) :
      selected;

    return (
      <div
        {...props}
        id={tabId}
        role="tabpanel"
        aria-expanded={isSelected}
        aria-hidden={!isSelected}
        aria-labelledby={`${tabId}-tab`}
        hidden={!isSelected}
        className={`rwt__tabpanel ${className || ''}`}
      >
        {children}
      </div>
    );
  }
}

TabPanel.contextTypes = {
  selection: React.PropTypes.object,
};

TabPanel.defaultProps = {
  selected: false,
  className: '',
};

TabPanel.propTypes = {
  tabId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  selected: PropTypes.bool,
};

export default TabPanel;
