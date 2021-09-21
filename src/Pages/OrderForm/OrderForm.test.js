import React from 'react';
import {
  screen, render, fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OrderForm from './OrderForm';

describe('renders order form', () => {
  beforeEach(() => render(<OrderForm />));

  test('Component should render step by step', async () => {
    const nameInput = screen.getByLabelText(/name/i);
    userEvent.type(nameInput, 'John');
    expect(nameInput.value).toBe('John');

    fireEvent.click(await screen.findByRole('button', { name: /next/i }));

    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, 'John@email.com');
    expect(emailInput.value).toBe('John@email.com');

    fireEvent.click(await screen.findByRole('button', { name: /next/i }));

    const service = screen.getByLabelText(/STI/i);
    fireEvent.change(service, { target: { value: 'Other' } });
    expect(service.value).toBe('Other');

    fireEvent.click(await screen.findByRole('button', { name: /next/i }));
  });
});
