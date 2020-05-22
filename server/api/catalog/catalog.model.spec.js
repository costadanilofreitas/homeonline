'use strict';

var Catalog = require('./catalog.model');
var Product = require('../product/product.model');

describe('Product+Catalog', function() {
  var root, ferragem, tinta, acabamento;
  var createCatalog = function (done){
    Catalog
      .find({})
      .remove()
      .then(function () {
        return Product.find({}).remove();
      })
      .then(function () {
        return Catalog.create({name: 'Navegação'})
      })
      .then(function (rootElement) {
        root = rootElement;
        return root.addChild({name: 'Ferragem'});
      })
      .then(function (child) {
        ferragem = child;
        return root.addChild({name: 'Tinta'});
      })
      .then(function (child) {
        tinta = child;
        return root.addChild({name: 'Acabamento'});
      })
      .then(function (child) {
        acabamento = child;
        done();
      })
      .then(null, done);
  }

  beforeEach(function (done) {
    return createCatalog(done);
  });

  it('should create a product with ferragem catetory', function(done) {
    Product.create({title: 'Viga', price: 25, categories: [ferragem._id]})
      .then(function () {
        return Product.findOne({}).populate(['categories', 'categories.parent']);
      })
      .then(function (newFerragem) {
        var category = newFerragem.categories[0];
        category.name.should.be.equal('Ferragem');
        category.slug.should.be.equal('ferragem');
        done();
      })
      .then(null, done);
  });
});

describe('Finding products by category', function () {
  var mainCatalog, eletrica, ferragem, hidraulica, construcao, casa, parafuso, iluminacao;

  var createProductsCatalog = function (callback) {
    Catalog
      .find({})
      .remove()
      .then(function () {
        return Catalog.create({ name: 'Todos'});
      })
      .then(function (catalog) {
        mainCatalog = catalog;
        return mainCatalog.addChild({name: 'Elétrica'});
      })
      .then(function (category) {
        eletrica = category._id;
        return mainCatalog.addChild({name: 'Ferragem'});
      })
      .then(function (category) {
        ferragem = category._id;
        return mainCatalog.addChild({name: 'Hidráulica'});
      })
      .then(function (category) {
        hidraulica = category._id;
        return mainCatalog.addChild({name: 'Construção'});
      })
      .then(function (category) {
        construcao = category._id;
        return mainCatalog.addChild({name: 'Casa'});
      })
      .then(function (category) {
        casa = category._id;
        return mainCatalog.addChild({name: 'Parafuso'});
      })
      .then(function (category) {
        parafuso = category._id;
        return mainCatalog.addChild({name: 'Iluminação'});
      })
      .then(function (category) {
        iluminacao = category._id;
        return Product.find({}).remove({});
      })
      .then(function() {
        return Product.create({
          title: 'Lâmpada',
          price: 25,
          stock: 250,
          categories: [eletrica],
          description: 'Ilumine sua casa'
        }, {
          title: 'Fio',
          price: 15,
          stock: 100,
          categories: [eletrica],
          description: 'Fio é na HomeOnLine'
        }, {
          title: 'Ferro',
          price: 10,
          stock: 30,
          categories: [ferragem],
          description: 'Peça sua ferragem de forma rápida e eficaz'
        }, {
          title : 'Bloco',
          price : 9.5,
          stock : 100,
          categories : [construcao],
          description : 'Não precisa mais ir a loja para comprar seu bloco de construção'
        }, {
          title : 'LED',
          price : 7.5,
          stock : 70,
          categories : [iluminacao],
          description : 'Troque suas lâmpadas comum pela as de LED'
        }, {
          title : 'Sofá',
          price : 600,
          stock : 100,
          categories : [casa],
          description : 'É sofá? É HomeOnLine!'
        });
      })
      .then(function () {
        callback(null);
      })
      .then(null, callback);
  }

  beforeEach(function (done) {
    return createProductsCatalog(done);
  });

  it('should find 2 eletric products', function(done) {
    Product
      .find({'categories': eletrica })
      .populate('categories')
      .exec()
      .then(function (products) {
        products.length.should.be.equal(2);
        done()
      })
      .then(null, done);
  });

  it('should find one casa and one parafuso products', function (done) {
    Product
      .find({'categories': { $in: [iluminacao, casa]} })
      .populate('categories')
      .exec()
      .then(function (products) {
        products.length.should.be.equal(2);
        done()
      })
      .then(null, done);
  });


  it('should find _all_ products', function (done) {
    Product
      .find({'categories': { $in: mainCatalog.children } })
      .populate('categories')
      .exec()
      .then(function (products) {
        expect(mainCatalog.children).to.contain(casa);
        expect(mainCatalog.children).to.contain(hidraulica);
        expect(mainCatalog.children).to.contain(eletrica);
        expect(mainCatalog.children).to.contain(ferragem);
        expect(mainCatalog.children).to.contain(parafuso);
        expect(mainCatalog.children).to.contain(iluminacao);
        products.length.should.be.equal(6);
        done()
      })
      .then(null, done);
  });
});
