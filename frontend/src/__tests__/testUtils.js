import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from '../store';
import testState from './testState';

const Wrapper = ({ children }) => <Provider store={configureStore(testState)}>{children}</Provider>;

const customRender = (ui, options) => render(ui, { wrapper: Wrapper, ...options });

export * from '@testing-library/react';

export { customRender as render };