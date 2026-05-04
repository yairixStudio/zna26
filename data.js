// נתוני האומנים של ZNA Gathering 2026
// פסטיבל גואה טראנס רטרו-פוטוריסטי, 15-22 ביולי 2026, ים מונטרגיל, פורטוגל

const FESTIVAL = {
  name: "ZNA Gathering 2026",
  tagline: "The Retro-Futuristic Celebration",
  dates: "15-22 ביולי 2026",
  location: "ים מונטרגיל, פורטוגל",
  description: "המקדש העולמי של גואה טראנס בסגנון הישן. פסטיבל דו-שנתי עם כ-5,000 משתתפים בלבד שחוגג את רוח אנג'ונה של שנות ה-90.",
  stages: [
    { id: "retro", name: "Retro Universe", desc: "במה ראשית - גואה טראנס קלאסי" },
    { id: "zambu", name: "Zambu Temple", desc: "מקדש הריקודים - 24 שעות פסיכדליה רצופות" },
    { id: "guardians", name: "Goa Guardians", desc: "במת הוויניל - שומרי הסאונד הישן" },
    { id: "market", name: "Market", desc: "במת חימום ושוק" }
  ]
};

const ARTISTS = [
  {
    id: "yahel",
    name: "Yahel",
    realName: "יהל שרמן",
    country: "🇮🇱 ישראל",
    age: 49,
    born: "12.5.1976",
    stage: "retro",
    role: "Live",
    tags: ["Goa Trance", "Psytrance", "Israeli Trance"],
    color: "#ff5c8a",
    bio: "יהל שרמן, מהיוצרים האהובים בסצנת הטראנס הישראלית. החל ל-DJ בגיל 14 ויצר בשנות ה-90 רגעי טראנס אופוריים עם מלודיות שהפכו לאלמותיות. סוגר ב-ZNA את 24 השעות של מקדש זמבו - חוויית שיא של הפסטיבל.",
    notable: "חתום על הוצאת HOMmega האגדית של אייל ינקוביץ' המנוח",
    albums: [
      { name: "Waves of Sound", year: 2002 },
      { name: "For The People", year: 2004 },
      { name: "Private Collection", year: 2009 },
      { name: "Super Set", year: 2018 }
    ],
    links: [
      { type: "Spotify", url: "https://open.spotify.com/artist/1QqxPdbBp2hsHuKCDDCOL5" },
      { type: "Bandcamp", url: "https://hommega.bandcamp.com/" },
      { type: "Discogs", url: "https://www.discogs.com/artist/13834-Yahel" }
    ],
    tracks: [
      { id: "KCbcjoHmSJc", title: "Voyage (with Eyal Barkan)", year: 2000 },
      { id: "dOfoHoVmPBQ", title: "For The People", year: 2001 },
      { id: "cqj25UxWKlQ", title: "For The People (Full Album)", year: 2001 }
    ]
  },
  {
    id: "tsuyoshi-suzuki",
    name: "Tsuyoshi Suzuki",
    realName: "צויושי סוזוקי",
    country: "🇯🇵 יפן (לונדון)",
    age: 59,
    born: "1967",
    stage: "retro",
    role: "DJ Set",
    tags: ["Goa Trance", "Pioneer", "Matsuri"],
    color: "#ff7e1f",
    bio: "סמוראי פסיכדלי מארץ השמש העולה. אגדה חיה של גואה טראנס - עבר ללונדון ב-1992 והקים את ההוצאה Matsuri Productions שהפכה לאחת המשפיעות בתולדות הז'אנר. ניגן במסיבות Return To The Source ההיסטוריות וחזר להקים את Matsuri Digital ב-2009 כדי לקדם את הסאונד לדור החדש.",
    notable: "מייסד Matsuri Productions / Matsuri Digital, חבר בלהקת Prana",
    albums: [
      { name: "Geomantik", year: 1995, project: "Prana" },
      { name: "Cyclone", year: 1997, project: "Prana" },
      { name: "Future Tense", year: 1995, project: "Joujouka" }
    ],
    links: [
      { type: "Spotify", url: "https://open.spotify.com/artist/6FPDZzGbAgGNYUZgj0QozQ" },
      { type: "Website", url: "https://matsuri-digital.com/en/artist/tsuyoshi-suzuki/" },
      { type: "Resident Advisor", url: "https://ra.co/dj/tsuyoshi" }
    ],
    tracks: [
      { id: "MFd7_zTci_g", title: "Prana - Geomantik", year: 1997 },
      { id: "Oo9lag7Bz5o", title: "Prana - Geomantik (Full Album)", year: 1997 },
      { id: "BkvxkraxaNU", title: "Tsuyoshi Suzuki @ ZNA Gathering 2022", year: 2022 }
    ]
  },
  {
    id: "kris-kylven",
    name: "Kris Kylven",
    realName: "כריס קילבן (\"הנסיך האפל\")",
    country: "🇸🇪 שוודיה / 🇫🇷 צרפת",
    age: null,
    born: "פעיל מ-1995",
    stage: "retro",
    role: "Live",
    tags: ["UX", "Goa Pioneer", "Syb Unity Nettwerk"],
    color: "#9b51e0",
    bio: "מפיק, מלחין, מתופף אלקטרוני וויז'ואל ארטיסט. ב-1995 הפך לחלוץ של גואה טראנס עם פרויקטים מיתולוגיים: Syb Unity Nettwerk, UX (יחד עם פיט מרטין), Element Over Nature ו-Odds. ב-ZNA יוצר את המעבר השמיימי בין לילה ליום עם הסאונד הקלאסי שעיצב בלונדון של אמצע שנות ה-90.",
    notable: "אחד מאבות הז'אנר. חתום על Transient, Flying Rhino, Sirius",
    albums: [
      { name: "Ultimate Experience", year: 1996, project: "UX" },
      { name: "Goa Years (Singles & Selected Works)", year: 2021, project: "Syb Unity Nettwerk" }
    ],
    links: [
      { type: "Bandcamp", url: "https://kriskylven.bandcamp.com/" },
      { type: "LinkedIn", url: "https://www.linkedin.com/in/kylven/" }
    ],
    tracks: [
      { id: "z6OI0HnDprs", title: "Syb Unity Nettwerk - Goa Years", year: 2021 }
    ]
  },
  {
    id: "simon-ghahary",
    name: "Simon Ghahary",
    realName: "סיימון גהארי",
    country: "🇬🇧 בריטניה",
    age: 53,
    born: "12.5.1972",
    stage: "guardians",
    role: "Vinyl Set",
    tags: ["Blue Room Released", "Founder", "Curator"],
    color: "#00d4ff",
    bio: "כוח אדיר ומשפיע בסצנת המוזיקה הפסיכדלית של שנות ה-90. ייסד ב-1994 את ה-label המיתולוגית Blue Room Released בלונדון ששינתה את פני גואה טראנס. תחת חסותו יצאו אלבומים פורצי דרך של Juno Reactor, Total Eclipse, Koxbox, X-Dream וסאפי בראדרס. הביא רעננות וניסיונות חדשים שהובילו את הז'אנר אל מעבר ל'גואה הקלאסי'.",
    notable: "מייסד Blue Room Released - אחת ההוצאות החשובות בתולדות פסיטראנס",
    albums: [
      { name: "Blue Room compilations", year: "1994-2002", project: "Curated" }
    ],
    links: [
      { type: "Wikipedia", url: "https://en.wikipedia.org/wiki/Simon_Ghahary" },
      { type: "Discogs", url: "https://www.discogs.com/label/2828-Blue-Room-Released" }
    ],
    tracks: [
      { id: "deha9cXsAUo", title: "Essential Guide To Blue Room Released (1995-1998)", year: 1998 }
    ]
  },
  {
    id: "ray-castle",
    name: "Ray Castle",
    realName: "ריי קאסל",
    country: "🇳🇿 ניו זילנד",
    age: null,
    born: "פעיל מסוף שנות ה-60",
    stage: "guardians",
    role: "DJ Set",
    tags: ["Goa Pioneer", "Anjuna 1987", "Insectoid"],
    color: "#ffd23f",
    bio: "מאז 1987 אחד ה-DJs המשפיעים ביותר במסיבות גואה הראשונות בהודו - שילב האוס, ברייקס, דאב, טכנו ורוק לסאונד היברידי שממנו נולד גואה פסיטראנס בתחילת שנות ה-90. הביא את רעיון מסיבות החוץ ליפן ב-1988 ונחשב לאחד ממתקיני סצנת הטראנס באוסטרליה.",
    notable: "פרויקטים: Rhythmystic, Masaray, Insectoid, Mantaray. מחבר 'Moon Juice Stomper'",
    albums: [
      { name: "Insectoid - Groovestasy", year: 1998, project: "Insectoid" },
      { name: "Various live mixes", year: "1988-2024" }
    ],
    links: [
      { type: "Skypeople", url: "https://skypeoplemusic.com/ray-castle/" },
      { type: "Discogs", url: "https://www.discogs.com/artist/30879-Ray-Castle" }
    ]
  },
  {
    id: "robert-leiner",
    name: "Robert Leiner",
    realName: "רוברט ליינר (The Source Experience)",
    country: "🇸🇪 שוודיה",
    age: 59,
    born: "1.8.1966",
    stage: "retro",
    role: "Live Modular",
    tags: ["R&S Records", "Acid Techno", "The Source Experience"],
    color: "#39ff14",
    bio: "אגדה שוודית ששינתה את פני הטכנו האירופי. שחרר ב-R&S Records הבלגית האגדית בתחילת שנות ה-90 והוציא יצירות מופת של אסיד טכנו וטראנס. כיום מבסיסו בגטבורג מנגן סטים מודולריים חיים שמערבבים אמביינט חמים עם טכנו עמוק.",
    notable: "אלבום הביכורים 'Organized Noise' - מופת של אסיד טכנו טהור",
    albums: [
      { name: "Organized Noise", year: 1993, project: "Source" },
      { name: "Visions of the Past", year: 1995 },
      { name: "Different Journeys", year: 1994, project: "The Source Experience" }
    ],
    links: [
      { type: "Bandcamp", url: "https://robertleiner.bandcamp.com/" },
      { type: "Resident Advisor", url: "https://ra.co/dj/robertleiner" }
    ],
    tracks: [
      { id: "LznhsMP1AnA", title: "Robert Leiner aka The Source Experience - Modular Live", year: 2016 }
    ]
  },
  {
    id: "sean-williams",
    name: "Sean Williams",
    realName: "שון ויליאמס (Process / Satori)",
    country: "🇬🇧 בריטניה",
    age: null,
    born: "פעיל משנות ה-90",
    stage: "zambu",
    role: "DJ Set",
    tags: ["Process", "Satori", "Beast"],
    color: "#ff006e",
    bio: "הכוח היצירתי מאחורי הפרויקטים האהובים Process ו-Satori. מאבות גואה טראנס שעיצב את התפתחות הז'אנר עם נופי קול חדשניים. עבד בסטודיו עם James Monro, סיימון פוסקסורד (Hallucinogen), Tristan וצויושי סוזוקי. חבר גם בפרויקט Beast עם Hallucinogen.",
    notable: "Satori יחד עם Pete Martin - מהפרויקטים האייקוניים של גואה",
    albums: [
      { name: "Tales of the Inexpressible-era tracks", year: "1996-2000", project: "Process" },
      { name: "Various Satori releases", year: "1996-1999", project: "Satori" }
    ],
    links: [
      { type: "Discogs", url: "https://www.discogs.com/artist/66276-Sean-Williams" },
      { type: "Last.fm", url: "https://www.last.fm/music/Process" }
    ],
    tracks: [
      { id: "jSqrnWIRvl4", title: "Satori - Entropy", year: 1997 }
    ]
  },
  {
    id: "james-monro",
    name: "James Monro",
    realName: "ג'יימס מונרו",
    country: "🇬🇧 בריטניה / 🇧🇷 ברזיל",
    age: null,
    born: "פעיל מ-1988",
    stage: "retro",
    role: "Live",
    tags: ["Flying Rhino", "Founder", "Bumbling Loons"],
    color: "#fb5607",
    bio: "ממייסדי ה-label האגדית Flying Rhino Records (1995). עבר את הימים הראשונים של אסיד האוס וגלי הקיץ של 88-89, חופי גואה בתחילת שנות ה-90 ועד למעגל הפסטיבלים העולמי. מאות שחרורים לזכותו - יוצר פורה עם נגיעה פסיכדלית בכל הסגנונות.",
    notable: "Flying Rhino Records - בית של פסיטראנס בריטי בשנות ה-90",
    albums: [
      { name: "The James Monro Collection", year: 2017 },
      { name: "Bumbling Loons - Rumbling Toon EP", year: 1999, project: "Bumbling Loons" }
    ],
    links: [
      { type: "Bandcamp", url: "https://nanorecords.bandcamp.com/album/the-james-monro-collection" },
      { type: "Beatport", url: "https://www.beatport.com/artist/james-monro/35028" }
    ],
    tracks: [
      { id: "hB9lYBllghc", title: "James Monro (Flying Rhino) Mix 1995", year: 1995 },
      { id: "-fD7XL6AswY", title: "The James Monro Collection Mix", year: 2017 }
    ]
  },
  {
    id: "joti-sidhu",
    name: "Joti Sidhu",
    realName: "ג'וטי סידהו (Psychaos)",
    country: "🇬🇧 בריטניה",
    age: null,
    born: "פעיל מ-1988",
    stage: "retro",
    role: "DJ Set",
    tags: ["Psychaos", "Goa Pioneer", "Brighton"],
    color: "#ffbe0b",
    bio: "מחלוצי הפסיכדלי טראנס. אסיד האוס ב-1988 משך אותו לעולם המוזיקה האלקטרונית, והחל ל-DJ בברייטון בגיל 17. ב-1993 הפיק ויצר את Ayahuasca עם Steve Ronan ו-Dino Psaras, וב-1994 הקים את הפרויקט הסולו Psychaos שהשפיע עמוקות על סצנת גואה ופסיטראנס שאחריה.",
    notable: "Psychaos - אחד הפרויקטים המוערכים של גואה הקלאסי",
    albums: [
      { name: "Psychaos", year: 1995, project: "Psychaos" },
      { name: "Frag-mentos / Circle", year: 2020, project: "Psychaos" }
    ],
    links: [
      { type: "Website", url: "http://www.jotisidhu.com/" },
      { type: "Spotify", url: "https://open.spotify.com/artist/1DNW3o2lZhRQNcDYHXa9xx" }
    ],
    tracks: []
  },
  {
    id: "extrawelt",
    name: "Extrawelt",
    realName: "ארנה שאפהאוזן + ויאן ראבה",
    country: "🇩🇪 גרמניה",
    age: null,
    born: "פעילים מ-2005",
    stage: "retro",
    role: "Live",
    tags: ["Minimal Techno", "Border Community", "Cocoon"],
    color: "#3a86ff",
    bio: "דואו מהמבורג שהתחיל ב-2000 כ-Midi Miliz בפסיטראנס, ומ-2005 פורץ עם Extrawelt לטכנו מינימלי שנמכר ב-Border Community של ג'יימס הולדן ובחותמות העילית. הסט שלהם ב-ZNA חוצה גבולות בין רטרו לפוטוריסטי.",
    notable: "Soopertrack - הסינגל שהוציא אותם בענק תחת חותמת James Holden",
    albums: [
      { name: "Schöne Neue Extrawelt", year: 2008 },
      { name: "In Aufruhr", year: 2011 },
      { name: "Fear Of An Extra Planet", year: 2017 },
      { name: "Unknown", year: 2018 }
    ],
    links: [
      { type: "Website", url: "https://www.extrawelt.com/" },
      { type: "Resident Advisor", url: "https://ra.co/dj/extrawelt" }
    ],
    tracks: [
      { id: "sdl7PZmlGQI", title: "Soopertrack (Original)", year: 2005 },
      { id: "X2MS0HU29JY", title: "Extrawelt - Live", year: 2018 }
    ]
  },
  {
    id: "mathew-jonson",
    name: "Mathew Jonson",
    realName: "מתיו ג'ונסון",
    country: "🇨🇦 קנדה / 🇩🇪 ברלין",
    age: null,
    born: "ונקובר",
    stage: "retro",
    role: "Live",
    tags: ["Wagon Repair", "Cobblestone Jazz", "Analog"],
    color: "#06ffa5",
    bio: "מהקולות המובהקים במוזיקת הריקוד המודרנית. נגן פסנתר קלאסי ומתופף ג'אז מילדות, ובעזרת אביו המוזיקאי הניח ידיו על סינתיסייזרים בגיל 9. ממייסדי ה-label Wagon Repair. חיבתו לציוד אנלוגי ולנגינה בזמן אמת הופכת את ההופעות שלו לחוויות חיות וייחודיות.",
    notable: "ממייסדי Wagon Repair, חבר ב-Cobblestone Jazz",
    albums: [
      { name: "Marionette", year: 2010 },
      { name: "Agents of Time", year: 2010 },
      { name: "Her Blurry Pictures", year: 2014 }
    ],
    links: [
      { type: "Resident Advisor", url: "https://ra.co/dj/mathewjonson" },
      { type: "Bandcamp", url: "https://mathewjonson.bandcamp.com/" }
    ],
    tracks: [
      { id: "daSid6Lh9Vs", title: "Marionette", year: 2005 },
      { id: "cw-8cWKSjkg", title: "Marionette (The Beginning)", year: 2010 }
    ]
  },
  {
    id: "gabriel-le-mar",
    name: "Gabriel Le Mar",
    realName: "גבריאל לה מאר (Saafi Brothers)",
    country: "🇩🇪 גרמניה",
    age: null,
    born: "פעיל מ-1993",
    stage: "zambu",
    role: "Live Dub",
    tags: ["Saafi Brothers", "Psybient", "Dub"],
    color: "#8338ec",
    bio: "מפרנקפורט. ב-1996 בעקבות מסעות בהודו הקים את Saafi Brothers עם Michael Kohlbecker ו-Groovetitan לחקור אזורי טיסה רוחניים בסביבות קלאב אקזוטיות. הסאונד שלהם - אמביינט דאב עשן ומהורהר - יצא לראשונה ב-Blue Room Released. בהופעות חיות הוא מנגן גיטרות, באס ומיקסר דאב.",
    notable: "Saafi Brothers - אבני יסוד של פסיביינט וצ'יל-אאוט",
    albums: [
      { name: "Mystic Cigarettes", year: 1997, project: "Saafi Brothers" },
      { name: "Supernatural", year: 1999, project: "Saafi Brothers" },
      { name: "A Relaxed Blur", year: 2002, project: "Saafi Brothers" }
    ],
    links: [
      { type: "Bandcamp", url: "https://saafibrothers.bandcamp.com/" },
      { type: "Website", url: "https://www.le-mar.de/" }
    ],
    tracks: [
      { id: "JVVpVgdCT84", title: "Saafi Brothers - Mystic Cigarettes (Full Album)", year: 1997 },
      { id: "HhoazuZjaCI", title: "Saafi Brothers - 2046", year: 2008 }
    ]
  },
  {
    id: "psara",
    name: "Psara",
    realName: "פסארה",
    country: "🇵🇹 פורטוגל",
    age: null,
    born: "30 שנה בסצנה",
    stage: "guardians",
    role: "Vinyl Set",
    tags: ["Goa Vinyl", "Storyteller", "Portuguese Scene"],
    color: "#ef476f",
    bio: "נוכחות פעילה בסצנה הפורטוגזית כבר 30 שנה. אומן בלתי רגיל ביצירת סיפורים מהטראקים הגדולים של שנות ה-90 - יודע איך לקחת את הקהל למסע מעוצב ועמוק שמרגיש כמו זמן ומקום אחר.",
    notable: "מאסטר של 'Goa Guardians' - שומרי המורשת",
    albums: [
      { name: "DJ sets קלאסיים", year: "מתמשך" }
    ],
    links: []
  },
  {
    id: "ukiro",
    name: "Ukiro",
    realName: "אוקירו",
    country: "🇸🇪 שוודיה",
    age: null,
    born: "פעיל מתחילת שנות ה-90",
    stage: "guardians",
    role: "Vinyl Set",
    tags: ["Swedish Goa", "Vinyl Master"],
    color: "#118ab2",
    bio: "נוכחות עוצמתית בסצנת הגואה השוודית מתחילת שנות ה-90. ידוע באוסף התקליטים האדיר וידע אנציקלופדי. ניגן סטי ויניל ברחבי אירופה, ארה\"ב ומקסיקו.",
    notable: "אחד מאספני התקליטים המוערכים בסצנה",
    albums: [],
    links: []
  },
  {
    id: "damir-ludvig",
    name: "Damir Ludvig",
    realName: "דמיר לודביג",
    country: "🇭🇷 קרואטיה",
    age: null,
    born: "פעיל משנות ה-90",
    stage: "zambu",
    role: "Live B2B",
    tags: ["Croatian Goa", "Reunion"],
    color: "#06d6a0",
    bio: "אחד הקולות החזקים של גואה הקרואטי. התאחד מחדש עם Goran Stetic ב-ZNA 2026 - חוזרים אל המוזיקה שיצרו בשנות ה-90 ומחדדים אותה למערכת הסאונד המתקדמת של מקדש זמבו.",
    notable: "B2B עם Goran Stetic - איחוד מחדש מהאגדה הקרואטית",
    albums: [],
    links: []
  },
  {
    id: "goran-stetic",
    name: "Goran Stetic",
    realName: "גוראן סטטיץ'",
    country: "🇭🇷 קרואטיה",
    age: null,
    born: "פעיל משנות ה-90",
    stage: "zambu",
    role: "Live B2B",
    tags: ["Croatian Goa", "Reunion"],
    color: "#26c485",
    bio: "מאיקוני גואה טראנס בקרואטיה. מתאחד מחדש עם Damir Ludvig לסט מיוחד ב-ZNA - מסע אל אוצרות שלא נשמעו זה זמן רב.",
    notable: "B2B עם Damir Ludvig - מפגש היסטורי",
    albums: [],
    links: []
  },
  {
    id: "dogma",
    name: "Dogma",
    realName: "דוגמה",
    country: "🇭🇷 קרואטיה",
    age: null,
    born: "פעילים בסצנה",
    stage: "zambu",
    role: "DJ Set",
    tags: ["Croatian Deck Masters", "Melodic Goa"],
    color: "#f72585",
    bio: "אמני המיקסר הקרואטים. ב-ZNA יוצרים מסע אפי של שעתיים דרך הטראקים המלודיים הטובים ביותר של גואה טראנס במהלך השעות המאוחרות של הבוקר.",
    notable: "ידועים בסטים של 'late morning' מלודיים-משוגעים",
    albums: [],
    links: []
  },
  {
    id: "alex-tolstey",
    name: "Alex Tolstey",
    realName: "אלכס טולסטיי",
    country: "🌍 בינלאומי",
    age: null,
    born: "פעיל בסצנה",
    stage: "retro",
    role: "DJ Set",
    tags: ["Retro Goa"],
    color: "#7209b7",
    bio: "אומן ZNA 2026, חלק מהקולקטיב המאוחד של חוגגי הגואה הרטרו.",
    notable: "אומן Retro Universe",
    albums: [],
    links: []
  },
  {
    id: "alien-rain",
    name: "Alien Rain",
    realName: "אליין ריין",
    country: "🇸🇪 שוודיה",
    age: null,
    born: "פעיל בסצנה",
    stage: "retro",
    role: "Live",
    tags: ["Acid Techno", "Alien Communications"],
    color: "#1bc47d",
    bio: "אלקטרוניקה אסידית מסתורית מסקנדינביה - שחרור על Mord ועל ה-label שלו Alien Communications.",
    notable: "אסיד גלקטי לעולם החדש של ZNA",
    albums: [],
    links: []
  },
  {
    id: "anais-lin",
    name: "Anaïs Lin",
    realName: "אנאי לין",
    country: "🇫🇷 צרפת",
    age: null,
    born: "פעילה בסצנה",
    stage: "retro",
    role: "DJ Set",
    tags: ["Selector", "Trance"],
    color: "#ff70a6",
    bio: "סלקטורית בעלת אוזן יוצאת דופן - גואה, פרוגרסיב וטראנס באלגנטיות צרפתית.",
    notable: "אומנית Retro Universe",
    albums: [],
    links: []
  },
  {
    id: "extra-cheers",
    name: "Cheers",
    realName: "Cheers",
    country: "🌍 בינלאומי",
    age: null,
    born: "פעיל בסצנה",
    stage: "retro",
    role: "DJ Set",
    tags: ["Retro Trance"],
    color: "#ffbf69",
    bio: "אומן/נית של Retro Universe - חלק ממסע הגואה הרטרו של ZNA 2026.",
    notable: "Retro Universe",
    albums: [],
    links: []
  },
  {
    id: "marc-van-der-vlugt",
    name: "Marc Van Der Vlugt",
    realName: "מארק ון דר פלוכט",
    country: "🇳🇱 הולנד",
    age: null,
    born: "פעיל בסצנה",
    stage: "zambu",
    role: "DJ Set",
    tags: ["Industrial Goa", "Heavy Atmospheres"],
    color: "#5a189a",
    bio: "אמן מסע פסיכדלי כבד שמערב נוף-קול תעשייתי עם אטמוספרות פסיטראנס וטכנו של אותה תקופה. מבית-גידול של מקדש זמבו.",
    notable: "סטים פסיכדליים-תעשייתיים בלתי נשכחים",
    albums: [],
    links: []
  },
  {
    id: "solitare",
    name: "Solitare",
    realName: "סוליטר",
    country: "🌍 בינלאומי",
    age: null,
    born: "פעיל בסצנה",
    stage: "zambu",
    role: "DJ Set",
    tags: ["Zambu Family"],
    color: "#3c096c",
    bio: "מכשף תקליטים אמיתי ושורשי במציאות של זמבו. חלק בלתי נפרד מההוויה של מקדש זמבו ב-ZNA.",
    notable: "Resident Zambu Temple",
    albums: [],
    links: []
  },
  {
    id: "earl-peal",
    name: "Earl Peal",
    realName: "ארל פיל",
    country: "🌍 בינלאומי",
    age: null,
    born: "פעיל בסצנה",
    stage: "retro",
    role: "DJ Set",
    tags: ["Retro Goa"],
    color: "#e63946",
    bio: "אומן Retro Universe של ZNA 2026.",
    notable: "Retro Universe",
    albums: [],
    links: []
  },
  {
    id: "isoquant",
    name: "Isoquant",
    realName: "Isoquant",
    country: "🌍 בינלאומי",
    age: null,
    born: "פעיל בסצנה",
    stage: "retro",
    role: "Live",
    tags: ["Goa", "Live Act"],
    color: "#ff9e00",
    bio: "אמן גואה רטרו עם הופעה חיה ב-ZNA 2026.",
    notable: "Retro Universe",
    albums: [],
    links: []
  },
  {
    id: "gabi-von-dub",
    name: "Gabi Vøn Dub",
    realName: "גאבי ון דאב",
    country: "🌍 בינלאומי",
    age: null,
    born: "פעיל בסצנה",
    stage: "zambu",
    role: "DJ Set",
    tags: ["Dub", "Psybient"],
    color: "#7b2cbf",
    bio: "סלקטור דאב פסיכדלי - חוויית צ'יל ו-low-end עמוקה.",
    notable: "Zambu Temple",
    albums: [],
    links: []
  },
  {
    id: "ree-k",
    name: "Ree.K",
    realName: "רי קיי",
    country: "🇯🇵 יפן",
    age: null,
    born: "פעיל בסצנה",
    stage: "retro",
    role: "DJ Set",
    tags: ["Japanese Goa", "Matsuri Family"],
    color: "#fb6f92",
    bio: "אמן יפני בעל זיקה למשפחת Matsuri - גואה טראנס בסגנון יפני נקי ומקפיד.",
    notable: "Retro Universe",
    albums: [],
    links: []
  },
  {
    id: "klil-co",
    name: "Klil.co",
    realName: "Klil.co",
    country: "🌍 בינלאומי",
    age: null,
    born: "פעיל בסצנה",
    stage: "retro",
    role: "DJ Set",
    tags: ["Retro Selector"],
    color: "#a663cc",
    bio: "סלקטור Retro Universe - חלק ממשפחת ZNA 2026.",
    notable: "Retro Universe",
    albums: [],
    links: []
  },
  {
    id: "mathew-tecnica",
    name: "Tecnica",
    realName: "Tecnica",
    country: "🌍 בינלאומי",
    age: null,
    born: "פעיל בסצנה",
    stage: "retro",
    role: "Live",
    tags: ["Goa Live"],
    color: "#0096c7",
    bio: "פרויקט גואה חי - חלק מליין-אפ Retro Universe ב-ZNA 2026.",
    notable: "Retro Universe",
    albums: [],
    links: []
  },
  {
    id: "triple-distilled",
    name: "Triple Distilled Disco Squad",
    realName: "Triple Distilled Disco Squad",
    country: "🌍 בינלאומי",
    age: null,
    born: "קולקטיב",
    stage: "market",
    role: "DJ Collective",
    tags: ["Disco", "Market Vibes"],
    color: "#ffd60a",
    bio: "קולקטיב דיסקו שיחמם את אזור השוק עם נשמת חגיגה רטרו ומקצב שמכניס לוויב.",
    notable: "אומני שוק - קצב חגיגי לפני המסיבות",
    albums: [],
    links: []
  },
  {
    id: "bill-robin-maya",
    name: "Bill Robin & Maya Wada",
    realName: "ביל רובין ומאיה ואדה",
    country: "🌍 בינלאומי",
    age: null,
    born: "דואו",
    stage: "zambu",
    role: "B2B",
    tags: ["Back to Back", "Deep Goa"],
    color: "#90e0ef",
    bio: "דואו B2B חזק - חוויית גואה עמוקה במקדש זמבו.",
    notable: "Zambu Temple B2B",
    albums: [],
    links: []
  },
  {
    id: "e-sko",
    name: "E-Skø",
    realName: "E-Skø",
    country: "🌍 בינלאומי",
    age: null,
    born: "פעיל בסצנה",
    stage: "retro",
    role: "DJ Set",
    tags: ["Retro"],
    color: "#f15bb5",
    bio: "סלקטור של Retro Universe - חבר משפחת ZNA 2026.",
    notable: "Retro Universe",
    albums: [],
    links: []
  },
  {
    id: "sancho-meiso",
    name: "Sancho Meisø Chaya",
    realName: "Sancho Meisø Chaya",
    country: "🌍 בינלאומי",
    age: null,
    born: "פעיל בסצנה",
    stage: "market",
    role: "DJ Set",
    tags: ["Chillout", "Market"],
    color: "#fee440",
    bio: "וייב צ'יל ועומק רוחני - חלק מאזור השוק והחימום של ZNA.",
    notable: "Market vibes",
    albums: [],
    links: []
  }
];
