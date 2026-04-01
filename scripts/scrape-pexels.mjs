// Scrape Pexels search pages for unique food photo IDs
// Usage: node scripts/scrape-pexels.mjs

import { execSync } from 'child_process';
import { writeFileSync } from 'fs';

const SEARCHES = [
  // Vegetables
  'onion','garlic','potato','tomato','chili+pepper','broccoli','carrot','spinach',
  'napa+cabbage','bell+pepper','cabbage','cucumber','squash','eggplant','celery',
  'asparagus','daikon+radish','bean+sprouts','green+onion+scallion','beet+vegetable',
  'kale+vegetable','sweet+potato','corn+vegetable','pumpkin','zucchini',
  'leek+vegetable','turnip','artichoke','radish','lettuce','watercress',
  'arugula','bok+choy','cauliflower','butternut+squash','kabocha+squash',
  'jalapeno+pepper','okra','swiss+chard','taro+root','lotus+root',
  'bitter+melon','shallot','red+onion','cherry+tomato','romaine+lettuce',
  'iceberg+lettuce','red+cabbage','brussels+sprouts','fennel+vegetable',
  'snap+peas','edamame','green+peas','perilla+leaf','mizuna','radicchio',
  'kohlrabi','rutabaga','cassava','yam+root','purple+potato',
  'bamboo+shoot','fava+bean','water+spinach',
  // Meat
  'beef+steak','pork+meat','chicken+meat','lamb+meat','duck+meat',
  'bacon+strips','sausage+meat','ham+meat','turkey+meat','veal+meat',
  'goat+meat','rabbit+meat','bison+meat','pork+belly','chicken+wings',
  'pork+ribs','lamb+chop','duck+breast','chorizo','prosciutto',
  'salami+sliced','pepperoni','bratwurst','pastrami','beef+jerky',
  'corned+beef','beef+liver','oxtail','beef+tongue','tripe+meat',
  // Seafood
  'salmon+fish','tuna+fish','shrimp+seafood','mackerel+fish','squid+seafood',
  'clam+seafood','crab+seafood','octopus+food','cod+fish','lobster+food',
  'oyster+food','scallop+food','mussel+food','eel+food','trout+fish',
  'sardine+fish','sea+bass','catfish','swordfish','tilapia',
  'cuttlefish','nori+seaweed','kombu+seaweed','wakame+seaweed',
  'salmon+roe','sea+urchin+food','king+crab','dried+shrimp',
  'smoked+salmon','canned+tuna','caviar+food',
  // Herbs & Spices
  'basil+herb','rosemary+herb','thyme+herb','mint+leaf','cilantro+herb',
  'parsley+herb','ginger+root','black+pepper+spice','cinnamon+spice',
  'turmeric+spice','curry+powder','paprika+spice','oregano+herb',
  'dill+herb','bay+leaf+herb','sage+herb','star+anise','cardamom+spice',
  'saffron+spice','lemongrass','galangal+spice','wasabi+food',
  'lavender+culinary','vanilla+bean',
  // Sauces & Seasonings
  'soy+sauce','ketchup+bottle','mayonnaise','honey+jar','vinegar+bottle',
  'mustard+condiment','maple+syrup','sriracha+sauce','balsamic+vinegar',
  'hot+sauce','tahini','tomato+paste','hoisin+sauce',
  // Dairy
  'milk+glass','cheese+wheel','yogurt+bowl','butter+block','cream+cheese',
  'mozzarella+cheese','parmesan+cheese','brie+cheese','cheddar+cheese',
  'goat+cheese','blue+cheese','feta+cheese','mascarpone','cottage+cheese',
  'ghee+butter','kefir+drink','greek+yogurt',
  // Grains
  'rice+grain','brown+rice','pasta+food','bread+loaf','oats+cereal',
  'quinoa+grain','barley+grain','noodles+food','ramen+noodles',
  'soba+noodles','udon+noodles','sourdough+bread','baguette+bread',
  'croissant+pastry','bagel+bread','tortilla+bread','rice+noodles',
  'couscous+food','focaccia+bread','pita+bread','naan+bread',
  // Nuts & Seeds
  'almond+nut','walnut+nut','peanut','cashew+nut','pistachio+nut',
  'hazelnut','chestnut+food','sesame+seeds','sunflower+seeds',
  'pumpkin+seeds','flax+seeds','chia+seeds','pecan+nut',
  // Mushrooms
  'shiitake+mushroom','oyster+mushroom','portobello+mushroom','enoki+mushroom',
  'chanterelle+mushroom','truffle+mushroom','morel+mushroom',
  'maitake+mushroom','king+oyster+mushroom',
  // Legumes
  'black+beans','lentils+food','chickpea','red+beans','tofu+food',
  'tempeh+food','edamame+beans','pinto+beans',
  // Fruits
  'apple+fruit','banana+fruit','strawberry+fruit','blueberry+fruit',
  'avocado+fruit','grape+fruit','watermelon','kiwi+fruit','lemon+fruit',
  'orange+fruit','mango+fruit','pineapple+fruit','peach+fruit',
  'cherry+fruit','raspberry+fruit','coconut+fruit','pomegranate+fruit',
  'dragon+fruit','passion+fruit','fig+fruit','papaya+fruit',
  // Beverages
  'coffee+cup','green+tea','matcha+tea','beer+glass','red+wine',
  'white+wine','whiskey+glass','espresso+coffee','latte+coffee',
  'smoothie+drink','kombucha','orange+juice',
  // Oils
  'olive+oil','sesame+oil','coconut+oil',
  // Processed
  'kimchi+food','tofu+block','miso+paste','sauerkraut',
  'pickled+cucumbers','dark+chocolate','peanut+butter','jam+jar',
  'olives+food','popcorn+food','canned+food',
];

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function fetchIds(query) {
  try {
    const url = `https://www.pexels.com/search/${query}/`;
    const cmd = `curl -s "${url}" -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36" -H "Accept: text/html,application/xhtml+xml" -H "sec-ch-ua: \\"Chromium\\";v=\\"125\\"" -H "sec-fetch-dest: document" -H "sec-fetch-mode: navigate"`;
    const html = execSync(cmd, { encoding: 'utf-8', timeout: 10000 });
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
  const allIds = {};  // search term -> [ids]
  let total = 0;

  for (let i = 0; i < SEARCHES.length; i++) {
    const q = SEARCHES[i];
    process.stdout.write(`[${i+1}/${SEARCHES.length}] ${q}... `);
    const ids = await fetchIds(q);
    allIds[q] = ids;
    total += ids.length;
    console.log(`${ids.length} IDs`);
    await sleep(800); // polite delay
  }

  console.log(`\nTotal: ${total} IDs across ${SEARCHES.length} searches`);

  // Save results
  writeFileSync('scripts/pexels-pool.json', JSON.stringify(allIds, null, 2));
  console.log('Saved to scripts/pexels-pool.json');

  // Flatten unique IDs
  const allUnique = new Set();
  Object.values(allIds).flat().forEach(id => allUnique.add(id));
  console.log(`Unique IDs total: ${allUnique.size}`);
}

main().catch(console.error);
