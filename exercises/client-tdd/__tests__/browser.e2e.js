function getElementText(selector) {
  return page.$eval(selector, element => element.innerText);
}

function navigate() {
  return page.goto(app.getUrl('/'));
}

async function fillInForm() {
  await page.type('#player-1-input', 'Sapir');
  await page.type('#player-2-input', 'Yoshi');
}

async function fillInFormWithNames(player1, player2) {
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

async function clickSequence(sequence) {
  for(let i = 0; i < sequence.length; i++) {
    let [x, y] = sequence[i];
    await clickCellAt(x, y);
  }
}

async function makeXWinGame() {
  return clickSequence([
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
    [0, 2],
  ]);
}

async function playDraw() {
  return clickSequence([
    [0, 0],
    [2, 2],
    [1, 0],
    [2, 0],
    [2, 1],
    [1, 1],
    [0, 2],
    [0, 1],
    [1, 2]
  ]);
}

function getCellValueAt(rowIndex, colIndex) {
  return getElementText(`[data-hook="cell-${rowIndex}-${colIndex}"]`);
}

async function getStatusText() {
  return getElementText('#game-status');
}

describe('Tic tac to game', () => {
  it('Should register both players and add them to title', async () => {
    await navigate();
    await fillInForm();

    expect(await getPlayerNamesFromTitle()).toEqual(['', '']);

    await clickStart();

    expect(await getPlayerNamesFromTitle()).toEqual(['Sapir', 'Yoshi']);
  });

  it('Should mark cells with X and O', async () => {
    await navigate();
    await fillInForm();
    await clickStart();

    await clickCellAt(0, 0);
    expect(await getCellValueAt(0, 0)).toBe('X');

    await clickCellAt(1, 0);
    expect(await getCellValueAt(1, 0)).toBe('O');
  });

  it('Should play a full game an announce a winner name', async () => {
    await navigate();
    await fillInForm();
    await clickStart();
    await makeXWinGame();

    expect(await getElementText('#winner')).toBe('Sapir');
  });

  it('Should not change previosly chosen cells', async () => {
    await navigate();
    await fillInForm();
    await clickStart();

    await clickSequence([
      [0, 0],
      [0, 0],
    ]);

    expect(await getCellValueAt(0, 0)).toBe('X');
  });

  it('Should play a full game and display round draw', async () => {
    await navigate();
    await fillInForm();
    await clickStart();
    await playDraw();

    expect(await getStatusText()).toBe('Round draw');

  })
});
