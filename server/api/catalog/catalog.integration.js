'use strict';

var app = require('../..');
var request = require('supertest');

var newCatalog;

describe('Catalog API:', function() {

  describe('GET /api/catalog', function() {
    var catalogs;

    beforeEach(function(done) {
      request(app)
        .get('/api/catalog')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          catalogs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(catalogs).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/catalog', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/catalog')
        .send({
          name: 'New Catalog',
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newCatalog = res.body;
          done();
        });
    });

    it('should respond with the newly created catalog', function() {
      expect(newCatalog.name).to.equal('New Catalog');
    });

  });

  describe('GET /api/catalog/:id', function() {
    var catalog;

    beforeEach(function(done) {
      request(app)
        .get('/api/catalog/' + newCatalog._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          catalog = res.body;
          done();
        });
    });

    afterEach(function() {
      catalog = {};
    });

    it('should respond with the requested catalog', function() {
      expect(catalog.name).to.equal('New Catalog');
    });

  });

  describe('PUT /api/catalog/:id', function() {
    var updatedCatalog

    beforeEach(function(done) {
      request(app)
        .put('/api/catalog/' + newCatalog._id)
        .send({
          name: 'Updated Catalog',
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCatalog = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCatalog = {};
    });

    it('should respond with the updated catalog', function() {
      expect(updatedCatalog.name).to.equal('Updated Catalog');
    });

  });

  describe('DELETE /api/catalogs/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/catalog/' + newCatalog._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when catalog does not exist', function(done) {
      request(app)
        .delete('/api/catalog/' + newCatalog._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
