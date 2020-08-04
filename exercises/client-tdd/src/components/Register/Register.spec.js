import React from 'react';
import Register from './Register';
import { render, fireEvent } from '@testing-library/react';
import s from './Register.scss';

describe('Register component', () => {
  it('Should not call onStart in case one of the names are empty', () => {
    const spy = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <Register onStart={spy} />,
    );

    const player1Input = getByPlaceholderText('Player 1 Name');
    const player2Input = getByPlaceholderText('Player 2 Name');
    const button = getByText(/start game/i);

    fireEvent.change(player1Input, { target: { value: 'AA' } });
    fireEvent.click(button);

    expect(spy).not.toHaveBeenCalled();

    fireEvent.change(player2Input, { target: { value: 'BB' } });
    fireEvent.click(button);

    expect(spy).toHaveBeenCalledWith('AA', 'BB');
  });

  it('Should highlight inputs with invalid data', () => {
    const { getByPlaceholderText, getByText } = render(
      <Register onStart={() => {}} />,
    );

    const player1Input = getByPlaceholderText('Player 1 Name');
    const player2Input = getByPlaceholderText('Player 2 Name');

    fireEvent.change(player1Input, { target: { value: 'A' } });
    fireEvent.change(player2Input, { target: { value: 'ABCDEabcdeABCDEabcdef' } });

    expect(player1Input.classList.contains(s.invalid)).toBe(true);
    expect(player2Input.classList.contains(s.invalid)).toBe(true);

    fireEvent.change(player1Input, { target: { value: 'Abcde' } });

    expect(player1Input.classList.contains(s.invalid)).toBe(false);
  });

});
