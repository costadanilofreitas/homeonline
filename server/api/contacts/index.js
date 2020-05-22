'use strict';

var express = require('express');
var controller = require('./contacts.controller');

var router = express.Router();

router.post('/', controller.sendMail);

module.exports = router;
