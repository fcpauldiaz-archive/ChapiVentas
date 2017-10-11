var amqp = require('amqplib/callback_api');

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

amqp.connect('amqp://test:test@13.58.81.154', function(err, conn) {
  conn.createChannel(function(err, ch) {
      var transactions = [];
      var q = 'receive_sales';
      for (var i = 0 ; i < 2; i++) {
        var transaction = {
          date: randomDate(new Date(2012, 0, 1), new Date()),
          product: {
            product_name: makeid(),
            product_price: Math.round(Math.random() * (5000 - 0) + 0)
          },
          invoice: {
            amount: Math.round(Math.random() * (5000 - 1) + 1),
            invoice_identifier: 1
          },
          store: {
            store_name: 'Tienda Centro'
          },
          quantity: Math.round(Math.random() * (100 - 1) + 1)
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
