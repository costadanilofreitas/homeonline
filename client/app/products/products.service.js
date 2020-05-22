//serviços de produtos, métodos CRUD(create-read-update-delete)

'use strict';

angular.module('homeonlineApp')
  .factory('Product', function ($resource) {
    return $resource('/api/products/:id/:controller', null, {
      'update': { method: 'PUT'},
      'catalog':{ method: 'GET', isArray: true,
        params: {
          controller: 'catalog'
        }
      },
      'search': { method: 'GET', isArray: true,
        params: {
          controller: 'search'
        }
      }
    });
  });
