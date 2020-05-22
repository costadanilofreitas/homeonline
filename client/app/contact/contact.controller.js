'use strict';

angular.module('homeonlineApp')
  .controller('ContactCtrl', function($scope, $http, socket) {
          // Expose view variables

                  $scope.toastPosition = {
                      bottom: false,
                      top: true,
                      left: false,
                      right: true
                  };
                  $scope.getToastPosition = function () {
                      return Object.keys($scope.toastPosition)
                          .filter(function (pos) {
                              return $scope.toastPosition[pos];
                          })
                          .join(' ');
                  };

                  this.sendMail = function () {

                      var data = ({
                          contactName : this.contactName,
                          contactEmail : this.contactEmail,
                          contactMsg : this.contactMsg
                      });

                      // Simple POST request example (passing data) :
                     $http.post('/api/contacts', data).
                          success(function(data, status, headers, config) {
                              // this callback will be called asynchronously
                              // when the response is available
                              var msg;

                              msg.show(
                                  msg.simple()
                                      .content('Thanks for your message ' + data.contactName + ' You Rock!')
                                      .position($scope.getToastPosition())
                                      .hideDelay(5000)
                              );

                          }).
                          error(function(data, status, headers, config) {
                              // called asynchronously if an error occurs
                              // or server returns response with an error status.
                          });

                  };
              });
/*
angular.module('homeonlineApp')
  .controller('ContactCtrl', function($scope, $http, socket, $mdToast, $animate) {

    var nodemailer = require('nodemailer');

    // O primeiro passo é configurar um transporte para este
    // e-mail, precisamos dizer qual servidor será o encarregado
    // por enviá-lo:
    var transporte = nodemailer.createTransport({
      service: 'Gmail', // Como mencionei, vamos usar o Gmail
      auth: {
        user: 'costa.danilofreitas@gmail.com', // Basta dizer qual o nosso usuário
        pass: 'freitas123'             // e a senha da nossa conta
      }
    });

    // Após configurar o transporte chegou a hora de criar um e-mail
    // para enviarmos, para isso basta criar um objeto com algumas configurações
    var email = {
      from: 'costa.danilofreitas@gmail.com', // Quem enviou este e-mail
      to: 'casafreitas.materiaiseletricos@gmail.com', // Quem receberá
      subject: 'Node.js ♥ unicode',  // Um assunto bacana :-)
      html: 'E-mail foi enviado do <strong>Node.js</strong>' // O conteúdo do e-mail
    };

    // Pronto, tudo em mãos, basta informar para o transporte
    // que desejamos enviar este e-mail
    transporte.sendMail(email, function(err, info){
      if(err)
        throw err; // Oops, algo de errado aconteceu.

      console.log('Email enviado! Leia as informações adicionais: ', info);
    });

    $scope.sendMail = function {

          transporte.sendMail(email, function(error, info) {
              if (error) {
                  console.log(error);
              } else {
                  console.log('Email enviado ' + info.response);
              }
          });
       };
  });
*/
