// config should be imported before importing any other file
import polyfill from 'babel-polyfill'; // eslint-disable-line
import config from './config/config';  // eslint-disable-line
import app from './config/express';    // eslint-disable-line

var amqp = require('amqplib/callback_api');
var request = require('request');

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, () => {
    console.log(`server started on port ${config.port} (${config.env})`);
  });
}

amqp.connect('amqp://test:test@13.58.81.154', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'receive_sales';

    ch.assertQueue(q, {durable: false});
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function(msg) {

      var content = JSON.parse(msg.content.toString())
      console.log(content);
      // send post to api
      var options = { method: 'POST',
        url: 'https://chapi-ventas-api-staging.herokuapp.com/api/ventas',
        headers:
         { 'postman-token': 'bd4c0a5f-1a2a-eef3-c955-fc614d4cbeb9',
           'cache-control': 'no-cache',
           'content-type': 'application/json' },
        body: content,
        json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
      });
      console.log(" [x] Received %s", msg.content.toString());
    }, {noAck: true});
  });
});



export default app;
