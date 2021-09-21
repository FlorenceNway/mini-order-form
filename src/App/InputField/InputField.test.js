import React from 'react';
import * as Yup from 'yup';
import {
  screen, render, waitFor, fireEvent, act,
} from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import InputField from './InputField';

const ValidationSchema = Yup.object({
  Name: Yup.string()
    .min(2, 'Name is too Short!')
    .max(25, 'Name is too Long!')
    .matches(/^[a-zA-Z]+$/, 'Please enter valid name')
    .required('Required'),
});

const handleSubmit = jest.fn();
const props = {
  back: undefined,
  data: { Name: '', Email: '', Service: '' },
  id: 'customer-name',
  name: 'Name',
  next: jest.fn(),
  question: 'What is your name?',
  title: 'Name',
  validationSchema: ValidationSchema,
};

describe('renders preview page', () => {
  beforeEach(() => render(<InputField {...props} onSubmit={handleSubmit} />));

  test('type name', () => {
    const nameInput = screen.getByLabelText(/Name/i);
    userEvent.type(nameInput, 'John');
    expect(nameInput.value).toBe('John');
  });

  test('submit', async () => {
    const nameInput = screen.getByLabelText(/Name/i);

    act(() => {
      fireEvent.change(nameInput, {
        target: {
          value: 'Charles',
        },
      });
    });
    userEvent.click(screen.getByRole('button', { name: /next/i }));
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(1));
  });
});
