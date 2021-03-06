export { default as getMedia } from './utils/githubMedia';

export {
  getWords, getCountWords, getWordById, createUser, loginUser, deleteUser, refreshToken,
  createUserWord, getAllUserWords, getUserWordById, deleteUserWordById, updateUserWord,
  getUserStatistic, upsertUserStatistic, getUserSettings, upsertUserSettings, getAllAggregatedWords,
  getAggregatedWordsById,
} from './network/backendWords/backendWords';

export {
  setSessionData, getSessionData, deleteSessionData,
  getAndInitSessionData,
} from './utils/sessionStorage';

export { getWordsInfo, getWordInfoById } from './network/skyengApi/apiWords';

export { default as getRandomInteger } from './utils/randomInteger';

export { translateEngToRus, translateRusToEng } from './network/translationAPI';

export { setLocalData, getLocalData, getAndInitLocalData } from './utils/localStorage';

export { hideHeader, hideMain } from './utils/hideDomElements';

export { clearBodyClasses, regenerateMainContainer } from './utils/domClasses';
