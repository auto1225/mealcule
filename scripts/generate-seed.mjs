// Generate zero-duplicate SEED from scraped Pexels pool
// Usage: node scripts/generate-seed.mjs

import { readFileSync, writeFileSync } from 'fs';

const pool = JSON.parse(readFileSync('scripts/pexels-pool.json', 'utf-8'));
const usedIds = new Set();

// Map shorthand keys to actual pool keys
const KEY_MAP = {
  'meat+raw':'beef+steak','pork+chop':'pork+meat','chicken+raw':'chicken+meat',
  'lamb':'lamb+meat','bacon':'bacon+strips','sausage':'sausage+meat',
  'ham':'ham+meat','salami':'salami+sliced','shrimp':'shrimp+seafood',
  'crab':'crab+seafood','lobster':'lobster+food','scallop':'scallop+food',
  'basil':'basil+herb','rosemary':'rosemary+herb','thyme':'thyme+herb',
  'cinnamon':'cinnamon+spice','turmeric':'turmeric+spice',
  'black+pepper':'black+pepper+spice','paprika':'paprika+spice',
  'oregano':'oregano+herb','cheese':'cheese+wheel',
  'milk+dairy':'milk+glass','yogurt':'yogurt+bowl','butter':'butter+block',
  'cream':'cream+cheese','pasta+noodles':'pasta+food',
  'noodles+asian':'noodles+food','almond':'almond+nut','walnut':'walnut+nut',
  'cashew':'cashew+nut','mushroom+food':'shiitake+mushroom',
  'beans+legumes':'black+beans','lentils':'lentils+food',
  'strawberry':'strawberry+fruit','blueberry':'blueberry+fruit',
  'mango':'mango+fruit','tea+cup':'green+tea','wine+glass':'red+wine',
  'vinegar':'vinegar+bottle','kimchi':'kimchi+food','chocolate':'dark+chocolate',
  'pickle':'pickled+cucumbers','jam+preserves':'jam+jar',
  'herbs+spices':'basil+herb','vegetables':'cabbage',
  'peas':'snap+peas','beet':'beet+vegetable','kale':'kale+vegetable',
  'corn':'corn+vegetable','nuts+seeds':'pistachio+nut',
  'tomatoes+fresh':'cherry+tomato','fresh+fish+market':'tuna+fish',
  'smoked+fish':'smoked+salmon','canned+food+pantry':'canned+food',
  'beer+craft+glass':'beer+glass','whiskey+bourbon':'whiskey+glass',
  'vodka+bottle':'white+wine','rum+dark':'whiskey+glass',
  'tequila+bottle':'beer+glass','gin+bottle':'white+wine',
  'ginger+beer':'kombucha','juice+glass':'orange+juice',
  'milk+bottle':'milk+glass','turkey+meat':'turkey+meat',
};

// Resolve a key: try exact match first, then mapped, then fuzzy suffix match
function resolveKey(key) {
  if (pool[key]) return key;
  if (KEY_MAP[key] && pool[KEY_MAP[key]]) return KEY_MAP[key];
  // Fuzzy: find any pool key that starts with the search key
  const found = Object.keys(pool).find(k => k.startsWith(key + '+'));
  return found || key;
}

// Helper: pick first unused ID from a list of search keys
function pick(...searchKeys) {
  for (const rawKey of searchKeys) {
    const key = resolveKey(rawKey);
    const ids = pool[key] || [];
    for (const id of ids) {
      if (!usedIds.has(id)) {
        usedIds.add(id);
        return id;
      }
    }
  }
  return null;
}

// Build the SEED mapping
const SEED = {};

function add(name, ...searchKeys) {
  const id = pick(...searchKeys);
  if (id) {
    SEED[name] = id;
  } else {
    console.warn(`⚠ No unique ID for: ${name} (tried: ${searchKeys.join(', ')})`);
  }
}

