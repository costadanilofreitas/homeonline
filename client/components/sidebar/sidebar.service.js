'use strict';

angular.module('homeonlineApp')
  .factory('Catalog', function ($resource) {
    return $resource('/api/catalogs/:id');
  });
