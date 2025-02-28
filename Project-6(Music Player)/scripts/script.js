const tracks = [
  {
    title: 'Song 1',
    artist: 'Artist 1',
    albumArt: 'assets/images/art1.jpg',
    src: 'assets/songs/song1.mp3',
  },
  {
    title: 'Song 2',
    artist: 'Artist 2',
    albumArt: 'assets/images/art2.jpg',
    src: 'assets/songs/song2.mp3',
  },
];

let currentTrackIndex = 0;
const audio = new Audio(tracks[currentTrackIndex].src);
const albumArt = document.getElementById('album-art');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const playPauseBtn = document.getElementById('play-pause-btn');
const progressBar = document.getElementById('progress-bar');
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');
const volumeSlider = document.getElementById('volume-slider');
const muteBtn = document.getElementById('mute-btn');

// Load Track
function loadTrack(index) {
  const track = tracks[index];
  audio.src = track.src;
  albumArt.src = track.albumArt;
  trackTitle.textContent = track.title;
  trackArtist.textContent = track.artist;
  audio.play();
  playPauseBtn.textContent = '⏸️';
}

// Play/Pause
playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = '⏸️';
  } else {
    audio.pause();
    playPauseBtn.textContent = '▶️';
  }
});

// Progress Bar
audio.addEventListener('timeupdate', () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress;
  currentTime.textContent = formatTime(audio.currentTime);
});

progressBar.addEventListener('input', () => {
  const seekTime = (progressBar.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

// Volume Control
volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

muteBtn.addEventListener('click', () => {
  audio.muted = !audio.muted;
  muteBtn.textContent = audio.muted ? '🔇' : '🔊';
});

// Next/Previous Track
document.getElementById('next-btn').addEventListener('click', () => {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
});

document.getElementById('prev-btn').addEventListener('click', () => {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex);
});

// Format Time
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Load First Track
loadTrack(currentTrackIndex);
// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.setAttribute('data-theme', savedTheme);
  themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

// Toggle Theme
themeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme');
  if (currentTheme === 'dark') {
    body.setAttribute('data-theme', 'light');
    themeToggle.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  } else {
    body.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  }
});