function playSong(song){
    chrome.runtime.sendMessage({name: song}, (response) =>{
        if(response == "Empty List"){
            document.getElementById('titleH1').innerHTML = response;
        }
        else if(response == "No Movement"){
            document.getElementById('titleH1').innerHTML = response;
        }
        else{
            document.getElementById('myiframe').src = response;
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