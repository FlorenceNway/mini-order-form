import React from 'react';
import { screen, render } from '@testing-library/react';
import App from './App';

describe('testing', () => {
  render(<App />);

  test('renders text', () => {
    screen.getByText(/Where/);
  });
});
