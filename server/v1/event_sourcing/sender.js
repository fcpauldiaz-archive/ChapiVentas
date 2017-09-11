
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
      var transactions = [];
      var q = 'receive_sales';
      for (var i = 0 ; i < 2; i++) {
        var transaction = {
          date: '2017-08-09',
          product: {
            product_name: 'Bananos',
            product_price: 20
          },
          invoice: {
            amount: 123,
            invoice_identifier: 1
          },
          store: {
            store_name: 'Tienda Centro'
          },
          quantity: 1
        };
        //transactions.push(transaction);


      ch.assertQueue(q, {durable: false});
      // Note: on Node 6 Buffer.from(msg) should be used
      ch.sendToQueue(q, new Buffer.from(JSON.stringify(transaction)));
      console.log(" [x] Sent %s", transaction);
    }
  });
  //setTimeout(function() { conn.close(); process.exit(0) }, 3000);
});
