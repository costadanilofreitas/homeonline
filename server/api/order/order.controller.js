/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/orders              ->  index
 * POST    /api/orders              ->  create
 * GET     /api/orders/:id          ->  show
 * PUT     /api/orders/:id          ->  update
 * DELETE  /api/orders/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Order = require('./order.model');
/*
var ejs = require('ejs');
var paypal = require('paypal-rest-sdk');

paypal.configure ({
   ' mode ' :  ' sandbox ' , // sandbox ou live
  ' client_id ' :  'AZgI6bZ2BytqrFEDzQU2ZkqQaiCBmZaSjjqzHaUxt9veZ23iJCCggdFnfY9_QoiEcHczUvfdwdIizpNN' ,
   ' client_secret ' :  'EKEH6m458l8zUEKwvRccgLcIxugioK-b-fBp_yCRD1-rAvO70BJProJa3d2J6tgUTQlajt5COfMqpUjx'
});

exports.checkout = function(req, res) {
  var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:9000",
        "cancel_url": "http://cancel.url"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "item",
                "sku": "item",
                "price": "1.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "1.00"
        },
        "description": "This is the payment description."
    }]
  };

  paypal.checkout.create(create_payment_json, function (error, checkout) {
    if (error) {
        throw error;
    } else {
        console.log("Create Payment Response");
        console.log(checkout);
        res.send('teste');
    }
  });

};
*/
function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Orders
exports.index = function(req, res) {
  Order.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Order from the DB
exports.show = function(req, res) {
  Order.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Order in the DB
exports.create = function(req, res) {
  Order.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Order in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Order.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Order from the DB
exports.destroy = function(req, res) {
  Order.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
