const fs = require('fs');

// Read current README
let readme = fs.readFileSync('README.md', 'utf8');

// Add cache-busting query parameter to force refresh of stats
const timestamp = Date.now();

// Update GitHub Stats
readme = readme.replace(
  /github-readme-stats\.vercel\.app\/api\?username=Entue250[^"]*"/g,
  `github-readme-stats.vercel.app/api?username=Entue250&count_private=true&include_all_commits=true&show_owner=true&show_icons=true&theme=radical&hide_border=true&bg_color=161b22&title_color=f75c7e&text_color=c9d1d9&icon_color=58a6ff&ring_color=f75c7e&cache_bust=${timestamp}"`
);

// Update Top Languages
readme = readme.replace(
  /github-readme-stats\.vercel\.app\/api\/top-langs\/\?username=Entue250[^"]*"/g,
  `github-readme-stats.vercel.app/api/top-langs/?username=Entue250&count_private=true&include_all_commits=true&layout=compact&hide_border=true&theme=radical&bg_color=161b22&title_color=f75c7e&text_color=c9d1d9&cache_bust=${timestamp}"`
);

// Update GitHub Trophies
readme = readme.replace(
  /github-profile-trophy\.vercel\.app\/\?username=Entue250[^"]*"/g,
  `github-profile-trophy.vercel.app/?username=Entue250&theme=radical&no-frame=true&no-bg=false&margin-w=4&margin-h=15&column=8&row=1&title=Commits,Repositories,Stars,Followers,Experience,Issues,PullRequest,Reviews&cache_bust=${timestamp}"`
);

// Update Streak Stats
readme = readme.replace(
  /github-readme-streak-stats\.herokuapp\.com\/\?user=Entue250[^"]*"/g,
  `github-readme-streak-stats.herokuapp.com/?user=Entue250&theme=radical&hide_border=true&background=161b22&stroke=f75c7e&ring=f75c7e&fire=f75c7e&currStreakLabel=f75c7e&cache_bust=${timestamp}"`
);

// Update Activity Graph
readme = readme.replace(
  /github-readme-activity-graph\.vercel\.app\/graph\?username=Entue250[^"]*"/g,
  `github-readme-activity-graph.vercel.app/graph?username=Entue250&theme=react-dark&cache_bust=${timestamp}"`
);

// Write updated README
fs.writeFileSync('README.md', readme);
console.log('README updated successfully with timestamp:', timestamp);
