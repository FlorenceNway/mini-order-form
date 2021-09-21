import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Preview from './Preview';

const back = jest.fn();

const data = {
  Name: 'flo',
  Email: 'flo@email.com',
  Service: 'Other',
};
describe('renders preview page', () => {
  beforeEach(() => render(<Preview previewData={data} back={back} />));

  test('have 3 list items', () => {
    const previewList = screen.getAllByRole('listitem');
    expect(previewList.length).toBe(3);
    expect(previewList[0].textContent).toBe('Name: flo');
    expect(previewList[1].textContent).toBe('Email: flo@email.com');
    expect(previewList[2].textContent).toBe('Service: Other');
  });

  test('click confirm and go to confirmation page', () => {
    screen.getByRole('button', { name: /confirm/i, hidden: true });
    const confirmBtn = screen.getByRole('button', { name: /confirm/i, hidden: true });
    userEvent.click(confirmBtn);
    screen.getByText(/submitted/i);
  });
});
