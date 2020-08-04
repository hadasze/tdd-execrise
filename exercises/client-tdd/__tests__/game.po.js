export function getElementText(selector) {
  return page.$eval(selector, (element) => element.innerText);
}

export default class GamePO {
  async navigate() {
    return page.goto(app.getUrl('/'));
  }

  async getPlayerTitle(playerNum) {
    return getElementText(`#player-${playerNum}-title`);
  }

  async fillInForm(player1Name, player2Name) {
    const player1InputTag = '#player-1-input';
    const player2InputTag = '#player-2-input';

    const promises = [
      page.waitForSelector(player1InputTag),
      page.waitForSelector(player2InputTag),
    ];
    await Promise.all(promises);

    await page.type('#player-1-input', player1Name);
    await page.type('#player-2-input', player2Name);
  }

  _getCellSelector(rowIndex, colIndex) {
    return `[data-hook="cell-${rowIndex}-${colIndex}"]`;
  }

  async clickStart() {
    await page.click('#start-game');
    await page.waitForSelector(this._getCellSelector(0, 0));
  }

  async clickCellAt(rowIndex, colIndex) {
    return page.click(this._getCellSelector(rowIndex, colIndex));
  }

  async getCellValueAt(rowIndex, colIndex) {
    return getElementText(this._getCellSelector(rowIndex, colIndex));
  }

  async saveGame() {
    return page.click('[data-hook="save"]');
  }

  async loadGame() {
    return page.click('[data-hook="load"]');
  }

  async getLeaderBoard() {
    const table = await page.$$eval('[data-hook="leaderboard"] tr', (rows) => {
      return Array.from(rows, (row) => {
        const columns = row.querySelectorAll('td');
        return Array.from(columns, (column) => column.innerText);
      });
    });

    return table.splice(1);
  }
}
