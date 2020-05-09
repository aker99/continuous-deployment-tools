const { setup, pull } = require('./utlis');



const deploy = async (dir,repoName,branch) => {
    await setup(dir,repoName)
    await pull(branch);
}

module.exports = {deploy}

//const isCLI = ! module.parent;
// if (isCLI) {
//     agrv = process.argv;
//     argvChecker(agrv, ['dir','repo']);
//     const dir = agrv.dir;
//     const repoName = agrv.repo;
//     const branch = argv.branch | 'master';
//     deploy(dir,repoName,branch)
// }