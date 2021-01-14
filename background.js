function getSuggestString(data){
    let songStr = "Song: " + data.track_name;
    let artistStr = " / Artist: " + data.artist;
    return songStr + artistStr;
}

chrome.omnibox.onInputChanged.addListener(
    function(text, suggest) {
      console.log('inputChanged: ' + text);
      const apiCall = 'http://localhost:3050/tracks/search?key='+ text +'&user_id=0'
      fetch(apiCall).then(function(res){
          if (res.status !== 200){
              suggest([
                  {content: "None", description: "Something went wrong"}
              ])
          }
          res.json().then(function(data){
              suggest([
                  {content: data[0].id, description: data[0].track_name},
                  {content: data[1].id, description: data[1].track_name},
                  {content: data[2].id, description: data[2].track_name},
                  {content: data[3].id, description: data[3].track_name},
                  {content: data[4].id, description: data[4].track_name},
              ]);
          }).catch(function(err) {
            suggest([{content: 'Error', description: 'There was a problem loading the word of the day'}]);
        });
      })
      /*
      suggest([
        {content: text + " one", description: "the first one"},
        {content: text + " number two", description: "the second entry"}
      ]);
      */
    });
  
  // This event is fired with the user accepts the input in the omnibox.
  chrome.omnibox.onInputEntered.addListener(
    function(text) {
      console.log('inputEntered: ' + text);
      alert('You just typed "' + text + '"');
  });

/*
  //We call api..
  fetch(apiCall).then(function(res){
    //Wait for response..
    if (res.status !== 200){
        response({word: 'Error', desc: 'There was a problem loading the word of the day'});
        return;
    }
    res.json().then(function(data){
        //send the response
        response({word: data.word, desc: data.note})
    });
}).catch(function(err) {
    response({word: 'Error', desc: 'There was a problem loading the word of the day'});
});
*/