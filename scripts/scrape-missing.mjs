// Scrape Pexels for mismatched ingredient searches
import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';

const SEARCHES = [
  // Eggs
  'egg+food','quail+egg','duck+egg','egg+white','egg+yolk','soft+boiled+egg','century+egg',
  // Fruits missing from pool
  'apple+fruit+fresh','avocado+food','grape+bunch','watermelon+fruit','kiwi+fruit+fresh',
  'lemon+citrus','orange+citrus','grapefruit+citrus','pineapple+fruit+fresh',
  'peach+fruit+fresh','pear+fruit+fresh','persimmon+fruit','cherry+fruit+fresh',
  'raspberry+fruit+fresh','coconut+tropical','fig+fruit+fresh','pomegranate+fruit+fresh',
  'plum+fruit+fresh','papaya+tropical','passion+fruit+tropical','lime+citrus',
  'cranberry+fruit','dragon+fruit+pitaya','dried+fig+fruit','green+plum',
  'quince+fruit+fresh','calamansi+citrus','acai+berry','goji+berry+dried',
  'soursop+fruit','cherimoya+fruit','finger+lime','honeydew+melon',
  'cantaloupe+melon+fresh','starfruit+carambola','guava+fruit+fresh',
  'lychee+fruit+fresh','jackfruit+tropical','durian+fruit','tangerine+citrus',
  'clementine+citrus','nectarine+fruit','apricot+fruit+fresh','mulberry+fruit',
  'gooseberry+fruit','jujube+fruit','yuzu+citrus','green+grape+fruit',
  'melon+fruit+fresh','kumquat+citrus','blackberry+fruit+fresh','mangosteen+fruit',
  'rambutan+fruit','tamarind+food','acerola+cherry','black+currant+berry',
  'elderberry+fruit','dates+medjool','baobab+fruit',
  // Nuts/seeds
  'peanut+food','sesame+seeds+food','poppy+seeds','nigella+seeds',
  'peanut+butter+jar',
  // Seaweed
  'nori+seaweed+sheet','kombu+kelp','wakame+seaweed+salad','hijiki+seaweed',
  'green+laver+seaweed','agar+agar+jelly','seaweed+food',
  // Sauces/seasonings
  'salt+shaker','white+sugar+bowl','mayonnaise+jar','tahini+paste',
  'vanilla+extract','baking+powder+can','dry+yeast+packet',
  'ketchup+squeeze','sriracha+bottle','tabasco+hot+sauce',
  // Peppers
  'chili+pepper+red','jalapeno+pepper+green','green+chili+pepper',
  'korean+chili+pepper','roasted+red+pepper+jar',
  // Vegetables
  'napa+cabbage+fresh','cabbage+head','pumpkin+whole','bean+sprouts+fresh',
  'artichoke+fresh','okra+vegetable','nopales+cactus+food','mung+bean+sprouts',
  // Processed
  'fish+cake+korean','crab+stick+surimi','gelatin+powder','smoothie+glass',
  'condensed+milk+can',
];

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function fetchIds(query) {
  try {
    const url = `https://www.pexels.com/search/${query}/`;
    const cmd = `curl -s "${url}" -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36" -H "Accept: text/html,application/xhtml+xml" -H "sec-ch-ua: \\"Chromium\\";v=\\"125\\"" -H "sec-fetch-dest: document" -H "sec-fetch-mode: navigate"`;
    const html = execSync(cmd, { encoding: 'utf-8', timeout: 15000 });
    const ids = [];
    const re = /photos\/(\d{4,})/g;
    let m;
    while ((m = re.exec(html)) !== null) {
      const id = parseInt(m[1]);
      if (id > 10000) ids.push(id);
    }
    return [...new Set(ids)];
  } catch(e) {
    return [];
  }
}

async function main() {
  // Load existing pool
  const pool = JSON.parse(readFileSync('scripts/pexels-pool.json', 'utf-8'));
  let total = 0;
  let newKeys = 0;

  for (let i = 0; i < SEARCHES.length; i++) {
    const q = SEARCHES[i];
    process.stdout.write(`[${i+1}/${SEARCHES.length}] ${q}... `);
    const ids = await fetchIds(q);
    if (!pool[q]) newKeys++;
    pool[q] = ids;
    total += ids.length;
    console.log(`${ids.length} IDs`);
    await sleep(800);
  }

  console.log(`\nTotal: ${total} IDs across ${SEARCHES.length} searches`);
  console.log(`New keys added: ${newKeys}`);

  writeFileSync('scripts/pexels-pool.json', JSON.stringify(pool, null, 2));
  console.log('Updated scripts/pexels-pool.json');

  const allUnique = new Set();
  Object.values(pool).flat().forEach(id => allUnique.add(id));
  console.log(`Total unique IDs in pool: ${allUnique.size}`);
}

main().catch(console.error);
