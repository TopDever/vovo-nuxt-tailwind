var live_id = document.currentScript.getAttribute('data-id');
var live_auth_code = document.currentScript.getAttribute('data-token');

var scriptElm = document.currentScript;
var currDiv = scriptElm.parentNode;

var ifr = document.createElement('iframe');
ifr.src = "https://staging.vovo.chat/embed?id=" + live_id + "&auth_code=" + live_auth_code;
ifr.id = "loader";
ifr.style = "border: 0;display: block;";

currDiv.appendChild(ifr);