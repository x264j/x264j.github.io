var songNameInput = document.getElementById("songName");
var suggestionsContainer = document.getElementById("suggestions");

songNameInput.addEventListener("input", function() {
    var songName = songNameInput.value;
    getSuggestions(songName);
});

songNameInput.addEventListener("focus", function() {
    var songName = songNameInput.value;
    getSuggestions(songName);
});

function getSuggestions(songName) {
    if (songName.length === 0) {
        suggestionsContainer.innerHTML = "";
        suggestionsContainer.style.display = "none";
        return;
    }

    // Fetch song suggestions from music folder
    fetch("getSongs.php?songName=" + songName)
        .then(response => response.json())
        .then(data => {
            suggestionsContainer.innerHTML = "";
            
            data.forEach(songSuggestion => {
                var li = document.createElement("li");
                li.innerText = songSuggestion;
                li.onclick = function() {
                    songNameInput.value = this.innerText;
                    suggestionsContainer.innerHTML = "";
                    suggestionsContainer.style.display = "none";
                };
                
                suggestionsContainer.appendChild(li);
            });
            
            if (suggestionsContainer.childNodes.length > 0) {
                suggestionsContainer.style.display = "block";
            } else {
                suggestionsContainer.style.display = "none";
            }
        })
        .catch(error => {
            console.error("Error fetching song suggestions:", error);
        });
}

function playMusic() {
    var audioPlayer = document.getElementById("audioPlayer");
    var songName = songNameInput.value;
    audioPlayer.src = "music/" + songName + ".mp3";
}
