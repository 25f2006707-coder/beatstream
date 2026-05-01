const songs = [
  { name: "Song 1", path: "songs/song1.mp3" },
  { name: "Song 2", path: "songs/song2.mp3" },
  { name: "Song 3", path: "songs/song3.mp3" }
];

let currentSongIndex = 0;
let audio = new Audio(songs[currentSongIndex].path);

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progressBar = document.getElementById("progressBar");
const volumeControl = document.getElementById("volume");
const songTitle = document.getElementById("songTitle");
const playlist = document.getElementById("playlist");

function loadSong(index) {
  audio.src = songs[index].path;
  songTitle.innerText = songs[index].name;
  audio.play();
  playBtn.innerText = "⏸";
}

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.innerText = "⏸";
  } else {
    audio.pause();
    playBtn.innerText = "▶";
  }
});

nextBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
});

prevBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
});

audio.addEventListener("timeupdate", () => {
  progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
});

progressBar.addEventListener("input", () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

volumeControl.addEventListener("input", () => {
  audio.volume = volumeControl.value;
});

songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.classList.add("list-group-item");
  li.innerText = song.name;
  li.addEventListener("click", () => {
    currentSongIndex = index;
    loadSong(index);
  });
  playlist.appendChild(li);
});

audio.addEventListener("ended", () => {
  nextBtn.click();
});

loadSong(currentSongIndex);
