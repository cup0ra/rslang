import { getWords } from '../../common/network/backendWords/backendWords';
import getMedia from '../../common/utils/githubMedia';
import getRandomInteger from '../../common/utils/randomInteger';
import renderStartPage, {
  renderGame, renderStatisticModal, setCardData, removeCircleClasses,
} from './view/view';
import { mixTranslations, playAudio } from './utils/utils';

export async function sprintGamePageHandling(level) {
  const body = document.querySelector('body');
  const points = document.querySelector('.points');
  const wordSound = document.querySelector('.word-sound');
  const counter = document.querySelector('.counter');
  const soundButton = document.querySelector('.sound-button');
  const birds = document.querySelectorAll('.parrot');
  const circles = document.querySelectorAll('.circle');
  const correctButton = document.querySelector('.sprint-game__correct');
  const incorrectButton = document.querySelector('.sprint-game__wrong');
  const extraPoints = document.querySelector('.extra-points');
  const group = level;
  const cardContainer = document.querySelector('.card-container');
  let page = getRandomInteger(1, 22);
  body.className = 'body__spring-game-page';

  const pointsConfig = [10, 20, 40, 80];
  const gameStates = {
    currentLevel: pointsConfig[0],
    correctAnswers: 0,
    words: [],
    currentWord: {},
    correctAnswersStatistic: 0,
    incorrectAnswersStatistic: 0,
  };

  function addPoints(circleNumber, gameLevel) {
    Array.from(circles)[circleNumber].classList.add('green-circle');
    gameStates.currentLevel = pointsConfig[gameLevel];
    const pointsValue = Number(points.innerText) + gameStates.currentLevel;
    points.innerText = pointsValue;
  }

  function levelUp(gameLevel, counterOfBirds) {
    gameStates.currentLevel = pointsConfig[gameLevel];
    const pointsValue = Number(points.innerText) + gameStates.currentLevel;
    points.innerText = pointsValue;
    Array.from(birds)[counterOfBirds].classList.add('active-parrot');
    playAudio('../../../assets/audio/sprintGame/levelUp.mp3');
  }

  function maxLevel() {
    [, , , gameStates.currentLevel] = pointsConfig;
    const pointsValue = Number(points.innerText) + gameStates.currentLevel;
    points.innerText = pointsValue;
  }

  function incrementCorrectAnswer() {
    gameStates.correctAnswers += 1;
    if (gameStates.correctAnswers === 1) {
      addPoints(0, 0);
    } else if (gameStates.correctAnswers === 2) {
      addPoints(1, 0);
    } else if (gameStates.correctAnswers === 3) {
      addPoints(2, 0);
    } else if (gameStates.correctAnswers === 4) {
      removeCircleClasses('green-circle');
      levelUp(0, 1);
      extraPoints.innerText = '+ 20 points';
    } else if (gameStates.correctAnswers === 5) {
      addPoints(0, 1);
    } else if (gameStates.correctAnswers === 6) {
      addPoints(1, 1);
    } else if (gameStates.correctAnswers === 7) {
      addPoints(2, 1);
    } else if (gameStates.correctAnswers === 8) {
      removeCircleClasses('green-circle');
      levelUp(1, 2);
      extraPoints.innerText = '+ 40 points';
    } else if (gameStates.correctAnswers === 9) {
      addPoints(0, 2);
    } else if (gameStates.correctAnswers === 10) {
      addPoints(1, 2);
    } else if (gameStates.correctAnswers === 11) {
      addPoints(2, 2);
    } else if (gameStates.correctAnswers === 12) {
      levelUp(2, 3);
      Array.from(circles)[0].classList.add('hidden-circle');
      Array.from(circles)[2].classList.add('hidden-circle');
      extraPoints.innerText = '+ 80 points';
    } else if (gameStates.correctAnswers > 12) {
      maxLevel();
    }
  }

  function resetCorrectAnswers() {
    gameStates.correctAnswers = 0;
    removeCircleClasses('green-circle');
    removeCircleClasses('hidden-circle');
    extraPoints.innerText = '';
    birds.forEach((el) => {
      el.classList.remove('active-parrot');
    });
  }

  async function loadNewWords() {
    const words = await getWords(group, page);
    const mixedWords = mixTranslations(words);
    gameStates.words.push(...mixedWords);
  }

  function incrementCurrentWord() {
    const shiftedWord = gameStates.words.shift();
    gameStates.currentWord = shiftedWord;
  }

  async function nextWord() {
    if (gameStates.words.length === 0) {
      await loadNewWords();
    } else if (gameStates.words.length === 3) {
      page += 1;
      await loadNewWords();
    }
    incrementCurrentWord();
    setCardData(gameStates.currentWord.word, gameStates.currentWord.wordTranslate);
  }

  function onSoundClick() {
    const pathToMedia = getMedia(gameStates.currentWord.audio);
    wordSound.src = pathToMedia;
    playAudio(pathToMedia);
  }

  function onCorrectButtonClick() {
    if (gameStates.currentWord.isAnswerCorrect === true) {
      incrementCorrectAnswer();
      playAudio('../../../assets/audio/sprintGame/correct.mp3');
      gameStates.correctAnswersStatistic += 1;
    } else {
      resetCorrectAnswers();
      playAudio('../../../assets/audio/sprintGame/failure.mp3');
      gameStates.incorrectAnswersStatistic += 1;
    }
    nextWord();
  }

  function onIncorrectButtonClick() {
    if (gameStates.currentWord.isAnswerCorrect === false) {
      incrementCorrectAnswer();
      gameStates.correctAnswersStatistic += 1;
      playAudio('../../../assets/audio/sprintGame/correct.mp3');
    } else {
      resetCorrectAnswers();
      playAudio('../../../assets/audio/sprintGame/failure.mp3');
      gameStates.incorrectAnswersStatistic += 1;
    }
    nextWord();
  }

  function addEventListeners() {
    soundButton.addEventListener('click', onSoundClick);
    correctButton.addEventListener('click', onCorrectButtonClick);
    incorrectButton.addEventListener('click', onIncorrectButtonClick);
  }

  function onPlayAgain() {
    renderStartPage();
    // eslint-disable-next-line no-use-before-define
    addEventListenerForStartPage();
  }

  let seconds = 60;
  setInterval(() => {
    seconds -= 1;
    if (seconds > 0) {
      counter.innerHTML = seconds;
    } else if (seconds === 0) {
      cardContainer.classList.add('hidden');
      const correct = gameStates.correctAnswersStatistic;
      const inCorrect = gameStates.incorrectAnswersStatistic;
      renderStatisticModal(correct, inCorrect, points.innerText);
      document.querySelector('.play-again-btn').addEventListener('click', onPlayAgain);
    }
  }, 1000);

  nextWord();
  addEventListeners();
}

export default function addEventListenerForStartPage() {
  const startPlay = document.querySelector('.sprint-game__start-button');
  const sliderLevelSprintGame = document.querySelector('.sprint-game__range-slider__level');
  const sliderCounterLevelSprint = document.querySelector('.sprint-game__range-value__level');
  const gameLevel = document.querySelector('#range-value-level');
  const startCounter = document.querySelector('.sprint-game__start-page__counter');

  function onclickStartPlay() {
    const level = gameLevel.innerHTML;
    let seconds = 3;
    startPlay.style.display = 'none';
    startCounter.style.display = 'inline-block';
    setInterval(() => {
      seconds -= 1;
      if (seconds > 0) {
        startCounter.innerHTML = seconds;
      } else if (seconds === 0) {
        startPlay.classList.add('none');
        renderGame();
        sprintGamePageHandling(level);
      }
    }, 1000);
  }

  function getSliderHandler(element) {
    const slider = element;
    return function assignInnerHtml(event) {
      slider.innerHTML = event.target.value;
    };
  }

  sliderLevelSprintGame.addEventListener('input', getSliderHandler(sliderCounterLevelSprint));
  startPlay.addEventListener('click', onclickStartPlay);
}
