"use strict";
const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
    conn.createChannel((err, ch) => {
        let q = 'task_queue';

        ch.assertQueue(q, {durable: true});
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        ch.consume(q, (msg) => {
            let secs = msg.content.toString().split('.').length - 1;

            console.log(" [x] Received %s", msg.content.toString());
            setTimeout(() => {
                console.log(" [x] Done");
                ch.ack(msg);
            }, secs * 1000);
        }, {noAck: false});
    });
});