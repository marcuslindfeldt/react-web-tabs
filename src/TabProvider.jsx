import { Component } from 'react';
import PropTypes from 'prop-types';
import TabSelection from './TabSelection';

class TabProvider extends Component {
  static childContextTypes = {
    selection: PropTypes.object,
  }

  static defaultProps = {
    defaultTab: undefined,
    onChange: undefined,
    vertical: false,
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    defaultTab: PropTypes.string,
    vertical: PropTypes.bool,
    onChange: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.selection = new TabSelection({
      defaultTab: props.defaultTab,
      vertical: props.vertical,
      onChange: props.onChange,
    });
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
