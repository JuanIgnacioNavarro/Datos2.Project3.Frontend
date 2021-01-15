function playNextSong(){
    chrome.runtime.sendMessage({name: "Next Song"}, (response) => {
        //Wait for response
        console.log(response);
        if (response == "Empty List"){
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


function playPreviousSong(){
    chrome.runtime.sendMessage({name: "Previous Song"}, (response) =>{
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

function playCurrentSong(){
    chrome.runtime.sendMessage({name: "Current Song"}, (response) =>{
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

document.getElementById('nextButton').addEventListener('click', playNextSong);
document.getElementById('previousButton').addEventListener('click', playPreviousSong);

playCurrentSong();

// Event that receives the text of the chosen song

/*
chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        updateSongSource(request.message); 
    });


// Auxiliar funtion that updates the html (with the spotify audio)
function updateSongSource(text){
    var newSrc = 'https://open.spotify.com/embed/track/'+ text;
    document.getElementById('myiframe').src = newSrc;
}
*/

/*
chrome.runtime.sendMessage({name: "SongList"}, (response) => {
    //Wait for response
    console.log(response);
    if (response == "Empty List"){ // || response == "No Next Song"){
        document.getElementById('titleH1').innerHTML = response;
    }
    else{
        document.getElementById('myiframe').src = response;
    }
});

*/
