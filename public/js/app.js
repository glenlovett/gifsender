function sendMessage(form) {
  var request = new XMLHttpRequest();
  var URL = encodeURI("/sendmessage/" + form.phonenumber.value + "/" + form.message.value);

  request.onload = function () {
    var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
    var data = request.responseText; // Returned data, e.g., an HTML document.
  };

  request.open("POST", URL, true);
  request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
  request.send(null);
}
