// נתוני האומנים של ZNA Gathering 2026
// פסטיבל גואה טראנס רטרו-פוטוריסטי, 15-22 ביולי 2026, ים מונטרגיל, פורטוגל

const FESTIVAL = {
  name: "ZNA Gathering 2026",
  tagline: "The Retro-Futuristic Celebration",
  dates: "15-22 ביולי 2026",
  startsAt: "2026-07-15T00:00:00+01:00",
  endsAt: "2026-07-22T23:59:59+01:00",
  timezone: "Europe/Lisbon",
  location: "ים מונטרגיל, פורטוגל",
  description: "המקדש העולמי של גואה טראנס בסגנון הישן. פסטיבל דו-שנתי עם כ-5,000 משתתפים בלבד שחוגג את רוח אנג'ונה של שנות ה-90.",
  stages: [
    { id: "retro", name: "Retro Universe", desc: "במה ראשית - גואה טראנס קלאסי" },
    { id: "zambu", name: "Zambu Temple", desc: "מקדש הריקודים - 24 שעות פסיכדליה רצופות" },
    { id: "guardians", name: "Goa Guardians", desc: "במת הוויניל - שומרי הסאונד הישן" },
    { id: "market", name: "Market", desc: "במת חימום ושוק" }
  ]
};

const ARTIST_SCHEDULE = {
  // Fill when official set times are known:
  // "yahel": { start: "2026-07-20T04:00:00+01:00", end: "2026-07-20T06:00:00+01:00" }
};

