// Long Tail categories. Each category lists accepted answers in four tiers,
// from the answers most people give (tier 0) to the rarest (tier 3).
// "a=b=c" means a, b and c are the same answer. Tiers are a judgment call,
// edit freely.
window.LONGTAIL = [
  { id: "planets", prompt: "A planet or dwarf planet in our solar system", t: [
    "earth|mars|jupiter|saturn",
    "venus|mercury|neptune|uranus",
    "pluto",
    "ceres|eris|haumea|makemake|sedna|quaoar|orcus|gonggong"] },
  { id: "africa", prompt: "A country in Africa", t: [
    "egypt|nigeria|south africa|kenya|morocco|ethiopia",
    "ghana|algeria|tunisia|libya|sudan|somalia|tanzania|uganda|zimbabwe|senegal|cameroon|congo=democratic republic of the congo=drc|madagascar|angola|rwanda|namibia|botswana|zambia|mozambique",
    "ivory coast=cote divoire|mali|niger|chad|malawi|sierra leone|liberia|guinea|mauritania|burkina faso|benin|togo|gabon|eritrea|south sudan|lesotho|eswatini=swaziland|mauritius|central african republic|burundi|djibouti",
    "comoros|seychelles|cape verde=cabo verde|sao tome and principe|equatorial guinea|guinea bissau|gambia=the gambia|republic of the congo"] },
  { id: "elements", prompt: "A chemical element", t: [
    "oxygen|hydrogen|carbon|gold|iron|helium|nitrogen|silver",
    "copper|sodium|calcium|aluminum=aluminium|zinc|lead|uranium|neon|chlorine|potassium|mercury|platinum|lithium|silicon|sulfur=sulphur|magnesium|tin|nickel|titanium|plutonium",
    "argon|fluorine|phosphorus|cobalt|chromium|tungsten|iodine|radon|radium|boron|krypton|xenon|manganese|bromine|arsenic|beryllium|barium|cesium=caesium|strontium|palladium|cadmium|bismuth|selenium|germanium|gallium|osmium|iridium|vanadium",
    "scandium|rubidium|yttrium|zirconium|niobium|molybdenum|technetium|ruthenium|rhodium|indium|antimony|tellurium|lanthanum|cerium|praseodymium|neodymium|promethium|samarium|europium|gadolinium|terbium|dysprosium|holmium|erbium|thulium|ytterbium|lutetium|hafnium|tantalum|rhenium|thallium|polonium|astatine|francium|actinium|thorium|protactinium|neptunium|americium|curium|berkelium|californium|einsteinium|fermium|mendelevium|nobelium|lawrencium|rutherfordium|dubnium|seaborgium|bohrium|hassium|meitnerium|darmstadtium|roentgenium|copernicium|nihonium|flerovium|moscovium|livermorium|tennessine|oganesson"] },
  { id: "usstates", prompt: "A US state", t: [
    "california|texas|new york|florida|washington",
    "illinois|ohio|arizona|nevada|colorado|georgia|hawaii|alaska|michigan|massachusetts|pennsylvania|oregon|new jersey|virginia|utah|tennessee|louisiana|north carolina",
    "minnesota|wisconsin|indiana|missouri|kentucky|alabama|south carolina|maryland|connecticut|oklahoma|kansas|iowa|new mexico|maine|vermont|idaho|montana|mississippi|arkansas|nebraska",
    "north dakota|south dakota|wyoming|delaware|rhode island|new hampshire|west virginia"] },
  { id: "fruit", prompt: "A fruit", t: [
    "apple|banana|orange|grape|strawberry|mango|watermelon",
    "pineapple|cherry|peach|pear|lemon|lime|blueberry|kiwi|plum|raspberry|coconut|papaya|avocado|tomato|grapefruit|apricot|pomegranate|cantaloupe|blackberry",
    "fig|guava|lychee=litchi|passion fruit|dragon fruit|nectarine|cranberry|date|tangerine|clementine|honeydew|persimmon|jackfruit|starfruit=carambola|olive|mulberry|gooseberry|quince|kumquat",
    "durian|rambutan|mangosteen|longan|loquat|feijoa|soursop|cherimoya|tamarind|jabuticaba|salak|pawpaw|medlar|ackee|breadfruit|sapodilla|chikoo|jamun|elderberry|cloudberry|lingonberry|yuzu|bael|kokum|amla"] },
  { id: "dogs", prompt: "A dog breed", t: [
    "labrador=labrador retriever=lab|golden retriever|german shepherd|poodle|bulldog|beagle|chihuahua",
    "husky=siberian husky|pug|rottweiler|dachshund|boxer|corgi|shih tzu|great dane|doberman|border collie|yorkshire terrier=yorkie|pomeranian|dalmatian|pit bull|maltese|french bulldog",
    "bloodhound|greyhound|saint bernard|basset hound|cocker spaniel|akita|shiba inu|samoyed|chow chow|bernese mountain dog|whippet|newfoundland|mastiff|schnauzer|jack russell|weimaraner|vizsla|australian shepherd|bichon frise|cavalier king charles spaniel|collie|malamute|pekingese|papillon",
    "basenji|komondor|puli|borzoi|saluki|xoloitzcuintli|affenpinscher|otterhound|lagotto romagnolo|kooikerhondje|bergamasco|azawakh|mudi|leonberger|keeshond|briard|kuvasz|rajapalayam|mudhol hound|chippiparai|kanni|lhasa apso|tibetan mastiff|sloughi|catahoula"] },
  { id: "proglang", prompt: "A programming language", t: [
    "python|java|javascript|c|c++=cpp",
    "go=golang|rust|ruby|php|swift|kotlin|typescript|c#=csharp|sql|r|perl|scala|matlab",
    "haskell|lua|dart|elixir|erlang|clojure|julia|fortran|cobol|pascal|lisp|objective c|bash|groovy|f#=fsharp|assembly|visual basic|delphi|ocaml|prolog",
    "zig|nim|crystal|racket|scheme|smalltalk|ada|apl|forth|elm|purescript|idris|coq|agda|vala|tcl|rexx|simula|algol|modula|eiffel|hack|brainfuck|mojo|odin|gleam"] },
  { id: "shakespeare", prompt: "A play by Shakespeare", t: [
    "hamlet|romeo and juliet|macbeth",
    "othello|king lear|a midsummer nights dream=midsummer nights dream|julius caesar|the tempest=tempest|much ado about nothing|twelfth night|the merchant of venice=merchant of venice",
    "as you like it|the taming of the shrew=taming of the shrew|richard iii|henry v|antony and cleopatra|the comedy of errors=comedy of errors|the winters tale=winters tale|measure for measure|coriolanus|henry iv",
    "titus andronicus|timon of athens|pericles|cymbeline|troilus and cressida|alls well that ends well|loves labours lost|the two gentlemen of verona=two gentlemen of verona|the merry wives of windsor=merry wives of windsor|king john|richard ii|henry vi|henry viii|the two noble kinsmen=two noble kinsmen"] },
  { id: "instruments", prompt: "A musical instrument", t: [
    "piano|guitar|violin|drums|flute",
    "trumpet|saxophone|cello|clarinet|harp|keyboard|bass|ukulele|trombone|harmonica|tabla|sitar|accordion|xylophone|organ|tuba",
    "oboe|bassoon|viola|banjo|mandolin|french horn|bagpipes|tambourine|triangle|piccolo|marimba|harpsichord|veena|sarod|santoor|mridangam|didgeridoo|bongos|cymbals|glockenspiel|shehnai|bansuri",
    "theremin|hurdy gurdy|kalimba|erhu|shamisen|koto|oud|balalaika|zither|dulcimer|ocarina|lute|sackbut|crumhorn|nadaswaram|ghatam|kanjira|morsing|celesta|euphonium|sousaphone|hang drum=handpan|cajun|cajon|guzheng|duduk|kora|mbira|rebab"] },
  { id: "vegetables", prompt: "A vegetable", t: [
    "carrot|potato|broccoli|onion|tomato|spinach|lettuce",
    "cabbage|cauliflower|pea|corn|cucumber|pepper=bell pepper|garlic|celery|mushroom|eggplant=brinjal=aubergine|zucchini=courgette|pumpkin|bean=green bean|sweet potato|kale|beetroot=beet|radish|okra=bhindi",
    "asparagus|artichoke|leek|turnip|parsnip|brussels sprouts|squash|bok choy=pak choi|chard=swiss chard|arugula=rocket|fennel|ginger|shallot|yam|taro|bitter gourd=karela|bottle gourd=lauki|drumstick=moringa|watercress|endive",
    "kohlrabi|rutabaga=swede|jicama|celeriac|salsify|daikon|lotus root|fiddlehead|ridge gourd|ivy gourd=tindora|cluster beans=guar|snake gourd|ash gourd|chayote|romanesco|radicchio|samphire|sunchoke=jerusalem artichoke|tomatillo|cassava=tapioca"] },
  { id: "birds", prompt: "A bird", t: [
    "eagle|parrot|pigeon|crow|owl|sparrow|chicken|penguin",
    "peacock|duck|swan|flamingo|robin|hawk|falcon|ostrich|hummingbird|seagull=gull|turkey|goose|woodpecker|vulture|crane|kingfisher|parakeet|canary|dove",
    "pelican|heron|stork|toucan|cardinal|blue jay|magpie|raven|emu|kiwi|albatross|puffin|cuckoo|myna=mynah|finch|wren|starling|swallow|egret|ibis|condor|kite|quail|pheasant|cockatoo|macaw|lark|nightingale|oriole|bulbul",
    "shoebill|kakapo|hoatzin|cassowary|lyrebird|bowerbird|frigatebird|booby|cormorant|loon|grebe|bittern|plover|sandpiper|avocet|hoopoe|bee eater|roller|hornbill|barbet|drongo|tailorbird|sunbird|nuthatch|treecreeper|shrike|waxwing|kookaburra|quetzal|secretary bird|potoo|nightjar|oxpecker|weaver"] },
  { id: "eurocapitals", prompt: "A capital city in Europe", t: [
    "london|paris|rome|berlin|madrid",
    "athens|amsterdam|vienna|moscow|dublin|lisbon|prague|brussels|stockholm|oslo|copenhagen|warsaw|budapest|helsinki",
    "bern|edinburgh|reykjavik|kyiv=kiev|bucharest|belgrade|sofia|zagreb|bratislava|ljubljana|tallinn|riga|vilnius|luxembourg|monaco|valletta|minsk|tirana",
    "andorra la vella|vaduz|san marino|skopje|podgorica|sarajevo|chisinau|pristina|nicosia|tbilisi|yerevan|baku|cardiff|belfast|vatican city"] },
  { id: "boardgames", prompt: "A board game", t: [
    "chess|monopoly|scrabble|checkers=draughts",
    "ludo|snakes and ladders|clue=cluedo|risk|catan=settlers of catan|backgammon|go|connect four|battleship|othello=reversi|trivial pursuit|sorry",
    "carcassonne|ticket to ride|pandemic|chinese checkers|mancala|pictionary|candy land|operation|stratego|mahjong|parcheesi|pachisi|carrom|game of life=the game of life|guess who|mouse trap|azul|codenames",
    "agricola|terraforming mars|wingspan|gloomhaven|twilight struggle|puerto rico|dominion|power grid|brass|scythe|splendor|7 wonders|dixit|patchwork|hive|tak|shogi|xiangqi|senet|nine mens morris|fanorona|hnefatafl|pente|blokus|quarto|tsuro|root|everdell|spirit island"] },
  { id: "colors", prompt: "A color", t: [
    "red|blue|green|yellow|black|white|purple|orange|pink",
    "brown|gray=grey|violet|indigo|gold|silver|maroon|navy|beige|turquoise|cyan|magenta|teal|lavender",
    "crimson|scarlet|olive|lime|coral|salmon|peach|ivory|khaki|mauve|burgundy|amber|emerald|azure|lilac|charcoal|cream|tan|mint|plum|ochre|cobalt|ruby|sapphire|rust|fuchsia|aqua",
    "vermilion|cerulean|chartreuse|puce|taupe|ecru|periwinkle|celadon|viridian|carmine|sienna|umber|gamboge|heliotrope|aquamarine|wenge|zaffre|smaragdine|xanadu|glaucous|falu red|eburnean|titian|cinnabar|byzantium|saffron|sepia|mulberry|razzmatazz"] },
  { id: "greekgods", prompt: "A god or goddess from Greek mythology", t: [
    "zeus|poseidon|hades|athena|aphrodite|apollo",
    "ares|hermes|hera|artemis|demeter|dionysus|hephaestus|eros|nike|persephone|hestia",
    "gaia|cronus=kronos|rhea|uranus|helios|selene|eos|pan|hecate|nemesis|hypnos|thanatos|iris|hebe|tyche|morpheus|asclepius|nyx|chaos|prometheus|atlas|themis",
    "erebus|aether|hemera|tartarus|pontus|oceanus|tethys|hyperion|theia|coeus|phoebe|mnemosyne|crius|iapetus|leto|metis|dione|eileithyia|enyo|deimos|phobos|harmonia|nereus|triton|proteus|aeolus|boreas|zephyrus|notus|eurus|aidos|eris|momus|plutus|priapus|hymen|ganymede"] },
  { id: "cats", prompt: "A breed of cat", t: [
    "persian|siamese|maine coon",
    "bengal|sphynx|ragdoll|british shorthair|scottish fold|russian blue|abyssinian|burmese",
    "birman|himalayan|savannah|norwegian forest cat|exotic shorthair|devon rex|cornish rex|american shorthair|oriental shorthair|tonkinese|manx|siberian|turkish angora|egyptian mau|bombay|ragamuffin|balinese",
    "chartreux|korat|singapura|somali|ocicat|lykoi|laperm|selkirk rex|havana brown|turkish van|toyger|pixiebob|nebelung|chausie|khao manee|sokoke|munchkin|peterbald|donskoy|kurilian bobtail|japanese bobtail|american curl|snowshoe|serengeti"] },
  { id: "olympics", prompt: "A sport at the Summer Olympics", t: [
    "swimming|athletics=track and field|gymnastics|basketball|football=soccer|tennis",
    "boxing|cycling|volleyball|wrestling|diving|rowing|archery|fencing|hockey=field hockey|weightlifting|judo|badminton|table tennis=ping pong|golf|shooting|rugby=rugby sevens|sailing|surfing|skateboarding",
    "equestrian|triathlon|taekwondo|handball|water polo|canoeing=kayaking|beach volleyball|karate|sport climbing=climbing|marathon|baseball|softball|breaking=breakdancing",
    "modern pentathlon|artistic swimming=synchronized swimming|trampoline|bmx|rhythmic gymnastics|marathon swimming|keirin|madison|omnium|repechage|lacrosse|cricket|squash|flag football"] },
  { id: "spices", prompt: "A spice or herb", t: [
    "salt|pepper=black pepper|cinnamon|turmeric|cumin|basil|garlic|ginger|chili=chilli",
    "oregano|rosemary|thyme|mint|parsley|coriander=cilantro|cardamom|clove|nutmeg|paprika|saffron|vanilla|mustard|dill|bay leaf|fennel",
    "sage|tarragon|chives|star anise|fenugreek=methi|asafoetida=hing|allspice|mace|sumac|marjoram|curry leaf|lemongrass|caraway|nigella=kalonji|ajwain=carom|anise|juniper",
    "galangal|grains of paradise|annatto|epazote|lovage|savory|chervil|sorrel|borage|hyssop|mahlab|amchur|long pepper|cubeb|kokum|anardana|kasuri methi|perilla=shiso|sichuan pepper|zaatar|wasabi|horseradish|tonka|stone flower|marathi moggu"] },
  { id: "cheese", prompt: "A type of cheese", t: [
    "cheddar|mozzarella|parmesan|swiss|brie",
    "gouda|feta|blue cheese|cream cheese|cottage cheese|paneer|camembert|ricotta|provolone|monterey jack|colby|american|pepper jack|goat cheese",
    "gruyere|emmental|manchego|roquefort|gorgonzola|stilton|edam|halloumi|mascarpone|pecorino|havarti|munster|asiago|burrata|fontina|jarlsberg|queso fresco|boursin|limburger",
    "comte|raclette|taleggio|epoisses|reblochon|tomme|morbier|wensleydale|caerphilly|leicester|lancashire|cotija|oaxaca|chhena|kalari|bandel|casu marzu|mimolette|vacherin|appenzeller|tete de moine|mysost|brunost|graviera|kefalotyri|scamorza|stracchino|cheshire|bryndza"] },
  { id: "gems", prompt: "A gemstone", t: [
    "diamond|ruby|emerald|sapphire",
    "pearl|amethyst|topaz|opal|jade|garnet|turquoise|aquamarine",
    "onyx|peridot|tanzanite|citrine|moonstone|lapis lazuli|agate|tourmaline|zircon|jasper|coral|amber|quartz|obsidian|malachite|alexandrite",
    "spinel|beryl|chrysoberyl|kunzite|morganite|iolite|sunstone|labradorite|tiger eye=tigers eye|carnelian|bloodstone|chalcedony|chrysoprase|rhodochrosite|sodalite|sphene|benitoite|painite|taaffeite|jet|larimar|serpentine|diopside|andalusite|hiddenite"] },
  { id: "dinosaurs", prompt: "A dinosaur", t: [
    "t rex=tyrannosaurus=tyrannosaurus rex|triceratops|velociraptor|stegosaurus",
    "brachiosaurus|brontosaurus|spinosaurus|ankylosaurus|diplodocus|pterodactyl|allosaurus|parasaurolophus",
    "iguanodon|pachycephalosaurus|gallimimus|dilophosaurus|carnotaurus|giganotosaurus|apatosaurus|deinonychus|compsognathus|archaeopteryx|therizinosaurus|baryonyx|mosasaurus|plesiosaurus|argentinosaurus|oviraptor|protoceratops|maiasaura",
    "microraptor|utahraptor|sinosauropteryx|amargasaurus|edmontosaurus|corythosaurus|kentrosaurus|styracosaurus|pachyrhinosaurus|ouranosaurus|suchomimus|irritator|tarbosaurus|albertosaurus|ceratosaurus|herrerasaurus|eoraptor|coelophysis|psittacosaurus|nodosaurus|minmi|rajasaurus|isisaurus|barapasaurus|dreadnoughtus|patagotitan|yutyrannus|concavenator"] },
  { id: "bones", prompt: "A bone in the human body", t: [
    "skull|femur|rib|spine",
    "tibia|fibula|humerus|radius|ulna|pelvis|jaw=mandible|collarbone=clavicle|kneecap=patella|vertebra|shoulder blade=scapula|sternum=breastbone",
    "coccyx=tailbone|sacrum|cranium|maxilla|carpals|metacarpals|tarsals|metatarsals|phalanges|hip bone|ilium|ischium|pubis|hyoid|stapes|incus|malleus|zygomatic|cheekbone",
    "scaphoid|lunate|triquetrum|pisiform|trapezium|trapezoid|capitate|hamate|talus|calcaneus|navicular|cuboid|cuneiform|sphenoid|ethmoid|vomer|lacrimal|palatine|nasal|occipital|parietal|temporal|frontal|atlas|axis|sesamoid"] },
  { id: "oceans", prompt: "An ocean or sea", t: [
    "pacific|atlantic|indian|arctic",
    "mediterranean|southern|caribbean|red sea|dead sea|black sea|arabian sea|north sea|caspian",
    "baltic|south china sea|bering|adriatic|aegean|coral sea|tasman|sea of japan|yellow sea|bay of bengal|gulf of mexico|andaman|irish sea|java sea|laccadive",
    "sargasso|weddell|ross|barents|kara|laptev|beaufort|chukchi|ligurian|tyrrhenian|ionian|marmara|azov|celebes|sulu|banda|arafura|timor|labrador|norwegian|white sea|sea of okhotsk|east china sea|philippine|scotia|alboran|balearic|bismarck|solomon"] },
  { id: "trees", prompt: "A tree", t: [
    "oak|pine|maple|palm|apple|mango",
    "birch|willow|cedar|spruce|redwood|elm|banyan|neem|coconut|cherry|eucalyptus|bamboo|fir|ash|teak|christmas tree",
    "sequoia|cypress|beech|poplar|aspen|sycamore|chestnut|walnut|magnolia|baobab|juniper|hemlock|larch|olive|hickory|peepal=pipal|sandalwood|sal|tamarind|gulmohar|cottonwood|mahogany|ebony",
    "ginkgo|yew|hawthorn|rowan|alder|hornbeam|linden|catalpa|jacaranda|dragon tree|joshua tree|kapok|ironwood|sassafras|tupelo|buckeye|paulownia|arjun|ashoka|deodar|khejri|kadamba|jamun|amaltas|silk cotton|frangipani|monkey puzzle|wollemi pine|bristlecone pine"] },
  { id: "pasta", prompt: "A type of pasta", t: [
    "spaghetti|macaroni|penne|lasagna=lasagne",
    "fettuccine|ravioli|linguine|rigatoni|fusilli|farfalle=bow tie|tortellini|angel hair=capellini|rotini|gnocchi|ziti|shells=conchiglie|noodles",
    "orzo|cannelloni|manicotti|orecchiette|pappardelle|tagliatelle|bucatini|ditalini|vermicelli|gemelli|cavatappi|radiatori|campanelle|paccheri|mafalde",
    "strozzapreti|trofie|casarecce|pici|bigoli|cavatelli|malloreddus|lumache|fregola|corzetti|garganelli|stelline|anelli|agnolotti|cappelletti|mezzelune|sacchetti|lorighittas|busiate|gigli|tortiglioni|calamarata|scialatielli|maltagliati|culurgiones"] },
  { id: "currency", prompt: "A currency", t: [
    "dollar|euro|pound|yen|rupee",
    "yuan=renminbi|peso|franc|ruble=rouble|won|real|dinar|lira|rand|krona|bitcoin",
    "dirham|riyal|baht|ringgit|krone|zloty|forint|shekel|rupiah|dong|taka|naira|shilling|koruna|lev|leu|kuna|hryvnia|tenge|lari",
    "dram|manat|som|somoni|kip|riel|kyat|ngultrum|afghani|ariary|kwacha|kwanza|cedi|dalasi|birr|nakfa|loti|lilangeni|pula|metical|ouguiya|leone|gourde|cordoba|colon|quetzal|lempira|balboa|bolivar|guarani|sol|boliviano|tala|pa anga|vatu|kina|rufiyaa|denar|mark"] },
  { id: "presidents", prompt: "A president of the United States", t: [
    "washington|lincoln|obama|trump|biden|kennedy",
    "jefferson|roosevelt|reagan|clinton|bush|nixon|carter|adams|eisenhower|truman",
    "madison|monroe|jackson|grant|wilson|johnson|ford|hoover|coolidge|taft|mckinley|polk",
    "van buren|harrison|tyler|taylor|fillmore|pierce|buchanan|hayes|garfield|arthur|cleveland|harding"] },
  { id: "indiastates", prompt: "A state or union territory of India", t: [
    "karnataka|maharashtra|kerala|tamil nadu|delhi|goa|punjab|gujarat",
    "rajasthan|uttar pradesh|west bengal|andhra pradesh|telangana|bihar|madhya pradesh|kashmir=jammu and kashmir|haryana|odisha=orissa|assam",
    "himachal pradesh|uttarakhand|jharkhand|chhattisgarh|sikkim|meghalaya|manipur|nagaland|tripura|mizoram|arunachal pradesh|chandigarh|puducherry=pondicherry|ladakh",
    "lakshadweep|andaman and nicobar islands=andaman and nicobar|dadra and nagar haveli and daman and diu=daman and diu|dadra and nagar haveli"] },
  { id: "flowers", prompt: "A flower", t: [
    "rose|sunflower|tulip|lily|daisy|lotus",
    "orchid|jasmine|marigold|lavender|daffodil|hibiscus|lilac|carnation|dandelion|chrysanthemum|poppy|iris|violet|peony|magnolia",
    "dahlia|gardenia|petunia|begonia|camellia|azalea|hydrangea|zinnia|aster|geranium|bluebell|buttercup|snapdragon|foxglove|morning glory|freesia|gerbera|anemone|bougainvillea|frangipani=plumeria|lily of the valley|crocus",
    "hellebore|ranunculus|protea|amaryllis|calendula|cosmos|edelweiss|primrose|wisteria|clematis|honeysuckle|bird of paradise|anthurium|lisianthus|alstroemeria|delphinium|larkspur|gladiolus|hyacinth|sweet pea|forget me not|verbena|stephanotis|parijat|neelakurinji|kanakambaram|corpse flower|rafflesia"] },
  { id: "seamammals", prompt: "A mammal that lives in the sea", t: [
    "whale|dolphin|seal|blue whale",
    "orca=killer whale|sea lion|walrus|humpback whale|sea otter|manatee|porpoise|sperm whale|polar bear",
    "narwhal|beluga|dugong|elephant seal|fur seal|gray whale|minke whale|fin whale|bottlenose dolphin|leopard seal|right whale|pilot whale",
    "bowhead whale|sei whale|brydes whale|vaquita|beaked whale|cuvier|monk seal|harp seal|hooded seal|crabeater seal|weddell seal|ross seal|ringed seal|bearded seal|steller sea lion|spinner dolphin|irrawaddy dolphin|hectors dolphin|rissos dolphin|false killer whale|melon headed whale|pygmy sperm whale|dwarf sperm whale|steller sea cow"] },
  { id: "constellations", prompt: "A constellation", t: [
    "orion|big dipper|ursa major|little dipper|ursa minor",
    "scorpius=scorpio|leo|taurus|cassiopeia|gemini|aries|cancer|virgo|libra|sagittarius|capricornus=capricorn|aquarius|pisces|southern cross=crux",
    "andromeda|pegasus|perseus|cygnus|draco|lyra|aquila|hercules|centaurus|canis major|canis minor|bootes|cepheus|auriga|ophiuchus|corona borealis",
    "monoceros|camelopardalis|lynx|vulpecula|sagitta|delphinus|equuleus|lacerta|triangulum|columba|lepus|eridanus|fornax|sculptor|phoenix|grus|tucana|hydra|hydrus|pavo|indus|octans|chamaeleon|volans|pictor|dorado|reticulum|horologium|caelum|puppis|vela|carina|pyxis|antlia|sextans|crater|corvus|lupus|norma|ara|telescopium|microscopium|mensa|musca|circinus|apus|coma berenices|canes venatici|leo minor"] },
  { id: "breads", prompt: "A type of bread", t: [
    "naan|roti|baguette|sourdough|bagel|pita",
    "croissant|ciabatta|rye|brioche|focaccia|tortilla|paratha|chapati|cornbread|white bread|whole wheat|pretzel|garlic bread|bun|muffin",
    "challah|pumpernickel|kulcha|puri|bhatura|appam|dosa|english muffin|soda bread|lavash|flatbread|crumpet|scone|biscuit|bao|matzo|injera",
    "pandesal|pane carasau|fougasse|stollen|panettone|pain de mie|kaiser roll|bialy|arepa|pupusa|roti canai|luchi|sheermal|bakarkhani|taftan|khakhra|thepla|bhakri|missi roti|pao=pav|lagana|simit|tsoureki|barmbrack|vinsch|anpan|melonpan|naan khatai"] },
  { id: "carbrands", prompt: "A car brand", t: [
    "toyota|honda|ford|bmw|tesla|mercedes=mercedes benz",
    "audi|chevrolet=chevy|nissan|hyundai|volkswagen=vw|kia|ferrari|porsche|lamborghini|jeep|subaru|mazda|lexus|volvo|suzuki=maruti suzuki=maruti|tata|mahindra",
    "jaguar|land rover|range rover|bentley|rolls royce|maserati|aston martin|bugatti|mclaren|cadillac|dodge|chrysler|buick|gmc|lincoln|acura|infiniti|mini|fiat|peugeot|renault|citroen|skoda|mitsubishi|alfa romeo|rivian|lucid|polestar",
    "koenigsegg|pagani|lotus|saab|seat|cupra|dacia|opel|vauxhall|lancia|genesis|byd|geely|nio|xpeng|chery|great wall|proton|perodua|holden|pontiac|oldsmobile|plymouth|saturn|hummer|delorean|trabant|lada|hindustan|ambassador|premier|morgan|tvr|noble|rimac|spyker"] },
  { id: "indianlang", prompt: "A language spoken in India", t: [
    "hindi|english|tamil|telugu|kannada|bengali",
    "malayalam|marathi|gujarati|punjabi|urdu|odia=oriya|sanskrit|assamese",
    "konkani|tulu|kashmiri|sindhi|nepali|manipuri=meitei|bodo|santali|maithili|dogri|bhojpuri|rajasthani|marwari|haryanvi",
    "kodava|badaga|toda|kurukh|gondi|bhili|khasi|garo|mizo|nagamese|ladakhi|lepcha|bhutia|mundari|ho|sora|kui|awadhi|bundeli|chhattisgarhi|magahi|angika|garhwali|kumaoni|saurashtra|beary|halbi|byari"] },
  { id: "units", prompt: "A unit of measurement", t: [
    "meter=metre|kilogram|second|inch|foot|mile|liter=litre|gram",
    "centimeter|kilometer|pound|ounce|gallon|yard|hour|minute|degree|celsius|fahrenheit|watt|volt|ton=tonne|acre|millimeter",
    "ampere|kelvin|joule|newton|hertz|pascal|calorie|byte|bit|hectare|pint|quart|cup|teaspoon|tablespoon|knot|light year|horsepower|ohm|mole|candela|decibel",
    "fathom|furlong|league|parsec|angstrom|coulomb|farad|henry|tesla|weber|siemens|lumen|lux|becquerel|gray|sievert|katal|dram|grain|stone|chain|rod|cubit|span|bushel|peck|carat|barrel|erg|dyne|torr|bar|gauss|maxwell|slug|poise|stokes|tola|seer|maund|bigha|gunta|cent"] },
  { id: "japanesefood", prompt: "A Japanese food", t: [
    "sushi|ramen|tempura|miso soup=miso",
    "sashimi|udon|soba|teriyaki|edamame|tofu|wasabi|mochi|katsu|bento|onigiri|gyoza|matcha|yakitori|sake",
    "okonomiyaki|takoyaki|tonkatsu|donburi|katsudon|gyudon|oyakodon|nigiri|maki|natto|unagi|shabu shabu|sukiyaki|dorayaki|taiyaki|dango|karaage|curry rice|omurice|tamagoyaki|furikake|nori|dashi|ponzu",
    "chawanmushi|oden|nikujaga|hiyayakko|agedashi tofu|chirashi|kaiseki|yakisoba|tsukemen|monjayaki|kushikatsu|tsukemono|umeboshi|takuan|kinpira|hijiki|kakigori|anmitsu|wagashi|yokan|daifuku|warabimochi|zaru soba|ochazuke|sekihan|okayu|katsuobushi|shirasu|mentaiko|ikura|uni|fugu|basashi|motsunabe|horumon|imagawayaki|senbei"] },
  { id: "shapes", prompt: "A geometric shape", t: [
    "circle|square|triangle|rectangle",
    "pentagon|hexagon|oval|star|heart|diamond|octagon|cube|sphere|cone|cylinder|pyramid|rhombus",
    "trapezoid=trapezium|parallelogram|ellipse|heptagon|nonagon|decagon|crescent|kite|prism|cuboid|tetrahedron|octahedron|torus|semicircle|polygon",
    "dodecahedron|icosahedron|hendecagon|dodecagon|annulus|lune|deltoid|cardioid|astroid|lemniscate|reuleaux triangle|rhombicuboctahedron|frustum|paraboloid|hyperboloid|ellipsoid|helix|mobius strip|klein bottle|trefoil|tesseract|apeirogon|chiliagon|myriagon|gnomon|arbelos|vesica piscis|annular"] },
  { id: "martialarts", prompt: "A martial art", t: [
    "karate|kung fu|judo|taekwondo|boxing",
    "jiu jitsu=brazilian jiu jitsu=bjj|muay thai|kickboxing|wrestling|aikido|mma=mixed martial arts|kalaripayattu|tai chi|wing chun|sumo|krav maga|fencing",
    "capoeira|kendo|hapkido|sambo|silat|savate|jeet kune do|kenpo|escrima=arnis=kali|kyokushin|sanda|gatka|silambam|kushti|ninjutsu",
    "bartitsu|bokator|lethwei|pradal serey|krabi krabong|systema|glima|pankration|shuai jiao|baguazhang|xingyiquan|hung gar|choy li fut|iaido|kyudo|naginatajutsu|sojutsu|tessenjutsu|shorinji kempo|dambe|laamb|kalari|mardani khel|thang ta|varma kalai|sqay|malla yuddha"] },
  { id: "rivers", prompt: "A river", t: [
    "nile|amazon|ganges=ganga|mississippi|thames",
    "yangtze|danube|rhine|seine|hudson|colorado|indus|brahmaputra|yamuna|kaveri=cauvery|volga|tigris|euphrates|mekong|jordan",
    "zambezi|congo|niger|godavari|krishna|narmada|tapti|mahanadi|missouri|ohio|columbia|rio grande|yukon|mackenzie|st lawrence|loire|elbe|po|tiber|ob|lena|yenisei|amur|yellow river=huang he|irrawaddy|murray|darling|orinoco|parana",
    "sutlej|beas|ravi|chenab|jhelum|sabarmati|tungabhadra|sharavathi|netravati|periyar|pamba|vaigai|tamirabarani|hooghly|teesta|damodar|chambal|betwa|son|gandak|kosi|ghaghara|limpopo|orange|okavango|ural|dnieper|dniester|vistula|oder|douro|tagus|ebro|shannon|severn|tyne|tweed|liffey|potomac|delaware|snake|platte|fraser|salween|chao phraya|red river|pearl"] },
  { id: "indiandish", prompt: "An Indian dish", t: [
    "biryani|butter chicken|dosa|idli|samosa|paneer tikka|dal",
    "chole bhature|rajma|palak paneer|naan|vada|pav bhaji|masala dosa|tandoori chicken|korma|vindaloo|pani puri=golgappa|dhokla|upma|poha|pulao|kheer|gulab jamun|jalebi|aloo paratha|khichdi",
    "rogan josh|malai kofta|dal makhani|bisi bele bath|pongal|uttapam|appam|puttu|avial|sambar|rasam|vada pav|misal pav|kachori|pakora|aloo gobi|baingan bharta|chicken 65|nihari|haleem|kathi roll|momos|thukpa|litti chokha|undhiyu|thepla|dum aloo|sarson ka saag|makki di roti",
    "ragi mudde|neer dosa|kori rotti|akki rotti|mangalore buns|goli baje|kosambari|chitranna|vangi bath|puliyogare|maddur vada|mysore pak|dharwad peda|kesari bath|kozhukattai|kuzhi paniyaram|idiyappam|ishtu|thalassery biryani|chemmeen curry|karimeen pollichathu|sorpotel|xacuti|bebinca|patra|handvo|dal baati churma|gatte ki sabzi|ker sangri|laal maas|galouti kebab|sheer khurma|chingri malai curry|shorshe ilish|kosha mangsho|pitha|dalma|chhena poda|masor tenga|eromba|jadoh|bamboo shoot curry|sel roti|gundruk"] },
  { id: "southamerica", prompt: "A country in South America", t: [
    "brazil|argentina",
    "colombia|peru|chile|venezuela",
    "ecuador|bolivia|uruguay|paraguay",
    "guyana|suriname|french guiana"] },
  { id: "asia", prompt: "A country in Asia", t: [
    "india|china|japan|south korea=korea|thailand|pakistan",
    "indonesia|vietnam|singapore|malaysia|philippines|nepal|sri lanka|bangladesh|iran|iraq|saudi arabia|israel|turkey|afghanistan|north korea|uae=united arab emirates",
    "myanmar=burma|cambodia|laos|mongolia|bhutan|maldives|taiwan|kazakhstan|uzbekistan|qatar|kuwait|oman|jordan|lebanon|syria|yemen|bahrain|russia",
    "brunei|timor leste=east timor|kyrgyzstan|tajikistan|turkmenistan|armenia|azerbaijan|georgia|cyprus|palestine"] },
];
