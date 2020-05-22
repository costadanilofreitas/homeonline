'use strict';

var _ = require('lodash');
var nodemailer = require('nodemailer');

/**
 * Send an email when the contact from is submitted
 */
exports.sendMail = function(req, res) {

    var data = req.body;

    var mailOpts, smtpTrans;
      //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
      smtpTrans = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
              user: "costa.danilofreitas@gmail.com",
              pass: "freitas123"
          },
          tls:{
            rejectUnauthorized:false
          }
      });
      //Mail options
      mailOpts = {
          from: data.contactEmail,
          to: 'costa.danilofreitas@gmail.com',
          subject: 'Mensagem de ' + data.contactName,
          text: 'Comentário: ' + data.contactMsg + ' - Email: ' + data.contactEmail
      };
      smtpTrans.sendMail(mailOpts, function (error, response) {
          //Email not sent
          if (error) {
              return console.log(error);
              //res.render('contacts', { title: 'Casa Freitas - Contato', msg: 'Ocorreu um erro, mensagem não foi enviada.', err: true, page: 'contact' })
          }
          //Yay!! Email sent
          else {
              console.log('ok');
              //res.render('contacts', { title: 'Casa Freitas - Contato', msg: 'Mensagem enviada! Obrigado.', err: false, page: 'contact' })
          }
      });

    res.json(data);
};
