import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { TabProvider } from '../';
import withTabSelection from '../withTabSelection';

Enzyme.configure({ adapter: new Adapter() });

const Foo = () => (
  <p>Foo</p>
);

test('<WrappedComponent /> should exist', () => {
  const WrappedComponent = withTabSelection(Foo);
  const wrappedComponent = mount((
    <TabProvider>
      <div>
        <WrappedComponent />
      </div>
    </TabProvider>
  ));

  expect(wrappedComponent).toBeDefined();
});

test('<WrappedComponent /> should return WrappedComponent', () => {
  const WrappedComponent = withTabSelection(Foo);

  expect(WrappedComponent.WrappedComponent).toEqual(Foo);
});

test('<WrappedComponent /> should set correct displayName', () => {
  const WrappedComponent = withTabSelection(Foo);

  expect(WrappedComponent.displayName).toEqual('withTabSelection(Foo)');
});
