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
    this.currentTime = createElement({ tagName: 'span', className: 'current-time', text: '0.00' });
    this.trackTime = createElement({ tagName: 'span', className: 'track-time', text: '0.00' });
    this.timeContainer = createElement({ tagName: 'div', className: 'time-container'});
    this.authorText = createElement({ tagName: 'p', className: '' });
    this.trackName = createElement({ tagName: 'p', className: '' });
    this.descriptionContainer = createElement({ tagName: 'p', className: 'description-container' });
    this.footer = createElement({ tagName: 'footer'});
    this.year = createElement({ tagName: 'span', text: '2023'});
    this.githubLink = createElement({ tagName: 'a', text: 'Yauheni Belski'});
    this.rsLogo = createElement({ tagName: 'a', className: 'logo'});

    this.isPlay = false;
    this.currentTrackIndex = 0;
    this.currentTrack = music[this.currentTrackIndex];
    this.githubLink.href = 'https://github.com/yauhenibelski';
    this.rsLogo.href = 'https://rs.school/js-stage0/';
    this.rsLogo.style.backgroundImage = 'url(https://rs.school/images/rs_school_js.svg)'

    this.progressBar.type = 'range';
  }
  changeTrack(value) {
    this.currentTrack.audio.currentTime = 0;
    this.currentTime.innerHTML = '0.00';
    if (this.isPlay) this.currentTrack.audio.pause();

    if (value === 'next') {
      this.currentTrackIndex = music[this.currentTrackIndex + 1] ? this.currentTrackIndex + 1 : 0;
    } else {
      this.currentTrackIndex = music[this.currentTrackIndex - 1] ? this.currentTrackIndex - 1 : music.length - 1;
    }

    this.currentTrack = music[this.currentTrackIndex];

    if (this.isPlay) {
      this.render();
      this.currentTrack.audio.play();
      this.isPlay = true;
      this.playStopBTN.innerHTML = '||';
    } else {
      this.render();
    }
  }

  setTrackDescription() {
    this.trackTime.innerHTML = (this.currentTrack.audio.duration/ 60).toFixed(2);
    this.progressBar.max = `${Math.round(this.currentTrack.audio.duration)}`;
    this.authorText.innerHTML = `${this.currentTrack.author} -`;
    this.trackName.innerHTML = `- ${this.currentTrack.name}`;
  }

  controls() {
    this.progressBar.oninput = (e) => this.currentTrack.audio.currentTime = e.target.value;

    this.nextTrackBTN.onclick = () =>  this.changeTrack('next');
    this.previousTrackBTN.onclick = () =>  this.changeTrack();

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
          const timer = new Date(Math.round(this.currentTrack.audio.currentTime) * 1000)
          if ( this.currentTrack.audio.ended ) {
            this.changeTrack('next');
          }
          this.progressBar.value = Math.round(this.currentTrack.audio.currentTime);
          this.currentTime.innerHTML = `${timer.getMinutes()}.${timer.getSeconds() < 10 ? `0${timer.getSeconds()}` : timer.getSeconds()}`;
        }, 1000);
      }
    };
  }

  createElements() {
    this.coverImg.style.backgroundImage = this.currentTrack.coverUrl;
    this.progressBar.value = 0;

    window.onload = () => this.setTrackDescription();

    this.setTrackDescription();

    this.descriptionContainer.append(this.authorText);
    this.descriptionContainer.append(this.trackName);

    this.timeContainer.append(this.currentTime);
    this.timeContainer.append(this.trackTime);

    this.btnContainer.append(this.previousTrackBTN);
    this.btnContainer.append(this.playStopBTN);
    this.btnContainer.append(this.nextTrackBTN);

    this.controlContainer.append(this.descriptionContainer);
    this.controlContainer.append(this.progressBar);
    this.controlContainer.append(this.timeContainer);
    this.controlContainer.append(this.btnContainer);

    this.footer.append(this.rsLogo);
    this.footer.append(this.githubLink);
    this.footer.append(this.year);

    this.container.append(this.coverImg);
    this.container.append(this.controlContainer);
    this.container.append(this.footer);
    this.appWrap.append(this.container);

    document.body.append(this.appWrap);
  }

  render() {
    document.body.innerHTML = '';
    this.createElements();
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