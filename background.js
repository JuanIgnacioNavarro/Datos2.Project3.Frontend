function getSuggestString(data){
    let songStr = "Song: " + data.track_name;
    let artistStr = " / Artist: " + data.artist;
    return songStr + artistStr;
}

// Omnibox listener, used everytime the omnibox's text is updated
chrome.omnibox.onInputChanged.addListener(
    function(text, suggest) {

      // Contructing the get request text
      console.log('inputChanged: ' + text);
      const apiCall = 'http://localhost:3050/tracks/search?key='+ text +'&user_id=0'
      fetch(apiCall).then(function(res){

          // If the server is down
          if (res.status !== 200){
              suggest([
                  {content: "None", description: "Something went wrong"}
              ])
          }

          // Add the sugestions given by the server
          res.json().then(function(data){
              suggest([
                  {content: data[0].id, description: getSuggestString(data[0])},
                  {content: data[1].id, description: getSuggestString(data[1])},
                  {content: data[2].id, description: getSuggestString(data[2])},
                  {content: data[3].id, description: getSuggestString(data[3])},
                  {content: data[4].id, description: getSuggestString(data[4])},
              ]);
          }).catch(function(err) {
            suggest([{content: 'Error', description: 'There was a problem loading the word of the day'}]);
        });
      })
    });
  
  // This event is fired with the user accepts the input in the omnibox.
  // A message is send through the extension (received in script.js)
  chrome.omnibox.onInputEntered.addListener(
    function(text) {
        chrome.runtime.sendMessage({message: text}, (response) => {});  
  });