const git = require('simple-git/promise')();
const fs = require('fs');
const path = require('path')

module.exports = {

    setup: async (dir, repo) =>{
        let clone = true;
        const baseDir = path.basename(dir);
        const parentDir = path.dirname(dir);
        const repoNameOnly = repo.split('/')[1];

        if (fs.existsSync(dir)) {
            git.cwd(dir)
            clone = ! await git.checkIsRepo();
            if (clone) {
                fs.rmdirSync(dir)
            }
        }

        if (clone) {
            git.cwd(parentDir);
            const repoUrl = `https://github.com/${repo}.git`;
            console.log(`No repo found on path: ${dir} . Clonning repo from ${repoUrl}`);
            await git.clone(repoUrl)
            const repoPath = path.join(parentDir,repoNameOnly);
            console.log(`Repo cloned to ${repoPath}`);
            if ( baseDir !== repoNameOnly) {
                console.log(`Moving repo from ${repoPath} to ${dir}`);
                fs.renameSync(repoPath,dir);
            }
        }
        return clone
    },

    pull: async (branch) => {
        branch = branch || 'master';
        const currBranch = (await git.branch()).current;
        if (currBranch !== branch) {
            console.log(`Branch changed from ${currBranch} to ${branch}`);
            await git.checkout(branch);
        }
        console.log('Intiating pull from the remote repo');
        await git.pull();
        console.log('Pull has been successfull')
    }

}