
var amqp = require('amqplib/callback_api');
var request = require('request');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'products_event';

    ch.assertQueue(q, {durable: false});
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function(msg) {
      console.log(msg.content.toString());
      // send post to api
      var options = { method: 'POST',
        url: 'http://localhost:3000/api/product',
        headers:
         { 'postman-token': 'bd4c0a5f-1a2a-eef3-c955-fc614d4cbeb9',
           'cache-control': 'no-cache',
           'content-type': 'application/json' },
        body: { nombre: msg.name.toString(), precio: msg.price.toString(), moneda: msg.currency.toString() },
        json: true };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
      });
      console.log(" [x] Received %s", msg.content.toString());
    }, {noAck: true});
  });
});