// ══════ MEAT ══════
add('beef', 'beef+steak', 'meat+raw');
add('pork', 'pork+chop', 'meat+raw');
add('chicken breast', 'chicken+raw');
add('chicken leg', 'chicken+raw');
add('lamb', 'lamb');
add('duck', 'duck+meat');
add('bacon', 'bacon');
add('sausage', 'sausage');
add('ham', 'ham');
add('chicken', 'chicken+raw');
add('organ meat', 'meat+raw');
add('processed meat', 'sausage');
add('goose', 'duck+meat');  // close enough
add('quail', 'chicken+raw');
add('pheasant', 'chicken+raw');
add('turkey', 'turkey+meat');
add('veal', 'beef+steak');
add('goat', 'lamb');
add('rabbit', 'meat+raw');
add('venison', 'meat+raw');
add('horse meat', 'meat+raw');
add('ostrich', 'meat+raw');
add('bison', 'beef+steak');
add('wild boar', 'meat+raw');
add('alligator', 'meat+raw');
add('beef sirloin', 'beef+steak');
add('beef tenderloin', 'beef+steak');
add('ribeye', 'beef+steak');
add('striploin', 'beef+steak');
add('beef short ribs', 'pork+chop');
add('brisket', 'beef+steak');
add('beef round', 'beef+steak');
add('flat iron steak', 'beef+steak');
add('pork belly', 'pork+chop');
add('pork shoulder', 'pork+chop');
add('pork loin', 'pork+chop');
add('pork ribs', 'pork+chop');
add('ground pork', 'pork+chop');
add('chicken thigh', 'chicken+raw');
add('chicken wing', 'chicken+raw');
add('whole chicken', 'chicken+raw');
add('ground chicken', 'chicken+raw');
add('lamb chop', 'lamb');
add('lamb shank', 'lamb');
add('ground lamb', 'lamb');
add('duck breast', 'duck+meat');
add('duck leg', 'duck+meat');
add('chorizo', 'sausage');
add('andouille', 'sausage');
add('kielbasa', 'sausage');
add('foie gras', 'duck+meat');
add('tripe', 'meat+raw');
add('beef liver', 'meat+raw');
add('chicken liver', 'chicken+raw');
add('beef tongue', 'meat+raw');
add('oxtail', 'meat+raw');
add('denver steak', 'beef+steak');
add('hanger steak', 'beef+steak');
add('chuck roast', 'beef+steak');
add('pork liver', 'pork+chop');
add('chicken gizzard', 'chicken+raw');
add('pork jowl', 'pork+chop');
add('pig feet', 'pork+chop');
add('bone broth bones', 'meat+raw', 'lamb+meat', 'veal+meat');
add('beef jerky', 'beef+steak', 'corned+beef', 'pastrami');
add('corned beef', 'ham');
add('prosciutto', 'ham');
add('pastrami', 'ham');
add('salami', 'salami');
add('pepperoni', 'salami');
add('mortadella', 'salami');
add('bologna', 'sausage');
add('bratwurst', 'sausage');
add('vienna sausage', 'sausage');
add('pancetta', 'bacon');
add('smoked duck', 'duck+meat');
add('skirt steak', 'beef+steak', 'pork+belly', 'bison+meat');
add('luncheon meat', 'ham');
add('spam', 'ham');
add('chicken tender', 'chicken+raw');
add('pork tenderloin', 'pork+chop');

// ══════ SEAFOOD ══════
add('salmon', 'salmon+fish');
add('tuna', 'salmon+fish');
add('shrimp', 'shrimp');
add('mackerel', 'salmon+fish');
add('squid', 'shrimp');
add('clam', 'clam+seafood');
add('crab', 'crab');
add('octopus', 'octopus+food');
add('pacific saury', 'salmon+fish');
add('cod', 'salmon+fish');
add('halibut', 'salmon+fish');
add('anchovy', 'salmon+fish');
add('abalone', 'clam+seafood');
add('scallop', 'scallop');
add('mussel', 'mussel+food');
add('oyster', 'oyster+food');
add('lobster', 'lobster', 'crab');
add('sea cucumber', 'clam+seafood');
add('eel', 'salmon+fish');
add('trout', 'salmon+fish');
add('catfish', 'salmon+fish');
add('sardine', 'salmon+fish');
add('sea bass', 'salmon+fish');
add('yellowtail', 'salmon+fish');
add('monkfish', 'salmon+fish');
add('sea bream', 'salmon+fish');
add('herring', 'salmon+fish');
add('swordfish', 'salmon+fish');
add('tilapia', 'salmon+fish');
add('cuttlefish', 'octopus+food');
add('dried shrimp', 'shrimp');
add('flounder', 'salmon+fish');
add('hairtail', 'salmon+fish');
add('blue crab', 'crab');
add('snow crab', 'crab');
add('mantis shrimp', 'shrimp');
add('barramundi', 'salmon+fish');
add('rainbow trout', 'salmon+fish');
add('nori', 'nori+seaweed', 'nori+seaweed+sheet');
add('kombu', 'kombu+seaweed', 'kombu+kelp');
add('wakame', 'wakame+seaweed', 'wakame+seaweed+salad');
add('salmon roe', 'salmon+fish');
add('pollock roe', 'salmon+fish');
add('flying fish roe', 'scallop');
add('tiger prawn', 'shrimp');
add('salted shrimp', 'shrimp');
add('croaker', 'salmon+fish');
add('pufferfish', 'salmon+fish');
add('horsehair crab', 'crab');
add('king crab', 'crab');
add('red crab', 'crab');
add('small octopus', 'octopus+food');
add('webfoot octopus', 'octopus+food');
add('jellyfish', 'octopus+food');
add('spear squid', 'shrimp');
add('salted squid', 'shrimp');
add('hijiki', 'hijiki+seaweed');
add('green laver', 'green+laver+seaweed');
add('agar seaweed', 'agar+agar+jelly');
add('seaweed', 'seaweed+food');
add('manila clam', 'clam+seafood');
add('surf clam', 'clam+seafood');
add('hard clam', 'clam+seafood');
add('pen shell', 'scallop');
add('turban shell', 'clam+seafood');
add('herring roe', 'oyster+food');
add('fish roe', 'scallop');
add('caviar', 'oyster+food');
add('smoked salmon', 'salmon+fish', 'smoked+fish');
add('canned tuna', 'salmon+fish', 'canned+food+pantry');
add('canned sardines', 'salmon+fish', 'fresh+fish+market');
add('smelt', 'salmon+fish', 'fresh+fish+market');
add('spanish mackerel', 'salmon+fish', 'fresh+fish+market');
add('katsuobushi', 'salmon+fish', 'smoked+fish');
add('niboshi', 'salmon+fish', 'smoked+fish');
add('salted anchovy', 'salmon+fish', 'smoked+fish');
add('dried pollock', 'salmon+fish', 'smoked+fish');
add('carp', 'salmon+fish', 'fresh+fish+market');
add('sweetfish', 'salmon+fish', 'fresh+fish+market');
add('rockfish', 'lobster', 'fresh+fish+market');
add('sea urchin', 'oyster+food');

