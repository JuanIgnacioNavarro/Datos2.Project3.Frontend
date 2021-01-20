var logged_in_user

chrome.extension.sendMessage({}, function(response) {
    logged_in_user = response.email
});