import React from 'react';
import Register from './Register';
import { render, fireEvent } from '@testing-library/react';

export function renderRegister(){
  const spy = jest.fn();

  const { container, getByPlaceholderText, getByText } = render(
    <Register onStart={spy} />,);
  return { container, spy, getByPlaceholderText, getByText };
  }

export function getPlayersNames(container) {
  const player1Input = container.querySelector("#player-1-input").value;
  const player2Input = container.querySelector("#player-2-input").value;
  return { player1Input, player2Input };
}

export function randPlayersNames(){
  var Chance = require('chance');
  var chance = new Chance();
  var randPlayer1 = chance.string();
  var randPlayer2 = chance.string();
  return { randPlayer1, randPlayer2 };
}
