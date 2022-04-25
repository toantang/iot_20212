//to run this project (vs code): 
//step1: typing "npm start"

const axios = require('axios');
require('dotenv').config();

const { DB_URL } = process.env; // DB_URL = https://api.thingspeak.com/update?api_key=T7H40F0X82VGW7L5

class Information {
    constructor({ field1, field2}) {
        this.field1 = field1;
        this.field2 = field2;
    };
    toString() {
        return 'field1: ' + this.field1 + ', field2: ' + this.field2;
    }
};

const parseToUrlEncoded = (info) => {
    return '&field1=' + info.field1 + '&field2=' + info.field2;
};
const getByUrlEncoded = async () => {
    const info = new Information({ field1: 28, field2: 68, });
    const res = await axios.get(DB_URL + parseToUrlEncoded(info));
    console.log(`get data by url encoded: ${res.data}`);
};

const getByBodyJson = async () => {
    const info = new Information({ field1: 28, field2: 68, });
    const res = await axios.get(DB_URL, {params: info});
    const data = res.data;
    console.log(`get data (body has json): ${res.data}`);
};

const getDataFromChanel = async () => {
    const res = await axios.get('https://api.thingspeak.com/channels/1529099/feeds.json?results=3');
    const feeds = res.data.feeds;
    Array.from(feeds).forEach(element => {
        const jsonParsed = JSON.parse(JSON.stringify(element));
        const info = new Information(jsonParsed);
        console.log(`information of an item: ${info}`);
    });
};

//getByUrlEncoded();
//getByBodyJson();
getDataFromChanel();