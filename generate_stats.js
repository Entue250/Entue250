const https = require('https');
const fs = require('fs');

function apiRequest(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: path,
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        'User-Agent': 'GitHub-Stats-Bot',
        'Accept': 'application/vnd.github.v3+json'
      }
    };

    https.get(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`API Error: ${res.statusCode}`));
        }
      });
    }).on('error', reject);
  });
}

async function getCommitStats() {
  try {
    // Get user info
    const user = await apiRequest('/user');
    console.log(`📊 User: ${user.login}`);
    console.log(`📁 Public repos: ${user.public_repos}`);
    console.log(`🔒 Private repos: ${user.total_private_repos}`);

    // Get all repositories (public + private)
    const repos = await apiRequest('/user/repos?type=all&per_page=100&sort=updated');
    console.log(`📚 Total accessible repos: ${repos.length}`);

    // Count commits in recent repositories
    let totalCommits = 0;
    let reposChecked = 0;
    const currentYear = new Date().getFullYear();

    for (const repo of repos.slice(0, 30)) { // Check top 30 repos
      try {
        const commits = await apiRequest(`/repos/${user.login}/${repo.name}/commits?author=${user.login}&since=${currentYear}-01-01T00:00:00Z&per_page=100`);
        
        if (commits && Array.isArray(commits)) {
          totalCommits += commits.length;
          console.log(`📝 ${repo.name}: ${commits.length} commits (${repo.private ? 'private' : 'public'})`);
        }
        reposChecked++;
        
        // Rate limiting delay
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.log(`⚠️  Skipped ${repo.name}: ${error.message}`);
      }
    }

    console.log(`\n🎯 RESULTS:`);
    console.log(`Total commits in ${currentYear}: ${totalCommits}`);
    console.log(`Repositories checked: ${reposChecked}/${repos.length}`);

    // Update README with custom stats
    let readme = fs.readFileSync('README.md', 'utf8');
    
    // Generate dynamic stats badge
    const statsUrl = `https://img.shields.io/badge/Total%20Commits%20${currentYear}-${totalCommits}-brightgreen?style=for-the-badge&logo=github`;
    
    // Add or update custom stats section
    const customStatsSection = `\n<!-- Custom Commit Count -->\n<div align="center">\n  <img src="${statsUrl}" alt="Total Commits ${currentYear}" />\n  <p><em>Includes commits from ${reposChecked} repositories (public + private)</em></p>\n</div>\n<!-- End Custom Stats -->\n`;
    
    if (readme.includes('<!-- Custom Commit Count -->')) {
      readme = readme.replace(/<!-- Custom Commit Count -->[\s\S]*?<!-- End Custom Stats -->/g, customStatsSection.trim());
    } else {
      // Add after the GitHub Stats section
      const statsHeader = '<h2 align="center">📊 GitHub Stats</h2>';
      if (readme.includes(statsHeader)) {
        readme = readme.replace(statsHeader, statsHeader + customStatsSection);
      }
    }

    // Update regular stats cache
    const timestamp = Date.now();
    readme = readme.replace(/cache_bust=\d+/g, `cache_bust=${timestamp}`);

    fs.writeFileSync('README.md', readme);
    console.log('✅ README updated with custom commit count');

  } catch (error) {
    console.error('❌ Error generating stats:', error);
    process.exit(1);
  }
}

getCommitStats();
