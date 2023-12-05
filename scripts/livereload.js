"use strict";

import ext from "./utils/ext";

var LIVERELOAD_HOST = "localhost:";
var LIVERELOAD_PORT = 4242;
var connection = new WebSocket(
  "ws://" + LIVERELOAD_HOST + LIVERELOAD_PORT + "/livereload"
);

connection.onerror = function (error) {
  console.error("Reload connection error: ", error);
};

connection.onmessage = function (e) {
  if (e.data) {
    var data = JSON.parse(e.data);
    if (data && data.command === "reload") {
      ext.runtime.reload();
    }
  }
};