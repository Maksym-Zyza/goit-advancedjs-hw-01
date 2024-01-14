import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

const KEY_SECONDS = 'videoplayer-current-time';
const UPDATE_TIME = 1000;

const savePlayback = () => {
  player
    .getCurrentTime()
    .then(seconds => {
      localStorage.setItem(KEY_SECONDS, seconds);
    })
    .catch(err => {
      console.error(err);
    });
};

const throttlePlayback = throttle(savePlayback, UPDATE_TIME);
player.on('timeupdate', () => {
  throttlePlayback();
});

const getPlayback = () => {
  const savedTime = localStorage.getItem(KEY_SECONDS) ?? 0;
  player
    .setCurrentTime(savedTime)
    .then(() => {
      // player.play();
    })
    .catch(err => {
      console.error('Error playback:', err);
    });
};

getPlayback();
