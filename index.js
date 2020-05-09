const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');

const app = express();
const port  = process.env.PORT | 8558;

const records = require('./assets/record.json');


app.use(cors());
app.use(bodyparser.urlencoded({
    extended: true
}));

app.post('/ghwebhooks', (req,res) => {
    
    const payload = JSON.parse(req.body.payload);
    const branch = payload.ref.split('/').pop();
    const repoName = payload.repository.full_name;

    if (records[repoName].branch === branch) {
        const { deploy } = require(`./assets/scripts/${records[repoName].script}`);
        deploy(records[repoName].dir,repoName,branch);
        return res.send('Git pull started. Please go through look services logs for more detail');
    } else {
        res.statusCode = 401;
        return res.send('No record found for the repo');
    }

});

app.listen(port,() => console.log(`Github Webhook Hanlder Service running on ${port}`));
