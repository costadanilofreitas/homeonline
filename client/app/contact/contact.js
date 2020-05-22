//rotas

'use strict';

angular.module('homeonlineApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('contact', {
        url: '/contact',
        templateUrl: 'app/contact/contact.html',
        controller: 'ContactCtrl'
      });
  });
