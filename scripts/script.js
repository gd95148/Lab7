// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;
let counter = 0;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        counter++;
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        newPost.id = String(counter);
        document.querySelector('main').appendChild(newPost);
        newPost.addEventListener('click', eventHand);
      });
    });
});

function eventHand (evt) {
  router.setState("#entry" + evt.currentTarget.id);
  let body = document.getElementsByTagName("body")[0];
  body.className = "single-entry";
  let newEntry = document.createElement("entry-page");
  newEntry.entry = evt.currentTarget.entry;
  document.querySelector("h1").textContent = "Entry " + evt.currentTarget.id;
  let curr = document.querySelector("entry-page");
  curr.parentNode.replaceChild(newEntry, curr);
}

document.querySelector("img[src='settings.svg']").addEventListener('click', () => {
  router.setState('#settings');
  let body = document.getElementsByTagName('body')[0];
  body.className = 'settings';
  document.querySelector('h1').textContent = "Settings";
});

document.querySelector('h1').addEventListener('click', () => {
  router.setState(' ');
  let body = document.getElementsByTagName('body')[0];
  body.classList.remove("settings");
  body.classList.remove("single-entry");
  document.querySelector('h1').textContent = "Journal Entries";
})