// ══════ VEGETABLES ══════
add('onion', 'onion');
add('garlic', 'garlic');
add('potato', 'potato');
add('tomato', 'tomato');
add('chili pepper', 'chili+pepper', 'chili+pepper+red');
add('broccoli', 'broccoli');
add('carrot', 'carrot');
add('spinach', 'spinach');
add('napa cabbage', 'napa+cabbage', 'napa+cabbage+fresh');
add('bell pepper', 'bell+pepper');
add('cabbage', 'cabbage', 'cabbage+head');
add('cucumber', 'cucumber');
add('squash', 'squash', 'pumpkin');
add('eggplant', 'eggplant');
add('celery', 'celery');
add('asparagus', 'asparagus');
add('daikon', 'radish');
add('bean sprouts', 'bean+sprouts', 'bean+sprouts+fresh');
add('green onion', 'onion');
add('green pepper', 'bell+pepper');
add('beet', 'beet');
add('kale', 'kale');
add('sweet potato', 'sweet+potato');
add('corn', 'corn');
add('pumpkin', 'pumpkin', 'pumpkin+whole');
add('zucchini', 'zucchini', 'cucumber', 'squash');
add('leek', 'onion');
add('turnip', 'radish');
add('artichoke', 'artichoke', 'artichoke+fresh');
add('radish', 'radish');
add('lettuce', 'lettuce');
add('watercress', 'watercress');
add('arugula', 'arugula');
add('bok choy', 'bok+choy');
add('cauliflower', 'cauliflower');
add('butternut squash', 'sweet+potato');
add('butternut', 'sweet+potato');
add('spaghetti squash', 'sweet+potato');
add('acorn squash', 'sweet+potato');
add('kabocha', 'sweet+potato');
add('chayote', 'cucumber');
add('tomatillo', 'tomato', 'tomatoes+fresh');
add('jalapeno', 'jalapeno+pepper', 'jalapeno+pepper+green');
add('poblano pepper', 'bell+pepper');
add('anaheim pepper', 'bell+pepper');
add('shishito pepper', 'bell+pepper');
add('romanesco', 'broccoli');
add('broccolini', 'broccoli');
add('kai-lan', 'broccoli');
add('okra', 'okra', 'okra+vegetable');
add('swiss chard', 'spinach');
add('water spinach', 'spinach');
add('kohlrabi', 'radish');
add('celeriac', 'celery');
add('cassava', 'potato');
add('taro', 'potato');
add('lotus root', 'radish');
add('nopales', 'nopales+cactus+food');
add('bottle gourd', 'cucumber');
add('wax gourd', 'cucumber');
add('korean zucchini', 'cucumber');
add('fennel', 'asparagus');
add('parsnip', 'carrot', 'carrot+fresh');
add('snap peas', 'peas');
add('snow peas', 'peas');
add('long bean', 'peas');
add('moringa leaves', 'kale');
add('tatsoi', 'spinach');
add('endive', 'lettuce', 'radicchio');
add('radicchio', 'beet');
add('frisee', 'lettuce');
add('collard greens', 'kale');
add('mustard greens', 'kale');
add('sorrel', 'spinach');
add('perilla leaf', 'spinach');
add('mini bell pepper', 'bell+pepper');
add('yellow bell pepper', 'bell+pepper');
add('orange bell pepper', 'bell+pepper');
add('purple cabbage', 'beet');
add('brussels sprouts', 'broccoli');
add('jicama', 'potato');
add('chinese eggplant', 'eggplant');
add('bamboo shoot', 'asparagus');
add('hearts of palm', 'asparagus');
add('sun-dried tomato', 'tomato', 'tomatoes+fresh');
add('roasted red pepper', 'roasted+red+pepper+jar');
add('ramp', 'onion');
add('shallot', 'onion');
add('red onion', 'onion');
add('scallion', 'onion');
add('cherry tomato', 'tomato', 'tomatoes+fresh');
add('roma tomato', 'tomato', 'tomatoes+fresh');
add('iceberg lettuce', 'lettuce');
add('romaine lettuce', 'lettuce');
add('red lettuce', 'lettuce');
add('red cabbage', 'beet');
add('savoy cabbage', 'cabbage+head', 'cabbage');
add('spring cabbage', 'cabbage+head', 'cabbage');
add('chinese chives', 'garlic');
add('asian chives', 'garlic');
add('garlic scapes', 'garlic');
add('wild garlic', 'garlic');
add('wild chives', 'onion');
add('green chili', 'green+chili+pepper');
add('korean hot pepper', 'korean+chili+pepper');
add('bitter melon', 'cucumber');
add('yam', 'sweet+potato');
add('purple sweet potato', 'sweet+potato');
add('purple potato', 'potato');
add('jerusalem artichoke', 'potato');
add('burdock root', 'carrot', 'carrot+fresh');
add('fava bean', 'peas');
add('sugar snap peas', 'peas');
add('tuscan kale', 'kale');
add('mizuna', 'spinach');
add('chinese broccoli', 'broccoli');
add('mung bean sprouts', 'mung+bean+sprouts');
add('crown daisy', 'kale');
add('water dropwort', 'spinach');
add('water parsley', 'spinach');
add('bellflower root', 'radish');
add('bracken fern', 'asparagus');
add('heart of palm', 'asparagus');
add('rutabaga', 'radish');
add('watermelon radish', 'radish');
add('dandelion greens', 'kale');
add('mugwort', 'kale');

