import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'videoplayer-current-time';
const iframeEl = document.querySelector('#vimeo-player');
const player = new Player(iframeEl);

player.on('play', onReadTime);
player.on('timeupdate', throttle(onSaveTime, 1000));

function onSaveTime(evt) {
  const saveTime = evt.seconds;
  localStorage.setItem(LOCALSTORAGE_KEY, saveTime);
}

function onReadTime() {
  let time = localStorage.getItem(LOCALSTORAGE_KEY);
  if (time) {
    player.setCurrentTime(time);
    player.off('play', onReadTime);
  }
}
