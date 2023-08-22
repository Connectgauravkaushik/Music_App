//Storing tracklist as array of objects
let track_list = [
    {
        name: "Har Har Shambhu Shiv Mahadeva",
        artist: "Jeetu sharma",
        image: "images/maxresdefault-m.jpg",
        path: "songs/Har Har Shambhu Shiv Mahadeva(PagalWorld.com.se).mp3"
    },
    {
        name: "Maan Meri Jaan",
        artist: "king",
        image: "images/maxresdefault-p.jpg",
        path: "songs/Maan Meri Jaan(PagalWorld.com.se).mp3"
    },
    {
        name: "Kesariya ",
        artist: "king",
        image: "images/Kesariya.jpg",
        path: "songs/Kesariya.mp3"
    },
    {
        name: "Deva Deva",
        artist: "king",
        image: "images/Deva-Deva.jpg",
        path: "songs/Deva Deva.mp3"
    }
];
// Select all the elements in the HTML page
// and assign them to a variable

let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updatetimer;

// create the audio element for the player 
const audio_player = document.createElement('audio');

function loadTrack() {
    clearInterval(updatetimer);
    audio_player.src = track_list[track_index].path;
    audio_player.load();
    //
    now_playing.textContent = "Now Playing " + [track_index + 1] + " of " + track_list.length;
    track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    setInterval(seekUpdate, 1000);
    

}
loadTrack();

function convertDuration(seconds) {
    const minutes = '' + Math.floor(seconds / 60);
    const Seconds = '' + Math.floor(seconds - (minutes * 60));

    return minutes.padStart(2, '0') + ':' + Seconds.padStart(2, '0');
}

function playPauseTrack() {
    if (isPlaying) {
        pauseTrack();
  
    } else {
        playTrack();
    }
}

function playTrack() {
    audio_player.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    

}

function pauseTrack() {
    audio_player.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa-solid fa-circle-play fa-5x"></i>';
    total_duration.innerHTML = convertDuration(audio_player.duration);
}

function nextTrack() {
    if (track_index < track_list.length - 1) {
        track_index += 1;
    } else {
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
    
}

function prevTrack() {
    if (track_index > 0) {
        track_index -= 1;
    } else {
        track_index = track_list.length - 1;
    }
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    // Calculate the seek position by the
    // percentage of the seek slider 
    // and get the relative duration to the track
    // audio_player.duration => provide the song duration in seconds.
    // seek_slider.value => provide the range in between 0 to 100 
    audio_player.currentTime = audio_player.duration * (seek_slider.value / 100);
}
function setVolume() {
    audio_player.volume = volume_slider.value / 100;
}

function seekUpdate() {
    curr_time.innerText = convertDuration(audio_player.currentTime);
    seek_slider.value = Math.floor((audio_player.currentTime / audio_player.duration) * 100);
}

playpause_btn.addEventListener('click', playPauseTrack);
next_btn.addEventListener('click', nextTrack);
prev_btn.addEventListener('click', prevTrack);
volume_slider.addEventListener('input', setVolume);
seek_slider.addEventListener('input', seekTo);
audio_player.addEventListener('ended', nextTrack);
















