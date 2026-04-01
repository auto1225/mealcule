// Fetch unique Pexels photo IDs for all SEED entries
// Usage: node scripts/fetch-pexels-ids.mjs

const DELAY = 1500; // ms between requests to be polite

// All items that need unique photos, grouped by search term
const ITEMS = [
  // Vegetables
  'water spinach','mugwort','crown daisy chrysanthemum','dandelion greens','mustard greens',
  'lacinato kale','moringa leaves','collard greens','korean zucchini','zucchini vegetable',
  'bitter melon','nopales cactus','pickle jar','shallot','red onion',
  'scallion green onion','chinese chives','garlic scapes','wild garlic ramps',
  'cherry tomatoes','roma tomato','sun dried tomato','iceberg lettuce','romaine lettuce',
  'red leaf lettuce','endive vegetable','frisee lettuce','red cabbage','savoy cabbage',
  'spring cabbage','cassava root','taro root','yam vegetable','purple sweet potato',
  'purple potato','jerusalem artichoke','burdock root gobo','lotus root','celeriac',
  'kohlrabi vegetable','rutabaga','watermelon radish','jicama','bellflower root doraji',
  'water dropwort minari','water parsley','bracken fern fiddlehead','bamboo shoot',
  'mung bean sprouts','long bean yard','green chili pepper','korean hot pepper',
  'brussels sprouts','chinese broccoli gai lan','heart of palm','fennel bulb',
  'snap peas','snow peas','sugar snap peas','green peas','fava beans',
  'edamame soybeans','perilla leaf shiso','sorrel herb','mizuna greens',
  'radicchio','bottle gourd','wax gourd winter melon','kabocha squash',
  'mini bell pepper','yellow bell pepper','orange bell pepper',
  'chinese eggplant','roasted red pepper',
  // Meat
  'andouille sausage','chorizo sausage','foie gras','tripe offal','beef liver organ',
  'chicken liver','beef tongue','oxtail stew','denver steak','hanger steak',
  'chuck roast beef','pork liver','chicken gizzard','pork jowl','pig feet trotters',
  'bone broth','beef jerky','corned beef','prosciutto ham','pastrami deli',
  'salami sliced','pepperoni sliced','mortadella','bologna deli meat','bratwurst sausage',
  'vienna sausage','pancetta','smoked duck breast','skirt steak','luncheon meat',
  'spam canned','chicken tenders','pork tenderloin','ground chicken',
  // Seafood
  'dried shrimp','mantis shrimp','tiger prawn','salted shrimp','flounder fish',
  'croaker fish','pufferfish fugu','cuttlefish','hairtail fish','blue crab',
  'snow crab legs','horsehair crab','king crab','red crab','small octopus baby',
  'webfoot octopus','jellyfish food','spear squid','nori seaweed sheet',
  'kombu kelp','wakame seaweed','hijiki seaweed','green laver','agar agar',
  'manila clam','surf clam','hard clam quahog','pen shell scallop',
  'turban shell shellfish','salmon roe ikura','pollock roe mentaiko',
  'flying fish roe tobiko','herring roe kazunoko','fish roe caviar',
  'caviar luxury','smoked salmon','canned tuna','canned sardines','smelt fish',
  'spanish mackerel','katsuobushi bonito flakes','niboshi dried sardine',
  'salted anchovy','dried pollock','rainbow trout','carp fish','sweetfish ayu',
  'barramundi fish','rockfish','sea urchin uni',
  // Herbs & Spices
  'lemongrass stalk','galangal root','marjoram herb','sumac spice','fenugreek seeds',
  'allspice berries','coriander seeds','fennel seeds','celery seed','white peppercorn',
  'pink peppercorn','five spice powder','zaatar spice','herbes de provence',
  'curry leaves','kaffir lime leaves','pandan leaf','shiso leaf','chervil herb',
  'lavender culinary','annatto seeds','juniper berries','mace spice',
  'vanilla bean pod','wasabi root',
  // Sauces
  'maple syrup bottle','agave syrup','hoisin sauce','tamari sauce','tahini paste',
  'tomato paste can','sesame paste','doubanjiang','ssamjang','black bean sauce',
  'rice vinegar bottle','apple cider vinegar','white vinegar','red wine vinegar',
  'ketchup bottle','yellow mustard','sriracha sauce','tabasco sauce',
  'balsamic vinegar','worcestershire sauce','honey jar','white sugar','anchovy sauce',
  'vanilla extract bottle',
  // Dairy
  'greek yogurt bowl','cream cheese spread','mascarpone cheese','cottage cheese',
  'emmental cheese','gruyere cheese','blue cheese wedge','provolone cheese',
  'halloumi cheese grilled','manchego cheese','gouda cheese','camembert cheese',
  'condensed milk can','evaporated milk','buttermilk','clotted cream','kefir drink',
  'whey protein powder','ghee clarified butter',
  // Grains
  'brown rice grains','buckwheat groats','barley grain','wild rice','jasmine rice',
  'basmati rice','sticky rice glutinous','sushi rice','arborio rice risotto',
  'quinoa grain','muesli cereal','oatmeal porridge','granola bowl',
  'millet grain','couscous','udon noodles bowl','instant ramen noodles',
  'soba noodles buckwheat','glass noodles','pho noodles vietnamese',
  'ramen noodles fresh','fettuccine pasta','penne pasta','spaghetti pasta',
  'macaroni pasta','lasagna pasta','rice noodles pad thai',
  'mung bean noodles','rye bread loaf','sourdough bread','french baguette',
  'ciabatta bread','focaccia bread','naan bread','pita bread',
  'flour tortilla','bagel bread','croissant pastry','white bread sliced',
  'cornmeal polenta','rice cake tteok','glutinous rice cake mochi','rice paper wrapper',
  // Processed
  'firm tofu block','silken tofu soft','fried tofu agedashi','smoked tofu',
  'seitan wheat gluten','yuba tofu skin','natto fermented','miso paste',
  'fish cake kamaboko','crab stick surimi','kimchi jar','napa cabbage kimchi',
  'radish kimchi kkakdugi','cucumber kimchi','green onion kimchi',
  'sauerkraut jar','cocoa powder','dark chocolate bar','nutella spread',
  'peanut butter jar','strawberry jam','baked beans can','canned beans',
  'canned corn','canned tomatoes','popcorn bowl','green olives','black olives',
  'capers jar','panko breadcrumbs','tapioca pearls','baking powder',
  'dry yeast','spam can','luncheon meat can',
  // Beverages
  'espresso coffee cup','latte art coffee','hot chocolate mug','kombucha bottle',
  'black tea cup','iced tea glass','red wine glass','white wine glass',
  'beer glass pint','sake cup','champagne flute','whiskey glass',
  'vodka shot','rum cocktail','tequila shot','gin tonic','brandy glass',
  'fruit smoothie','ginger ale drink','coconut milk carton','rice milk',
  'almond milk','oat milk','soy milk',
  // Oils
  'canola oil bottle','grapeseed oil','avocado oil bottle','peanut oil',
  'sunflower oil','truffle oil','walnut oil','flaxseed oil','hemp seed oil',
  'rice bran oil','corn oil','MCT oil','perilla oil','duck fat',
  'lard pork fat','beef tallow','schmaltz chicken fat',
  // Nuts & Seeds
  'pecan nuts','brazil nut','chestnut roasted','coconut flakes',
  'poppy seeds','nigella seeds','lotus seeds','watermelon seeds',
  'ginkgo nuts','candlenut','tiger nuts',
  // Mushrooms
  'hedgehog mushroom','lions mane mushroom','turkey tail mushroom',
  'beech mushroom shimeji','nameko mushroom','morel mushroom',
  'chaga mushroom','reishi mushroom','cordyceps mushroom',
  'maitake mushroom','oyster mushroom','porcini mushroom',
  'black truffle','white truffle','matsutake mushroom',
  // Legumes
  'chickpeas garbanzo','lentils','green lentils','red lentils',
  'white kidney beans','lima beans','navy beans','cannellini beans',
  'pinto beans','mung beans','soybeans','black eyed peas',
  'adzuki red beans','split peas',
  // Fruits
  'honeydew melon','cantaloupe melon','nectarine fruit','green grapes',
  'clementine citrus','kumquat fruit','tangerine mandarin',
  'dried figs','dates medjool','acerola cherry','black currant',
  'gooseberry','white dragon fruit','coconut flakes shredded',
  // Eggs
  'egg whites','onsen egg soft boiled',
  // Extra oils/fats/misc
  'olive oil extra virgin','sesame oil dark',
];

