// Accesing elements

// By default music
let musicPlayers = document.getElementById("music_players");
// Value to updtate the pause play icon
let value = "play";

let audio = new Audio("/Songs/1.mp3");

let leftArrow = document.getElementById("left_arrow");
let rightArrow = document.getElementById("right_arrow");
let imagesArtist = document.getElementById("images_artisr");
let artistSection = document.getElementsByClassName("artist");
let artistMainBox = document.getElementById("artistMainBox");

// let LoopMoving = true;

leftArrow.style.display = "none";
function movingImages(params) {
  // right Arrow
rightArrow.addEventListener("click", (e) => {
    imagesArtist.scrollLeft += 300;
    leftArrow.style.display = "block";
    if (imagesArtist.scrollLeft > 1440) {
      rightArrow.style.display = "none";
    } else {
      rightArrow.style.display = "block";
    }
  });

  // left Arrow
  leftArrow.addEventListener("click", (e) => {
    imagesArtist.scrollLeft -= 250;
    if (imagesArtist.scrollLeft <= 200) {
      leftArrow.style.display = "none";
      rightArrow.style.display = "block";
    }
  });
}
artistMainBox.addEventListener("mouseenter", movingImages);
// updtaing covers
//accessing images
let artistImages = document.querySelectorAll(".images_box img");
let artistImagesBox = document.querySelectorAll(".images_box ");
let playingAudiCover = document.getElementById("playing_audio_cover");

// Updating  the music on click  cover artist
artistImagesBox.forEach(updateImage);

function updateImage(eachImage) {
  eachImage.addEventListener("click", (e) => {
    if (e.target.src == null) {
      alert("Please click Properly on the image ");
    } else {
      playingAudiCover.src = e.target.parentNode.children[0].src;
    }
  });
}

// function to update The songs name

// Updating the songs
// creating songs array
// songs arrays
let songs = [
  "/Songs/1.mp3",
  "/Songs/2.mp3",
  "/Songs/3.mp3",
  "/Songs/4.mp3",
  "/Songs/5.mp3",
  "/Songs/6.mp3",
  "/Songs/7.mp3",
  "/Songs/8.mp3",
  "/Songs/9.mp3",
  "/Songs/10.mp3",
  "/Songs/11.mp3",
  "/Songs/12.mp3",
  "/Songs/13.mp3",
  "/Songs/14.mp3",
];
// updtaing the songs index
let ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
// Updating  the music on click   artist
let songsIndex = -1;
// Now destructing the array
artistImagesBox.forEach(updatingSound);

// function to update sound
function updatingSound(e) {
  //  Setting the audio to null
  e.addEventListener("click", (e) => {
    let songId = e.target.id;

    // iterating to match the condition
    for (let i = 0; i < ids.length; i++) {
      if (songId == ids[i]) {
        songsIndex = i;
        value = "play";
        PausePlaybtnUpdtate(value);
      }
    }
    // calling a audio play function
    setTimeout(() => {
      audioPlay(songsIndex);
    }, 100);
  });
  // setting back to 0
  if (songsIndex == -1) {
    songsIndex = 0;
  }
}
// pasue audio
const pauseAudio = () => {
  audio.pause();
};
// playAudio
const playAudio = () => {
  audio.play();
  if (audio) {
  }

  audio.addEventListener("timeupdate", updateProgressBar);
};

// audio play
function audioPlay(songsIndex) {
  if (songsIndex < 0) {
    songsIndex = songs.length - 1;
  }
  if (audio) {
    pauseAudio();
    audio.src = "";

    // updtaing the song pause button
  }

  // Updtaing the song
  setTimeout(() => {
    audio = new Audio(songs[songsIndex]);
    playAudio();
    value = "pause";
    PausePlaybtnUpdtate(value);
  }, 100);
}

//changing the playPause icon
let playPause = document.getElementById("pause_play");
function PausePlaybtnUpdtate(value) {
  console.log(value);
  pause_play.innerHTML = `<i class="fa-solid fa-${value}" id="play_pause"></i>`;
}

// update the Names of songs
let singerName = document.getElementById("playing_singer");

const singerNameUpdate = (e) => {
  singerName.innerText = e.target.parentNode.children[2].innerText;
};

artistImagesBox.forEach((val) => {
  val.addEventListener("click", singerNameUpdate);
});

// Updathe name of songs
let songName = document.getElementById("playing_song_name");

const songsNameUpdate = (e) => {
  songName.innerText = e.target.parentNode.children[1].innerText;
};

artistImagesBox.forEach((val) => {
  val.addEventListener("click", songsNameUpdate);
});

// Moving the forward song
let forward = document.getElementById("next");
forward.addEventListener("click", () => {
  // updtate audioplay;

  pauseFewSecs();
  songsIndex = artistPlayerUpdateOnPlayerOnForward();
  audioPlay(songsIndex);
});

// Moving the backward song
let backward = document.getElementById("prev");
backward.addEventListener("click", () => {
  pauseFewSecs();
  songsIndex = artistPlayerUpdateOnPlayerOnBackward();
  audioPlay(songsIndex);
});

// Pause for few seconds
function pauseFewSecs() {
  playPause.innerHTML = `<i class="fa-solid fa-play" id="play_pause"></i>`;
  setTimeout(() => {
    playPause.innerHTML = `<i class="fa-solid fa-pause" id="play_pause"></i>`;
  }, 1000);
}

// artist music player update on forwarad
function artistPlayerUpdateOnPlayerOnForward() {
  songsIndex += 1;
  if (songsIndex >= artistImages.length) {
    songsIndex = 0;
  }

  playingAudiCover.src = artistImages[songsIndex].src;
  songName.innerHTML = artistImagesBox[songsIndex].children[1].innerText;
  singerName.innerHTML = artistImagesBox[songsIndex].children[2].innerText;
  return songsIndex;
}

// artist music player update on backward
function artistPlayerUpdateOnPlayerOnBackward() {
  songsIndex -= 1;
  if (songsIndex < 0) {
    songsIndex = artistImages.length - 1;
  }

  playingAudiCover.src = artistImages[songsIndex].src;
  songName.innerHTML = artistImagesBox[songsIndex].children[1].innerText;
  singerName.innerHTML = artistImagesBox[songsIndex].children[2].innerText;
  return songsIndex;
}

// update the range Value
let progressBar = document.getElementById("progressBar");
let currMins = document.getElementById("curr_mins");
let currSecs = document.getElementById("curr_secs");
let totalMins = document.getElementById("total_mins");
let totalSecs = document.getElementById("total_secs");
function updateProgressBar() {
  totalMins.innerText = Math.floor(audio.duration / 60);
  totalSecs.innerText = Math.floor(audio.duration % 60);
  if (audio.duration > 0) {
    let progValue = (audio.currentTime / audio.duration) * 100;
    progressBar.value = Math.floor(progValue);
  }

  currMins.innerText = "0" + Math.floor(audio.currentTime / 60);
  let secsValue = Math.floor(audio.currentTime % 60);
  if (secsValue < 10) {
    secsValue = "0" + secsValue;
  }

  currSecs.innerText = secsValue;
}

// update the pause play

playPause.addEventListener("click", (e) => {
  console.log(e.target.classList.contains("fa-play"), "play");
  console.log(e.target.classList.contains("fa-pause"), "pause");
  if (e.target.classList.contains("fa-play")) {
    PausePlaybtnUpdtate("pause");
    playAudio();
  } else if (e.target.classList.contains("fa-pause")) {
    PausePlaybtnUpdtate("play");
    pauseAudio();
  }
});
