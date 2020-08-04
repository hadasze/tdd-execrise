import React from 'react';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import i18n from '../__mocks__/i18n';


async function fillPlayerNames({ getByPlaceholderText }) {
  const player1title = await getByPlaceholderText('Player 1 Name');
  const player2title = await getByPlaceholderText('Player 2 Name');

  await fireEvent.change(player1title, {target: {value: 'Jake'}});
  await fireEvent.change(player2title, {target: {value: 'Finn'}});

}

async function startGame({ getByText }) {
  const button = await getByText('Start game');
  await fireEvent.click(button);
}

async function clickCell({ getByTestId }, [x, y]) {
  const cell = await getByTestId(`cell-${x}-${y}`);
  await fireEvent.click(cell);
}

async function hasPlayerTitleActiveClass({ getByTestId }, playerIndex) {
  const playerName = await getByTestId(`player-${playerIndex}-title`);
  return playerName.classList.contains('active');
}

describe('App', () => {
  it('renders a title correctly', () => {
    const { getByTestId } = render(
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>,
    );

    expect(getByTestId('app-title').textContent).toBe('app.title');
  });

  it('renders bold active player name', async () => {
    const component = render(
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>,
    );

    await fillPlayerNames(component);
    await startGame(component);
    expect(await hasPlayerTitleActiveClass(component, 1)).toBe(true);
    await clickCell(component, [0, 0]);
    expect(await hasPlayerTitleActiveClass(component, 1)).toBe(false);
    await clickCell(component, [0, 1]);
    expect(await hasPlayerTitleActiveClass(component, 1)).toBe(true);

  });

});