// ══════ FRUIT ══════
add('apple', 'apple+fruit', 'apple+fruit+fresh');
add('banana', 'banana+fruit');
add('strawberry', 'strawberry');
add('blueberry', 'blueberry');
add('avocado', 'avocado+fruit', 'avocado+food');
add('grape', 'grape+fruit', 'grape+bunch');
add('watermelon', 'watermelon', 'watermelon+fruit');
add('kiwi', 'kiwi+fruit', 'kiwi+fruit+fresh');
add('lemon', 'lemon+fruit', 'lemon+citrus');
add('orange', 'orange+fruit', 'orange+citrus');
add('grapefruit', 'grapefruit+citrus');
add('mango', 'mango+fruit');
add('pineapple', 'pineapple+fruit', 'pineapple+fruit+fresh');
add('peach', 'peach+fruit', 'peach+fruit+fresh');
add('pear', 'pear+fruit+fresh');
add('persimmon', 'persimmon+fruit');
add('cherry', 'cherry+fruit', 'cherry+fruit+fresh');
add('raspberry', 'raspberry+fruit', 'raspberry+fruit+fresh');
add('coconut', 'coconut+fruit', 'coconut+tropical');
add('fig', 'fig+fruit', 'fig+fruit+fresh');
add('pomegranate', 'pomegranate+fruit', 'pomegranate+fruit+fresh');
add('plum', 'plum+fruit+fresh');
add('papaya', 'papaya+fruit', 'papaya+tropical');
add('passion fruit', 'passion+fruit', 'passion+fruit+tropical');
add('lime', 'lime+citrus');
add('cranberry', 'cranberry+fruit');
add('dragon fruit', 'dragon+fruit', 'dragon+fruit+pitaya');
add('dried fig', 'dried+fig+fruit');
add('green plum', 'green+plum');
add('quince', 'quince+fruit+fresh');
add('calamansi', 'calamansi+citrus');
add('acai berry', 'acai+berry');
add('goji berry', 'goji+berry+dried');
add('soursop', 'soursop+fruit');
add('cherimoya', 'cherimoya+fruit');
add('finger lime', 'finger+lime');
add('honeydew melon', 'honeydew+melon');
add('honeydew', 'honeydew+melon');
add('cantaloupe', 'cantaloupe+melon+fresh');
add('fresh coconut', 'coconut+tropical', 'coconut+fruit');
add('starfruit', 'starfruit+carambola');
add('guava', 'guava+fruit+fresh');
add('lychee', 'lychee+fruit+fresh');
add('jackfruit', 'jackfruit+tropical');
add('durian', 'durian+fruit');
add('tangerine', 'tangerine+citrus');
add('clementine', 'clementine+citrus');
add('nectarine', 'nectarine+fruit');
add('apricot', 'apricot+fruit+fresh');
add('mulberry', 'mulberry+fruit');
add('gooseberry', 'gooseberry+fruit');
add('jujube', 'jujube+fruit');
add('yuzu', 'yuzu+citrus');
add('green grape', 'green+grape+fruit');
add('melon', 'melon+fruit+fresh');
add('kumquat', 'kumquat+citrus');
add('blackberry', 'blackberry+fruit+fresh');
add('mangosteen', 'mangosteen+fruit');
add('rambutan', 'rambutan+fruit');
add('star fruit', 'starfruit+carambola');
add('white dragon fruit', 'dragon+fruit+pitaya', 'dragon+fruit');
add('tamarind', 'tamarind+food');
add('acerola', 'acerola+cherry');
add('black currant', 'black+currant+berry');
add('elderberry', 'elderberry+fruit');
add('dates', 'dates+medjool');
add('baobab fruit', 'baobab+fruit');

