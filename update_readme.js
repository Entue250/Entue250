const fs = require('fs');

// Read current README
let readme = fs.readFileSync('README.md', 'utf8');

// Generate timestamp for cache busting
const timestamp = Date.now();
console.log('Updating README with timestamp:', timestamp);

// Update all GitHub README Stats URLs
readme = readme.replace(
  /github-readme-stats\.vercel\.app\/api\?username=Entue250[^"]*cache_bust=\d+/g,
  `github-readme-stats.vercel.app/api?username=Entue250&count_private=true&include_all_commits=true&show_icons=true&theme=radical&hide_border=true&bg_color=161b22&title_color=f75c7e&text_color=c9d1d9&icon_color=58a6ff&ring_color=f75c7e&show_owner=true&cache_bust=${timestamp}`
);

// Update Top Languages URLs
readme = readme.replace(
  /github-readme-stats\.vercel\.app\/api\/top-langs\/\?username=Entue250[^"]*cache_bust=\d+/g,
  `github-readme-stats.vercel.app/api/top-langs/?username=Entue250&count_private=true&include_all_commits=true&hide=html,css,scss,less,stylus&layout=compact&theme=radical&hide_border=true&bg_color=161b22&title_color=f75c7e&text_color=c9d1d9&langs_count=10&cache_bust=${timestamp}`
);

// Update GitHub Trophies URLs
readme = readme.replace(
  /github-profile-trophy\.vercel\.app\/\?username=Entue250[^"]*cache_bust=\d+/g,
  `github-profile-trophy.vercel.app/?username=Entue250&theme=radical&no-frame=true&no-bg=false&margin-w=4&margin-h=15&column=7&row=2&title=Commit,Followers,Stars,Repositories,Issues,PullRequest,Reviews&cache_bust=${timestamp}`
);

// Update Streak Stats URLs
readme = readme.replace(
  /github-readme-streak-stats\.herokuapp\.com\/\?user=Entue250[^"]*cache_bust=\d+/g,
  `github-readme-streak-stats.herokuapp.com/?user=Entue250&theme=radical&hide_border=true&background=161b22&stroke=f75c7e&ring=f75c7e&fire=f75c7e&currStreakLabel=f75c7e&sideLabels=c9d1d9&currStreakNum=c9d1d9&sideNums=c9d1d9&dates=8b949e&cache_bust=${timestamp}`
);

// Update Activity Graph URLs
readme = readme.replace(
  /github-readme-activity-graph\.vercel\.app\/graph\?username=Entue250[^"]*cache_bust=\d+/g,
  `github-readme-activity-graph.vercel.app/graph?username=Entue250&theme=react-dark&bg_color=161b22&color=c9d1d9&line=f75c7e&point=58a6ff&area=true&hide_border=true&custom_title=GitHub%20Activity%20Graph&cache_bust=${timestamp}`
);

// Update detailed stats URLs (for commit, repository, and issue stats)
readme = readme.replace(
  /github-readme-stats\.vercel\.app\/api\?username=Entue250&count_private=true[^"]*&cache_bust=\d+/g,
  `github-readme-stats.vercel.app/api?username=Entue250&count_private=true&include_all_commits=true&theme=radical&hide_border=true&cache_bust=${timestamp}`
);

// Update Private Repository Insights URL
readme = readme.replace(
  /Complete%20Development%20Activity&cache_bust=\d+/g,
  `Complete%20Development%20Activity&cache_bust=${timestamp}`
);

// Update last updated timestamp in footer
const lastUpdated = new Date().toISOString().split('T')[0];
readme = readme.replace(
  /Last updated: [^|]*/g,
  `Last updated: ${lastUpdated}`
);

// Write updated README
fs.writeFileSync('README.md', readme);
console.log('✅ README successfully updated!');
console.log('✅ All GitHub stats now include private repository data');
console.log('✅ HTML/CSS/SCSS hidden from language stats');
console.log('✅ All trophies including PullRequest and Issues added');
console.log('✅ Activity graph and detailed stats fixed');
console.log('✅ Cache-busting timestamp applied:', timestamp);
