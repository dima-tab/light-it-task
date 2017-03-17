"use strict";

var express = require('express');
var app = express();

app.use("/public/views/login-modal-window.html", express.static("public/views/login-modal-window.html"));
app.use("/public/views/registration-modal-window.html", express.static("public/views/registration-modal-window.html"));
app.use(express.static("public"));
app.listen(process.env.PORT || 5000);