// ══════ GRAINS ══════
add('flour', 'bread+loaf');
add('pasta', 'pasta+noodles');
add('oats', 'oats+cereal');
add('rice', 'rice+grain');
add('brown rice', 'rice+grain');
add('white bread', 'bread+loaf');
add('buckwheat', 'rice+grain');
add('udon noodles', 'noodles+asian');
add('instant ramen', 'noodles+asian');
add('quinoa', 'rice+grain');
add('barley', 'rice+grain');
add('couscous', 'pasta+noodles');
add('cornmeal', 'corn');
add('rye bread', 'bread+loaf');
add('sourdough', 'bread+loaf');
add('tortilla', 'bread+loaf');
add('bagel', 'bread+loaf');
add('croissant', 'bread+loaf');
add('muesli', 'oats+cereal');
add('soba noodles', 'noodles+asian');
add('glass noodles', 'noodles+asian');
add('pho noodles', 'noodles+asian');
add('ramen noodles', 'noodles+asian');
add('fettuccine', 'pasta+noodles');
add('penne', 'pasta+noodles');
add('spaghetti', 'pasta+noodles');
add('macaroni', 'pasta+noodles');
add('lasagna', 'pasta+noodles');
add('dried pasta', 'pasta+noodles');
add('dried spaghetti', 'pasta+noodles');
add('rice noodles', 'noodles+asian');
add('dried rice noodles', 'noodles+asian');
add('mung bean noodles', 'noodles+asian');
add('wild rice', 'rice+grain');
add('jasmine rice', 'rice+grain');
add('basmati rice', 'rice+grain');
add('sticky rice', 'rice+grain');
add('sushi rice', 'rice+grain');
add('arborio rice', 'rice+grain');
add('millet', 'oats+cereal');
add('amaranth', 'oats+cereal');
add('teff', 'oats+cereal');
add('spelt', 'oats+cereal');
add('kamut', 'oats+cereal');
add('naan', 'bread+loaf');
add('pita', 'bread+loaf');
add('ciabatta', 'bread+loaf');
add('focaccia', 'bread+loaf');
add('baguette', 'bread+loaf');
add('flour tortilla', 'bread+loaf');
add('rice cake', 'rice+grain');
add('glutinous rice cake', 'rice+grain');
add('rice paper', 'noodles+asian');
add('oatmeal', 'oats+cereal');
add('granola', 'oats+cereal');

// ══════ DAIRY ══════
add('milk', 'milk+dairy', 'milk+bottle');
add('cheese', 'cheese');
add('cream', 'cream');
add('yogurt', 'yogurt');
add('heavy cream', 'cream');
add('mozzarella', 'cheese');
add('parmesan', 'cheese');
add('butter', 'butter');
add('cream cheese', 'cheese');
add('ricotta', 'cheese');
add('gouda', 'cheese');
add('brie', 'cheese');
add('cheddar', 'cheese');
add('goat cheese', 'cheese');
add('sour cream', 'yogurt');
add('whey protein', 'milk+dairy', 'milk+bottle');
add('mascarpone', 'cheese');
add('gruyere', 'cheese');
add('emmental', 'cheese');
add('feta', 'cheese');
add('halloumi', 'cheese');
add('blue cheese', 'cheese');
add('cottage cheese', 'cheese');
add('provolone', 'cheese');
add('manchego', 'cheese');
add('camembert', 'cheese');
add('condensed milk', 'milk+dairy', 'milk+bottle');
add('evaporated milk', 'milk+dairy', 'milk+bottle');
add('buttermilk', 'milk+dairy', 'milk+bottle');
add('clotted cream', 'cream');
add('ghee', 'butter');
add('kefir', 'yogurt');
add('greek yogurt', 'yogurt');
add('cream cheese spread', 'cheese');

