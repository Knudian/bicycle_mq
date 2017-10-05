"use strict";

const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
   conn.createChannel((err, ch) => {
       let q = 'hello';

       ch.assertQueue(q, { durable: false });
       console.log("Waiting for messages in %s. To exit press CTRL+C", q);
       ch.consume(q, (msg) => {
           console.log("[x] received : %s", msg.content.toString());
       }, { noAck : true});
   });
});