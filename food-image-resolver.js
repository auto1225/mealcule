// ═══════════════════════════════════════════════════════════════════════════════
//  food-image-resolver.js — 식자재/조리방법 실사 이미지 자동 매칭 시스템
//  Pexels API를 통해 영어 이름으로 음식 사진을 검색하고 localStorage에 캐싱
//  IntersectionObserver로 화면에 보이는 항목만 지연 로딩
// ═══════════════════════════════════════════════════════════════════════════════

var FoodImageResolver = (function() {
  'use strict';

  var CACHE_KEY = '_foodImgCache';
  var CACHE_VERSION = 7;
  var API_BASE = window.location.hostname === 'localhost' ? '' : '';
  var _cache = null;
  var _pendingRequests = {};
  var _observer = null;

  // ── Pexels 사전 매핑 (즉시 표시용) ─────────────────────────────────────────
  var _px = function(id) { return 'https://images.pexels.com/photos/' + id + '/pexels-photo-' + id + '.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop'; };
  var SEED = {
    'beef':_px(34003516),'pork':_px(5774153),'chicken breast':_px(8251004),'chicken leg':_px(20336879),
    'lamb':_px(31732111),'duck':_px(24038060),'bacon':_px(4110366),'sausage':_px(30557313),
    'ham':_px(34756070),'chicken':_px(6107727),'organ meat':_px(19774527),'processed meat':_px(28881687),
    'goose':_px(18510261),'quail':_px(10886018),'pheasant':_px(6107722),'turkey':_px(20580001),
    'veal':_px(36669799),'goat':_px(31732115),'rabbit':_px(20187071),'venison':_px(34003521),
    'horse meat':_px(36169133),'ostrich':_px(9541976),'bison':_px(20187067),'wild boar':_px(36295525),
    'alligator':_px(36295535),'beef sirloin':_px(15114547),'beef tenderloin':_px(20187068),'ribeye':_px(11704885),
    'striploin':_px(36101012),'beef short ribs':_px(5774154),'brisket':_px(36829397),'beef round':_px(13749941),
    'flat iron steak':_px(36734935),'pork belly':_px(15178365),'pork shoulder':_px(2676932),'pork loin':_px(31028648),
    'pork ribs':_px(32122819),'ground pork':_px(31916852),'chicken thigh':_px(5769383),'chicken wing':_px(8963375),
    'whole chicken':_px(35886032),'ground chicken':_px(14513403),'lamb chop':_px(6281507),'lamb shank':_px(32986474),
    'ground lamb':_px(36630826),'duck breast':_px(24038058),'duck leg':_px(11355643),'chorizo':_px(33561164),
    'andouille':_px(15032904),'kielbasa':_px(13149097),'foie gras':_px(24038062),'tripe':_px(28992200),
    'beef liver':_px(11089568),'chicken liver':_px(6281484),'beef tongue':_px(34003517),'oxtail':_px(36788534),
    'denver steak':_px(28881685),'hanger steak':_px(36829358),'chuck roast':_px(25389783),'pork liver':_px(20579997),
    'chicken gizzard':_px(6107716),'pork jowl':_px(7163989),'pig feet':_px(13279396),'bone broth bones':_px(35619348),
    'beef jerky':_px(12747503),'corned beef':_px(31343538),'prosciutto':_px(28558644),'pastrami':_px(14791886),
    'salami':_px(35057087),'pepperoni':_px(6597066),'mortadella':_px(5491287),'bologna':_px(7175710),
    'bratwurst':_px(29346647),'vienna sausage':_px(33312292),'pancetta':_px(4110367),'smoked duck':_px(5652789),
    'skirt steak':_px(15447374),'luncheon meat':_px(27595859),'spam':_px(19688911),'chicken tender':_px(6107763),
    'pork tenderloin':_px(7333262),'salmon':_px(31399181),'tuna':_px(3304176),'shrimp':_px(16561736),
    'mackerel':_px(28161756),'squid':_px(14480458),'clam':_px(8179008),'crab':_px(3640448),
    'octopus':_px(30766455),'pacific saury':_px(34530199),'cod':_px(31399180),'halibut':_px(31399183),
    'anchovy':_px(28172684),'abalone':_px(33706459),'scallop':_px(28503608),'mussel':_px(26586517),
    'oyster':_px(19205260),'lobster':_px(33772772),'sea cucumber':_px(8352389),'eel':_px(33706292),
    'trout':_px(6149078),'catfish':_px(3029526),'sardine':_px(31043029),'sea bass':_px(12801543),
    'yellowtail':_px(33653809),'monkfish':_px(33706291),'sea bream':_px(19768981),'herring':_px(8629084),
    'swordfish':_px(8916859),'tilapia':_px(6831102),'cuttlefish':_px(14908967),'dried shrimp':_px(23627792),
    'flounder':_px(15007528),'hairtail':_px(33164424),'blue crab':_px(20810996),'snow crab':_px(30946361),
    'mantis shrimp':_px(33673617),'barramundi':_px(28161760),'rainbow trout':_px(5209866),'nori':_px(13677969),
    'kombu':_px(6156392),'wakame':_px(13555356),'salmon roe':_px(17564445),'pollock roe':_px(31146493),
    'flying fish roe':_px(3645126),'tiger prawn':_px(33211047),'salted shrimp':_px(23692726),'croaker':_px(33706289),
    'pufferfish':_px(34079755),'horsehair crab':_px(3640445),'king crab':_px(16997922),'red crab':_px(17321099),
    'small octopus':_px(10134722),'webfoot octopus':_px(34973514),'jellyfish':_px(13322663),'spear squid':_px(12458186),
    'salted squid':_px(33144671),'hijiki':_px(19647877),'green laver':_px(11963864),'agar seaweed':_px(4031366),
    'seaweed':_px(11444801),'manila clam':_px(20811003),'surf clam':_px(24838064),'hard clam':_px(17243888),
    'pen shell':_px(28503605),'turban shell':_px(31779538),'herring roe':_px(30296774),'fish roe':_px(20590883),
    'caviar':_px(29143180),'smoked salmon':_px(3296274),'canned tuna':_px(6994944),'canned sardines':_px(4628207),
    'smelt':_px(10930742),'spanish mackerel':_px(12829694),'katsuobushi':_px(20062650),'niboshi':_px(35144163),
    'salted anchovy':_px(17461569),'dried pollock':_px(34759413),'carp':_px(36122229),'sweetfish':_px(3296392),
    'rockfish':_px(32468404),'sea urchin':_px(31371120),'onion':_px(4163411),'garlic':_px(25315388),
    'potato':_px(30624993),'tomato':_px(19852143),'chili pepper':_px(7999181),'broccoli':_px(7676045),
    'carrot':_px(34936603),'spinach':_px(19957370),'napa cabbage':_px(36282128),'bell pepper':_px(7418905),
    'cabbage':_px(36771049),'cucumber':_px(2329440),'squash':_px(18467709),'eggplant':_px(2290742),
    'celery':_px(11703473),'asparagus':_px(1118179),'daikon':_px(29259321),'bean sprouts':_px(8956732),
    'green onion':_px(33098282),'green pepper':_px(7418908),'beet':_px(33893317),'kale':_px(28825963),
    'sweet potato':_px(13059602),'corn':_px(1414650),'pumpkin':_px(34249220),'zucchini':_px(32706359),
    'leek':_px(10899606),'turnip':_px(7890065),'artichoke':_px(31976164),'radish':_px(29679934),
    'lettuce':_px(36165494),'watercress':_px(12931140),'arugula':_px(36010973),'bok choy':_px(6157088),
    'cauliflower':_px(28768714),'butternut squash':_px(7543201),'butternut':_px(4617475),'spaghetti squash':_px(11448527),
    'acorn squash':_px(3233282),'kabocha':_px(31254438),'chayote':_px(33319743),'tomatillo':_px(32149473),
    'jalapeno':_px(36033282),'poblano pepper':_px(7418915),'anaheim pepper':_px(7657030),'shishito pepper':_px(11123495),
    'romanesco':_px(1013420),'broccolini':_px(31187640),'kai-lan':_px(34618719),'okra':_px(33778446),
    'swiss chard':_px(30893230),'water spinach':_px(28613331),'kohlrabi':_px(244393),'celeriac':_px(16963896),
    'cassava':_px(32421783),'taro':_px(16214622),'lotus root':_px(4328201),'nopales':_px(33646202),
    'bottle gourd':_px(36727531),'wax gourd':_px(27588101),'korean zucchini':_px(34284758),'fennel':_px(35155937),
    'parsnip':_px(28486832),'snap peas':_px(8067745),'snow peas':_px(4963969),'long bean':_px(4963968),
    'moringa leaves':_px(29792644),'tatsoi':_px(6823331),'endive':_px(33083467),'radicchio':_px(33893320),
    'frisee':_px(11679732),'collard greens':_px(273794),'mustard greens':_px(18878900),'sorrel':_px(9615877),
    'perilla leaf':_px(3939170),'mini bell pepper':_px(7258128),'yellow bell pepper':_px(34190651),'orange bell pepper':_px(7657015),
    'purple cabbage':_px(2611818),'brussels sprouts':_px(35553032),'jicama':_px(26859583),'chinese eggplant':_px(32421444),
    'bamboo shoot':_px(18018675),'hearts of palm':_px(36501108),'sun-dried tomato':_px(30740199),'roasted red pepper':_px(16575687),
    'ramp':_px(7890169),'shallot':_px(820903),'red onion':_px(7493445),'scallion':_px(8802754),
    'cherry tomato':_px(5953811),'roma tomato':_px(7175543),'iceberg lettuce':_px(35399891),'romaine lettuce':_px(34757650),
    'red lettuce':_px(11679739),'red cabbage':_px(5502850),'savoy cabbage':_px(36078353),'spring cabbage':_px(32254885),
    'chinese chives':_px(36028821),'asian chives':_px(25745497),'garlic scapes':_px(35356032),'wild garlic':_px(4022182),
    'wild chives':_px(36326795),'green chili':_px(34111554),'korean hot pepper':_px(28772792),'bitter melon':_px(4599920),
    'yam':_px(10652321),'purple sweet potato':_px(5507575),'purple potato':_px(28936956),'jerusalem artichoke':_px(17563535),
    'burdock root':_px(21913807),'fava bean':_px(185474),'sugar snap peas':_px(4963963),'tuscan kale':_px(32207653),
    'mizuna':_px(17380335),'chinese broccoli':_px(30741643),'mung bean sprouts':_px(6613054),'crown daisy':_px(5756032),
    'water dropwort':_px(6978242),'water parsley':_px(30893349),'bellflower root':_px(1257075),'bracken fern':_px(5791680),
    'heart of palm':_px(4033045),'rutabaga':_px(25682817),'watermelon radish':_px(7097450),'dandelion greens':_px(4051644),
    'mugwort':_px(5949097),'apple':_px(31355709),'banana':_px(4451837),'strawberry':_px(36484570),
    'blueberry':_px(10397900),'avocado':_px(17335753),'grape':_px(7172230),'watermelon':_px(35245707),
    'kiwi':_px(8447148),'lemon':_px(36371030),'orange':_px(27556074),'grapefruit':_px(32078454),
    'mango':_px(36589448),'pineapple':_px(29343189),'peach':_px(5915439),'pear':_px(28797303),
    'persimmon':_px(35114196),'cherry':_px(11886001),'raspberry':_px(36785661),'coconut':_px(31112838),
    'fig':_px(33410612),'pomegranate':_px(29310030),'plum':_px(10852038),'papaya':_px(4113808),
    'passion fruit':_px(32419594),'lime':_px(13427978),'cranberry':_px(5418670),'dragon fruit':_px(6927641),
    'dried fig':_px(4499221),'green plum':_px(17511560),'quince':_px(32370315),'calamansi':_px(35307299),
    'acai berry':_px(29942738),'goji berry':_px(6732733),'soursop':_px(12303099),'cherimoya':_px(31448459),
    'finger lime':_px(4871173),'honeydew melon':_px(4772947),'honeydew':_px(4772954),'cantaloupe':_px(4051441),
    'fresh coconut':_px(34088350),'starfruit':_px(30893286),'guava':_px(3613159),'lychee':_px(32834449),
    'jackfruit':_px(35140173),'durian':_px(34927312),'tangerine':_px(10553648),'clementine':_px(19202904),
    'nectarine':_px(33589129),'apricot':_px(26973631),'mulberry':_px(36783371),'gooseberry':_px(32202338),
    'jujube':_px(29318646),'yuzu':_px(33576384),'green grape':_px(5946087),'melon':_px(30920292),
    'kumquat':_px(30001534),'blackberry':_px(892808),'mangosteen':_px(32842284),'rambutan':_px(4532754),
    'star fruit':_px(35344995),'white dragon fruit':_px(11450660),'tamarind':_px(2348740),'acerola':_px(29566430),
    'black currant':_px(11943043),'elderberry':_px(1343941),'dates':_px(20632754),'baobab fruit':_px(36557914),
    'flour':_px(4198364),'pasta':_px(30910493),'oats':_px(4327693),'rice':_px(4110255),
    'brown rice':_px(4224268),'white bread':_px(10075983),'buckwheat':_px(4110250),'udon noodles':_px(28674525),
    'instant ramen':_px(28895972),'quinoa':_px(34314610),'barley':_px(4110256),'couscous':_px(10071312),
    'cornmeal':_px(5678105),'rye bread':_px(33658036),'sourdough':_px(20685031),'tortilla':_px(30350360),
    'bagel':_px(35597416),'croissant':_px(30693944),'muesli':_px(7421197),'soba noodles':_px(33989565),
    'glass noodles':_px(15780328),'pho noodles':_px(32449946),'ramen noodles':_px(7138913),'fettuccine':_px(4698505),
    'penne':_px(29716495),'spaghetti':_px(5794874),'macaroni':_px(34326275),'lasagna':_px(34326276),
    'dried pasta':_px(31097757),'dried spaghetti':_px(29186219),'rice noodles':_px(4518664),'dried rice noodles':_px(5348719),
    'mung bean noodles':_px(4518666),'wild rice':_px(8108066),'jasmine rice':_px(8108052),'basmati rice':_px(4110261),
    'sticky rice':_px(8108069),'sushi rice':_px(4110262),'arborio rice':_px(8108169),'millet':_px(5208254),
    'amaranth':_px(4725736),'teff':_px(7633749),'spelt':_px(4725728),'kamut':_px(3639181),
    'naan':_px(33993347),'pita':_px(34088834),'ciabatta':_px(33658033),'focaccia':_px(31371161),
    'baguette':_px(27418964),'flour tortilla':_px(4267963),'rice cake':_px(8108110),'glutinous rice cake':_px(4224258),
    'rice paper':_px(8108025),'oatmeal':_px(7421205),'granola':_px(7051062),'milk':_px(5967267),
    'cheese':_px(30433630),'cream':_px(30818075),'yogurt':_px(128865),'heavy cream':_px(3756480),
    'mozzarella':_px(29412671),'parmesan':_px(9494774),'butter':_px(7966354),'cream cheese':_px(28575893),
    'ricotta':_px(4187782),'gouda':_px(8287394),'brie':_px(21938198),'cheddar':_px(5732760),
    'goat cheese':_px(8287401),'sour cream':_px(35663668),'whey protein':_px(2198626),'mascarpone':_px(13079969),
    'gruyere':_px(8287389),'emmental':_px(8250343),'feta':_px(5202240),'halloumi':_px(33313085),
    'blue cheese':_px(8287402),'cottage cheese':_px(8287393),'provolone':_px(12664810),'manchego':_px(12991621),
    'camembert':_px(14319290),'condensed milk':_px(5967314),'evaporated milk':_px(7702453),'buttermilk':_px(14127931),
    'clotted cream':_px(8109320),'ghee':_px(8188934),'kefir':_px(30265685),'greek yogurt':_px(22696128),
    'cream cheese spread':_px(33313084),'egg':_px(34851176),'quail egg':_px(4108759),'duck egg':_px(20903603),
    'egg white':_px(7419426),'egg yolk':_px(8859450),'onsen egg':_px(2402495),'century egg':_px(5266094),
    'almond':_px(32281733),'walnut':_px(33811984),'peanut':_px(35614009),'cashew':_px(34449058),
    'pine nut':_px(10060931),'sesame':_px(8951051),'sunflower seed':_px(7223448),'pistachio':_px(11886481),
    'macadamia':_px(7421516),'pecan':_px(17038999),'hazelnut':_px(28266923),'chia seed':_px(691162),
    'flax seed':_px(3682188),'hemp seed':_px(6664421),'pumpkin seed':_px(28542240),'brazil nut':_px(30510828),
    'coconut flake':_px(35499127),'poppy seed':_px(3682193),'nigella seed':_px(5738744),'lotus seed':_px(4931455),
    'watermelon seed':_px(9475849),'ginkgo nut':_px(35237536),'chestnut':_px(33552542),'candlenut':_px(36631826),
    'tiger nut':_px(4033325),'sacha inchi':_px(22809624),'shiitake':_px(6157037),'button mushroom':_px(24029954),
    'enoki':_px(6157045),'king oyster mushroom':_px(31729436),'wood ear':_px(6157026),'oyster mushroom':_px(6157044),
    'portobello':_px(32122818),'truffle':_px(6157030),'chanterelle':_px(34034738),'maitake':_px(6205020),
    'morel':_px(6646102),'lion\'s mane':_px(8682917),'matsutake':_px(31727970),'beech mushroom':_px(34095242),
    'hedgehog mushroom':_px(33111626),'porcini':_px(6646097),'black truffle':_px(10200425),'white truffle':_px(8843375),
    'shimeji':_px(8822657),'nameko':_px(31729433),'chaga':_px(11816274),'reishi':_px(7245454),
    'cordyceps':_px(33120455),'turkey tail mushroom':_px(8288078),'hen of the woods':_px(31729435),'black bean':_px(34448992),
    'lentil':_px(6086414),'chickpea':_px(34949285),'red bean':_px(35553040),'white kidney bean':_px(13322408),
    'pinto bean':_px(36343666),'green lentil':_px(15107600),'red lentil':_px(11369845),'mung bean':_px(6316677),
    'lima bean':_px(8108209),'tempeh':_px(8954474),'tofu':_px(33964763),'green peas':_px(8067746),
    'edamame':_px(8067748),'soybean':_px(4963966),'navy bean':_px(36021103),'cannellini bean':_px(31672561),
    'adzuki bean':_px(30204266),'black-eyed pea':_px(30960035),'split pea':_px(4460190),'lupini bean':_px(4963714),
    'basil':_px(2575372),'rosemary':_px(33410907),'thyme':_px(6103377),'mint':_px(7855271),
    'cilantro':_px(7076754),'parsley':_px(20258262),'ginger':_px(5202091),'black pepper':_px(5988689),
    'cumin':_px(5202096),'cinnamon':_px(6176581),'turmeric':_px(7988019),'curry powder':_px(7988013),
    'paprika':_px(4871134),'oregano':_px(33076388),'dill':_px(4198139),'chive':_px(31529274),
    'bay leaf':_px(14660076),'sage':_px(30856378),'tarragon':_px(5038918),'star anise':_px(6176576),
    'cardamom':_px(9142634),'clove':_px(6176578),'nutmeg':_px(30004633),'saffron':_px(5584413),
    'wasabi':_px(33930747),'sichuan pepper':_px(10433518),'lemongrass':_px(15670707),'galangal':_px(5202089),
    'marjoram':_px(17812794),'sumac':_px(7404255),'fenugreek':_px(7988017),'allspice':_px(11789833),
    'coriander seed':_px(7382850),'fennel seed':_px(7890075),'celery seed':_px(2575374),'white pepper':_px(8559086),
    'pink pepper':_px(10487732),'five spice':_px(30004639),'za\'atar':_px(8322865),'herbes de provence':_px(30724420),
    'curry leaf':_px(35971056),'kaffir lime leaf':_px(35494628),'pandan leaf':_px(30332369),'epazote':_px(8354870),
    'shiso':_px(4500468),'perilla':_px(4439902),'chervil':_px(31976166),'lavender':_px(31933729),
    'annatto':_px(7988006),'asafoetida':_px(678414),'juniper berry':_px(29657648),'mace':_px(30004640),
    'vanilla bean':_px(34086126),'szechuan peppercorn':_px(7925714),'salt':_px(2978020),'vinegar':_px(3066951),
    'soy sauce':_px(20843711),'sugar':_px(13005168),'oyster sauce':_px(11661140),'ketchup':_px(8455314),
    'mayonnaise':_px(25813796),'mustard':_px(4518578),'honey':_px(30666803),'mirin':_px(15949775),
    'gochujang':_px(5338145),'doenjang':_px(6823262),'fish sauce':_px(1385185),'sriracha':_px(30256467),
    'tabasco':_px(13696027),'worcestershire':_px(5223214),'balsamic vinegar':_px(32477667),'maple syrup':_px(30666799),
    'agave syrup':_px(9435706),'hoisin sauce':_px(17126451),'tamari':_px(8994865),'miso paste':_px(8956780),
    'tahini':_px(8130681),'peanut butter':_px(8611766),'tomato paste':_px(32611701),'chili oil':_px(4223927),
    'sesame paste':_px(3338500),'anchovy fish sauce':_px(11661135),'ssamjang':_px(8954152),'doubanjiang':_px(8827913),
    'sichuan doubanjiang':_px(8840482),'black bean paste':_px(8956830),'sweet bean sauce':_px(8954371),'rice vinegar':_px(10054922),
    'apple cider vinegar':_px(34970649),'white vinegar':_px(10060232),'red wine vinegar':_px(10060235),'capers':_px(29851143),
    'vanilla extract':_px(7965960),'baking powder':_px(6287221),'dry yeast':_px(8290283),'olive oil':_px(1441120),
    'sesame oil':_px(3297366),'coconut oil':_px(25745503),'canola oil':_px(7795850),'grapeseed oil':_px(25745502),
    'butter oil':_px(7110152),'avocado oil':_px(25745500),'peanut oil':_px(25745499),'sunflower oil':_px(7296399),
    'truffle oil':_px(4109913),'walnut oil':_px(25745498),'flaxseed oil':_px(25745504),'hemp oil':_px(25745506),
    'MCT oil':_px(25745530),'perilla oil':_px(16486887),'rice bran oil':_px(25745509),'corn oil':_px(30545510),
    'duck fat':_px(7966386),'lard':_px(7966488),'tallow':_px(4182680),'schmaltz':_px(8188933),
    'coffee':_px(4122828),'green tea':_px(30307112),'black tea':_px(15370186),'matcha':_px(12799607),
    'kombucha':_px(9499814),'soy milk':_px(1435706),'almond milk':_px(4121867),'oat milk':_px(14754551),
    'orange juice':_px(11009217),'coconut milk':_px(30648995),'rice milk':_px(4121868),'beer':_px(5537949),
    'wine':_px(2702805),'red wine':_px(29436323),'white wine':_px(34557220),'sake':_px(34593143),
    'champagne':_px(34557221),'whiskey':_px(13947435),'vodka':_px(8472736),'rum':_px(32711949),
    'tequila':_px(5537959),'gin':_px(13027857),'brandy':_px(11953263),'hot chocolate':_px(6261691),
    'espresso':_px(29491841),'latte':_px(6813796),'iced tea':_px(33526974),'smoothie':_px(4736437),
    'ginger ale':_px(7752991),'natto':_px(21907688),'miso':_px(31150502),'kimchi':_px(6823267),
    'sauerkraut':_px(12181052),'pickle':_px(8599636),'fish cake':_px(32196402),'crab stick':_px(10692504),
    'smoked mackerel':_px(4580112),'rice noodles proc':_px(29514833),'dried rice noodles proc':_px(29792753),'mung bean noodles proc':_px(6940985),
    'rice cake proc':_px(6086557),'glutinous rice cake proc':_px(8108117),'panko':_px(11646507),'tapioca starch':_px(4224252),
    'dark chocolate 70%':_px(4113300),'cocoa powder':_px(11178475),'greek yogurt proc':_px(10809260),'cream cheese spread proc':_px(9946772),
    'firm tofu':_px(36010457),'silken tofu':_px(8883589),'fried tofu':_px(35132130),'smoked tofu':_px(6805775),
    'seitan':_px(36120987),'yuba':_px(36371693),'napa cabbage kimchi':_px(5774156),'radish kimchi':_px(8954526),
    'cucumber kimchi':_px(9005994),'green onion kimchi':_px(8838806),'young radish kimchi':_px(8954238),'salted pollock roe':_px(17780265),
    'peanut butter proc':_px(5149342),'nutella':_px(4113335),'strawberry jam':_px(7586251),'granola proc':_px(4327690),
    'oatmeal proc':_px(7051067),'popcorn':_px(30522013),'rice paper proc':_px(8108045),'green olives':_px(25388930),
    'black olives':_px(17714357),'canned corn':_px(142520),'canned beans':_px(4963318),'canned whole tomatoes':_px(31596394),
    'baked beans':_px(25482737),'gelatin':_px(8191230),'flour tortilla proc':_px(30862326),'luncheon meat proc':_px(25884967),
    'spam proc':_px(11750508),'condensed milk proc':_px(30731007),
  };
  var _queue = [];
  var _processing = false;
  var _batchDelay = 150; // ms between API calls to avoid rate limiting

  // ── 카테고리별 다양한 fallback 이미지 풀 (항목명 해시로 선택, 같은 카테고리도 다른 사진) ──
  var CAT_POOL = {
    meat:[65175,618773,616354,3535383,2338407,1927377,2901854,39634,5045090,618775,5769377,792027,1694003,5765068,6287525,6542787,692363,10648394,13304044,109641],
    seafood:[1409050,3296279,2871757,28916474,11564640,8352783,2235924,3046629,1267320,2213257,8352388,6953375,5571605,1578445,14062105,8352786,2042591],
    veg:[144206,1392585,4110476,3938343,9185580,7330428,143133,7195272,2518893,594137,3568039,1300972,321551,539431,547263,1199562,8839400,7129164,5765658,8956729,8390361,5949097,5758969,8422726],
    fruit:[1132047,1093038,934066,1395958,557659,760281,1184264,867349,1414110,207085,2935021,947879,6157041,1656665,175727,701775,1652001,5430812,65256,162926,161573,793763,1115812,2228553,4487989,5945791,46518,16743503,1343941,2132031,4869083],
    grain:[6287371,1279330,216951,1311771,7665442,162456,4267969,1287278,2664443,547263],
    dairy:[248412,773253,8892364,133553,6641182,531334,821365,3693282,7525004,5953784,4109946,251599,7144518],
    egg:[824635,6625279,3680159,7937463,6646240],
    nut:[1295572,7420934,4663476,9811624,33249,1033730,7420890,1799307,8162043,7717466,7667726,7420423],
    mushroom:[1643403,31727970,45205,247572,27080443,14612418,36438,1643394,977077],
    legume:[6316673,8108089,4110003,4518843,2255935],
    herb:[1391503,6913084,4113916,5852203,5988689,6220710,1033730,5498008,4199095,1042392,8607839,7456525,1309426],
    sauce:[5908226,1385185,302163,5634206,1395967,4198901,11267449,11513615,6823261],
    oil:[1022385,3682190,9131994,531334,3737651],
    beverage:[312418,1417945,3329192,248412,1536869],
    processed:[4518843,2518893,30987131,6316673,3568039,7129164,2664443]
  };
  // 단일 fallback (하위 호환)
  var CAT_FALLBACK = {};
  Object.keys(CAT_POOL).forEach(function(k) { CAT_FALLBACK[k] = CAT_POOL[k][0]; });

  // 이름 기반 해시 → 풀에서 고유 이미지 선택
  function _hashPick(name, pool) {
    var h = 0;
    for (var i = 0; i < name.length; i++) h = ((h << 5) - h + name.charCodeAt(i)) | 0;
    return pool[Math.abs(h) % pool.length];
  }

  // ── 캐시 로드/저장 ──────────────────────────────────────────────────────────
  function _loadCache() {
    if (_cache) return _cache;
    try {
      var raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed._v === CACHE_VERSION) {
          _cache = parsed;
          return _cache;
        }
      }
    } catch(e) {}
    _cache = { _v: CACHE_VERSION };
    // SEED 데이터를 초기 캐시로 로드 (API 호출 없이 즉시 표시)
    Object.keys(SEED).forEach(function(k) {
      if (!_cache[k]) _cache[k] = { url: SEED[k], ts: Date.now() };
    });
    _saveCache();
    return _cache;
  }

  function _saveCache() {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(_cache));
    } catch(e) {
      // localStorage full — prune oldest entries
      var keys = Object.keys(_cache).filter(function(k) { return k !== '_v'; });
      if (keys.length > 200) {
        keys.slice(0, 100).forEach(function(k) { delete _cache[k]; });
        try { localStorage.setItem(CACHE_KEY, JSON.stringify(_cache)); } catch(e2) {}
      }
    }
  }

  // ── 캐시 키 정규화 ─────────────────────────────────────────────────────────
  function _normalizeKey(name) {
    return name.toLowerCase().trim().replace(/\s+/g, ' ');
  }

  // ── 캐시에서 이미지 URL 가져오기 ───────────────────────────────────────────
  function getCachedUrl(englishName) {
    var cache = _loadCache();
    var key = _normalizeKey(englishName);
    var entry = cache[key];
    if (entry && entry.url) {
      // 30일 지나면 만료 (SEED 데이터는 만료 안 함)
      if (SEED[key] || Date.now() - (entry.ts || 0) <= 30 * 24 * 60 * 60 * 1000) {
        return entry.url;
      }
      delete cache[key];
    }
    // 캐시에 없으면 SEED에서 직접 확인
    if (SEED[key]) return SEED[key];
    return null;
  }

  // ── Pexels API로 이미지 검색 ───────────────────────────────────────────────
  function fetchImage(englishName) {
    var key = _normalizeKey(englishName);

    // 이미 캐시에 있으면 바로 반환
    var cached = getCachedUrl(englishName);
    if (cached !== null) return Promise.resolve(cached);

    // 이미 요청 중이면 동일 Promise 반환
    if (_pendingRequests[key]) return _pendingRequests[key];

    _pendingRequests[key] = fetch(API_BASE + '/api/food-image?q=' + encodeURIComponent(englishName))
      .then(function(res) {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then(function(data) {
        var cache = _loadCache();
        cache[key] = { url: data.url || '', tiny: data.tiny || '', ts: Date.now() };
        _saveCache();
        delete _pendingRequests[key];
        return data.url || '';
      })
      .catch(function() {
        // 실패 시 빈 문자열 캐싱 (재시도 방지)
        var cache = _loadCache();
        cache[key] = { url: '', ts: Date.now() };
        _saveCache();
        delete _pendingRequests[key];
        return '';
      });

    return _pendingRequests[key];
  }

  // ── DB 카테고리 기반 fallback URL 조회 (캐싱 최적화) ───────────────────
  var _enToCatMap = null;
  function _getCatFallback(englishName) {
    if (typeof DB === 'undefined') return null;
    if (!_enToCatMap) {
      _enToCatMap = {};
      var entries = Object.entries(DB);
      for (var i = 0; i < entries.length; i++) {
        var en = entries[i][1].en;
        if (en) _enToCatMap[en.toLowerCase()] = entries[i][1].cat;
      }
    }
    var cat = _enToCatMap[englishName.toLowerCase()];
    if (!cat) return null;
    var pool = CAT_POOL[cat];
    return pool ? _px(_hashPick(englishName.toLowerCase(), pool)) : (CAT_FALLBACK[cat] || null);
  }

  // ── 이미지 요소를 생성 (emoji fallback 포함) ──────────────────────────────
  function createImgHtml(englishName, emoji, cssClass, size) {
    cssClass = cssClass || 'fi-img';
    size = size || 40;
    var cached = getCachedUrl(englishName);

    // SEED/캐시에 없으면 카테고리 fallback 시도
    if (!cached) cached = _getCatFallback(englishName);

    if (cached) {
      return '<img src="' + cached + '" class="' + cssClass + '" alt="' + englishName +
        '" style="width:' + size + 'px;height:' + size + 'px;border-radius:6px;object-fit:cover" ' +
        'onerror="this.outerHTML=\'<span class=\\\'fi-emoji\\\'>' + (emoji || '🍽️') + '</span>\'">';
    }

    // 캐시 없으면 data-fi-name 속성으로 lazy load 대상 표시
    return '<span class="fi-lazy ' + cssClass + '" data-fi-name="' + englishName.replace(/"/g, '&quot;') +
      '" data-fi-emoji="' + (emoji || '🍽️') + '" data-fi-class="' + cssClass +
      '" data-fi-size="' + size + '">' + (emoji || '🍽️') + '</span>';
  }

  // ── Lazy Loading: 화면에 보이는 항목만 이미지 로드 ────────────────────────
  function _processQueue() {
    if (_processing || _queue.length === 0) return;
    _processing = true;

    var item = _queue.shift();
    if (!item || !item.el || !item.el.isConnected) {
      _processing = false;
      _processQueue();
      return;
    }

    fetchImage(item.name).then(function(url) {
      if (url && item.el && item.el.isConnected) {
        var size = item.el.dataset.fiSize || 40;
        var cssClass = item.el.dataset.fiClass || 'fi-img';
        var emoji = item.el.dataset.fiEmoji || '🍽️';
        item.el.outerHTML = '<img src="' + url + '" class="' + cssClass +
          '" style="width:' + size + 'px;height:' + size + 'px;border-radius:6px;object-fit:cover" ' +
          'onerror="this.outerHTML=\'<span class=\\\'fi-emoji\\\'>' + emoji + '</span>\'">';
      }
      _processing = false;
      if (_queue.length > 0) {
        setTimeout(_processQueue, _batchDelay);
      }
    }).catch(function() {
      _processing = false;
      if (_queue.length > 0) {
        setTimeout(_processQueue, _batchDelay);
      }
    });
  }

  function _initObserver() {
    if (_observer) return;
    if (!('IntersectionObserver' in window)) {
      // Fallback: observe nothing, rely on scanLazy()
      return;
    }
    _observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          _observer.unobserve(el);
          var name = el.dataset.fiName;
          if (name) {
            _queue.push({ el: el, name: name });
            _processQueue();
          }
        }
      });
    }, { rootMargin: '200px' });
  }

  // ── DOM에서 lazy 요소를 스캔하고 Observer에 등록 ──────────────────────────
  function scanLazy(container) {
    _initObserver();
    var elements = (container || document).querySelectorAll('.fi-lazy');
    elements.forEach(function(el) {
      if (_observer) {
        _observer.observe(el);
      } else {
        // No IntersectionObserver — load immediately
        var name = el.dataset.fiName;
        if (name) {
          _queue.push({ el: el, name: name });
          _processQueue();
        }
      }
    });
  }

  // ── 렌더링 후 자동 스캔 (debounced) ───────────────────────────────────────
  var _scanTimer = null;
  function scheduleScan() {
    if (_scanTimer) clearTimeout(_scanTimer);
    _scanTimer = setTimeout(function() { scanLazy(); }, 100);
  }

  // ── 커스텀 조리방법에 이미지 자동 할당 ────────────────────────────────────
  function autoAssignMethodImage(methodObj) {
    if (methodObj.img) return; // 이미 이미지 있음
    var name = methodObj.label_en || methodObj.label;
    if (!name) return;
    fetchImage(name + ' cooking').then(function(url) {
      if (url) {
        methodObj.img = url;
        if (typeof renderMethods === 'function') renderMethods();
      }
    });
  }

  // ── 공개 API ──────────────────────────────────────────────────────────────
  return {
    getCachedUrl: getCachedUrl,
    fetchImage: fetchImage,
    createImgHtml: createImgHtml,
    scanLazy: scanLazy,
    scheduleScan: scheduleScan,
    autoAssignMethodImage: autoAssignMethodImage,
  };
})();
