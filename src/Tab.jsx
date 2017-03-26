import React, { PropTypes, Component } from 'react';

class Tab extends Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleClick(event) {
    if (this.context.selection) {
      this.context.selection.select(this.props.tabFor);
    }

    if (this.props.onClick) {
      this.props.onClick(event);
    }
  }

  render() {
    const { tabFor, children, className, selected, ...props } = this.props;

    const isSelected = this.context.selection !== undefined ?
      this.context.selection.isSelected(tabFor) :
      selected;

    return (
      <button
        {...props}
        id={`${tabFor}-tab`}
        role="tab"
        aria-expanded={isSelected}
        aria-selected={isSelected}
        aria-controls={tabFor}
        onClick={this.handleClick}
        className={`rwt__tab ${className}`}
      >
        {children}
      </button>
    );
  }
}

Tab.contextTypes = {
  selection: React.PropTypes.object,
};

Tab.defaultProps = {
  className: '',
  selected: false,
  onClick: undefined,
};

Tab.propTypes = {
  tabFor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Tab;
