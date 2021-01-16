function playSong(song){
    chrome.runtime.sendMessage({name: song}, (response) =>{
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

        if(response[0] == "Empty List"){
            document.getElementById('nextButton').disabled = true;
            document.getElementById('previousButton').disabled = true;
            document.getElementById('playlistCounter').innerHTML = "0/0"
        }
        else if(response[0] == "No Movement"){
            document.getElementById('playlistCounter').innerHTML = response[1]+'/'+ response[2];
        }
        else{
            document.getElementById('myiframe').src = response[0];
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

//########## changeVolume function is not working, it seems that iframes can't be muted, tried almost everything on internet

function changeVolume(){
    
    var iframe = document.getElementsByTagName('myiframe');
    iframe.setVolume(0);
}

//document.getElementById('increaseButton').addEventListener('click', changeVolume);

///########
document.getElementById('nextButton').addEventListener('click', playNextAux);
document.getElementById('previousButton').addEventListener('click', playPreviousAux);

playSong("Current Song");