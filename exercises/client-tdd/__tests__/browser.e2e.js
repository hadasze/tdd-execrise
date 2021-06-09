function getElementText(selector) {
  return page.$eval(selector, element => element.innerText);
}

function navigate() {
  return page.goto(app.getUrl('/'));
}

async function fillInForm(player1, player2) {
  await page.type('#player-1-input', player1);
  await page.type('#player-2-input', player2);
}

async function getPlayerNamesFromTitle() {
  const player1Title = await getElementText('#player-1-title');
  const player2Title = await getElementText('#player-2-title');
  return [player1Title, player2Title];
}

function clickStart() {
  return page.click('#start-game');
}

function clickCellAt(rowIndex, colIndex) {
  return page.click(`[data-hook="cell-${rowIndex}-${colIndex}"]`);
}

function getCellValueAt(rowIndex, colIndex) {
  return getElementText(`[data-hook="cell-${rowIndex}-${colIndex}"]`);
}

function randPlayersNames(){
  var Chance = require('chance');
  var chance = new Chance();
  var randPlayer1 = chance.string();
  var randPlayer2 = chance.string();
  return { randPlayer1, randPlayer2 };
}

describe('Tic tac to game', () => {

  it('Should register both players and add them to title', async () => {
    await navigate();
    const { randPlayer1, randPlayer2 } = randPlayersNames();
    await fillInForm(randPlayer1, randPlayer2);
    await clickStart();

    expect(await getPlayerNamesFromTitle()).toEqual([randPlayer1, randPlayer2]);
  });

  it('Should mark cells with X and O', async () => {
    await navigate();
    const { randPlayer1, randPlayer2 } = randPlayersNames();
    await fillInForm(randPlayer1, randPlayer2);
    await clickStart();

    await clickCellAt(0, 0);
    expect(await getCellValueAt(0, 0)).toBe('X');
    await clickCellAt(1, 0);
    expect(await getCellValueAt(1, 0)).toBe('O');
  });

  it('Should play a full game an announce a winner', async () => {
    await navigate();
    const { randPlayer1, randPlayer2 } = randPlayersNames();
    await fillInForm(randPlayer1, randPlayer2);
    await clickStart();

    await clickCellAt(0, 0);
    await clickCellAt(1, 0);
    await clickCellAt(0, 1);
    await clickCellAt(1, 1);
    await clickCellAt(0, 2);

    expect(await getElementText('#winner')).toBe('X');
  });
});
