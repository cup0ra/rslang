import menuHandlers from './menuHandlers';
import renderSettings from '../../main/settings/index';
import {
  hideHeader,
  hideMain,
  clearBodyClasses,
  regenerateMainContainer,
} from '../index';

const CURRENT_STATE = {
  page: 'renderSettings',
};

function menuClickHandler(loginResponse) {
  document.querySelector('.menu').addEventListener('click', (event) => {
    const el = event.target.closest('.menu__items__item');
    if (el) {
      const functionName = el.dataset.handler;
      if (functionName === CURRENT_STATE.page) {
        return;
      }
      if (functionName !== undefined) {
        hideMain(true);
        document.body.addEventListener('transitionend', () => {
          clearBodyClasses();
          regenerateMainContainer();
          menuHandlers[functionName](loginResponse);
          CURRENT_STATE.page = functionName;
          hideMain(false);
        }, {
          once: true,
        });
      } else {
        // eslint-disable-next-line no-alert
        alert('эта страница еще не создана');
      }
    }
  });
}

function logoutClickHandler() {
  document.querySelector('#authorization__log-out').addEventListener('click', () => {
    console.log('logoutClickHandler');
  });
}

const startMain = (loginResponse) => {
  hideMain(true);
  document.body.addEventListener('transitionend', () => {
    clearBodyClasses();
    regenerateMainContainer();
    hideMain(false);
    hideHeader(false);
    renderSettings();
  }, {
    once: true,
  });
  menuClickHandler(loginResponse);
  logoutClickHandler();
};

export default startMain;
