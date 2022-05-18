var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost:27017', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'hello';
        var msg = '{ "id": 11, "packet_no": 126, "temperature": 30, "humidity": 60, "tds": 1100, "pH": 5.0 }';

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function () {
        connection.close();
        process.exit(0);
    }, 500);
});
