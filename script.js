/**
 * Enables or disables next and previous song buttons
 * @param {Array} response 
 */
function enableButtons(response){
    if(response[1] == response[2]){
        document.getElementById('nextButton').disabled = true;
    } else{
        document.getElementById('nextButton').disabled = false;
    }
    if (response[1] == 1){
        document.getElementById('previousButton').disabled = true;
    } else{
        document.getElementById('previousButton').disabled = false;
    }
}

/**
 * Sends message to background to get the next or previous song in the playlist
 * @param {string} song 
 */
function playSong(song){
    chrome.runtime.sendMessage({name: song}, (response) =>{
        enableButtons(response);
        if(response[0] == "Empty List"){
            document.getElementById('nextButton').disabled = true;
            document.getElementById('previousButton').disabled = true;
            document.getElementById('playlistCounter').innerHTML = "0/0"
        }
        else if(response[0] == "No Movement"){
            document.getElementById('playlistCounter').innerHTML = response[1]+'/'+ response[2];
        }
        else{
            document.getElementById('iframePlayer').src = response[0];
            document.getElementById('playlistCounter').innerHTML = response[1]+'/'+ response[2];
        }
    });
}

function playNextAux(){
    playSong("Next Song");
}

function playPreviousAux(){
    playSong("Previous Song")
}

document.getElementById('nextButton').addEventListener('click', playNextAux);
document.getElementById('previousButton').addEventListener('click', playPreviousAux);
playSong("Current Song");