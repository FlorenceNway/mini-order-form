import React from 'react';
import { screen, render } from '@testing-library/react';
import Confirmation from './Confirmation';

describe('renders confirmatin page', () => {
  render(<Confirmation />);

  test('renders confirmation page', () => {
    screen.getByText(/submitted/);
  });
});
