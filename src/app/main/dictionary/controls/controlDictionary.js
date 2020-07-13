import { ELEMENTS_CLASSES } from '../../../common/constants';
import { renderDictionary, setActiveTabButton } from '../view/renderDictionary';
import { createDictTable } from '../view/createTable';
import {
  readAllUserWords,
  getDifficultUserWords,
  getDeletedUserWords,
  findByWordId,
  setWordEasy,
  undeleteWord,
} from '../model/dictionaryLogic';

const currentState = {
  isAudioPlayed: false,
  tab: 'studied words',
};

const playNearestAudio = (tgt) => {
  const audio = tgt.parentNode.querySelector('audio');
  currentState.isAudioPlayed = true;
  audio.play();
  audio.addEventListener('ended', () => {
    currentState.isAudioPlayed = false;
  }, { once: true });
};

const buttonClick = (event, userWords) => {
  const tgt = event.target;
  if (tgt.classList.contains(ELEMENTS_CLASSES.dictionaryPlayBtn) && !currentState.isAudioPlayed) {
    playNearestAudio(tgt);
    return;
  }
  if (tgt.classList.contains(ELEMENTS_CLASSES.dictionaryRecoveryBtn)) {
    const clickedRow = tgt.closest(`.${ELEMENTS_CLASSES.dictionaryTableRow}`);
    const clickedWordId = clickedRow.dataset.wordId;
    const clickedWordObject = findByWordId(userWords, clickedWordId);
    if (currentState.tab === 'difficult words') {
      setWordEasy(clickedWordObject);
      return;
    }
    if (currentState.tab === 'deleted words') {
      undeleteWord(clickedWordObject);
    }
  }
};

const buttonHandler = (userWords) => {
  const tableContainer = document.querySelector(`.${ELEMENTS_CLASSES.dictionaryTableContainer}`);
  const wrapperButtonClick = (event) => buttonClick(event, userWords);

  tableContainer.addEventListener('click', wrapperButtonClick);
};

const clickOnTab = (event, userWords) => {
  const tgt = event.target;
  if (tgt === currentState.tab) {
    return;
  }
  if (tgt.classList.contains(ELEMENTS_CLASSES.dictionaryBtn)) {
    const tabName = event.target.innerText.toLowerCase();
    currentState.tab = tabName;
    setActiveTabButton(tgt);
    if (tabName === 'studied words') {
      createDictTable(userWords);
    }

    if (tabName === 'difficult words') {
      const difficultWord = getDifficultUserWords(userWords);
      createDictTable(difficultWord, true);
    }

    if (tabName === 'deleted words') {
      const deletedWord = getDeletedUserWords(userWords);
      createDictTable(deletedWord, true);
    }
    buttonHandler(userWords);
  }
};

const tabClickHandler = (userWords) => {
  const buttonContainer = document.querySelector(`.${ELEMENTS_CLASSES.dictionaryBtnContainer}`);

  const wrapperClickOnTab = (event) => {
    clickOnTab(event, userWords);
  };

  buttonContainer.addEventListener('click', wrapperClickOnTab);
};

const initDictionary = async (loginResponse) => {
  renderDictionary();
  const userWords = await readAllUserWords(loginResponse);
  tabClickHandler(userWords);
  createDictTable(userWords);
  buttonHandler(userWords);
};

export default initDictionary;
