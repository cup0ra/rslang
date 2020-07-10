/* eslint-disable import/no-cycle */
import renderSavannahStartPage from './startPage';
import renderSettings from '../../../main/settings/index';

export default function renderStatistic(obj, loginResponse) {
  const { right, mistakes } = obj;

  document.querySelector(('#savannah')).innerHTML = '';

  const stat = document.createElement('div');
  stat.classList.add('savannah__statistic');

  const statWrapper = document.createElement('div');
  statWrapper.classList.add('stat__wrapper');

  const guessed = document.createElement('div');
  guessed.classList.add('guessed-words');

  const guessedTitle = document.createElement('h3');
  guessedTitle.classList.add('savannah__guessed-word__title');
  guessedTitle.textContent = `Guessed ${right}:`;

  const mistake = document.createElement('div');
  mistake.classList.add('mistake-words');

  const mistakesTitle = document.createElement('h3');
  mistakesTitle.classList.add('savannah__mistake-word__title');
  mistakesTitle.textContent = `Mistakes ${mistakes}:`;

  const guessedList = document.createElement('ul');
  guessedList.classList.add('guessed-list');

  const mistakesList = document.createElement('ul');
  mistakesList.classList.add('mistake-list');

  const objKey = Object.keys(obj);

  if (objKey.length > 13) {
    statWrapper.classList.add('stat__wrapper_scroll');
  }

  objKey.map((el) => {
    if (obj[el] === true) {
      const guessedListItem = document.createElement('li');
      guessedListItem.classList.add('savannah__guessed-list__item');
      guessedListItem.textContent = el;
      guessedList.append(guessedListItem);
    } else if (obj[el] === false) {
      const mistakesListItem = document.createElement('li');
      mistakesListItem.classList.add('savannah__mistakes-list__item');
      mistakesListItem.textContent = el;
      mistakesList.append(mistakesListItem);
    }

    return el;
  });

  guessed.append(guessedTitle, guessedList);
  mistake.append(mistakesTitle, mistakesList);

  statWrapper.append(guessed, mistake);

  const buttonWrapper = document.createElement('div');
  buttonWrapper.classList.add('savannah__stat__button__wrapper');

  const againButton = document.createElement('button');
  againButton.classList.add('savannah__stat__button', 'button-again');
  againButton.textContent = 'Play again';

  const mainPageButton = document.createElement('button');
  mainPageButton.classList.add('savannah__stat__button', 'button-main-page');
  mainPageButton.textContent = 'Main page';

  buttonWrapper.append(againButton, mainPageButton);

  stat.append(statWrapper, buttonWrapper);
  document.querySelector(('#savannah')).append(stat);

  againButton.addEventListener('click', () => renderSavannahStartPage(loginResponse), { once: true });
  mainPageButton.addEventListener('click', () => renderSettings(), { once: true });
  document.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
      renderSavannahStartPage(loginResponse);
    }
  }, { once: true });
}