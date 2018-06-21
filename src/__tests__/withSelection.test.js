import React from 'react';
import { mount } from 'enzyme';

import { TabProvider } from '../';
import withTabSelection from '../withTabSelection';

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
