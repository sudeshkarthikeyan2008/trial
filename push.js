const fs = require('fs');
const path = require('path');
const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');

const token = process.argv[2] || process.env.GITHUB_TOKEN;

if (!token) {
  console.log('Usage: node push.js <YOUR_GITHUB_PERSONAL_ACCESS_TOKEN>');
  console.log('Or set GITHUB_TOKEN environment variable.');
  process.exit(1);
}

async function runPush() {
  const dir = path.resolve(__dirname);
  console.log('Pushing to https://github.com/sudeshkarthikeyan2008/ADAPTIX.git ...');

  await git.push({
    fs,
    http,
    dir,
    remote: 'origin',
    ref: 'main',
    onAuth: () => ({
      username: token,
      password: ''
    })
  });

  console.log('Successfully pushed to https://github.com/sudeshkarthikeyan2008/ADAPTIX.git on branch main!');
}

runPush().catch(err => {
  console.error('Push failed:', err.message);
  process.exit(1);
});
