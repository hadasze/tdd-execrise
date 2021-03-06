import React from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import Board from '../Board/Board'
import i18n from '../__mocks__/i18n';
// import {handleCellClick} from './App'

describe('App', () => {
  it('renders a title correctly', () => {
    const { getByTestId, } = render(
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>,
    );
    expect(getByTestId('app-title').textContent).toBe('app.title');
  });

  it('should not dispaly winner name if no one won yet', () => {
    const { container, getByTestId, } = render(
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>,
    );
    const player = container.querySelector("#winner-name");
    expect(player.innerHTML).toBe("");  });


});
