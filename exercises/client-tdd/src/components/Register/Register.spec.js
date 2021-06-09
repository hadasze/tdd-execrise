import React from 'react';
import Register from './Register';
import { render, fireEvent } from '@testing-library/react';
import { DriverRegister } from './DriverRegister';

function renderRegister(){
  const spy = jest.fn();

  const { container, getByPlaceholderText, getByText } = render(
    <Register onStart={spy} />,);
  return { container, spy, getByPlaceholderText, getByText };
  }

function getPlayersNames(container) {
  const player1Input = container.querySelector("#player-1-input").value;
  const player2Input = container.querySelector("#player-2-input").value;
  return { player1Input, player2Input };
}

function enter2PlayersNames(container) {
  const { randPlayer1, randPlayer2 } = randPlayersNames();
  container.querySelector("#player-1-input").value = randPlayer1;
  container.querySelector("#player-2-input").value = randPlayer2;
  return { randPlayer1, randPlayer2 };
}

function randPlayersNames(){
  var Chance = require('chance');
  var chance = new Chance();
  var randPlayer1 = chance.string();
  var randPlayer2 = chance.string();
  return { randPlayer1, randPlayer2 };
}

describe('Register component', () => {
  it('should start with emty players names', () => {
    const { container } = renderRegister();
    const { player1Input, player2Input } = getPlayersNames(container);

    expect(player1Input).toBe('');
    expect(player2Input).toBe('');
  });

  it('should show players names after game started', () => {
    const { container } = renderRegister();

    const { randPlayer1, randPlayer2 } = enter2PlayersNames(container);

    expect(randPlayer1).toBe(container.querySelector("#player-1-input").value);
    expect(randPlayer2).toBe(container.querySelector("#player-2-input").value);
  });


  it('Should not call onStart in case one of the names are empty', () => {
    const spy = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <Register onStart={spy} />,
    );

    const player1Input = getByPlaceholderText('Player 1 Name');
    const player2Input = getByPlaceholderText('Player 2 Name');
    const button = getByText(/start game/i);

    fireEvent.change(player1Input, { target: { value: 'A' } });
    fireEvent.click(button);

    expect(spy).not.toHaveBeenCalled();

    fireEvent.change(player2Input, { target: { value: 'B' } });
    fireEvent.click(button);

    expect(spy).toHaveBeenCalledWith('A', 'B');
  });
});
