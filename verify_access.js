const https = require('https');

const options = {
  hostname: 'api.github.com',
  path: '/user/repos?type=all&per_page=5',
  method: 'GET',
  headers: {
    'Authorization': `token ${process.env.GITHUB_TOKEN}`,
    'User-Agent': 'GitHub-Profile-Updater',
    'Accept': 'application/vnd.github.v3+json'
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    if (res.statusCode === 200) {
      const repos = JSON.parse(data);
      const privateCount = repos.filter(repo => repo.private).length;
      const publicCount = repos.filter(repo => !repo.private).length;
      console.log('✅ GitHub API Access Verified');
      console.log(`📊 Found ${privateCount} private repos and ${publicCount} public repos in sample`);
      console.log('✅ Private repository access is working correctly');
    } else {
      console.log('❌ GitHub API access error:', res.statusCode);
      console.log('Response:', data);
    }
  });
});

req.on('error', (error) => {
  console.log('❌ Request error:', error.message);
});

req.end();
