// Event that receives the text of the chosen song
chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        updateSongSource(request.message); 
        sendResponse({message: "hi to you"});
    });

// Auxiliar funtion that updates the html (with the spotify audio)
function updateSongSource(text){
    var newSrc = 'https://open.spotify.com/embed/track/'+ text;
    document.getElementById('myiframe').src = newSrc;
}