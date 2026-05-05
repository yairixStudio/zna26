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
    announcedAt: "2026-01-26",
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
    announcedAt: "2026-04-27",
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
      { id: "BkvxkraxaNU", title: "Live @ ZNA Gathering 2022 dancefloor", year: 2022, zna: true }
    ]
  },
  {
    id: "kris-kylven",
    announcedAt: "2026-02-24",
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
    announcedAt: "2026-03-04",
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
      { id: "deha9cXsAUo", title: "מדריך לחותמת Blue Room Released - מיקס רטרוספקטיבי", year: 1998 }
    ]
  },
  {
    id: "ray-castle",
    announcedAt: "2026-03-04",
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
    ],
    tracks: [
      { id: "s_HIUmQjb7E", title: "Time Traveller [Masaray]", year: 1995 },
      { id: "dltPf5Ni7sg", title: "Insectoid - Tribedelic Nomads (Feral Mix)", year: 2018 },
      { id: "0J5TBoGo1mg", title: "Rhythmystec - Plasmatik", year: null }
    ]
  },
  {
    id: "robert-leiner",
    announcedAt: "2025-12-15",
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
    announcedAt: "2025-12-08",
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
    announcedAt: "2025-12-01",
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
    announcedAt: "2026-03-23",
    name: "Joti Sidhu",
    realName: "ג'וטי סידהו (Psychaos)",
    country: "🇬🇧 בריטניה",
    age: null,
    born: "פעיל מ-1988",
    stage: "zambu",
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
    tracks: [
      { id: "_5Cg9bPCZ8Y", title: "Psychaos - New Sensations", year: 2007 },
      { id: "pIbqA1EWOBA", title: "Boom Festival 2010 RETRO Live Set", year: 2010 },
      { id: "f27ftXgd6GM", title: "Live @ Ozora Festival Main Stage", year: 2013 }
    ]
  },
  {
    id: "extrawelt",
    announcedAt: "2026-02-16",
    name: "Extrawelt",
    realName: "ארנה שאפהאוזן + ויאן ראבה",
    country: "🇩🇪 גרמניה",
    age: null,
    born: "פעילים מ-2005",
    stage: "market",
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
    announcedAt: "2026-02-16",
    name: "Mathew Jonson",
    realName: "מתיו ג'ונסון",
    country: "🇨🇦 קנדה / 🇩🇪 ברלין",
    age: null,
    born: "ונקובר",
    stage: "market",
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
    announcedAt: "2025-12-25",
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
    announcedAt: "2026-03-04",
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
    links: [],
    tracks: [
      { id: "_awxLPKmT_M", title: "VA Goa Trance Legacy Vol.3 (compiled)", year: 2017 }
    ]
  },
  {
    id: "ukiro",
    announcedAt: "2026-03-04",
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
    announcedAt: "2026-01-19",
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
    announcedAt: "2026-01-19",
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
    announcedAt: "2026-03-25",
    name: "Dogma 3000",
    realName: "Dogma (Damir Ludvig & Goran Stetic)",
    country: "🇭🇷 קרואטיה",
    age: null,
    born: "1996",
    stage: "zambu",
    role: "Live B2B",
    tags: ["Croatian Goa", "Land of Utopia", "Reunion"],
    color: "#f72585",
    bio: "פרויקט הגואה הקרואטי המוכר ביותר בעולם. שחררו ב-1997 את אלבום הביכורים האייקוני 'Land of Utopia' תחת חותמת Blue Moon הבריטית. ניגנו ב-Brixton Academy בלונדון, ב-Roxy בניו יורק, ב-Lust בטוקיו, ב-Dynamo Dvash בתל אביב, ולפני 700,000 איש ב-Love Parade בגרמניה. אחרי שנים נפרדים - מתאחדים מחדש במיוחד ל-ZNA 2026.",
    notable: "'Land of Utopia' (1997, Blue Moon) - אבן יסוד של גואה אירופי",
    albums: [
      { name: "Land of Utopia", year: 1997, project: "Dogma 3000" },
      { name: "Land of Utopia (Expanded Remaster)", year: 2020, project: "Dogma 3000" }
    ],
    links: [
      { type: "Website", url: "http://www.dogma3000.com/" }
    ],
    tracks: [
      { id: "tV_HLfvs4_4", title: "Land Of Utopia", year: 1997 },
      { id: "G_hdbVqSYA4", title: "Land Of Utopia (Expanded Remaster)", year: 2020 },
      { id: "5amZX-9MZk0", title: "Sutra Sarma", year: null }
    ]
  },
  {
    id: "alex-tolstey",
    announcedAt: "2026-03-25",
    name: "Alex Tolstey",
    realName: "אלכס טולסטיי (Boshke Beats)",
    country: "🇪🇪 אסטוניה",
    age: null,
    born: "פעיל מ-2001",
    stage: "market",
    role: "DJ Set",
    tags: ["Boshke Beats", "Retro Goa", "Eclectic"],
    color: "#7209b7",
    bio: "מייסד ומנהל Boshke Beats Records (פעיל מאז 2001). אגדה במחשבה החופשית של הסצנה - דרך כפלטיניית רוק, דיסקו, טכנו, אלקטרו וטראנס בזרימה אחת. בשנים האחרונות מופיע גם תחת הפרויקט Triple Distilled Disco Squad - 'Slow disco-techno from beyond'.",
    notable: "מייסד Boshke Beats Records - חותמת קאלט של פסיטראנס",
    albums: [],
    links: [],
    tracks: [
      { id: "n2WhZmg2Oog", title: "The Outlaws Vol II Mix", year: null },
      { id: "d4cAunDBl7Q", title: "Live @ Boom Festival 2012", year: 2012 }
    ]
  },
  {
    id: "alien-rain",
    announcedAt: "2026-03-25",
    name: "Alien Rain",
    realName: "מילטון ברדלי (Alien Rain)",
    country: "🇩🇪 ברלין",
    age: null,
    born: "פעיל בסצנה",
    stage: "market",
    role: "Live",
    tags: ["Acid Techno", "Alien Communications", "Berlin"],
    color: "#1bc47d",
    bio: "פרויקט האסיד-טכנו של מילטון ברדלי מברלין. מקדיש את הקריירה להחייאת האנרגיה הגולמית של אסיד ה-303 משנות ה-90 עם קצה ניסיוני מודרני. שחרורים על החותמת שלו Alien Communications וגם על Mord ו-Out of Place. שם מוערך בסצנה התת-קרקעית הברלינאית.",
    notable: "סדרת ה-EP בויניל בלבד 'Alien Rain I-VI' - קלאסיקה עכשווית של אסיד טכנו",
    albums: [
      { name: "Alien Rain I-VI series", year: "2012-2017", project: "vinyl-only" }
    ],
    links: [],
    tracks: [
      { id: "hhee6W8NEpc", title: "Illusion [Alien Rain VI]", year: 2017 },
      { id: "HHUvgyivHvo", title: "Alienopolis", year: null },
      { id: "HUlZAzpxyFI", title: "Empire Of Illusion [UFO5]", year: null }
    ]
  },
  {
    id: "anais-lin",
    announcedAt: "2026-03-25",
    name: "Anaïs Lin",
    realName: "אנאי לין",
    country: "🇫🇷 צרפת",
    age: null,
    born: "פעילה בסצנה",
    stage: "market",
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
    announcedAt: "2026-03-25",
    name: "Cheers",
    realName: "Cheers",
    country: "🌍 בינלאומי",
    age: null,
    born: "פעיל בסצנה",
    stage: "market",
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
    announcedAt: "2026-03-25",
    name: "Marc Van Der Vlugt",
    realName: "מארק ון דר פלוכט",
    country: "🇳🇱 הולנד",
    age: null,
    born: "פעיל מתחילת שנות ה-90",
    stage: "market",
    role: "DJ Set",
    tags: ["Industrial Goa", "Blue Room", "Atomic Records"],
    color: "#5a189a",
    bio: "DJ ותיק מהסצנה הפסיכדלית של תחילת שנות ה-90 - שילב נוף-קול תעשייתי עם אטמוספרות פסיכדליות כבדות. עבד כמקדם של החותמות הבריטיות Blue Room Released ו-Atomic Records. נסוג ב-2000 וחזר לסצנה אחרי הזמנה ל-ZNA Gathering 2020.",
    notable: "אלבום 1998 'Behind The Scenes' (Psilowave) - אבן דרך של תק-פסי",
    albums: [
      { name: "Behind The Scenes", year: 1998, project: "Psilowave" }
    ],
    links: [],
    tracks: [
      { id: "zkzTd8ba-Mo", title: "Live @ ZNA Gathering 2022", year: 2022, zna: true },
      { id: "TdZ_SuOwrUQ", title: "Live @ Cycles of Life", year: 2023 },
      { id: "jOriE5DfSLk", title: "Spontaneous Human Combustion (Burning Man)", year: null }
    ]
  },
  {
    id: "solitare",
    announcedAt: "2026-03-30",
    name: "DJ Solitare",
    realName: "מארק איינלי (DJ Solitare)",
    country: "🇨🇦 קנדה (ונקובר)",
    age: null,
    born: "1994",
    stage: "zambu",
    role: "Vinyl Set",
    tags: ["DAT Records", "Matsuri Digital", "Goa Selector"],
    color: "#3c096c",
    bio: "פסנתרן קלאסי מבית, שנפל לפסיטראנס בטוקיו ב-1994 והפך לאחד הסלקטורים החשובים של גואה טראנס מהשורש של שנות ה-90. שותף-מפיק ו-DJ ב-DAT Records האיטלקית, ונציג בינלאומי של Matsuri Digital. הופעות בויניל בלבד שהופכות אותו לקבוע במקדש זמבו ובמסיבות רטרו ברחבי העולם.",
    notable: "סטים מרתון בויניל - נכס של הסצנה הרטרו",
    albums: [],
    links: [
      { type: "Website", url: "https://djsolitare.com/" }
    ],
    tracks: [
      { id: "1k-XbkfMl2k", title: "Retro Goa Explorations Ep.123", year: null },
      { id: "nGIkRxh3xiw", title: "Retro Goa Explorations Ep.64", year: null },
      { id: "-a_-fnGYhi4", title: "Retro Goa Explorations Ep.117", year: null }
    ]
  },
  {
    id: "earl-peal",
    announcedAt: "2026-03-25",
    name: "Earl Peal",
    realName: "ארל פיל",
    country: "🌍 בינלאומי",
    age: null,
    born: "פעיל בסצנה",
    stage: "market",
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
    announcedAt: "2026-03-25",
    name: "Isoquant",
    realName: "Isoquant",
    country: "🌍 בינלאומי",
    age: null,
    born: "פעיל בסצנה",
    stage: "market",
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
    announcedAt: "2026-03-25",
    name: "Gabi Vøn Dub",
    realName: "גאבי ון דאב (Arctic Dub Studios)",
    country: "🇵🇹 פורטוגל",
    age: null,
    born: "פעיל בסצנה",
    stage: "market",
    role: "DJ Set",
    tags: ["Arctic Dub", "Post-Dub Techno", "Portugal"],
    color: "#7b2cbf",
    bio: "DJ ומפיק פורטוגזי שעובד מסטודיו Arctic Dub - מתמחה באמביינט, פוסט-דאב טכנו ואלקטרוניקה ניסיונית בהשראת דאב. אוצר ומקפיל מרכזי של חותמת Arctic Dub (Sursumcorda), פעיל בקהילת הדאב והבאס הפורטוגזית התת-קרקעית.",
    notable: "סדרת ה-compilations 'Arctic Dub Sursumcorda' - אבן יסוד של דאב פורטוגזי",
    albums: [],
    links: []
  },
  {
    id: "ree-k",
    announcedAt: "2026-03-25",
    name: "Ree.K",
    realName: "רי קיי",
    country: "🇯🇵 יפן",
    age: null,
    born: "פעילה מ-1992",
    stage: "market",
    role: "DJ Set",
    tags: ["Hypnodisk", "Matsuri Family", "Japanese Goa"],
    color: "#fb6f92",
    bio: "DJ ויוצרת חלוצה יפנית - מנגנת מ-1992 וחלק מהמשפחה המורחבת של Matsuri Productions/Digital שעזרה לזרוע את סצנת הפסיטראנס היפנית. ב-2002 ייסדה את החותמת Hypnodisk. הפילוסופיה האמנותית שלה מכוונת לטרנספורמציה תודעתית דרך צליל. מופיעה לעיתים עם השותף Masa בלהקת Kinocosmo.",
    notable: "אלבום 'Yammataikoku' (1996, Psy-Harmonics) - אבן יסוד של גואה יפני",
    albums: [
      { name: "Yammataikoku", year: 1996, project: "Psy-Harmonics" },
      { name: "Early Tracks 1", year: 2010, project: "Hypnodisk" }
    ],
    links: [
      { type: "Discogs", url: "https://www.discogs.com/artist/45548-ReeK" }
    ],
    tracks: []
  },
  {
    id: "klil-co",
    announcedAt: "2026-03-25",
    name: "Klil.co",
    realName: "Klil.co",
    country: "🌍 בינלאומי",
    age: null,
    born: "פעיל בסצנה",
    stage: "market",
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
    announcedAt: "2026-03-25",
    name: "Tecnica",
    realName: "Tecnica",
    country: "🌍 בינלאומי",
    age: null,
    born: "פעיל בסצנה",
    stage: "market",
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
    announcedAt: "2026-03-25",
    name: "Triple Distilled Disco Squad",
    realName: "אלכס בושקה טולסטיי + קולקטיב",
    country: "🇪🇪 אסטוניה",
    age: null,
    born: "קולקטיב",
    stage: "market",
    role: "DJ Collective",
    tags: ["Boshke Beats", "Slow Disco", "Eclectic"],
    color: "#ffd60a",
    bio: "פרויקט DJ בסגנון פריסטייל של אלכס 'Boshke' טולסטיי, מייסד Boshke Beats Records (פעיל מ-2001). הסט אינו מתוכנן ואקלקטי - רוק, דיסקו, טכנו, אלקטרו וטראנס מתמזגים לזרימה אחת מאולתרת. 'Slow disco-techno from beyond' - היפר-קלף בפסטיבלים כמו Daad Gathering.",
    notable: "Daad Gathering 2022 - הופעה אגדית של מיני-מקס דיסקו וטכנו",
    albums: [],
    links: []
  },
  {
    id: "bill-robin-maya",
    announcedAt: "2026-03-25",
    name: "Bill Robin & Maya Wada",
    realName: "ביל רובין ומאיה ואדה",
    country: "🌍 בינלאומי",
    age: null,
    born: "דואו",
    stage: "market",
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
    announcedAt: "2026-03-25",
    name: "E-Skø",
    realName: "E-Skø",
    country: "🌍 בינלאומי",
    age: null,
    born: "פעיל בסצנה",
    stage: "market",
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
    announcedAt: "2026-03-25",
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
  },
  // ===== 2026 announcement additions =====
  {
    id: "jaia",
    announcedAt: "2025-11-24",
    name: "Jaïa",
    realName: "ז'רום הרוואה",
    country: "🇫🇷 צרפת",
    age: null,
    born: "פעיל מסוף שנות ה-90",
    stage: "zambu",
    role: "Live",
    tags: ["French Goa", "Mosaïc", "Live"],
    color: "#fb8500",
    bio: "פרויקט גואה טראנס חי של ז'רום הרוואה מצרפת. אלבום הביכורים 'Blue Energy' (1998, Mosaïc) הוא אבן יסוד של הסצנה הצרפתית. ב-ZNA 2026 פותח את רחבת הריקודים עם סט בילד-אפ.",
    notable: "'Mai Mai' מתוך 'Blue Energy' (1998, Mosaïc) - קלאסיקה צרפתית",
    albums: [
      { name: "Blue Energy", year: 1998, project: "Mosaïc" }
    ],
    links: [
      { type: "Discogs", url: "https://www.discogs.com/artist/4892-Ja%C3%AFa" },
      { type: "Bandcamp", url: "https://jaia.bandcamp.com/track/mai-mai" }
    ],
    tracks: [
      { id: "WbRgoRdBokk", title: "Mai Mai", year: 1998 }
    ]
  },
  {
    id: "graham-wood",
    announcedAt: "2026-01-12",
    name: "Graham Wood",
    realName: "גרהאם וודס (The Infinity Project)",
    country: "🇬🇧 בריטניה",
    age: null,
    born: "פעיל מתחילת שנות ה-90",
    stage: "retro",
    role: "DJ Set",
    tags: ["The Infinity Project", "TIP Records", "Goa Pioneer"],
    color: "#3a86ff",
    bio: "אגדה של גואה טראנס - חלק מ-The Infinity Project וממייסדי TIP Records הבריטית האגדית. הפיק את התקליטונים שעיצבו את הסאונד של גואה הקלאסי. ב-ZNA 2026 משחרר את מלוא המאסטריות שלו ב-Retro Universe.",
    notable: "The Infinity Project / TIP Records - מהחותמות המעצבות של גואה",
    albums: [
      { name: "Mystical Experiences", year: 1995, project: "The Infinity Project" }
    ],
    links: [
      { type: "Discogs", url: "https://www.discogs.com/artist/16456-The-Infinity-Project" }
    ]
  },
  {
    id: "sid-shanti",
    announcedAt: "2025-11-17",
    name: "Sid Shanti",
    realName: "Sid Shanti",
    country: "🌍 בינלאומי",
    age: null,
    born: "פעיל משנות ה-90",
    stage: "retro",
    role: "DJ Set",
    tags: ["Pioneer", "Veteran"],
    color: "#9d4edd",
    bio: "DJ ויוצר ותיק שאינטואיציה מוזיקלית עזרה להגדיר תקופה. חוזר ל-ZNA 2026 לסט מיוחד.",
    notable: "סט VS אקסקלוסיבי בויניל עם Orion ב-ZNA 2026",
    albums: [],
    links: []
  },
  {
    id: "orion-borelli",
    announcedAt: "2025-11-17",
    name: "Orion (Jean Borelli)",
    realName: "ז'אן בורלי (Orion)",
    country: "🇩🇰 דנמרק / 🇫🇷 צרפת",
    age: null,
    born: "פעיל משנות ה-90",
    stage: "retro",
    role: "Vinyl VS Set",
    tags: ["Pioneer", "Vinyl", "Retro Goa"],
    color: "#7b2cbf",
    bio: "דמות מפתח מהשנים המעצבות של פסיטראנס. ב-ZNA 2026 חולק תקליטים בסט VS אקסקלוסיבי עם Sid Shanti - לכל מבריקי הסצנה.",
    notable: "VS Sid Shanti - מפגש ויניל מיוחד",
    albums: [],
    links: [
      { type: "Discogs", url: "https://www.discogs.com/artist/77371-Jean-Borelli" },
      { type: "Bandcamp", url: "https://orionmemo604.bandcamp.com/" }
    ]
  },
  {
    id: "takeshi-isogai",
    announcedAt: "2026-03-16",
    name: "Takeshi Isogai",
    realName: "טאקשי איסוגאי (Ubar Tmar)",
    country: "🇯🇵 יפן",
    age: null,
    born: "פעיל מאמצע שנות ה-90",
    stage: "retro",
    role: "Live",
    tags: ["Ubar Tmar", "Japanese Pioneer", "Matsuri"],
    color: "#e63946",
    bio: "מפיק ניסיוני יפני שפעיל מאמצע שנות ה-90. ידוע יותר תחת הכינוי Ubar Tmar עם אלבום 'Fusion' (1997, Boom!) ו-'True' (1998, Matsuri). הופעות חיות שלו הופכות ל'מבוכי מוזיקה' פסיכדליים.",
    notable: "Ubar Tmar - אלבומי 'Fusion' ו-'True' של גואה יפני קלאסי",
    albums: [
      { name: "Fusion", year: 1997, project: "Ubar Tmar / Boom!" },
      { name: "True", year: 1998, project: "Ubar Tmar / Matsuri" }
    ],
    links: [
      { type: "Discogs", url: "https://www.discogs.com/artist/228673-Takeshi-Isogai" }
    ]
  },
  {
    id: "battle-future-buddhas",
    announcedAt: "2026-04-06",
    name: "Battle of the Future Buddhas",
    realName: "דייוויד (Battle of the Future Buddhas)",
    country: "🇸🇪 שוודיה",
    age: null,
    born: "פעיל מסוף שנות ה-90",
    stage: "retro",
    role: "Live",
    tags: ["Night Goa", "Boom Records", "Twin Sharkfins"],
    color: "#240046",
    bio: "אומן של פסקולי לילה - אגדה ב-Boom Records עם האלבום 'Twin Sharkfins'. סטים לילה אפלים ועצימים שלוקחים את הקהל למחילות זמן עמוקות.",
    notable: "אלבום 'Twin Sharkfins' (Boom Records) - קלאסיקה של לילה",
    albums: [
      { name: "Twin Sharkfins", year: 1998, project: "Boom Records" }
    ],
    links: [
      { type: "Discogs", url: "https://www.discogs.com/artist/41480-Battle-Of-The-Future-Buddhas" },
      { type: "Bandcamp", url: "https://battlebuddhas.bandcamp.com/" }
    ],
    tracks: [
      { id: "dX6a2ISyjy8", title: "Twin Sharkfins (Full Album)", year: 1998 }
    ]
  },
  {
    id: "goaacen",
    announcedAt: "2026-03-04",
    name: "Goaacen",
    realName: "Goaacen",
    country: "🇵🇹 פורטוגל",
    age: null,
    born: "פעיל בסצנה",
    stage: "guardians",
    role: "DJ Set",
    tags: ["Suntrip", "Dark Goa", "Portuguese"],
    color: "#0077b6",
    bio: "DJ פורטוגזי מוביל וחותמת Suntrip - חוקר את הטריטוריות האפלות והעמוקות יותר של גואה טראנס. חלק מהליין-אפ של Goa Guardians.",
    notable: "DJ של חותמת Suntrip - הוצאה מובילה של גואה מודרני",
    albums: [],
    links: []
  },
  {
    id: "dark-el-kante",
    announcedAt: "2026-03-04",
    name: "Dark El Kante",
    realName: "חורחה בזאן (Dark El Kante)",
    country: "🌍 בינלאומי",
    age: null,
    born: "פעיל בסצנה",
    stage: "guardians",
    role: "DJ Set",
    tags: ["Suomisaundi", "Random Records"],
    color: "#90e0ef",
    bio: "DJ מוביל של ז'אנר ה-Suomisaundi - גואה טראנס פיני אקסצנטרי וחופשי. מנהל את החותמת ללא רווח Random Records שתומכת בארגוני זכויות-ילידים.",
    notable: "Random Records - חותמת אקטיביסטית",
    albums: [],
    links: [
      { type: "Bandcamp", url: "https://randomrecords.bandcamp.com/" },
      { type: "SoundCloud", url: "https://soundcloud.com/darkelkante" }
    ]
  },

  {
    id: "merrow",
    announcedAt: "2026-03-04",
    name: "Merr0w",
    realName: "בריס פרויט (Merr0w)",
    country: "🇫🇷 צרפת",
    age: null,
    born: "פעיל מתחילת שנות ה-2000",
    stage: "guardians",
    role: "DJ Set",
    tags: ["Modern Goa", "Suntrip", "Global Sect"],
    color: "#ff5c8a",
    bio: "בריס פרויט - חלוץ של גואה מודרני מצרפת. מפיק מאז תחילת שנות ה-2000 עם שחרורים על Suntrip ו-Global Sect. אלבום 'Odysseus' (2019, Global Sect) הוא מהמסעות המוכרים שלו.",
    notable: "אלבום 'Odysseus' (2019, Global Sect)",
    albums: [
      { name: "Odysseus", year: 2019, project: "Global Sect" }
    ],
    links: [
      { type: "Discogs", url: "https://www.discogs.com/artist/737661-Merr0w" },
      { type: "Bandcamp", url: "https://globalsect.bandcamp.com/album/merrow-odysseus" }
    ]
  },
  // ===== Additional verified ZNA 2026 artists =====
  {
    id: "atmos",
    announcedAt: "2026-03-23",
    name: "Atmos",
    realName: "תומאש באליצקי (Atmos)",
    country: "🇸🇪 שוודיה",
    age: null,
    born: "פעיל מסוף שנות ה-90",
    stage: "retro",
    role: "Live",
    tags: ["Spirit Zone", "Goa Trance", "Suntrip"],
    color: "#06d6a0",
    bio: "אומן גואה טראנס שוודי שהיה מהפיקים החזקים של Spirit Zone Recordings בסוף שנות ה-90. סגנונו - מלודי, חלמני וצבעוני - הפך לאחד מהקולות המוכרים של גואה הסקנדינבי. אומן Retro Universe ב-ZNA 2026.",
    notable: "אלבומי Spirit Zone וסיפו של גואה הקלאסי - חזרה לשורשים",
    albums: [
      { name: "The Only Process", year: 1999, project: "Spirit Zone" },
      { name: "Headcleaner", year: 2005 }
    ],
    links: [
      { type: "Discogs", url: "https://www.discogs.com/artist/9013-Atmos" }
    ],
    tracks: [
      { id: "Fat-5AwNPXk", title: "The Only Process (Original Mix)", year: 1999 }
    ]
  },
  {
    id: "alphanaut",
    announcedAt: "2026-02-02",
    name: "Alphanaut",
    realName: "Hall + Antill (Alphanaut)",
    country: "🇬🇧 בריטניה",
    age: null,
    born: "פעילים מ-1997",
    stage: "retro",
    role: "Live",
    tags: ["Old School Goa", "Goa Pioneer"],
    color: "#118ab2",
    bio: "פרויקט אנגלי שהחל בסוף שנות ה-90 עם ה-12\" של 'India / Abduction / Centauri' (1997). פרודוקציה מוקפדת בסאונד הקלאסי של גואה טראנס - הופעות חיות שמרגישות כמו זיכרון משוחזר.",
    notable: "מהפרויקטים המוכרים של גואה הקלאסי-בריטי",
    albums: [
      { name: "India / Abduction / Centauri", year: 1997, project: "12\" EP" },
      { name: "Cosmonaut", year: 1998 }
    ],
    links: [
      { type: "Discogs", url: "https://www.discogs.com/artist/27998-Alphanaut" }
    ],
    tracks: [
      { id: "_0-7f9AJ3lU", title: "Cosmonaut", year: 1998 }
    ]
  },
  {
    id: "blue-planet-corporation",
    announcedAt: "2026-02-09",
    name: "Blue Planet Corporation",
    realName: "גבריאל מסורל",
    country: "🇫🇷 צרפת",
    age: null,
    born: "פעיל משנות ה-90",
    stage: "retro",
    role: "Live",
    tags: ["French Goa", "Mosaïc"],
    color: "#0077b6",
    bio: "פרויקט הסולו של גבריאל מסורל - יוצר חלוץ צרפתי של גואה טראנס. שחרורים על Mosaïc Records הצרפתית. ב-ZNA 2026 חוזר עם הופעה חיה מלאה של חוויה אופורית-פסיכדלית.",
    notable: "'Overbloody Flood' (1993) - מהטראקים הצרפתיים החלוצים של גואה",
    albums: [
      { name: "Overbloody Flood", year: 1993 },
      { name: "The Trip Continues", year: 2002, project: "Mosaïc" }
    ],
    links: [
      { type: "Discogs", url: "https://www.discogs.com/artist/4754-Blue-Planet-Corporation" },
      { type: "Bandcamp", url: "https://blueplanetcorporation.bandcamp.com/" }
    ],
    tracks: [
      { id: "NCNJHQHzo7w", title: "Overbloody Flood", year: 1993 }
    ]
  },
  {
    id: "merv-eat-static",
    announcedAt: "2026-02-09",
    name: "Merv (Eat Static)",
    realName: "מרב פפלר (Merv Pepler)",
    country: "🇬🇧 בריטניה",
    age: null,
    born: "פעיל משנות ה-90",
    stage: "zambu",
    role: "Live",
    tags: ["Eat Static", "Planet Dog", "Ozric Tentacles"],
    color: "#52b788",
    bio: "מרב פפלר, ממייסדי Eat Static האגדי יחד עם Joie Hinton - הצוות שיצר את המוזיקה האלקטרונית הפסיכדלית הבריטית של שנות ה-90 דרך Planet Dog. גם חבר ב-Ozric Tentacles. הופעה חיה מיוחדת ב-Zambu Temple.",
    notable: "Eat Static / Planet Dog Records - אבות הטכנו פסיכדלי הבריטי",
    albums: [
      { name: "Implant", year: 1994, project: "Eat Static" },
      { name: "Science of the Gods", year: 1997, project: "Eat Static" }
    ],
    links: [
      { type: "Discogs", url: "https://www.discogs.com/artist/4759-Eat-Static" }
    ],
    tracks: [
      { id: "0mgFLx_0iDM", title: "Bony Incus", year: 1994 }
    ]
  },
  {
    id: "cosmosis",
    announcedAt: "2025-12-25",
    name: "Cosmosis",
    realName: "ביל הולסטרום (Cosmosis)",
    country: "🇬🇧 בריטניה",
    age: null,
    born: "פעיל מ-1995",
    stage: "retro",
    role: "Live",
    tags: ["Transient Records", "Holophonic", "Goa Trance"],
    color: "#9b51e0",
    bio: "ביל הולסטרום, אחד היוצרים האהובים בגואה הקלאסי. שחרר את אלבום הביכורים 'Cosmology' (1996) על Transient Records ופתח חותמת משלו - Holophonic. הסטים שלו הם פסים פסיכדליים אופוריים שמרגישים כמו טיסה בחלל.",
    notable: "'Cosmology' (1996, Transient) - יצירת מופת של גואה קלאסי",
    albums: [
      { name: "Cosmology", year: 1996, project: "Transient" },
      { name: "Synergy", year: 1998 },
      { name: "Trip Tych", year: 2002 }
    ],
    links: [
      { type: "Discogs", url: "https://www.discogs.com/artist/11439-Cosmosis" },
      { type: "Bandcamp", url: "https://cosmosis.bandcamp.com/album/cosmology" }
    ],
    tracks: [
      { id: "ilWeV9isl5o", title: "Cannabanoid", year: 1995 }
    ]
  },
  {
    id: "filteria",
    announcedAt: "2025-12-25",
    name: "Filteria",
    realName: "יאניס ציקאס (Filteria)",
    country: "🇬🇷 יוון / 🇸🇪 סטוקהולם",
    age: null,
    born: "פעיל מ-2003",
    stage: "retro",
    role: "Live",
    tags: ["Suntrip", "Goa Revival", "Sky Input"],
    color: "#7209b7",
    bio: "יאניס ציקאס - יווני שמתגורר בסטוקהולם, ממנהיגי תחיית הגואה טראנס. אלבום הביכורים שלו 'Sky Input' (2004, Suntrip) הצית מחדש את הז'אנר וקבע סטנדרט חדש לגואה מלודי-עוצמתי-מסוער. הופעה חיה ב-ZNA 2026.",
    notable: "'Sky Input' (2004, Suntrip) - אלבום מהפכני שהפך לאיקון של גואה הניאו",
    albums: [
      { name: "Sky Input", year: 2004, project: "Suntrip" },
      { name: "Heliopolis", year: 2007 },
      { name: "Daze of Our Lives", year: 2014 }
    ],
    links: [
      { type: "Discogs", url: "https://www.discogs.com/artist/331833-Filteria" },
      { type: "Bandcamp", url: "https://filteria.bandcamp.com/album/sky-input" }
    ],
    tracks: [
      { id: "tGlq2ErFjU8", title: "Sky Input (Full Album)", year: 2004 }
    ]
  },
  {
    id: "sjamadan",
    announcedAt: "2026-03-04",
    name: "Sjamadan",
    realName: "Sjamadan",
    country: "🇩🇰 דנמרק",
    age: null,
    born: "פעיל בסצנה",
    stage: "guardians",
    role: "Vinyl Set",
    tags: ["Vinyl", "Goa Curator"],
    color: "#ef476f",
    bio: "סלקטור גואה ויניל סקנדינבי - חלק מ-Goa Guardians ב-ZNA 2026.",
    notable: "אומן Goa Guardians - שומר המורשת",
    albums: [],
    links: []
  }
];
