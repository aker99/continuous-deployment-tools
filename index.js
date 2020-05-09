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

app.post('ghwebhooks', (req,res) => {
    
    const payload = req.body.payload;
    const branch = payload.ref.split('/').pop();
    const repoName = payload.repository.full_name;

    if (records[repoName].branch === branch) {
        const { deploy } = require(records[repoName].script);
        deploy(records[repoName].dir,repoName,branch);
    } else {
        res.statusCode = 401;
        res.send('No record found for the repo');
    }

    res.send('Done');
});

app.listen(port,() => console.log(`Github Webhook Hanlder Service running on ${port}`));
