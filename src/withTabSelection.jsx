import React from 'react';
import { TabSelectionContext } from './TabProvider';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const withTabSelection = (Component) => {
  const TabSelectionComponent = props => (
    <TabSelectionContext.Consumer>
      {selection => <Component {...props} selection={selection} />}
    </TabSelectionContext.Consumer>
  );
  TabSelectionComponent.WrappedComponent = Component;
  TabSelectionComponent.displayName = `withTabSelection(${getDisplayName(Component)})`;
  return TabSelectionComponent;
};

export default withTabSelection;
