import createLayout from './createLayout';
import createAudio from './createAudio';
import getWordArr from './wordList';
import { wordListlistener, buttonListener, audioIconListener } from '../controls/listeners';
import { createSpeakIcon, createImage } from './createAssets';

export default async function startAudiochallengeGame() {
  createLayout();
  createSpeakIcon();
  await getWordArr();
  await createAudio();
  createImage();
  audioIconListener();
  wordListlistener();
  buttonListener();
}
