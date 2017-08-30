
var amqp = require('amqplib/callback_api');
var request = require('request');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'products_event';

    ch.assertQueue(q, {durable: false});
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function(msg) {
      // send post to api
      console.log(" [x] Received %s", msg.content.toString());
    }, {noAck: true});
  });
});
