const express = require('express');
const app = express();
const port  = 8050;

app.get('', (req,res) => {
    res.send('Hello, It\'s a deployment module');
});

app.post('aker99/frontend', (req,res) => {
    console.log('req:',req);
    res.send('Done');
});

app.listen(port,() => console.log('Webhook for deployment app started at '+port));