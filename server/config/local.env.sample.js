'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'homeonline-secret',

  FACEBOOK_ID: '1394967823928094',
  FACEBOOK_SECRET: '1f70c2cc23ef1fc7df8bacb69578ee71',

  TWITTER_ID: 'hbtVOvEPie7zUExwSjgbmsaK4',
  TWITTER_SECRET: 'nJEnpTzDHzbTfdT44zrwdLL4cuVantANFliW0WUw5I595F02kn',

  //GOOGLE_ID: '822485741481-te8o5vgftav74nu4eu1lkmq0jdhr8avl.apps.googleusercontent.com',
  //GOOGLE_SECRET: 'TbcC6EV8zD-8NN_4_od5By5c',

  //BRAINTREE_ID: 'gg99vv8nzx9tqzr4',
  //BRAINTREE_SECRET: '092394ce1f266e3541fa78751515a59d',
  //BRAINTREE_MERCHANT: 'srkssdbq77c3qkdt',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
