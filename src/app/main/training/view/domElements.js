import CREATE_CONTROLS_BAR_BUTTONS from './conrtolsBarButtons';
import CREATE_CHECK_WORDS_BUTONS from './checkWordsButtons';
import CREATE_INPUT from './createInput';

const CREATE_DOM_ELEMENTS = () => {
  const BACKGROUND_CARDS = document.createElement('div');
  BACKGROUND_CARDS.className = 'main__background-cards';
  document.querySelector('.main-container').appendChild(BACKGROUND_CARDS);

  const DIV_WRAP = document.createElement('div');
  DIV_WRAP.className = 'main__wrap-cards';
  document.querySelector('.main-container').appendChild(DIV_WRAP);
  CREATE_CONTROLS_BAR_BUTTONS(DIV_WRAP);

  const DIV_WRAP_CARD = document.createElement('div');
  DIV_WRAP_CARD.className = ('wrap-card');
  DIV_WRAP.appendChild(DIV_WRAP_CARD);

  const BUTTON_HARD_WORD = document.createElement('button');
  BUTTON_HARD_WORD.className = ('wrap-card__button-hard-word');
  DIV_WRAP_CARD.appendChild(BUTTON_HARD_WORD);

  const DIV_CARD = document.createElement('div');
  DIV_CARD.className = ('card');
  DIV_WRAP_CARD.appendChild(DIV_CARD);
  CREATE_INPUT(DIV_CARD);

  const SENTENSE = document.createElement('div');
  SENTENSE.className = ('sentense');
  DIV_CARD.appendChild(SENTENSE);

  const SOUND = document.createElement('div');
  SOUND.className = ('sounds main-game_sound-on');
  DIV_CARD.appendChild(SOUND);

  CREATE_CHECK_WORDS_BUTONS(DIV_WRAP);

  const DIV_PROGRESS = document.createElement('progress');
  DIV_PROGRESS.className = ('main-progress');
  DIV_WRAP.appendChild(DIV_PROGRESS);
};
export default CREATE_DOM_ELEMENTS;