// ══════ EGGS ══════
add('egg', 'egg+food');
add('quail egg', 'quail+egg');
add('duck egg', 'duck+egg');
add('egg white', 'egg+white');
add('egg yolk', 'egg+yolk');
add('onsen egg', 'soft+boiled+egg');
add('century egg', 'century+egg');

// ══════ NUTS & SEEDS ══════
add('almond', 'almond');
add('walnut', 'walnut');
add('peanut', 'peanut');
add('cashew', 'cashew');
add('pine nut', 'nuts+seeds');
add('sesame', 'sesame+seeds', 'sesame+seeds+food');
add('sunflower seed', 'sunflower+seeds');
add('pistachio', 'pistachio+nut');
add('macadamia', 'nuts+seeds');
add('pecan', 'pecan+nut');
add('hazelnut', 'hazelnut');
add('chia seed', 'chia+seeds');
add('flax seed', 'flax+seeds');
add('hemp seed', 'nuts+seeds');
add('pumpkin seed', 'pumpkin+seeds', 'sunflower+seeds', 'sesame+seeds');
add('brazil nut', 'almond');
add('coconut flake', 'coconut+tropical');
add('poppy seed', 'poppy+seeds');
add('nigella seed', 'nigella+seeds');
add('lotus seed', 'nuts+seeds');
add('watermelon seed', 'nuts+seeds');
add('ginkgo nut', 'nuts+seeds');
add('chestnut', 'chestnut+food');
add('candlenut', 'cashew');
add('tiger nut', 'almond');
add('sacha inchi', 'nuts+seeds');

// ══════ MUSHROOMS ══════
add('shiitake', 'mushroom+food');
add('button mushroom', 'mushroom+food');
add('enoki', 'mushroom+food');
add('king oyster mushroom', 'mushroom+food');
add('wood ear', 'mushroom+food');
add('oyster mushroom', 'mushroom+food');
add('portobello', 'mushroom+food');
add('truffle', 'mushroom+food');
add('chanterelle', 'mushroom+food');
add('maitake', 'mushroom+food');
add('morel', 'mushroom+food');
add("lion's mane", 'mushroom+food');
add('matsutake', 'mushroom+food');
add('beech mushroom', 'mushroom+food');
add('hedgehog mushroom', 'mushroom+food');
add('porcini', 'mushroom+food');
add('black truffle', 'mushroom+food');
add('white truffle', 'mushroom+food');
add('shimeji', 'mushroom+food');
add('nameko', 'mushroom+food');
add('chaga', 'mushroom+food');
add('reishi', 'mushroom+food');
add('cordyceps', 'mushroom+food');
add('turkey tail mushroom', 'mushroom+food');
add('hen of the woods', 'mushroom+food');

// ══════ LEGUMES ══════
add('black bean', 'beans+legumes');
add('lentil', 'lentils');
add('chickpea', 'chickpea');
add('red bean', 'beans+legumes');
add('white kidney bean', 'lentils');
add('pinto bean', 'beans+legumes');
add('green lentil', 'lentils');
add('red lentil', 'lentils');
add('mung bean', 'beans+legumes');
add('lima bean', 'lentils');
add('tempeh', 'tofu+food');
add('tofu', 'tofu+food');
add('green peas', 'peas');
add('edamame', 'peas');
add('soybean', 'beans+legumes');
add('navy bean', 'lentils');
add('cannellini bean', 'beans+legumes');
add('adzuki bean', 'beans+legumes');
add('black-eyed pea', 'peas');
add('split pea', 'peas');
add('lupini bean', 'beans+legumes');

// ══════ HERBS & SPICES ══════
add('basil', 'basil');
add('rosemary', 'rosemary');
add('thyme', 'thyme');
add('mint', 'mint+leaf');
add('cilantro', 'basil');
add('parsley', 'basil');
add('ginger', 'ginger+root');
add('black pepper', 'black+pepper');
add('cumin', 'herbs+spices');
add('cinnamon', 'cinnamon');
add('turmeric', 'turmeric');
add('curry powder', 'turmeric');
add('paprika', 'paprika');
add('oregano', 'oregano');
add('dill', 'thyme');
add('chive', 'basil');
add('bay leaf', 'rosemary');
add('sage', 'rosemary');
add('tarragon', 'thyme');
add('star anise', 'cinnamon');
add('cardamom', 'herbs+spices');
add('clove', 'cinnamon');
add('nutmeg', 'cinnamon');
add('saffron', 'turmeric');
add('wasabi', 'ginger+root');
add('sichuan pepper', 'black+pepper');
add('lemongrass', 'ginger+root');
add('galangal', 'ginger+root');
add('marjoram', 'oregano');
add('sumac', 'paprika');
add('fenugreek', 'turmeric');
add('allspice', 'herbs+spices');
add('coriander seed', 'herbs+spices');
add('fennel seed', 'herbs+spices');
add('celery seed', 'herbs+spices');
add('white pepper', 'black+pepper');
add('pink pepper', 'black+pepper');
add('five spice', 'cinnamon');
add("za'atar", 'oregano');
add('herbes de provence', 'rosemary');
add('curry leaf', 'basil');
add('kaffir lime leaf', 'basil');
add('pandan leaf', 'mint+leaf');
add('epazote', 'oregano');
add('shiso', 'mint+leaf');
add('perilla', 'basil');
add('chervil', 'basil');
add('lavender', 'rosemary');
add('annatto', 'turmeric');
add('asafoetida', 'turmeric');
add('juniper berry', 'herbs+spices');
add('mace', 'cinnamon');
add('vanilla bean', 'cinnamon');
add('szechuan peppercorn', 'black+pepper');

