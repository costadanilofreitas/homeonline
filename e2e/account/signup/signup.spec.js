'use strict';

var config = browser.params;
var UserModel = require(config.serverConfig.root + '/server/api/user/user.model');

describe('Signup View', function() {
  var page;

  var loadPage = function() {
    browser.manage().deleteAllCookies()
    browser.get(config.baseUrl + '/signup');
    page = require('./signup.po');
  };

  var testUser = {
    name: 'Test',
    email: 'test@test.com',
    password: 'test'
  };

  before(function() {
    return loadPage();
  });

  after(function() {
    return UserModel.removeAsync();
  });

  it('should include signup form with correct inputs and submit button', function() {
    expect(page.form.name.getAttribute('type')).to.eventually.equal('text');
    expect(page.form.name.getAttribute('name')).to.eventually.equal('name');
    expect(page.form.email.getAttribute('type')).to.eventually.equal('email');
    expect(page.form.email.getAttribute('name')).to.eventually.equal('email');
    expect(page.form.password.getAttribute('type')).to.eventually.equal('password');
    expect(page.form.password.getAttribute('name')).to.eventually.equal('password');
    expect(page.form.submit.getAttribute('type')).to.eventually.equal('submit');
    expect(page.form.submit.getText()).to.eventually.equal('Cadastre-se');
  });

  describe('with local auth', function() {

    before(function() {
      return UserModel.removeAsync();
    })

    it('should signup a new user, log them in, and redirecting to "/"', function() {
      page.signup(testUser);

      var navbar = require('../../components/navbar/navbar.po');

      expect(browser.getCurrentUrl()).to.eventually.equal(config.baseUrl + '/');
      expect(navbar.navbarAccountGreeting.getText()).to.eventually.equal('Bem-Vindo ' + testUser.name);
    });

    describe('and invalid credentials', function() {
      before(function() {
        return loadPage();
      });

      it('should indicate signup failures', function() {
        page.signup(testUser);

        expect(browser.getCurrentUrl()).to.eventually.equal(config.baseUrl + '/signup');
        expect(page.form.email.getAttribute('class')).to.eventually.contain('ng-invalid-mongoose');

        var helpBlock = page.form.element(by.css('.form-group.has-error .help-block.ng-binding'));
        expect(helpBlock.getText()).to.eventually.equal('The specified email address is already in use.');
      });

    });

  });
});
