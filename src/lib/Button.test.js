import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

const onClick = jest.fn();
let button;

describe('<Button />', () => {
  beforeEach(() => {
    render(<Button onClick={onClick} testId={'testId'} text={'text'} />);

    button = screen.getByTestId('testId');
  });

  afterEach(() => {
    button = null;
  });

  test('Button click calls onClick function', () => {
    userEvent.click(button);
    expect(onClick.mock.calls.length).toEqual(1);
  });

  test('Button has text', () => {
    const text = screen.getByText(/text/);
    expect(text).toBeDefined();
  });
});
