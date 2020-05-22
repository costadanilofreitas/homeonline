//dados de exemplo (semesntes)

/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Product = require('../api/product/product.model');
var Catalog = require('../api/catalog/catalog.model');
var mainCatalog, acabamento, construcao, eletrica, ferragem, hidraulica, iluminacao, revestimento, telhado, tinta;

User.find({}).removeAsync()
  .then(function() {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@test.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin'
    })
    .then(function() {
      console.log('finished populating users');
    });
  });

Catalog
  .find({})
  .remove()
  .then(function () {
    return Catalog.create({ name: 'Todos'});
  })
  .then(function (catalog) {
    mainCatalog = catalog;
    return mainCatalog.addChild({name: 'Acabamento'});
  })
  .then(function (category) {
    acabamento = category._id;
    return mainCatalog.addChild({name: 'Construcao'});
  })
  .then(function (category) {
    construcao = category._id;
    return mainCatalog.addChild({name: 'Eletrica'});
  })
  .then(function (category) {
    eletrica = category._id;
    return mainCatalog.addChild({name: 'Ferragem'});
  })
  .then(function (category) {
    ferragem = category._id;
    return mainCatalog.addChild({name: 'Hidraulica'});
  })
  .then(function (category) {
    hidraulica = category._id;
    return mainCatalog.addChild({name: 'Iluminacao'});
  })
  .then(function (category) {
    iluminacao = category._id;
    return mainCatalog.addChild({name: 'Revestimento'});
  })
  .then(function (category) {
    revestimento = category._id;
    return mainCatalog.addChild({name: 'Telhado'});
  })
  .then(function (category) {
    telhado = category._id;
    return mainCatalog.addChild({name: 'Tinta'});
  })
  .then(function (category) {
    tinta = category._id;
    return Product.find({}).remove({});
  })
  .then(function() {
    return Product.create({
      title: 'Lâmpada',
      imageUrl: '/assets/uploads/homeonlinelampada.jpg',
      price: 25,
      stock: 250,
      categories: [eletrica],
      description: 'Ilumine sua casa'
    }, {
      title: 'Fio',
      imageUrl: '/assets/uploads/homeonlinefio.jpg',
      price: 15,
      stock: 100,
      categories: [eletrica],
      description: 'Fio é na HomeOnLine'
    }, {
      title: 'Cano',
      imageUrl: '/assets/uploads/homeonlinecano.jpg',
      price: 8,
      stock: 50,
      categories: [hidraulica],
      description: 'Peça seu cano no HomeOnLine'
    }, {
      title: 'Areia',
      imageUrl: '/assets/uploads/homeonlineareia.jpg',
      price: 35,
      stock: 100,
      categories: [construcao],
      description: 'Peça sua areia no HomeOnLine'
    }, {
      title: 'Suvinil',
      imageUrl: '/assets/uploads/homeonlinetinta.png',
      price: 200,
      stock: 30,
      categories: [tinta],
      description: 'Pinte sua casa no HomeOnLine'
    }, {
      title: 'LED',
      imageUrl: '/assets/uploads/homeonlinelampada.jpeg',
      price: 200,
      stock: 30,
      categories: [iluminacao],
      description: 'Pinte sua LED no HomeOnLine'
    }, {
      title: 'Ferro',
      imageUrl: '/assets/uploads/homeonlineferro.jpg',
      price: 10,
      stock: 30,
      categories: [ferragem],
      description: 'Peça sua ferragem de forma rápida e eficaz'
    });
  })
  .then(function () {
    console.log('Acabou de preencher os produtos');
  })
  .then(null, function (err) {
    console.error('Error populating Products & categories: ', err);
  });
