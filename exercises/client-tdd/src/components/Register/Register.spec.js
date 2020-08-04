import React from 'react';
import Register from './Register';
import { render, fireEvent } from '@testing-library/react';

function initComponent(spy) {
  return render(<Register onStart={spy} />);
}

function setPlayerNames(name1, name2, getByPlaceholderText) {
  const player1Input = getByPlaceholderText('Player 1 Name');
  const player2Input = getByPlaceholderText('Player 2 Name');
  fireEvent.change(player1Input, { target: { value: name1 } });
  fireEvent.change(player2Input, { target: { value: name2 } });
}

describe('Register component', () => {
  it('Should not call onStart in case one of the names are empty', () => {
    const spy = jest.fn();

    const { getByPlaceholderText, getByText } = initComponent(spy);

    const button = getByText(/start game/i);

    setPlayerNames('A', '', getByPlaceholderText);
    fireEvent.click(button);

    expect(spy).not.toHaveBeenCalled();

    setPlayerNames('Abc', 'Bac', getByPlaceholderText);
    fireEvent.click(button);

    expect(spy).toHaveBeenCalledWith('Abc', 'Bac');
  });

  it('should not allow names shorter than two characters', () => {
    const spy = jest.fn();

    const { getByPlaceholderText, getByText } = initComponent(spy);

    setPlayerNames('A', 'B', getByPlaceholderText);
    const button = getByText(/start game/i);
    fireEvent.click(button);

    expect(spy).not.toHaveBeenCalled();
  });

  it('should start the game when valid names are given', () => {
    const spy = jest.fn();

    const { getByPlaceholderText, getByText } = initComponent(spy);

    setPlayerNames('ABC', 'BCD', getByPlaceholderText);
    const button = getByText(/start game/i);
    fireEvent.click(button);

    expect(spy).toHaveBeenCalled();
  });
});
