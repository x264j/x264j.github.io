function playMusic() {
    var songNameInput = document.getElementById("songName");
    var audioPlayer = document.getElementById("audioPlayer");
    
    var songName = songNameInput.value;
    audioPlayer.src = "music/" + songName + ".mp3";
}
