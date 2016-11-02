function sendMessage(form) {
  var sendButton = $('#SendButton');
  var request = new XMLHttpRequest();
  var URL = encodeURI("/sendmessage/" + form.phonenumber.value + "/" + form.message.value);

  // If we're already sending a gif, return without doing anything
  if (sendButton.hasClass('disabled-button')) {
    return;
  }

  // Update send button to indicate gif is being sent, and prevent it from being clicked
  sendButton.text('Sending Gif');
  $('#PhoneNumber').prop("disabled", true);
  $('#GifContents').prop("disabled", true);

  // Callback logic
  request.onload = function () {
    if (request.status === 200) {
      sendButton.text('Gif Sent! Click again to send another.');
    } else if (request.status === 204) {
      sendButton.text('No gif found! Try another search term.');
    } else {
      sendButton.text('Something went wrong :( Click to try again.');
    }
    $('#PhoneNumber').prop("disabled", false);
    $('#GifContents').prop("disabled", false);
  };

  // Send request to server
  request.open("POST", URL, true);
  request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
  request.send(null);
}
