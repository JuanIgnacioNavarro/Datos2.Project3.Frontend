function suggestionListAux(data){
    let songStr = "Song: " + data.track_name;
    let artistStr = "     /     Artist: " + data.artist;
    return songStr + artistStr;
}

/**
 * Returns the omnibox's suggestions (a list of objects)
 * @param {*} data information received from the request
 * @param {number} amount ammount of suggestions that will be displayed
 */
function suggestionList(data, amount){
    var list = [];
    for (i = 0; i < amount; i++){
        var object = {content: data[i].id, description: suggestionListAux(data[i])};
        list.push(object);
    }
    return list;
}

var songList = []
var currentSong = 0;
var hasAllKeyword = false;

chrome.omnibox.setDefaultSuggestion({description: "Search a song by its name, artist or lyrics"});

// Omnibox listener, used everytime the omnibox's text is updated
chrome.omnibox.onInputChanged.addListener(
    function(text, suggest) {

      // Constructing the get request text
      if (text == "*"){
          text = "";
      }
      var apiCall;
      if (text.length >20){
        apiCall = 'http://localhost:3050/tracks/search/lyrics?key='+ text +'&user_id=0'
      } else{
        apiCall = 'http://localhost:3050/tracks/search?key='+ text +'&user_id=0'
      }
      fetch(apiCall).then(function(res){
          // If the server is down
          if (res.status !== 200){
              suggest([
                  {content: "None", description: "Something went wrong"}
              ])
          }
          // Add the sugestions given by the server
          res.json().then(function(data){
              if(text == ""){
                list = suggestionList(data, 9);
              } else{
                list = suggestionList(data, 5);
              }
              suggest(list);
          }).catch(function(err) {
            suggest([{content: 'Error', description: 'There was a problem loading the server'}]);
        });
      })
    });
  
  // This event is fired with the user accepts the input in the omnibox.
  chrome.omnibox.onInputEntered.addListener(
    function(text) {
        if (text.length == 22){
            songList.push('https://open.spotify.com/embed/track/'+text);
        }
  });
  
chrome.runtime.onMessage.addListener((msg, sender, response) =>{
    if (songList.length == 0){
        console.log("Empty list");
        response(["Empty List", currentSong+1, songList.length]);
    }
    else{
        if(msg.name == "Next Song" & currentSong+1 < songList.length){
            currentSong+=1;
            response([songList[currentSong], currentSong+1, songList.length]);
        }
        else if (msg.name == "Previous Song" & currentSong !== 0){
            currentSong-=1;
            response([songList[currentSong], currentSong+1, songList.length]);
        }
        else if(msg.name == "Current Song"){
            response([songList[currentSong], currentSong+1, songList.length]);
        }
        else{
            response(["No Movement", currentSong+1, songList.length]);
        }
    }
});