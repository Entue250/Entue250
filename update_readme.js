const fs = require('fs');

// Read current README
let readme = fs.readFileSync('README.md', 'utf8');

// Generate timestamp for cache busting
const timestamp = Date.now();
console.log('Updating README with timestamp:', timestamp);

// Enhanced GitHub Stats with private repos
readme = readme.replace(
  /github-readme-stats\.vercel\.app\/api\?username=Entue250[^"]*"/g,
  `github-readme-stats.vercel.app/api?username=Entue250&count_private=true&include_all_commits=true&show_owner=true&show_icons=true&theme=radical&hide_border=true&bg_color=161b22&title_color=f75c7e&text_color=c9d1d9&icon_color=58a6ff&ring_color=f75c7e&custom_title=Entue250's GitHub Stats (All Repos)&cache_bust=${timestamp}"`
);

// Enhanced Top Languages with private repos
readme = readme.replace(
  /github-readme-stats\.vercel\.app\/api\/top-langs\/\?username=Entue250[^"]*"/g,
  `github-readme-stats.vercel.app/api/top-langs/?username=Entue250&count_private=true&include_all_commits=true&hide=html,css,scss&layout=compact&hide_border=true&theme=radical&bg_color=161b22&title_color=f75c7e&text_color=c9d1d9&langs_count=8&cache_bust=${timestamp}"`
);

// Update GitHub Trophies with enhanced configuration
readme = readme.replace(
  /github-profile-trophy\.vercel\.app\/\?username=Entue250[^"]*"/g,
  `github-profile-trophy.vercel.app/?username=Entue250&theme=radical&no-frame=true&no-bg=false&margin-w=4&margin-h=15&column=8&row=1&title=Commits,Repositories,Stars,Followers,Experience,Issues,PullRequest,Reviews&rank=SECRET,SSS,SS,S,AAA,AA,A,B,C&cache_bust=${timestamp}"`
);

// Enhanced Streak Stats
readme = readme.replace(
  /github-readme-streak-stats\.herokuapp\.com\/\?user=Entue250[^"]*"/g,
  `github-readme-streak-stats.herokuapp.com/?user=Entue250&theme=radical&hide_border=true&background=161b22&stroke=f75c7e&ring=f75c7e&fire=f75c7e&currStreakLabel=f75c7e&sideLabels=c9d1d9&currStreakNum=c9d1d9&sideNums=c9d1d9&dates=8b949e&excludeDaysLabel=8b949e&cache_bust=${timestamp}"`
);

// Enhanced Activity Graph
readme = readme.replace(
  /github-readme-activity-graph\.vercel\.app\/graph\?username=Entue250[^"]*"/g,
  `github-readme-activity-graph.vercel.app/graph?username=Entue250&theme=react-dark&bg_color=161b22&color=c9d1d9&line=f75c7e&point=58a6ff&area=true&hide_border=true&custom_title=Contribution Activity Graph&cache_bust=${timestamp}"`
);

// Update individual stat components as well
readme = readme.replace(
  /api\?username=Entue250&count_private=true&include_all_commits=true&show_icons=false[^"]*"/g,
  `api?username=Entue250&count_private=true&include_all_commits=true&show_icons=false&theme=radical&hide_border=true&cache_bust=${timestamp}"`
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
console.log('✅ Cache-busting timestamp applied:', timestamp);
