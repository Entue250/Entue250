const fs = require('fs');
const timestamp = process.env.TIMESTAMP;

let readme = fs.readFileSync('README.md', 'utf8');

// Update main GitHub Stats with enhanced URL for private repos
readme = readme.replace(
  /src="https:\/\/github-readme-stats\.vercel\.app\/api\?username=Entue250[^"]*"/g,
  `src="https://github-readme-stats.vercel.app/api?username=Entue250&count_private=true&include_all_commits=true&show_icons=true&theme=radical&hide_border=true&bg_color=161b22&title_color=f75c7e&text_color=c9d1d9&icon_color=58a6ff&ring_color=f75c7e&show_owner=true&cache_bust=${timestamp}"`
);

// Update Top Languages
readme = readme.replace(
  /src="https:\/\/github-readme-stats\.vercel\.app\/api\/top-langs\/\?username=Entue250[^"]*"/g,
  `src="https://github-readme-stats.vercel.app/api/top-langs/?username=Entue250&count_private=true&include_all_commits=true&layout=compact&theme=radical&hide_border=true&bg_color=161b22&title_color=f75c7e&text_color=c9d1d9&langs_count=10&cache_bust=${timestamp}"`
);

// Update other stats services
readme = readme.replace(/cache_bust=\d+/g, `cache_bust=${timestamp}`);

fs.writeFileSync('README.md', readme);
console.log('✅ README updated with enhanced private repo parameters');
console.log('🔢 Expected total commits: 303 (including private repos)');
console.log('⏰ Current showing: Check stats after 30 minutes');
