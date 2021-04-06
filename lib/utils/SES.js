const aws = require('aws-sdk');
const SES = require('aws-sdk/clients/ses');

const sendEmail = (to, message) => {
  const data = {
    Destination: {
      Addresses: [`${to}`]
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: '<h1>Take me to your Leader!</h1>'
        },
        Text: {
          Charset: 'UTF-8',
          Data: `... ${message}`
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Suh dude'
      }
    },
    Source: 'anthonymrosario225@gmail.com',
    ReplyToAddress: [
      'anthonymrosario225@gmail.com'
    ]
  };

  const SESconfig = {
    apiVersion: '2010-12-01',
    region: 'us-west-2'
  };

  const response = new SES(SESconfig).sendEmail(data).promise();
};

module.exports = {  sendEmail };