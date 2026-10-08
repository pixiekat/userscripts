// ==UserScript==
// @name        Auto Click "Show more replies" on bsky.app
// @namespace   https://codeberg.org/pixiekat/userscripts
// @match       https://bsky.app/*
// @match       https://mu.social/*
// @match       https://northsky.app/*
// @grant       none
// @version     1.3
// @author      pixiekat <pixiekat@noreply.codeberg.org>
// @description Autoclicks the "Show More Replies" button in Bluesky threads because the Bluesky devs are morons.
// @run-at      document-idle
// ==/UserScript==

(function() {
  'use strict';
  const buttonText = "Show more replies";

  function findAndClickButton() {
    const buttons = document.querySelectorAll('button');

    for (const button of buttons) {
      if (button.textContent.includes(buttonText)) {
        button.click();
      }
    }
  }

  const observer = new MutationObserver((mutationsList, observer) => {
    for(const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        findAndClickButton();
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
  window.addEventListener('load', findAndClickButton);
})();
