const { setup, pull } = require('./utlis');
const { spawn } = require("child_process");


const deploy = async (dir,repoName,branch) => {
    await setup(dir,repoName)
    await pull(branch);
    const { exec } = require("child_process");

    exec(`cd ${dir} & npm deploy`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}

module.exports = { deploy };