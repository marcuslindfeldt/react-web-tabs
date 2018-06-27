import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabComponent from './TabComponent';
import withTabSelection from './withTabSelection';

export const KeyCode = {
  END: 35,
  HOME: 36,
  LEFT_ARROW: 37,
  UP_ARROW: 38,
  RIGHT_ARROW: 39,
  DOWN_ARROW: 40,
};

class Tab extends Component {
  static defaultProps = {
    className: '',
    selected: false,
    onClick: undefined,
  }

  static propTypes = {
    selection: PropTypes.shape({
      subscribe: PropTypes.func.isRequired,
      unsubscribe: PropTypes.func.isRequired,
      register: PropTypes.func.isRequired,
      unregister: PropTypes.func.isRequired,
      isSelected: PropTypes.func.isRequired,
      select: PropTypes.func.isRequired,
      selectNext: PropTypes.func.isRequired,
      selectPrevious: PropTypes.func.isRequired,
      selectFirst: PropTypes.func.isRequired,
      selectLast: PropTypes.func.isRequired,
      isVertical: PropTypes.func.isRequired,
    }).isRequired,
    tabFor: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    selected: PropTypes.bool,
    onClick: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    props.selection.register(props.tabFor);
  }

  componentDidMount() {
    this.props.selection.subscribe(this.update);
  }

  componentWillUnmount() {
    this.props.selection.unsubscribe(this.update);
    this.props.selection.unregister(this.props.tabFor);
  }

  update({ focus } = {}) {
    this.forceUpdate();
    if (focus && this.props.selection.isSelected(this.props.tabFor)) {
      this.tabComponent.focus();
    }
  }

  handleClick(event) {
    this.props.selection.select(this.props.tabFor);

    if (this.props.onClick) {
      this.props.onClick(event);
    }
  }

  handleKeyDown(e) {
    const verticalOrientation = this.props.selection.isVertical();
    if (e.keyCode === KeyCode.HOME) {
      this.props.selection.selectFirst({ focus: true });
    } else if (e.keyCode === KeyCode.END) {
      this.props.selection.selectLast({ focus: true });
    } else if (e.keyCode === KeyCode.LEFT_ARROW && !verticalOrientation) {
      this.props.selection.selectPrevious({ focus: true });
    } else if (e.keyCode === KeyCode.RIGHT_ARROW && !verticalOrientation) {
      this.props.selection.selectNext({ focus: true });
    } else if (e.keyCode === KeyCode.UP_ARROW && verticalOrientation) {
      e.preventDefault();
      this.props.selection.selectPrevious({ focus: true });
    } else if (e.keyCode === KeyCode.DOWN_ARROW && verticalOrientation) {
      e.preventDefault();
      this.props.selection.selectNext({ focus: true });
    }
  }

  render() {
    const { tabFor, children, className, ...props } = this.props;
    const isSelected = this.props.selection.isSelected(tabFor);

    return (
      <TabComponent
        {...props}
        tabFor={tabFor}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        selected={isSelected}
        className={className}
        tabRef={(e) => { this.tabComponent = e; }}
      >
        {children}
      </TabComponent>
    );
  }
}


export default withTabSelection(Tab);
