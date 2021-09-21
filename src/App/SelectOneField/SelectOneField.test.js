import React from 'react';
import * as Yup from 'yup';
import {
  screen, render, fireEvent, waitFor,
} from '@testing-library/react';
import SelectOneField from './SelectOneField';


const handleSubmit = jest.fn();

describe('renders service questions', () => {
  beforeEach(() => {
    const ValidationSchema = Yup.object({
      Service: Yup.string().required('Choose one'),
    });
    const props = {
      back: jest.fn(),
      data: { Name: '', Email: '', Service: '' },
      options: ['STI Testing', 'Contraception', 'Other'],
      name: 'Service',
      next: jest.fn(),
      question: 'What service are you here for?',
      title: 'Service',
      validationSchema: ValidationSchema,
    };

    render(<SelectOneField {...props} onSubmit={handleSubmit} />);
  });

  test('Choose service', async () => {
    const service = screen.getByLabelText(/STI/i);
    fireEvent.change(service, { target: { value: 'Other' } });
    expect(service.value).toBe('Other');

    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(1));
  });
});