// ══════ SAUCES & SEASONINGS ══════
add('salt', 'salt+shaker');
add('vinegar', 'vinegar');
add('soy sauce', 'soy+sauce');
add('sugar', 'white+sugar+bowl');
add('oyster sauce', 'soy+sauce');
add('ketchup', 'ketchup+bottle', 'ketchup+squeeze');
add('mayonnaise', 'mayonnaise', 'mayonnaise+jar');
add('mustard', 'soy+sauce');
add('honey', 'honey+jar');
add('mirin', 'soy+sauce');
add('gochujang', 'kimchi');
add('doenjang', 'kimchi');
add('fish sauce', 'soy+sauce');
add('sriracha', 'sriracha+sauce', 'sriracha+bottle');
add('tabasco', 'tabasco+hot+sauce', 'hot+sauce');
add('worcestershire', 'vinegar');
add('balsamic vinegar', 'vinegar');
add('maple syrup', 'honey+jar');
add('agave syrup', 'honey+jar');
add('hoisin sauce', 'soy+sauce');
add('tamari', 'soy+sauce');
add('miso paste', 'kimchi');
add('tahini', 'tahini', 'tahini+paste');
add('peanut butter', 'peanut+butter', 'peanut+butter+jar');
add('tomato paste', 'tomato', 'tomatoes+fresh', 'canned+food+pantry');
add('chili oil', 'soy+sauce');
add('sesame paste', 'soy+sauce');
add('anchovy fish sauce', 'soy+sauce');
add('ssamjang', 'kimchi');
add('doubanjiang', 'kimchi');
add('sichuan doubanjiang', 'kimchi');
add('black bean paste', 'kimchi');
add('sweet bean sauce', 'kimchi');
add('rice vinegar', 'vinegar');
add('apple cider vinegar', 'vinegar');
add('white vinegar', 'vinegar');
add('red wine vinegar', 'vinegar');
add('capers', 'olives+food');
add('vanilla extract', 'vanilla+extract');
add('baking powder', 'baking+powder+can');
add('dry yeast', 'dry+yeast+packet');

// ══════ OILS ══════
add('olive oil', 'olive+oil');
add('sesame oil', 'soy+sauce');
add('coconut oil', 'olive+oil');
add('canola oil', 'olive+oil');
add('grapeseed oil', 'olive+oil');
add('butter oil', 'butter');
add('avocado oil', 'olive+oil');
add('peanut oil', 'olive+oil');
add('sunflower oil', 'olive+oil');
add('truffle oil', 'olive+oil');
add('walnut oil', 'olive+oil');
add('flaxseed oil', 'olive+oil');
add('hemp oil', 'olive+oil');
add('MCT oil', 'olive+oil');
add('perilla oil', 'olive+oil');
add('rice bran oil', 'olive+oil');
add('corn oil', 'olive+oil');
add('duck fat', 'butter');
add('lard', 'butter');
add('tallow', 'butter');
add('schmaltz', 'butter');

