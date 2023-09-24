const music = [
  {
    audio: new Audio('./assets/Insane_Clown_Posse-HallsOfIllusions.mp3'),
    coverUrl: 'url(./assets/desktop-wallpaper-album-insane-clown-posse-riddle-box.jpg)',
    author: 'Insane Clown Posse',
    name: 'Halls Of Illusions'
  },
  {
    audio: new Audio('./assets/Insane_Clown_Posse-MyAxe.mp3'),
    coverUrl: 'url(./assets/cover.png)',
    author: 'Insane Clown Posse',
    name: 'My Axe'
  }
]
class App {
  constructor() {
    this.appWrap = createElement({ tagName: 'div', className: 'app-wrap' });
    this.container = createElement({ tagName: 'div', className: 'app-container' });
    this.coverImg = createElement({ tagName: 'div', className: 'cover-img' });
    this.controlContainer = createElement({ tagName: 'div', className: 'control-container' });
    this.btnContainer = createElement({ tagName: 'div', className: 'btn-container' });
    this.playStopBTN = createElement({ tagName: 'button', className: '', text: '>' });
    this.nextTrackBTN = createElement({ tagName: 'button', className: '', text: '>>' });
    this.previousTrackBTN = createElement({ tagName: 'button', className: '', text: '<<' });
    this.progressBar = createElement({ tagName: 'input', className: 'progress-bar' });
    this.currentTime = createElement({ tagName: 'span', className: 'current-time', text: '0s' });
    this.trackTime = createElement({ tagName: 'span', className: 'track-time' });
    this.timeContainer = createElement({ tagName: 'div', className: 'time-container'});

    this.isPlay = false;
    this.currentTrack = music[0];

    this.progressBar.type = 'range';
  }

  controls() {
    this.progressBar.oninput = (e) => this.currentTrack.audio.currentTime = e.target.value;

    this.playStopBTN.onclick = () => {
      if (this.isPlay) {
        this.currentTrack.audio.pause();
        this.isPlay = false;
        this.playStopBTN.innerHTML = '>'
        clearInterval(this.interval);
      } else {
        this.currentTrack.audio.play();
        this.isPlay = true;
        this.playStopBTN.innerHTML = '||'
        this.currentTrack.audio.play();
        this.interval = setInterval(() => {
          this.progressBar.value = Math.round(this.currentTrack.audio.currentTime);
          this.currentTime.innerHTML = `${Math.trunc(this.currentTrack.audio.currentTime)}s`;
          console.log(this.currentTrack.audio.currentTime)
          console.dir(this.progressBar)
        }, 1000);
      }
    };
  }

  createElements() {
    this.coverImg.style.backgroundImage = this.currentTrack.coverUrl;
    this.progressBar.value = 0;

    setTimeout(() => {
      this.trackTime.innerHTML = (this.currentTrack.audio.duration/ 60).toFixed(2);
      this.progressBar.max = `${Math.round(this.currentTrack.audio.duration)}`;
    }, 100);

    this.timeContainer.append(this.currentTime);
    this.timeContainer.append(this.trackTime);

    this.btnContainer.append(this.previousTrackBTN);
    this.btnContainer.append(this.playStopBTN);
    this.btnContainer.append(this.nextTrackBTN);

    this.controlContainer.append(this.progressBar);
    this.controlContainer.append(this.timeContainer);
    this.controlContainer.append(this.btnContainer);

    this.container.append(this.coverImg);
    this.container.append(this.controlContainer);
    this.appWrap.append(this.container);

    document.body.append(this.audio);
    document.body.append(this.appWrap);
  }

  ran() {
   this.createElements();
   this.controls();
  }
}

const app = new App();
app.ran();

function createElement(obj) {
  const elem = document.createElement(`${obj.tagName}`);
  if (obj.className) {
    elem.classList.add(`${obj.className}`);
  }
  if (obj.text) {
    elem.innerHTML = `${obj.text}`;
  }
  return elem;
}