const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const port  = 8050;

const cors = require('cors')


app.use(cors());
app.use(bodyparser.urlencoded({
    extended: true
}));

app.get('', (req,res) => {
    res.send('Hello, It\'s a deployment module');
});

app.post('/aker99/frontend', (req,res) => {
    console.log('req:',req.body);
    res.send('Done');
});

app.listen(port,() => console.log('Webhook for deployment app started at '+port));