// ══════ BEVERAGES ══════
add('coffee', 'coffee+cup');
add('green tea', 'tea+cup');
add('black tea', 'tea+cup');
add('matcha', 'tea+cup');
add('kombucha', 'tea+cup');
add('soy milk', 'milk+dairy', 'milk+bottle');
add('almond milk', 'milk+dairy', 'milk+bottle');
add('oat milk', 'milk+dairy', 'milk+bottle');
add('orange juice', 'juice+glass', 'mango');
add('coconut milk', 'cream', 'milk+bottle');
add('rice milk', 'milk+dairy', 'milk+bottle');
add('beer', 'beer+glass', 'beer+craft+glass');
add('wine', 'wine+glass');
add('red wine', 'wine+glass');
add('white wine', 'wine+glass');
add('sake', 'wine+glass');
add('champagne', 'wine+glass');
add('whiskey', 'whiskey+bourbon', 'beer+glass');
add('vodka', 'vodka+bottle', 'beer+glass');
add('rum', 'rum+dark', 'beer+glass');
add('tequila', 'tequila+bottle', 'beer+glass');
add('gin', 'gin+bottle', 'beer+glass');
add('brandy', 'wine+glass', 'whiskey+bourbon');
add('hot chocolate', 'chocolate');
add('espresso', 'coffee+cup');
add('latte', 'coffee+cup');
add('iced tea', 'tea+cup');
add('smoothie', 'smoothie+drink', 'smoothie+glass');
add('ginger ale', 'ginger+beer', 'beer+glass');

// ══════ PROCESSED ══════
add('natto', 'beans+legumes');
add('miso', 'kimchi');
add('kimchi', 'kimchi');
add('sauerkraut', 'pickle');
add('pickle', 'pickle');
add('smoked salmon', 'salmon+fish', 'smoked+fish');
add('canned tuna', 'salmon+fish', 'canned+food+pantry');
add('canned sardines', 'salmon+fish', 'fresh+fish+market');
add('fish cake', 'fish+cake+korean');
add('crab stick', 'crab+stick+surimi');
add('smoked mackerel', 'salmon+fish', 'smoked+fish');
add('dried pasta', 'pasta+noodles');
add('dried spaghetti', 'pasta+noodles');
add('rice noodles proc', 'noodles+asian');
add('dried rice noodles proc', 'noodles+asian');
add('mung bean noodles proc', 'noodles+asian');
add('rice cake proc', 'rice+grain');
add('glutinous rice cake proc', 'rice+grain');
add('panko', 'bread+loaf');
add('tapioca starch', 'rice+grain');
add('dark chocolate 70%', 'chocolate');
add('cocoa powder', 'chocolate');
add('greek yogurt proc', 'yogurt');
add('cream cheese spread proc', 'cheese');
add('firm tofu', 'tofu+food');
add('silken tofu', 'tofu+food');
add('fried tofu', 'tofu+food');
add('smoked tofu', 'tofu+food');
add('seitan', 'tofu+food');
add('yuba', 'tofu+food');
add('napa cabbage kimchi', 'kimchi');
add('radish kimchi', 'kimchi');
add('cucumber kimchi', 'pickle');
add('green onion kimchi', 'kimchi');
add('young radish kimchi', 'kimchi');
add('salted shrimp', 'shrimp');
add('salted anchovy', 'salmon+fish', 'smoked+fish');
add('salted pollock roe', 'salmon+fish', 'smoked+fish');
add('salted squid', 'shrimp');
add('katsuobushi', 'salmon+fish', 'smoked+fish');
add('niboshi', 'salmon+fish', 'smoked+fish');
add('peanut butter proc', 'peanut+butter+jar', 'peanut+butter');
add('nutella', 'chocolate');
add('strawberry jam', 'jam+preserves');
add('granola proc', 'oats+cereal');
add('oatmeal proc', 'oats+cereal');
add('popcorn', 'corn');
add('rice paper proc', 'noodles+asian');
add('green olives', 'olives+food');
add('black olives', 'olives+food');
add('canned corn', 'corn');
add('canned beans', 'beans+legumes');
add('canned whole tomatoes', 'tomato', 'canned+food+pantry');
add('baked beans', 'beans+legumes');
add('gelatin', 'gelatin+powder');
add('flour tortilla proc', 'bread+loaf');
add('luncheon meat proc', 'sausage');
add('spam proc', 'sausage');
add('condensed milk proc', 'condensed+milk+can');

// Check for duplicates
const idToNames = {};
for (const [name, id] of Object.entries(SEED)) {
  if (!idToNames[id]) idToNames[id] = [];
  idToNames[id].push(name);
}
const dupes = Object.entries(idToNames).filter(([,names]) => names.length > 1);
console.log(`Total entries: ${Object.keys(SEED).length}`);
console.log(`Unique IDs: ${Object.keys(idToNames).length}`);
console.log(`Duplicates: ${dupes.length}`);
dupes.forEach(([id, names]) => console.log(`  ${id}: ${names.join(', ')}`));

// Generate the SEED JS code
let js = '';
let currentCat = '';
const entries = Object.entries(SEED);
for (let i = 0; i < entries.length; i++) {
  const [name, id] = entries[i];
  const escaped = name.replace(/'/g, "\\'");
  js += `'${escaped}':_px(${id}),`;
  if ((i + 1) % 4 === 0) js += '\n    ';
}

writeFileSync('scripts/seed-output.js', js);
console.log(`\nSaved ${entries.length} entries to scripts/seed-output.js`);
