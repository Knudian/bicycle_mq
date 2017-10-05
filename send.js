"use strict";

const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
    conn.createChannel((err, ch) => {
        let q = 'hello';

        ch.assertQueue(q, { durable:false});
        ch.sendToQueue(q, new Buffer('Hello World'));
        console.log("[x] sent 'Hello world!'");
    });
    setTimeout(() => { conn.close(); process.exit(0)}, 500);
});