async function searchPexels(query) {
  const url = `https://www.pexels.com/search/${encodeURIComponent(query)}/`;
  try {
    const resp = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });
    if (!resp.ok) return null;
    const html = await resp.text();
    // Extract photo IDs from URLs like /photo/title-1234567/ or pexels-photo-1234567
    const ids = [];
    const re = /\/photo\/[^/]*?-(\d{4,})(?:\/|")/g;
    let m;
    while ((m = re.exec(html)) !== null) {
      const id = parseInt(m[1]);
      if (id > 1000) ids.push(id);
    }
    // Also try data-photo-modal-medium-id or similar attributes
    const re2 = /data-photo-modal-medium-id="(\d+)"/g;
    while ((m = re2.exec(html)) !== null) {
      ids.push(parseInt(m[1]));
    }
    // Also try src="...pexels-photo-ID..."
    const re3 = /pexels-photo-(\d{4,})\./g;
    while ((m = re3.exec(html)) !== null) {
      ids.push(parseInt(m[1]));
    }
    return [...new Set(ids)];
  } catch (e) {
    return null;
  }
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  const usedIds = new Set();
  const results = {};
  let success = 0, fail = 0;

  for (let i = 0; i < ITEMS.length; i++) {
    const item = ITEMS[i];
    process.stdout.write(`[${i+1}/${ITEMS.length}] ${item}... `);

    const ids = await searchPexels(item);
    if (ids && ids.length > 0) {
      // Pick first ID not already used
      const uniqueId = ids.find(id => !usedIds.has(id));
      if (uniqueId) {
        usedIds.add(uniqueId);
        results[item] = uniqueId;
        console.log(`✓ ${uniqueId}`);
        success++;
      } else {
        // All IDs already used, take any from page
        console.log(`⚠ all ${ids.length} IDs already used`);
        fail++;
      }
    } else {
      console.log('✗ no results');
      fail++;
    }

    await sleep(DELAY);
  }

  console.log(`\n=== Results: ${success} found, ${fail} failed ===\n`);

  // Output as JSON
  const outPath = new URL('./pexels-ids.json', import.meta.url).pathname;
  const fs = await import('fs');
  fs.writeFileSync(outPath.startsWith('/') ? outPath.slice(1) : outPath, JSON.stringify(results, null, 2));
  console.log(`Saved to ${outPath}`);
}

main().catch(console.error);
