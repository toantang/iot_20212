const mqtt = require('mqtt');

const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

const connectUrl = 'tcp://broker.hivemq.com:1883';
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'emqx',
  password: 'public',
  reconnectPeriod: 1000,
})

const topic = '/btvn/week7';

client.on('connect', () => {
  console.log('Connected');

  client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`);
  })

  const dataSend = '{ "id": 11, "packet_no": 126, "temperature": 30, "humidity": 60, "tds": 1100, "pH": 5.0 }';
  client.publish(topic, dataSend, { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error)
    }
  })
})
client.on('message', (topic, payload) => {
  console.log('Received Message:', JSON.parse(payload.toString()));
})