let ARTISTS = [
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
      { id: "NnDXKyVj148", title: "Producer set @ ZNA 2022 (Zambu Temple)", year: 2022, zna: true },
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
      { id: "XYKHlV2rd60", title: "Full 3h classics set @ ZNA 2019", year: 2019, zna: true },
      { id: "BkvxkraxaNU", title: "Dancefloor Action @ ZNA 2022", year: 2022, zna: true },
      { id: "58dnkJqQQu8", title: "Get the party started @ ZNA 2022", year: 2022, zna: true },
      { id: "cKsA8Vsb02c", title: "Live @ ZNA 2022", year: 2022, zna: true },
      { id: "MFd7_zTci_g", title: "Prana - Geomantik", year: 1997 },
      { id: "Oo9lag7Bz5o", title: "Prana - Geomantik (Full Album)", year: 1997 }
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
      { id: "SaVxeY7cPo0", title: "Live @ ZNA Gathering 2024", year: 2024, zna: true },
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
      { id: "nMdUHczq3Pc", title: "Live @ The Market - ZNA 2024", year: 2024, zna: true },
      { id: "bwoya2jEB3k", title: "Live @ ZNA Gathering 2013", year: 2013, zna: true },
      { id: "hB9lYBllghc", title: "Flying Rhino Mix 1995", year: 1995 },
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
    bio: "נוכחות פעילה בסצנה הפורטוגזית כבר 30 שנה. אומן בלתי רגיל ביצירת סיפורים מהטראקים הגדולים של שנות ה-90 - יודע איך לקחת את הקהל למסע מעוצב ועמוק שמרגיש כמו זמן ומקום אחר. שותף-מייסד של ZNA Gathering.",
    notable: "מאסטר של 'Goa Guardians' - שומרי המורשת. ממקימי הפסטיבל",
    albums: [
      { name: "DJ sets קלאסיים", year: "מתמשך" }
    ],
    links: [],
    tracks: [
      { id: "UU6gRA3ULjs", title: "Goa Guardians DJ Set @ ZNA 2017", year: 2017, zna: true },
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
      { id: "ykBk7w50b1s", title: "DJ Set @ ZNA Gathering 2017", year: 2017, zna: true },
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
      { id: "yjWWicu-EHI", title: "DJ Set @ ZNA Gathering 2019", year: 2019, zna: true },
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
      { id: "s9T6noBLRGw", title: "B2B Ka-Sol live @ ZNA Gathering 2019 (4h producer set)", year: 2019, zna: true },
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
    ],
    tracks: [
      { id: "3nEsTMApDdc", title: "Live @ Goa Guardians - ZNA 2024", year: 2024, zna: true }
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
      { id: "Qb7LSlsl1mI", title: "Closing the Zambu Temple @ ZNA 2024", year: 2024, zna: true },
      { id: "GZsbynvptSw", title: "Live @ ZNA 2022 (Part 2)", year: 2022, zna: true },
      { id: "TpWlPKBs64w", title: "Closing Party @ ZNA 2019 (Part 2)", year: 2019, zna: true },
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

// Verified streaming channel URLs + representedBy (label / booking).
// Merged onto each artist record at boot in app.js. Filled per artist by a
// research pass; some artists with no clearly-verified official channel
// are omitted intentionally — the UI then falls back to a search URL.
const ARTIST_EXTRAS = {
  "yahel": {
    representedBy: "HOMmega Productions",
    channels: {
      spotify: "https://open.spotify.com/artist/7CHdJ8rVKe6cez9PKlpKrF",
      youtube: "https://www.youtube.com/@DJYahelMusic",
      soundcloud: "https://soundcloud.com/djyahel"
    }
  },
  "tsuyoshi-suzuki": {
    representedBy: "Matsuri Digital",
    channels: {
      spotify: "https://open.spotify.com/artist/6FPDZzGbAgGNYUZgj0QozQ",
      soundcloud: "https://soundcloud.com/matsuritsuyoshi",
      youtube: "https://www.youtube.com/channel/UCjuPV5iw7ZON7B9nrHhpAGg"
    }
  },
  "kris-kylven": {
    representedBy: "self-released (Bandcamp); historically Dragonfly Records",
    channels: { spotify: "https://open.spotify.com/artist/1735Dsr0jq46SzEgVoNQ4u" }
  },
  "simon-ghahary": {
    representedBy: "Blue Room Released / Blue Room Sounds",
    channels: {}
  },
  "ray-castle": {
    representedBy: "self-managed",
    channels: { soundcloud: "https://soundcloud.com/raycastle" }
  },
  "robert-leiner": {
    representedBy: "Apollo Records (R&S)",
    channels: {
      spotify: "https://open.spotify.com/artist/3rQBSwv53vH5WgPz4YDill",
      soundcloud: "https://soundcloud.com/robert-leiner-official"
    }
  },
  "sean-williams": {
    representedBy: "self-managed (ex-Spirit Zone / Slinky Wizard)",
    channels: { soundcloud: "https://soundcloud.com/seanwilliamsofficial" }
  },
  "james-monro": {
    representedBy: "Nano Records / Flying Rhino",
    channels: {
      spotify: "https://open.spotify.com/artist/5Q7y5nc9bp7vFHhTskDUPy",
      soundcloud: "https://soundcloud.com/jamesmonro"
    }
  },
  "joti-sidhu": {
    representedBy: "self-managed (Psychaos Recordings)",
    channels: { soundcloud: "https://soundcloud.com/jotisidhu" }
  },
  "extrawelt": {
    representedBy: "Cocoon Recordings",
    channels: {
      spotify: "https://open.spotify.com/artist/3VRvi42U8SsiT4YKP5LNCB",
      youtube: "https://www.youtube.com/channel/UC59ouHBVkicjgFD_0C2vPtA"
    }
  },
  "mathew-jonson": {
    representedBy: "Wagon Repair · LittleBig Music Agency booking",
    channels: {
      spotify: "https://open.spotify.com/artist/6PTy8QkZxHr7Thp8SPYE71",
      soundcloud: "https://soundcloud.com/mathew-jonson",
      applemusic: "https://music.apple.com/us/artist/mathew-jonson/196558699"
    }
  },
  "gabriel-le-mar": {
    representedBy: "Liquid Sound Design (Saafi Brothers)",
    channels: {
      spotify: "https://open.spotify.com/artist/1E3U6xaEyLnpqVFO3x5fIN",
      soundcloud: "https://soundcloud.com/saafibrothers",
      youtube: "https://www.youtube.com/channel/UCpTcRRpmkDGjBETUCJPjFow"
    }
  },
  "psara": {
    representedBy: "self-managed (Dino Psaras)",
    channels: {
      spotify: "https://open.spotify.com/artist/3k6WtSml3aARRUNPOe4TVp",
      soundcloud: "https://soundcloud.com/dino-psaras"
    }
  },
  "ukiro": {
    representedBy: "self-released",
    channels: {
      spotify: "https://open.spotify.com/artist/1oA60VFXfTHSSAofApL74t",
      soundcloud: "https://soundcloud.com/ukiro"
    }
  },
  "damir-ludvig": {
    representedBy: "self-managed (Astralis events, Zagreb)",
    channels: {}
  },
  "alex-tolstey": {
    representedBy: "Boshke Beats Records",
    channels: { soundcloud: "https://soundcloud.com/boshkebeatsrecords" }
  },
  "alien-rain": {
    representedBy: "Alien Rain Records (self-run)",
    channels: { soundcloud: "https://soundcloud.com/do-not-resist-the-beat" }
  },
  "anais-lin": {
    representedBy: "self-managed",
    channels: { soundcloud: "https://soundcloud.com/anaislin" }
  },
  "marc-van-der-vlugt": {
    representedBy: "Psilowave Records",
    channels: {}
  },
  "solitare": {
    representedBy: "Matsuri Digital · DAT Records",
    channels: { soundcloud: "https://soundcloud.com/djsolitare" }
  },
  "ree-k": {
    representedBy: "Matsuri Digital",
    channels: {
      spotify: "https://open.spotify.com/artist/5ByduiQHKIfWdakyYeaVZC",
      soundcloud: "https://soundcloud.com/ree-k2013"
    }
  },
  "klil-co": {
    representedBy: "self-managed",
    channels: { soundcloud: "https://soundcloud.com/klil-cohen-38185142" }
  },
  "triple-distilled": {
    representedBy: "Boshke Beats Records",
    channels: { soundcloud: "https://soundcloud.com/boshkebeatsrecords" }
  },
  "e-sko": {
    representedBy: "self-managed",
    channels: { soundcloud: "https://soundcloud.com/e-sko" }
  },
  "sancho-meiso": {
    representedBy: "self-managed",
    channels: {
      spotify: "https://open.spotify.com/artist/5R2atQNZwxCphuQxWh7LGn",
      soundcloud: "https://soundcloud.com/sanchomeisochaya"
    }
  },
  "graham-wood": {
    representedBy: "TIP Records",
    channels: {}
  },
  "orion-borelli": {
    representedBy: "Zion 604 / TesseracTstudio",
    channels: { soundcloud: "https://soundcloud.com/orion_psy" }
  },
  "takeshi-isogai": {
    representedBy: "Suntrip Records / Zion 604 Records",
    channels: {
      spotify: "https://open.spotify.com/artist/4ExGofvDZsrxku9DDoO3rK",
      soundcloud: "https://soundcloud.com/ubar-tmar"
    }
  },
  "battle-future-buddhas": {
    representedBy: "Suntrip Records",
    channels: { spotify: "https://open.spotify.com/artist/3gy1NMglkqMhyS7y8mlxQc" }
  },
  "dark-el-kante": {
    representedBy: "Random Records · 6 Dimension Soundz",
    channels: { soundcloud: "https://soundcloud.com/darkelkante" }
  },
  "merrow": {
    representedBy: "Global Sect Music",
    channels: {
      spotify: "https://open.spotify.com/artist/6lMwUV4nVScxzSAQYX4JNF",
      soundcloud: "https://soundcloud.com/merrow416"
    }
  },
  "atmos": {
    representedBy: "Iboga Records / Spiral Trax",
    channels: {
      spotify: "https://open.spotify.com/artist/6pqvOCqzJlsUWlVjeHBw0v",
      soundcloud: "https://soundcloud.com/atmotech"
    }
  },
  "alphanaut": {
    representedBy: "self-released",
    channels: {
      spotify: "https://open.spotify.com/artist/6kUvdxucEVxa2njpAdNhBm",
      soundcloud: "https://soundcloud.com/alphanaut"
    }
  },
  "blue-planet-corporation": {
    representedBy: "self-managed (ex-Flying Rhino) · Echo Booking",
    channels: {
      spotify: "https://open.spotify.com/artist/4pIoxLfPD98PSY4Vd6koKn",
      soundcloud: "https://soundcloud.com/blue-planet-corporation"
    }
  },
  "merv-eat-static": {
    representedBy: "self-managed (Eat Static)",
    channels: {
      spotify: "https://open.spotify.com/artist/5NzgIP3Nss2uao20MDXavK",
      soundcloud: "https://soundcloud.com/eat-static",
      youtube: "https://www.youtube.com/channel/UCWt6ad08bK9wSbf0oBylaAA"
    }
  },
  "cosmosis": {
    representedBy: "Holophonic Records (self-run)",
    channels: {
      spotify: "https://open.spotify.com/artist/2Wrq8GQOVU5fxs791ypz0W",
      soundcloud: "https://soundcloud.com/cosmosis-official",
      youtube: "https://www.youtube.com/c/BillyCosmosis"
    }
  },
  "filteria": {
    representedBy: "Suntrip Records",
    channels: { spotify: "https://open.spotify.com/artist/1GYwH0iIUKPlyhrcSq8rJ8" }
  }
};


// Per-artist translations: bio / notable / country / born in EN and PT.
// HE versions live on the source ARTISTS records — these are the additions.
// Merged in app.js at boot via tArtist().
const ARTIST_TRANSLATIONS = {
  "yahel": {
    "en": {
      "bio": "Yahel Sherman, one of the most beloved producers in the Israeli trance scene. He started DJing at 14 and in the 90s crafted euphoric trance moments with melodies that became immortal. At ZNA he closes the 24 hours of Zambu Temple — the peak experience of the festival.",
      "notable": "Signed to the legendary HOMmega label of the late Eyal Yankovich",
      "country": "🇮🇱 Israel",
      "born": "12.5.1976"
    },
    "pt": {
      "bio": "Yahel Sherman, um dos produtores mais queridos da cena trance israelita. Começou a fazer DJ aos 14 anos e nos anos 90 criou momentos de trance eufóricos com melodias que se tornaram imortais. No ZNA fecha as 24 horas do Zambu Temple — a experiência culminante do festival.",
      "notable": "Assinou pela lendária editora HOMmega do falecido Eyal Yankovich",
      "country": "🇮🇱 Israel",
      "born": "12.5.1976"
    }
  },
  "tsuyoshi-suzuki": {
    "en": {
      "bio": "A psychedelic samurai from the Land of the Rising Sun. A living Goa Trance legend — moved to London in 1992 and founded Matsuri Productions, which became one of the most influential labels in the genre's history. He played the historic Return To The Source parties and came back to launch Matsuri Digital in 2009 to bring the sound to a new generation.",
      "notable": "Founder of Matsuri Productions / Matsuri Digital, member of Prana",
      "country": "🇯🇵 Japan (London)",
      "born": "1967"
    },
    "pt": {
      "bio": "Um samurai psicadélico da Terra do Sol Nascente. Uma lenda viva do Goa Trance — mudou-se para Londres em 1992 e fundou a Matsuri Productions, que se tornou uma das editoras mais influentes da história do género. Tocou nas históricas festas Return To The Source e regressou para lançar a Matsuri Digital em 2009, levando o som a uma nova geração.",
      "notable": "Fundador da Matsuri Productions / Matsuri Digital, membro dos Prana",
      "country": "🇯🇵 Japão (Londres)",
      "born": "1967"
    }
  },
  "kris-kylven": {
    "en": {
      "bio": "Producer, composer, electronic drummer and visual artist. In 1995 he became a Goa Trance pioneer with mythical projects: Syb Unity Nettwerk, UX (with Pete Martin), Element Over Nature and Odds. At ZNA he crafts the celestial transition between night and day with the classic sound he shaped in mid-90s London.",
      "notable": "One of the genre's founding fathers. Signed to Transient, Flying Rhino, Sirius",
      "country": "🇸🇪 Sweden / 🇫🇷 France",
      "born": "active since 1995"
    },
    "pt": {
      "bio": "Produtor, compositor, baterista electrónico e artista visual. Em 1995 tornou-se um pioneiro do Goa Trance com projectos míticos: Syb Unity Nettwerk, UX (com Pete Martin), Element Over Nature e Odds. No ZNA cria a transição celestial entre noite e dia com o som clássico que moldou na Londres de meados dos anos 90.",
      "notable": "Um dos pais do género. Assinou pela Transient, Flying Rhino, Sirius",
      "country": "🇸🇪 Suécia / 🇫🇷 França",
      "born": "ativo desde 1995"
    }
  },
  "simon-ghahary": {
    "en": {
      "bio": "A massive and influential force in the 90s psychedelic music scene. In 1994 he founded the legendary London label Blue Room Released, which transformed the face of Goa Trance. Under his stewardship came groundbreaking albums by Juno Reactor, Total Eclipse, Koxbox, X-Dream and Saafi Brothers. He brought freshness and new experiments that pushed the genre beyond 'classic Goa'.",
      "notable": "Founder of Blue Room Released — one of the most important labels in psytrance history",
      "country": "🇬🇧 UK",
      "born": "12.5.1972"
    },
    "pt": {
      "bio": "Uma força enorme e influente na cena de música psicadélica dos anos 90. Em 1994 fundou a lendária editora londrina Blue Room Released, que transformou a cara do Goa Trance. Sob a sua direcção saíram álbuns inovadores dos Juno Reactor, Total Eclipse, Koxbox, X-Dream e Saafi Brothers. Trouxe frescura e novas experiências que levaram o género para além do 'Goa clássico'.",
      "notable": "Fundador da Blue Room Released — uma das editoras mais importantes da história do psytrance",
      "country": "🇬🇧 Reino Unido",
      "born": "12.5.1972"
    }
  },
  "ray-castle": {
    "en": {
      "bio": "Since 1987, one of the most influential DJs at the early Goa parties in India — blending house, breaks, dub, techno and rock into a hybrid sound from which Goa psytrance was born in the early 90s. He brought the outdoor party concept to Japan in 1988 and is considered one of the founders of the Australian trance scene.",
      "notable": "Projects: Rhythmystic, Masaray, Insectoid, Mantaray. Author of 'Moon Juice Stomper'",
      "country": "🇳🇿 New Zealand",
      "born": "active since the late 60s"
    },
    "pt": {
      "bio": "Desde 1987, um dos DJs mais influentes nas primeiras festas de Goa na Índia — misturava house, breaks, dub, techno e rock num som híbrido do qual nasceu o Goa psytrance no início dos anos 90. Levou o conceito de festas ao ar livre para o Japão em 1988 e é considerado um dos fundadores da cena trance australiana.",
      "notable": "Projectos: Rhythmystic, Masaray, Insectoid, Mantaray. Autor de 'Moon Juice Stomper'",
      "country": "🇳🇿 Nova Zelândia",
      "born": "ativo desde finais dos anos 60"
    }
  },
  "robert-leiner": {
    "en": {
      "bio": "A Swedish legend who transformed European techno. He released on the legendary Belgian R&S Records in the early 90s, putting out masterpieces of acid techno and trance. Today, from his base in Gothenburg, he plays live modular sets that blend warm ambient with deep techno.",
      "notable": "Debut album 'Organized Noise' — a masterpiece of pure acid techno",
      "country": "🇸🇪 Sweden",
      "born": "1.8.1966"
    },
    "pt": {
      "bio": "Uma lenda sueca que transformou a techno europeia. Lançou pela lendária editora belga R&S Records no início dos anos 90 e produziu obras-primas de acid techno e trance. Hoje, a partir da sua base em Gotemburgo, toca sets modulares ao vivo que misturam ambient quente com techno profunda.",
      "notable": "Álbum de estreia 'Organized Noise' — uma obra-prima de acid techno puro",
      "country": "🇸🇪 Suécia",
      "born": "1.8.1966"
    }
  },
  "sean-williams": {
    "en": {
      "bio": "The creative force behind the beloved Process and Satori projects. One of the founders of Goa Trance who shaped the genre's evolution with innovative soundscapes. Worked in the studio with James Monro, Simon Posford (Hallucinogen), Tristan and Tsuyoshi Suzuki. Also a member of the Beast project with Hallucinogen.",
      "notable": "Satori with Pete Martin — one of the iconic Goa projects",
      "country": "🇬🇧 UK",
      "born": "active since the 90s"
    },
    "pt": {
      "bio": "A força criativa por trás dos amados projectos Process e Satori. Um dos fundadores do Goa Trance que moldou a evolução do género com paisagens sonoras inovadoras. Trabalhou em estúdio com James Monro, Simon Posford (Hallucinogen), Tristan e Tsuyoshi Suzuki. Também membro do projecto Beast com Hallucinogen.",
      "notable": "Satori com Pete Martin — um dos projectos icónicos do Goa",
      "country": "🇬🇧 Reino Unido",
      "born": "ativo desde os anos 90"
    }
  },
  "james-monro": {
    "en": {
      "bio": "Co-founder of the legendary Flying Rhino Records label (1995). He lived through the early days of acid house and the summer waves of '88-'89, the Goa beaches in the early 90s, and on through the global festival circuit. Hundreds of releases to his name — a prolific creator with a psychedelic touch in every style.",
      "notable": "Flying Rhino Records — home of British psytrance in the 90s",
      "country": "🇬🇧 UK / 🇧🇷 Brazil",
      "born": "active since 1988"
    },
    "pt": {
      "bio": "Cofundador da lendária editora Flying Rhino Records (1995). Viveu os primeiros dias do acid house e as ondas de Verão de 88-89, as praias de Goa no início dos anos 90 e o circuito global de festivais. Centenas de lançamentos no seu nome — um criador prolífico com um toque psicadélico em todos os estilos.",
      "notable": "Flying Rhino Records — a casa do psytrance britânico nos anos 90",
      "country": "🇬🇧 Reino Unido / 🇧🇷 Brasil",
      "born": "ativo desde 1988"
    }
  },
  "joti-sidhu": {
    "en": {
      "bio": "One of the pioneers of psychedelic trance. Acid house in 1988 pulled him into the world of electronic music, and he started DJing in Brighton at 17. In 1993 he produced and created Ayahuasca with Steve Ronan and Dino Psaras, and in 1994 he launched the solo project Psychaos, which deeply influenced the Goa and psytrance scene that followed.",
      "notable": "Psychaos — one of the most respected projects of classic Goa",
      "country": "🇬🇧 UK",
      "born": "active since 1988"
    },
    "pt": {
      "bio": "Um dos pioneiros do psytrance. O acid house em 1988 puxou-o para o mundo da música electrónica e começou a fazer DJ em Brighton aos 17 anos. Em 1993 produziu e criou os Ayahuasca com Steve Ronan e Dino Psaras, e em 1994 lançou o projecto a solo Psychaos, que influenciou profundamente a cena Goa e psytrance que se seguiu.",
      "notable": "Psychaos — um dos projectos mais respeitados do Goa clássico",
      "country": "🇬🇧 Reino Unido",
      "born": "ativo desde 1988"
    }
  },
  "extrawelt": {
    "en": {
      "bio": "A Hamburg duo who started in 2000 as Midi Miliz in psytrance, and from 2005 broke through as Extrawelt into minimal techno, releasing on James Holden's Border Community and other top-tier labels. Their ZNA set crosses the line between retro and futuristic.",
      "notable": "Soopertrack — the single that launched them in a big way on James Holden's label",
      "country": "🇩🇪 Germany",
      "born": "active since 2005"
    },
    "pt": {
      "bio": "Um duo de Hamburgo que começou em 2000 como Midi Miliz no psytrance, e a partir de 2005 entrou em força como Extrawelt no minimal techno, lançando na Border Community de James Holden e em outras editoras de topo. O set deles no ZNA cruza fronteiras entre o retro e o futurista.",
      "notable": "Soopertrack — o single que os lançou em grande na editora de James Holden",
      "country": "🇩🇪 Alemanha",
      "born": "ativos desde 2005"
    }
  },
  "mathew-jonson": {
    "en": {
      "bio": "One of the most distinctive voices in modern dance music. A classical pianist and jazz drummer from childhood, he got his hands on synthesizers at age 9 with help from his musician father. Co-founder of the Wagon Repair label. His love of analog gear and real-time playing turns his shows into unique, living experiences.",
      "notable": "Co-founder of Wagon Repair, member of Cobblestone Jazz",
      "country": "🇨🇦 Canada / 🇩🇪 Berlin",
      "born": "Vancouver"
    },
    "pt": {
      "bio": "Uma das vozes mais distintas da música de dança moderna. Pianista clássico e baterista de jazz desde a infância, pôs as mãos em sintetizadores aos 9 anos com a ajuda do pai músico. Cofundador da editora Wagon Repair. O seu gosto por equipamento analógico e por tocar em tempo real transforma os seus concertos em experiências vivas e únicas.",
      "notable": "Cofundador da Wagon Repair, membro dos Cobblestone Jazz",
      "country": "🇨🇦 Canadá / 🇩🇪 Berlim",
      "born": "Vancouver"
    }
  },
  "gabriel-le-mar": {
    "en": {
      "bio": "From Frankfurt. In 1996, after travels in India, he founded Saafi Brothers with Michael Kohlbecker and Groovetitan to explore spiritual flight zones in exotic club settings. Their sound — smoky, contemplative ambient dub — first came out on Blue Room Released. In live performances he plays guitars, bass and dub mixer.",
      "notable": "Saafi Brothers — cornerstones of psybient and chill-out",
      "country": "🇩🇪 Germany",
      "born": "active since 1993"
    },
    "pt": {
      "bio": "De Frankfurt. Em 1996, após viagens pela Índia, fundou os Saafi Brothers com Michael Kohlbecker e Groovetitan para explorar zonas de voo espiritual em ambientes de clube exóticos. O som deles — ambient dub fumarento e contemplativo — saiu primeiro na Blue Room Released. Em concerto toca guitarras, baixo e dub mixer.",
      "notable": "Saafi Brothers — pedras angulares do psybient e do chill-out",
      "country": "🇩🇪 Alemanha",
      "born": "ativo desde 1993"
    }
  },
  "psara": {
    "en": {
      "bio": "An active presence in the Portuguese scene for 30 years. An extraordinary craftsman at telling stories with the great tracks of the 90s — he knows how to take the crowd on a sculpted, deep journey that feels like another time and place. Co-founder of ZNA Gathering.",
      "notable": "Master of 'Goa Guardians' — keepers of the legacy. Co-founder of the festival",
      "country": "🇵🇹 Portugal",
      "born": "30 years in the scene"
    },
    "pt": {
      "bio": "Uma presença activa na cena portuguesa há 30 anos. Um artesão extraordinário a contar histórias com os grandes temas dos anos 90 — sabe levar o público numa viagem esculpida e profunda que parece outro tempo e outro lugar. Cofundador do ZNA Gathering.",
      "notable": "Mestre dos 'Goa Guardians' — guardiões do legado. Cofundador do festival",
      "country": "🇵🇹 Portugal",
      "born": "30 anos na cena"
    }
  },
  "ukiro": {
    "en": {
      "bio": "A powerful presence in the Swedish Goa scene since the early 90s. Known for his enormous record collection and encyclopedic knowledge. He has played all-vinyl sets across Europe, the US and Mexico.",
      "notable": "One of the most respected record collectors in the scene",
      "country": "🇸🇪 Sweden",
      "born": "active since the early 90s"
    },
    "pt": {
      "bio": "Uma presença poderosa na cena Goa sueca desde o início dos anos 90. Conhecido pela sua enorme colecção de discos e pelo conhecimento enciclopédico. Tocou sets de vinil pela Europa, EUA e México.",
      "notable": "Um dos coleccionadores de discos mais respeitados da cena",
      "country": "🇸🇪 Suécia",
      "born": "ativo desde o início dos anos 90"
    }
  },
  "damir-ludvig": {
    "en": {
      "bio": "One of the strong voices of Croatian Goa. Reuniting with Goran Stetic at ZNA 2026 — going back to the music they made in the 90s and sharpening it for the advanced sound system of Zambu Temple.",
      "notable": "B2B with Goran Stetic — a reunion of the Croatian legend",
      "country": "🇭🇷 Croatia",
      "born": "active since the 90s"
    },
    "pt": {
      "bio": "Uma das vozes fortes do Goa croata. Reúne-se de novo com Goran Stetic no ZNA 2026 — regressam à música que criaram nos anos 90 e afinam-na para o sistema de som avançado do Zambu Temple.",
      "notable": "B2B com Goran Stetic — reunião da lenda croata",
      "country": "🇭🇷 Croácia",
      "born": "ativo desde os anos 90"
    }
  },
  "goran-stetic": {
    "en": {
      "bio": "One of the icons of Goa Trance in Croatia. Reuniting with Damir Ludvig for a special set at ZNA — a journey into treasures that haven't been heard in a long time.",
      "notable": "B2B with Damir Ludvig — a historic encounter",
      "country": "🇭🇷 Croatia",
      "born": "active since the 90s"
    },
    "pt": {
      "bio": "Um dos ícones do Goa Trance na Croácia. Reúne-se de novo com Damir Ludvig para um set especial no ZNA — uma viagem por tesouros que há muito não se ouviam.",
      "notable": "B2B com Damir Ludvig — um encontro histórico",
      "country": "🇭🇷 Croácia",
      "born": "ativo desde os anos 90"
    }
  },
  "dogma": {
    "en": {
      "bio": "The most internationally recognised Croatian Goa project. In 1997 they released their iconic debut album 'Land of Utopia' on the British Blue Moon label. They played London's Brixton Academy, the Roxy in New York, Lust in Tokyo, Dynamo Dvash in Tel Aviv, and in front of 700,000 people at Germany's Love Parade. After years apart, they're reuniting especially for ZNA 2026.",
      "notable": "'Land of Utopia' (1997, Blue Moon) — a cornerstone of European Goa",
      "country": "🇭🇷 Croatia",
      "born": "1996"
    },
    "pt": {
      "bio": "O projecto Goa croata com maior reconhecimento internacional. Em 1997 lançaram o icónico álbum de estreia 'Land of Utopia' pela editora britânica Blue Moon. Tocaram no Brixton Academy em Londres, no Roxy em Nova Iorque, no Lust em Tóquio, no Dynamo Dvash em Telavive e perante 700 000 pessoas na Love Parade alemã. Após anos separados, reúnem-se especialmente para o ZNA 2026.",
      "notable": "'Land of Utopia' (1997, Blue Moon) — pedra angular do Goa europeu",
      "country": "🇭🇷 Croácia",
      "born": "1996"
    }
  },
  "alex-tolstey": {
    "en": {
      "bio": "Founder and head of Boshke Beats Records (active since 2001). A legend of the scene's free-thinking — moves through rock, disco, techno, electro and trance in a single flow. In recent years he also performs under the project Triple Distilled Disco Squad — 'Slow disco-techno from beyond'.",
      "notable": "Founder of Boshke Beats Records — a cult psytrance label",
      "country": "🇪🇪 Estonia",
      "born": "active since 2001"
    },
    "pt": {
      "bio": "Fundador e responsável da Boshke Beats Records (activa desde 2001). Uma lenda do pensamento livre na cena — atravessa rock, disco, techno, electro e trance num único fluxo. Nos últimos anos actua também sob o projecto Triple Distilled Disco Squad — 'Slow disco-techno from beyond'.",
      "notable": "Fundador da Boshke Beats Records — uma editora de culto do psytrance",
      "country": "🇪🇪 Estónia",
      "born": "ativo desde 2001"
    }
  },
  "alien-rain": {
    "en": {
      "bio": "The acid-techno project of Berlin's Milton Bradley. He has dedicated his career to reviving the raw energy of 90s 303 acid with a modern experimental edge. Releases on his own label Alien Communications, as well as on Mord and Out of Place. A respected name in the Berlin underground scene.",
      "notable": "The vinyl-only EP series 'Alien Rain I-VI' — a contemporary acid techno classic",
      "country": "🇩🇪 Berlin",
      "born": "active in the scene"
    },
    "pt": {
      "bio": "O projecto acid-techno de Milton Bradley, de Berlim. Dedica a carreira a fazer renascer a energia crua do acid 303 dos anos 90 com um lado experimental moderno. Lança na sua própria editora Alien Communications e também na Mord e na Out of Place. Um nome respeitado na cena underground berlinense.",
      "notable": "A série de EPs só em vinil 'Alien Rain I-VI' — um clássico contemporâneo do acid techno",
      "country": "🇩🇪 Berlim",
      "born": "ativo na cena"
    }
  },
  "anais-lin": {
    "en": {
      "bio": "A selector with an extraordinary ear — Goa, progressive and trance with French elegance.",
      "notable": "Retro Universe artist",
      "country": "🇫🇷 France",
      "born": "active in the scene"
    },
    "pt": {
      "bio": "Uma selectora com um ouvido extraordinário — Goa, progressive e trance com elegância francesa.",
      "notable": "Artista do Retro Universe",
      "country": "🇫🇷 França",
      "born": "ativa na cena"
    }
  },
  "extra-cheers": {
    "en": {
      "bio": "A Retro Universe artist — part of ZNA 2026's retro Goa journey.",
      "notable": "Retro Universe",
      "country": "🌍 International",
      "born": "active in the scene"
    },
    "pt": {
      "bio": "Artista do Retro Universe — faz parte da viagem retro Goa do ZNA 2026.",
      "notable": "Retro Universe",
      "country": "🌍 Internacional",
      "born": "ativo na cena"
    }
  },
  "marc-van-der-vlugt": {
    "en": {
      "bio": "A veteran DJ from the early 90s psychedelic scene — blending industrial soundscapes with heavy psychedelic atmospheres. Worked as a promoter for the British labels Blue Room Released and Atomic Records. He withdrew in 2000 and returned to the scene after being invited to ZNA Gathering 2020.",
      "notable": "1998 album 'Behind The Scenes' (Psilowave) — a milestone of tech-psy",
      "country": "🇳🇱 Netherlands",
      "born": "active since the early 90s"
    },
    "pt": {
      "bio": "Um DJ veterano da cena psicadélica do início dos anos 90 — misturava paisagens sonoras industriais com atmosferas psicadélicas pesadas. Trabalhou como promotor das editoras britânicas Blue Room Released e Atomic Records. Retirou-se em 2000 e regressou à cena depois de ser convidado para o ZNA Gathering 2020.",
      "notable": "O álbum de 1998 'Behind The Scenes' (Psilowave) — um marco do tech-psy",
      "country": "🇳🇱 Países Baixos",
      "born": "ativo desde o início dos anos 90"
    }
  },
  "solitare": {
    "en": {
      "bio": "A classically trained pianist who fell into psytrance in Tokyo in 1994 and became one of the key selectors of root-deep 90s Goa Trance. Co-producer and DJ for Italy's DAT Records and international representative of Matsuri Digital. His vinyl-only sets have made him a fixture at Zambu Temple and at retro parties around the world.",
      "notable": "Marathon vinyl sets — an asset of the retro scene",
      "country": "🇨🇦 Canada (Vancouver)",
      "born": "1994"
    },
    "pt": {
      "bio": "Um pianista de formação clássica que caiu no psytrance em Tóquio em 1994 e se tornou um dos selectores-chave do Goa Trance de raiz dos anos 90. Coprodutor e DJ na italiana DAT Records e representante internacional da Matsuri Digital. Os seus sets só em vinil tornaram-no presença habitual no Zambu Temple e em festas retro por todo o mundo.",
      "notable": "Sets maratona em vinil — um trunfo da cena retro",
      "country": "🇨🇦 Canadá (Vancouver)",
      "born": "1994"
    }
  },
  "earl-peal": {
    "en": {
      "bio": "A Retro Universe artist at ZNA 2026.",
      "notable": "Retro Universe",
      "country": "🌍 International",
      "born": "active in the scene"
    },
    "pt": {
      "bio": "Artista do Retro Universe no ZNA 2026.",
      "notable": "Retro Universe",
      "country": "🌍 Internacional",
      "born": "ativo na cena"
    }
  },
  "isoquant": {
    "en": {
      "bio": "A retro Goa artist with a live performance at ZNA 2026.",
      "notable": "Retro Universe",
      "country": "🌍 International",
      "born": "active in the scene"
    },
    "pt": {
      "bio": "Um artista de Goa retro com actuação ao vivo no ZNA 2026.",
      "notable": "Retro Universe",
      "country": "🌍 Internacional",
      "born": "ativo na cena"
    }
  },
  "gabi-von-dub": {
    "en": {
      "bio": "A Portuguese DJ and producer working from Arctic Dub studio — specialising in ambient, post-dub techno and dub-inspired experimental electronics. Curator and central pillar of the Arctic Dub label (Sursumcorda), active in the Portuguese underground dub and bass community.",
      "notable": "The 'Arctic Dub Sursumcorda' compilation series — a cornerstone of Portuguese dub",
      "country": "🇵🇹 Portugal",
      "born": "active in the scene"
    },
    "pt": {
      "bio": "DJ e produtor português que trabalha a partir do estúdio Arctic Dub — especializa-se em ambient, post-dub techno e electrónica experimental inspirada no dub. Curador e pilar central da editora Arctic Dub (Sursumcorda), activo na comunidade underground portuguesa de dub e bass.",
      "notable": "A série de compilações 'Arctic Dub Sursumcorda' — pedra angular do dub português",
      "country": "🇵🇹 Portugal",
      "born": "ativo na cena"
    }
  },
  "ree-k": {
    "en": {
      "bio": "A pioneering Japanese DJ and producer — playing since 1992 and part of the extended Matsuri Productions/Digital family that helped seed the Japanese psytrance scene. In 2002 she founded the Hypnodisk label. Her artistic philosophy aims at conscious transformation through sound. She sometimes performs with her partner Masa as the duo Kinocosmo.",
      "notable": "'Yammataikoku' album (1996, Psy-Harmonics) — a cornerstone of Japanese Goa",
      "country": "🇯🇵 Japan",
      "born": "active since 1992"
    },
    "pt": {
      "bio": "Uma DJ e produtora japonesa pioneira — toca desde 1992 e faz parte da família alargada da Matsuri Productions/Digital que ajudou a semear a cena psytrance japonesa. Em 2002 fundou a editora Hypnodisk. A sua filosofia artística aponta para a transformação da consciência através do som. Por vezes actua com o seu parceiro Masa no duo Kinocosmo.",
      "notable": "O álbum 'Yammataikoku' (1996, Psy-Harmonics) — pedra angular do Goa japonês",
      "country": "🇯🇵 Japão",
      "born": "ativa desde 1992"
    }
  },
  "klil-co": {
    "en": {
      "bio": "A Retro Universe selector — part of the ZNA 2026 family.",
      "notable": "Retro Universe",
      "country": "🌍 International",
      "born": "active in the scene"
    },
    "pt": {
      "bio": "Selector do Retro Universe — faz parte da família ZNA 2026.",
      "notable": "Retro Universe",
      "country": "🌍 Internacional",
      "born": "ativo na cena"
    }
  },
  "mathew-tecnica": {
    "en": {
      "bio": "A live Goa project — part of the Retro Universe lineup at ZNA 2026.",
      "notable": "Retro Universe",
      "country": "🌍 International",
      "born": "active in the scene"
    },
    "pt": {
      "bio": "Projecto Goa ao vivo — faz parte do alinhamento do Retro Universe no ZNA 2026.",
      "notable": "Retro Universe",
      "country": "🌍 Internacional",
      "born": "ativo na cena"
    }
  },
  "triple-distilled": {
    "en": {
      "bio": "The freestyle DJ project of Alex 'Boshke' Tolstey, founder of Boshke Beats Records (active since 2001). The set is unplanned and eclectic — rock, disco, techno, electro and trance merge into one improvised flow. 'Slow disco-techno from beyond' — a hyper-card at festivals like Daad Gathering.",
      "notable": "Daad Gathering 2022 — a legendary mini-max disco and techno performance",
      "country": "🇪🇪 Estonia",
      "born": "collective"
    },
    "pt": {
      "bio": "O projecto de DJ em estilo freestyle de Alex 'Boshke' Tolstey, fundador da Boshke Beats Records (activa desde 2001). O set não é planeado e é eclético — rock, disco, techno, electro e trance fundem-se num só fluxo improvisado. 'Slow disco-techno from beyond' — um trunfo absoluto em festivais como o Daad Gathering.",
      "notable": "Daad Gathering 2022 — uma actuação lendária de mini-max disco e techno",
      "country": "🇪🇪 Estónia",
      "born": "colectivo"
    }
  },
  "bill-robin-maya": {
    "en": {
      "bio": "A powerful B2B duo — a deep Goa experience at Zambu Temple.",
      "notable": "Zambu Temple B2B",
      "country": "🌍 International",
      "born": "duo"
    },
    "pt": {
      "bio": "Um poderoso duo B2B — uma experiência Goa profunda no Zambu Temple.",
      "notable": "Zambu Temple B2B",
      "country": "🌍 Internacional",
      "born": "duo"
    }
  },
  "e-sko": {
    "en": {
      "bio": "A Retro Universe selector — member of the ZNA 2026 family.",
      "notable": "Retro Universe",
      "country": "🌍 International",
      "born": "active in the scene"
    },
    "pt": {
      "bio": "Selector do Retro Universe — membro da família ZNA 2026.",
      "notable": "Retro Universe",
      "country": "🌍 Internacional",
      "born": "ativo na cena"
    }
  },
  "sancho-meiso": {
    "en": {
      "bio": "Chill vibes and spiritual depth — part of ZNA's market and warm-up area.",
      "notable": "Market vibes",
      "country": "🌍 International",
      "born": "active in the scene"
    },
    "pt": {
      "bio": "Vibe chill e profundidade espiritual — parte da zona de Market e warm-up do ZNA.",
      "notable": "Market vibes",
      "country": "🌍 Internacional",
      "born": "ativo na cena"
    }
  },
  "jaia": {
    "en": {
      "bio": "The live Goa Trance project of France's Jérôme Hervé. His debut album 'Blue Energy' (1998, Mosaïc) is a cornerstone of the French scene. At ZNA 2026 he opens the dancefloor with a build-up set.",
      "notable": "'Mai Mai' from 'Blue Energy' (1998, Mosaïc) — a French classic",
      "country": "🇫🇷 France",
      "born": "active since the late 90s"
    },
    "pt": {
      "bio": "O projecto de Goa Trance ao vivo do francês Jérôme Hervé. O seu álbum de estreia 'Blue Energy' (1998, Mosaïc) é uma pedra angular da cena francesa. No ZNA 2026 abre a pista de dança com um set de build-up.",
      "notable": "'Mai Mai' do álbum 'Blue Energy' (1998, Mosaïc) — um clássico francês",
      "country": "🇫🇷 França",
      "born": "ativo desde finais dos anos 90"
    }
  },
  "graham-wood": {
    "en": {
      "bio": "A Goa Trance legend — part of The Infinity Project and co-founder of the legendary British TIP Records. He produced the records that shaped the sound of classic Goa. At ZNA 2026 he unleashes his full mastery in Retro Universe.",
      "notable": "The Infinity Project / TIP Records — among the labels that defined Goa",
      "country": "🇬🇧 UK",
      "born": "active since the early 90s"
    },
    "pt": {
      "bio": "Uma lenda do Goa Trance — parte de The Infinity Project e cofundador da lendária britânica TIP Records. Produziu os discos que moldaram o som do Goa clássico. No ZNA 2026 liberta toda a sua mestria no Retro Universe.",
      "notable": "The Infinity Project / TIP Records — entre as editoras que definiram o Goa",
      "country": "🇬🇧 Reino Unido",
      "born": "ativo desde o início dos anos 90"
    }
  },
  "sid-shanti": {
    "en": {
      "bio": "A veteran DJ and producer whose musical intuition helped define an era. Returning to ZNA 2026 for a special set.",
      "notable": "Exclusive vinyl VS set with Orion at ZNA 2026",
      "country": "🌍 International",
      "born": "active since the 90s"
    },
    "pt": {
      "bio": "Um DJ e produtor veterano cuja intuição musical ajudou a definir uma época. Regressa ao ZNA 2026 para um set especial.",
      "notable": "Set VS exclusivo em vinil com Orion no ZNA 2026",
      "country": "🌍 Internacional",
      "born": "ativo desde os anos 90"
    }
  },
  "orion-borelli": {
    "en": {
      "bio": "A key figure from the formative years of psytrance. At ZNA 2026 he shares records in an exclusive VS set with Sid Shanti — for all the diehards of the scene.",
      "notable": "VS Sid Shanti — a special vinyl encounter",
      "country": "🇩🇰 Denmark / 🇫🇷 France",
      "born": "active since the 90s"
    },
    "pt": {
      "bio": "Uma figura-chave dos anos formativos do psytrance. No ZNA 2026 partilha discos num set VS exclusivo com Sid Shanti — para todos os apaixonados da cena.",
      "notable": "VS Sid Shanti — um encontro especial em vinil",
      "country": "🇩🇰 Dinamarca / 🇫🇷 França",
      "born": "ativo desde os anos 90"
    }
  },
  "takeshi-isogai": {
    "en": {
      "bio": "A Japanese experimental producer active since the mid-90s. Better known under the alias Ubar Tmar with the album 'Fusion' (1997, Boom!) and 'True' (1998, Matsuri). His live performances turn into psychedelic 'music labyrinths'.",
      "notable": "Ubar Tmar — the 'Fusion' and 'True' albums of classic Japanese Goa",
      "country": "🇯🇵 Japan",
      "born": "active since the mid-90s"
    },
    "pt": {
      "bio": "Um produtor experimental japonês activo desde meados dos anos 90. Mais conhecido pelo nome Ubar Tmar, com o álbum 'Fusion' (1997, Boom!) e 'True' (1998, Matsuri). Os seus concertos transformam-se em 'labirintos musicais' psicadélicos.",
      "notable": "Ubar Tmar — os álbuns 'Fusion' e 'True' do Goa japonês clássico",
      "country": "🇯🇵 Japão",
      "born": "ativo desde meados dos anos 90"
    }
  },
  "battle-future-buddhas": {
    "en": {
      "bio": "An artist of night soundtracks — a legend on Boom Records with the album 'Twin Sharkfins'. Dark, intense night sets that pull the crowd through deep tunnels of time.",
      "notable": "Album 'Twin Sharkfins' (Boom Records) — a night-time classic",
      "country": "🇸🇪 Sweden",
      "born": "active since the late 90s"
    },
    "pt": {
      "bio": "Um artista de bandas sonoras nocturnas — uma lenda da Boom Records com o álbum 'Twin Sharkfins'. Sets nocturnos escuros e intensos que arrastam o público por túneis profundos de tempo.",
      "notable": "Álbum 'Twin Sharkfins' (Boom Records) — um clássico nocturno",
      "country": "🇸🇪 Suécia",
      "born": "ativo desde finais dos anos 90"
    }
  },
  "goaacen": {
    "en": {
      "bio": "A leading Portuguese DJ and Suntrip artist — exploring the darker, deeper territories of Goa Trance. Part of the Goa Guardians lineup.",
      "notable": "DJ for the Suntrip label — a leading imprint of modern Goa",
      "country": "🇵🇹 Portugal",
      "born": "active in the scene"
    },
    "pt": {
      "bio": "Um DJ português de referência e artista da Suntrip — explora os territórios mais escuros e profundos do Goa Trance. Faz parte do alinhamento dos Goa Guardians.",
      "notable": "DJ da editora Suntrip — uma editora de referência do Goa moderno",
      "country": "🇵🇹 Portugal",
      "born": "ativo na cena"
    }
  },
  "dark-el-kante": {
    "en": {
      "bio": "A leading DJ of the Suomisaundi genre — the eccentric, free-spirited Finnish Goa Trance. He runs the non-profit Random Records label, which supports indigenous rights organisations.",
      "notable": "Random Records — an activist label",
      "country": "🌍 International",
      "born": "active in the scene"
    },
    "pt": {
      "bio": "DJ de referência do género Suomisaundi — o Goa Trance finlandês excêntrico e de espírito livre. Dirige a editora sem fins lucrativos Random Records, que apoia organizações de direitos dos povos indígenas.",
      "notable": "Random Records — uma editora activista",
      "country": "🌍 Internacional",
      "born": "ativo na cena"
    }
  },
  "merrow": {
    "en": {
      "bio": "Brice Pruit — a French pioneer of modern Goa. Producing since the early 2000s with releases on Suntrip and Global Sect. The album 'Odysseus' (2019, Global Sect) is one of his best-known journeys.",
      "notable": "Album 'Odysseus' (2019, Global Sect)",
      "country": "🇫🇷 France",
      "born": "active since the early 2000s"
    },
    "pt": {
      "bio": "Brice Pruit — um pioneiro francês do Goa moderno. Produz desde o início dos anos 2000 com lançamentos na Suntrip e Global Sect. O álbum 'Odysseus' (2019, Global Sect) é uma das suas viagens mais conhecidas.",
      "notable": "Álbum 'Odysseus' (2019, Global Sect)",
      "country": "🇫🇷 França",
      "born": "ativo desde o início dos anos 2000"
    }
  },
  "atmos": {
    "en": {
      "bio": "A Swedish Goa Trance artist who was one of the strongest producers on Spirit Zone Recordings in the late 90s. His style — melodic, dreamy and colourful — became one of the signature voices of Scandinavian Goa. A Retro Universe artist at ZNA 2026.",
      "notable": "Spirit Zone albums and the heyday of classic Goa — a return to the roots",
      "country": "🇸🇪 Sweden",
      "born": "active since the late 90s"
    },
    "pt": {
      "bio": "Um artista sueco de Goa Trance que foi um dos produtores mais fortes da Spirit Zone Recordings em finais dos anos 90. O seu estilo — melódico, sonhador e colorido — tornou-se uma das vozes marcantes do Goa escandinavo. Artista do Retro Universe no ZNA 2026.",
      "notable": "Álbuns na Spirit Zone e o auge do Goa clássico — um regresso às raízes",
      "country": "🇸🇪 Suécia",
      "born": "ativo desde finais dos anos 90"
    }
  },
  "alphanaut": {
    "en": {
      "bio": "An English project that began in the late 90s with the 12 inch 'India / Abduction / Centauri' (1997). Meticulous production in the classic Goa Trance sound — live performances that feel like a memory restored.",
      "notable": "One of the recognised projects of British classic Goa",
      "country": "🇬🇧 UK",
      "born": "active since 1997"
    },
    "pt": {
      "bio": "Um projecto inglês que começou em finais dos anos 90 com o 12 polegadas 'India / Abduction / Centauri' (1997). Produção minuciosa no som clássico do Goa Trance — concertos ao vivo que parecem uma memória restaurada.",
      "notable": "Um dos projectos reconhecidos do Goa clássico britânico",
      "country": "🇬🇧 Reino Unido",
      "born": "ativos desde 1997"
    }
  },
  "blue-planet-corporation": {
    "en": {
      "bio": "The solo project of Gabriel Massorel — a French pioneer of Goa Trance. Releases on France's Mosaïc Records. At ZNA 2026 he returns with a full live performance of euphoric, psychedelic experience.",
      "notable": "'Overbloody Flood' (1993) — one of the pioneering French Goa tracks",
      "country": "🇫🇷 France",
      "born": "active since the 90s"
    },
    "pt": {
      "bio": "O projecto a solo de Gabriel Massorel — um pioneiro francês do Goa Trance. Lança na francesa Mosaïc Records. No ZNA 2026 regressa com um concerto ao vivo completo de experiência eufórica e psicadélica.",
      "notable": "'Overbloody Flood' (1993) — um dos temas pioneiros do Goa francês",
      "country": "🇫🇷 França",
      "born": "ativo desde os anos 90"
    }
  },
  "merv-eat-static": {
    "en": {
      "bio": "Merv Pepler, co-founder of the legendary Eat Static together with Joie Hinton — the team that created British psychedelic electronic music in the 90s through Planet Dog. Also a member of Ozric Tentacles. A special live performance at Zambu Temple.",
      "notable": "Eat Static / Planet Dog Records — the fathers of British psychedelic techno",
      "country": "🇬🇧 UK",
      "born": "active since the 90s"
    },
    "pt": {
      "bio": "Merv Pepler, cofundador dos lendários Eat Static juntamente com Joie Hinton — a equipa que criou a música electrónica psicadélica britânica dos anos 90 através da Planet Dog. Também membro dos Ozric Tentacles. Uma actuação ao vivo especial no Zambu Temple.",
      "notable": "Eat Static / Planet Dog Records — os pais da techno psicadélica britânica",
      "country": "🇬🇧 Reino Unido",
      "born": "ativo desde os anos 90"
    }
  },
  "cosmosis": {
    "en": {
      "bio": "Bill Halsey, one of the most beloved producers of classic Goa. He released his debut album 'Cosmology' (1996) on Transient Records and started his own label, Holophonic. His sets are euphoric psychedelic strips that feel like flying through space.",
      "notable": "'Cosmology' (1996, Transient) — a masterpiece of classic Goa",
      "country": "🇬🇧 UK",
      "born": "active since 1995"
    },
    "pt": {
      "bio": "Bill Halsey, um dos produtores mais queridos do Goa clássico. Lançou o álbum de estreia 'Cosmology' (1996) na Transient Records e abriu a sua própria editora, Holophonic. Os seus sets são fitas psicadélicas eufóricas que parecem um voo pelo espaço.",
      "notable": "'Cosmology' (1996, Transient) — uma obra-prima do Goa clássico",
      "country": "🇬🇧 Reino Unido",
      "born": "ativo desde 1995"
    }
  },
  "filteria": {
    "en": {
      "bio": "Yannis Tsikas — a Greek who lives in Stockholm, one of the leaders of the Goa Trance revival. His debut album 'Sky Input' (2004, Suntrip) reignited the genre and set a new standard for melodic, powerful, stormy Goa. Live performance at ZNA 2026.",
      "notable": "'Sky Input' (2004, Suntrip) — a revolutionary album that became a neo-Goa icon",
      "country": "🇬🇷 Greece / 🇸🇪 Stockholm",
      "born": "active since 2003"
    },
    "pt": {
      "bio": "Yannis Tsikas — um grego que vive em Estocolmo, um dos líderes do renascimento do Goa Trance. O seu álbum de estreia 'Sky Input' (2004, Suntrip) reacendeu o género e definiu um novo padrão para um Goa melódico, poderoso e tempestuoso. Concerto ao vivo no ZNA 2026.",
      "notable": "'Sky Input' (2004, Suntrip) — um álbum revolucionário que se tornou ícone do neo-Goa",
      "country": "🇬🇷 Grécia / 🇸🇪 Estocolmo",
      "born": "ativo desde 2003"
    }
  },
  "sjamadan": {
    "en": {
      "bio": "A Scandinavian Goa vinyl selector — part of Goa Guardians at ZNA 2026.",
      "notable": "Goa Guardians artist — keeper of the legacy",
      "country": "🇩🇰 Denmark",
      "born": "active in the scene"
    },
    "pt": {
      "bio": "Um selector escandinavo de Goa em vinil — faz parte dos Goa Guardians no ZNA 2026.",
      "notable": "Artista dos Goa Guardians — guardião do legado",
      "country": "🇩🇰 Dinamarca",
      "born": "ativo na cena"
    }
  }
};
