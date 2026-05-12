// נתוני האומנים של ZNA Gathering 2026
// פסטיבל גואה טראנס רטרו-פוטוריסטי, 15-22 ביולי 2026, אגם מונטרגיל, פורטוגל

const FESTIVAL = {
  name: "ZNA Gathering 2026",
  tagline: "The Retro-Futuristic Celebration",
  dates: "15-22 ביולי 2026",
  startsAt: "2026-07-15T00:00:00+01:00",
  endsAt: "2026-07-22T23:59:59+01:00",
  timezone: "Europe/Lisbon",
  location: "אגם מונטרגיל, פורטוגל",
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
    notable: "Satori יחד עם Pete Martin - מהפרויקטים האייקוניים של גואה. אלבום 'One Drop Or Two' (Process) - מהקלאסיקות של Flying Rhino",
    albums: [
      { name: "One Drop Or Two", year: 2000, project: "Process / Creamcrop" },
      { name: "Superior Technology", year: null, project: "Process Productions" },
      { name: "Tales of the Inexpressible-era tracks", year: "1996-2000", project: "Process" },
      { name: "Various Satori releases", year: "1996-1999", project: "Satori (with Pete Martin)" }
    ],
    links: [
      { type: "Discogs", url: "https://www.discogs.com/artist/66276-Sean-Williams" },
      { type: "Last.fm", url: "https://www.last.fm/music/Process" }
    ],
    tracks: [
      { id: "bTkD1hZlMko", title: "Process - One Drop Or Two (Full Album)", year: 2000 },
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
    albums: [
      { name: "Land of Utopia", year: 1997, project: "Dogma 3000 (with Goran Stetic)" },
      { name: "Land of Utopia (Expanded Remaster)", year: 2020, project: "Dogma 3000 (with Goran Stetic)" }
    ],
    links: [
      { type: "Resident Advisor", url: "https://ra.co/dj/damirludvig/biography" },
      { type: "Website", url: "http://www.dogma3000.com/" }
    ],
    tracks: [
      { id: "tV_HLfvs4_4", title: "Dogma - Land Of Utopia", year: 1997 },
      { id: "G_hdbVqSYA4", title: "Dogma - Land Of Utopia (Expanded Remaster)", year: 2020 }
    ]
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
    albums: [
      { name: "Land of Utopia", year: 1997, project: "Dogma 3000 (with Damir Ludvig)" },
      { name: "Land of Utopia (Expanded Remaster)", year: 2020, project: "Dogma 3000 (with Damir Ludvig)" }
    ],
    links: [
      { type: "Discogs", url: "https://www.discogs.com/artist/855007-Goran-%C5%A0teti%C4%87" },
      { type: "Website", url: "http://www.dogma3000.com/" }
    ],
    tracks: [
      { id: "tV_HLfvs4_4", title: "Dogma - Land Of Utopia", year: 1997 },
      { id: "G_hdbVqSYA4", title: "Dogma - Land Of Utopia (Expanded Remaster)", year: 2020 }
    ]
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
    albums: [
      { name: "Lysergic Disco @ ZNA Gathering 2024", year: 2024, project: "as Triple Distilled Disco Squad" },
      { name: "Avocado Farm Adventures (Boshke Beats Series Ep. 68)", year: 2024, project: "as Triple Distilled Disco Squad" }
    ],
    links: [
      { type: "SoundCloud", url: "https://soundcloud.com/boshkebeatsrecords/sets/triple-distilled-disco-squad" }
    ],
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
    notable: "Padang Records family - psytech & progressive selector",
    albums: [
      { name: "Technomad II", year: 2025, project: "Curated for Padang Records" }
    ],
    links: [
      { type: "SoundCloud", url: "https://soundcloud.com/anaislin" },
      { type: "Bandcamp", url: "https://padang.bandcamp.com/album/technomad-ii" }
    ]
  },
  {
    id: "extra-cheers",
    announcedAt: "2026-03-25",
    name: "Cheers",
    realName: "Cheers",
    country: "🇮🇱 ישראל",
    age: null,
    born: "פעיל בסצנה",
    stage: "market",
    role: "DJ Set",
    tags: ["Retro Trance"],
    color: "#ffbf69",
    bio: "אומן/נית של Retro Universe - חלק ממסע הגואה הרטרו של ZNA 2026.",
    notable: "Retro Universe",
    albums: [],
    links: [
      { type: "SoundCloud", url: "https://soundcloud.com/djcheers303" }
    ]
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
    country: "🇮🇱 ישראל",
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
    bio: "פרויקט פסיכדלי-מינימל-טכנו פעיל מ-2013. סאונד תעשייתי, אטמוספרי ופסיכדלי שמתנגש בין טכנו דארק לסביבה אמביינטית.",
    notable: "Techgnosis Records / Digital Structures / DMT Records artist",
    albums: [
      { name: "Burning Soil EP", year: 2016 },
      { name: "Incidental Colors", year: null, project: "Digital Structures" },
      { name: "Asylum EP", year: null, project: "with Sandokan / Techgnosis Records" },
      { name: "Cherry Blossom", year: 2025, project: "Techgnosis Records" }
    ],
    links: [
      { type: "Website", url: "https://www.isoquant-music.com/" },
      { type: "Bandcamp", url: "https://isoquant.bandcamp.com/" },
      { type: "SoundCloud", url: "https://soundcloud.com/isoquant-1" },
      { type: "Beatport", url: "https://www.beatport.com/artist/isoquant/359519" }
    ],
    tracks: [
      { id: "wNotc8jcFys", title: "Pink Sky (Original Mix)", year: null },
      { id: "5XBYwra3jz8", title: "Asylum", year: null },
      { id: "qGnGgwtXTbw", title: "Asylum EP (with Sandokan) - Preview", year: null }
    ]
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
    bio: "DJ ומפיק פורטוגזי שעובד מסטודיו Arctic Dub - מתמחה באמביינט, פוסט-דאב טכנו ואלקטרוניקה ניסיונית בהשראת דאב. אוצר ומקפיל מרכזי של חותמת Arctic Dub (Sursumcorda), פעיל בקהילת הדאב והבאס הפורטוגזית התת-קרקעית. ידוע גם תחת השם Augen.",
    notable: "סדרת ה-compilations 'Arctic Dub Sursumcorda' - אבן יסוד של דאב פורטוגזי",
    albums: [
      { name: "Arctic Dub (Sursumcorda) - Compilation v3", year: null, project: "Compiled by Gabi Von Dub" },
      { name: "Arctic Dub (Sursumcorda) - Compilation v4", year: null, project: "Compiled with Dave Wesley" },
      { name: "Arctic Dub (Sursumcorda) - Compilation v6", year: null, project: "Compiled by Gabi Von Dub" }
    ],
    links: [
      { type: "Bandcamp", url: "https://arcticdub.bandcamp.com/" },
      { type: "Website", url: "https://arcticdub.com/" },
      { type: "Mixcloud", url: "https://www.mixcloud.com/portalradio/gabi-von-dub-presents-arctic-dub/" },
      { type: "Last.fm", url: "https://www.last.fm/music/Gabi+Von+Dub" }
    ]
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
      { name: "Early Tracks 1 (1995-1998)", year: 2010, project: "Hypnodisk" },
      { name: "Nu Goa from Japan Vol.4", year: 2017, project: "with YUTA & Shimodi / Matsuri Digital" }
    ],
    links: [
      { type: "Discogs", url: "https://www.discogs.com/artist/45548-ReeK" },
      { type: "Bandcamp", url: "https://psy-harmonics.bandcamp.com/album/yammataikoku" },
      { type: "Mixcloud", url: "https://www.mixcloud.com/reek2013/" }
    ],
    tracks: [
      { id: "TPIUjK_4aXA", title: "Live @ Unite - Psytrance Sessions", year: null },
      { id: "zTo54BuRgms", title: "Ree.K @ Tokyo ghoul / Japan Trance", year: null }
    ]
  },
  {
    id: "klil-co",
    announcedAt: "2026-03-25",
    name: "Klil.co",
    realName: "Klil.co",
    country: "🇮🇱 ישראל",
    age: null,
    born: "פעיל בסצנה",
    stage: "market",
    role: "DJ Set",
    tags: ["Retro Selector"],
    color: "#a663cc",
    bio: "DJ ואספן ויניל ישראלי - טכנו, אסיד, גואה ואספן מוזיקה אלקטרונית של שנות ה-80 וה-90.",
    notable: "DJ Israeli מומחה בגואה / אסיד / טכנו רטרו",
    albums: [],
    links: [
      { type: "SoundCloud", url: "https://soundcloud.com/klil-cohen-38185142" },
      { type: "Instagram", url: "https://www.instagram.com/dj.klil.co/" }
    ]
  },
  {
    id: "mathew-tecnica",
    announcedAt: "2026-03-25",
    name: "Tecnica",
    realName: "Max Lanfranconi & Maurizio Begotti (Etnica / Pleiadians)",
    country: "🇮🇹 איטליה",
    age: null,
    born: "פעילים מ-1994",
    stage: "market",
    role: "DJ Set / Live",
    tags: ["Etnica", "Pleiadians", "Italian Goa", "IbogaTech"],
    color: "#0096c7",
    bio: "פרויקט הטכנו של הדואו האיטלקי האגדי Etnica/Pleiadians - מקס לנפרנקוני ומאוריציו בגוטי. מקסום של המכניקה, הגרוב והאטמוספרה של עשרים שנות גואה, רק בקצב יותר איטי וטכנואי. ב-ZNA 2026 פותחים את ה-Market Stage ב-sunset DJ set.",
    notable: "Etnica / Pleiadians - דואו אגדי. Tecnica = פרויקט הטכנו שלהם",
    albums: [
      { name: "The Juggling Alchemists Under The Black Light", year: 1995, project: "Etnica" },
      { name: "Alien Protein", year: 1996, project: "Etnica" },
      { name: "Identified Flying Object", year: 1996, project: "Pleiadians" },
      { name: "Family of Light", year: 1999, project: "Pleiadians" },
      { name: "Nitrox", year: 2001, project: "Etnica" },
      { name: "Seven Sisters", year: 2006, project: "Pleiadians" },
      { name: "Blockchain EP", year: 2020, project: "Tecnica / IbogaTech" }
    ],
    links: [
      { type: "Website", url: "https://www.etnicanet.net/" },
      { type: "Bandcamp", url: "https://etnicanet.bandcamp.com/" },
      { type: "SoundCloud", url: "https://soundcloud.com/etnica" },
      { type: "Spotify", url: "https://open.spotify.com/artist/2uY6n7zcOlm2yugy9ItRW7" }
    ],
    tracks: [
      { id: "HNT2mjDf18g", title: "Alien Protein (Full Album, 1996)", year: 1996 },
      { id: "UEkeptXz63A", title: "Trip Tonite", year: 1996 },
      { id: "KGqwz6zegIk", title: "Mystical Appearance In Goa (The Juggling Alchemists LP, 1995)", year: 1995 },
      { id: "W-eK2RzLGuA", title: "Alien Protein (title track)", year: 1996 }
    ]
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
    bio: "פרויקט DJ בסגנון פריסטייל של אלכס 'Boshke' טולסטיי, מייסד Boshke Beats Records (פעיל מ-2001). הסט אינו מתוכנן ואקלקטי - רוק, דיסקו, טכנו, אלקטרו וטראנס מתמזגים לזרימה אחת מאולתרת. 'Slow disco-techno from beyond' - הופיע כבר ב-Market של ZNA Gathering 2024 בסט של 4.5 שעות בשם 'Lysergic Disco'.",
    notable: "Boshke Beats Records (פעיל מ-2001) — Triple Distilled Disco Squad הוא ה-alias הניסיוני של Alex Tolstey",
    albums: [
      { name: "Lysergic Disco @ ZNA Gathering 2024", year: 2024, project: "Live set, 4.5h" },
      { name: "Avocado Farm Adventures (Boshke Beats Series Ep. 68)", year: 2024, project: "radiOzora" },
      { name: "@ Daad Gathering 2022 (Boshke Beats Series Ep. 47)", year: 2022, project: "radiOzora" }
    ],
    links: [
      { type: "SoundCloud", url: "https://soundcloud.com/boshkebeatsrecords/sets/triple-distilled-disco-squad" },
      { type: "radiOzora", url: "https://radiozora.fm/boshke-beats-series/ep-68-tripple-distilled-disco-squad-avocado-farm-adventures/" }
    ]
  },
  {
    id: "bill-robin-maya",
    announcedAt: "2026-03-25",
    name: "Bill Robin & Maya Wada",
    realName: "ביל רובין ומאיה ואדה",
    country: "🇬🇧 בריטניה / 🇯🇵 יפן",
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
    country: "🇮🇱 ישראל",
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
    country: "🇯🇵 יפן",
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
      { name: "Mystical Experiences", year: 1995, project: "The Infinity Project" },
      { name: "Feeling Weird", year: 1995, project: "The Infinity Project" }
    ],
    links: [
      { type: "Discogs", url: "https://www.discogs.com/artist/16456-The-Infinity-Project" },
      { type: "Bandcamp", url: "https://tiprecords.bandcamp.com/" }
    ],
    tracks: [
      { id: "IEe22M6Prts", title: "Mystical Experiences (1995) - Full Album", year: 1995 },
      { id: "R9E8DPXHkuI", title: "Feeling Weird (1995) - Full Album", year: 1995 },
      { id: "Mq4Ob423S9s", title: "Hyperspaced", year: 1995 },
      { id: "vT58pwe0wSo", title: "Stimuli", year: 1994 },
      { id: "VjI_ERtkB2c", title: "Yellow Energy (Graham Wood / The Infinity Project)", year: null }
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
    albums: [
      { name: "Trance - Phantasm & Psychic Deli", year: 1999, project: "Mixed CD" },
      { name: "Deck Wizards 3 - Aural Sect", year: 1996, project: "Goa Trance Mix" },
      { name: "Journeys Into Trance - Classic Soundscapes 1995-1997", year: 1997, project: "Mixed CD" }
    ],
    links: [
      { type: "Discogs", url: "https://www.discogs.com/artist/180461-Sid-Shanti" }
    ],
    tracks: [
      { id: "msWKsfC0RnQ", title: "Phantasm & Psychic Deli - Trance exclusive mix", year: 1999 },
      { id: "n_PDJuOZcB8", title: "Psychedelic Goa Trance mix 1999", year: 1999 },
      { id: "xMyLxlvsNAM", title: "Techno Party Magazine mix 1999", year: 1999 },
      { id: "hpRftjpp9Ck", title: "Phantasm & Psychic Deli Mix HD", year: 1999 }
    ]
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
      { name: "Fusion", year: 1997, project: "Ubar Tmar / Boom! Records" },
      { name: "True", year: 1998, project: "Ubar Tmar / Matsuri Productions" },
      { name: "Live At Autumnal Equinox", year: 1999, project: "Ubar Tmar / Equinox Productions" },
      { name: "Eigou Kaiki", year: 2002, project: "Ubar Tmar / Panorama Records" },
      { name: "Macrometasomakosmos", year: 2003, project: "Ubar Tmar / Panorama Records" }
    ],
    links: [
      { type: "Discogs", url: "https://www.discogs.com/artist/228673-Takeshi-Isogai" },
      { type: "Bandcamp", url: "https://ubartmar.bandcamp.com/" },
      { type: "Website", url: "https://matsuri-digital.com/en/artist/ubar-tmar/" }
    ],
    tracks: [
      { id: "h4QP2_Nszh4", title: "Fusion - Full Album Mix (1997)", year: 1997 },
      { id: "6ARniuNgx3A", title: "Macrometasomakosmos - Full Album (2003)", year: 2003 },
      { id: "ghib8Dx1rDA", title: "The Tale Of Taketori (Fusion)", year: 1997 }
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
    country: "🇫🇮 פינלנד",
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
    notable: "Born Underwater (2009, Suntrip) - אלבום הביכורים. גם 'Odysseus' (2019, Global Sect)",
    albums: [
      { name: "Born Underwater", year: 2009, project: "Suntrip Records" },
      { name: "Hybridization", year: 2018, project: "Merr0w (self-released)" },
      { name: "Odysseus", year: 2019, project: "Global Sect" },
      { name: "Friends Transmission Vol. 1", year: 2021, project: "Merr0w (self-released)" }
    ],
    links: [
      { type: "Discogs", url: "https://www.discogs.com/artist/737661-Merr0w" },
      { type: "Bandcamp", url: "https://merr0w.bandcamp.com/" },
      { type: "SoundCloud", url: "https://soundcloud.com/merr0w" }
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
    realName: "Daniel De Keulenaer",
    country: "🇧🇪 בלגיה",
    age: null,
    born: "1984",
    stage: "guardians",
    role: "Vinyl Set",
    tags: ["Vinyl", "Goa Curator", "Amanita Muscaria"],
    color: "#ef476f",
    bio: "דניאל דה קולנארה - סלקטור ויניל גואה בלגי, מייסד הפסטיבל Amanita Muscaria שהחל ב-2005. DJ פעיל מ-2003, מתמחה בסטים אולד-סקול גואה על ויניל. הופיע ב-OHM Spirit Festival בצרפת בין היתר.",
    notable: "Amanita Muscaria parties (founder, since 2005) - Belgium goa scene",
    albums: [],
    links: [
      { type: "SoundCloud", url: "https://soundcloud.com/daniel-de-keulenaer" }
    ],
    tracks: [
      { id: "VMhRsVtW-gc", title: "Sjama'dan @ Goa trance outdoor gathering", year: null }
    ]
  },

  // ===== Curated enrichment for official-only entries (merged by ID) =====
  // Each block below pairs an existing official-artists.js entry with
  // verified discography + YouTube videos so the merge in
  // official-artists.js picks up the curated arrays. No country / stage /
  // bio overrides — the official record stays authoritative for those.
  {
    id: "doof",
    realName: "Nick Barber (Doof)",
    bio: "ניק ברבר, מפיק וגיטריסט בריטי לונדוני. אלבום הביכורים 'Let's Turn On' (TIP Records, 1996) נחשב לקלאסיקה מכוננת של גואה טראנס. שיתף פעולה בקרבה עם סיימון פוסטפורד (Hallucinogen) על שירים כמו Born Again ו-Angelic Particles.",
    notable: "'Let's Turn On' (1996, TIP) - אבן יסוד של גואה. רימסטר 2015 ב-DAT Records",
    albums: [
      { name: "Let's Turn On", year: 1996, project: "TIP Records" },
      { name: "Let's Turn On - Remixed & Remastered", year: 2015, project: "DAT Records (2CD)" },
      { name: "It's About Time", year: null, project: "Doof / self-released" }
    ],
    links: [
      { type: "Discogs", url: "https://www.discogs.com/artist/11431-Doof" },
      { type: "Bandcamp", url: "https://doof.bandcamp.com/" },
      { type: "Website", url: "https://nickbarbermusic.uk/about" }
    ],
    tracks: [
      { id: "wugRMCnGGY8", title: "Let's Turn On (Full Album Mix, 1996)", year: 1996 },
      { id: "WN3SYRhVXow", title: "Let's Turn On (1996)", year: 1996 },
      { id: "B4u2P3eNut0", title: "Let's Turn On (Tuned In Mix)", year: 1996 }
    ]
  },
  {
    id: "prometheus",
    realName: "Benji Vaughan (Prometheus)",
    bio: "בני וון - יוצר טראנס פסיכדלי בריטי. סולו מאחורי הפרויקט Prometheus, חתום על Twisted Records (סיימון פוסטפורד / Hallucinogen). ידוע בקווי באס מובחנים ובאפרוח אינטנסיבי שמשלב מלודיה דיאטונית עם תבניות פרקוסיה גליצ'יות.",
    notable: "אלבומי Twisted Records: Robot.O.Chan (2004), Corridor Of Mirrors (2007), Spike (2010)",
    albums: [
      { name: "Robot.O.Chan", year: 2004, project: "Twisted Records" },
      { name: "Corridor Of Mirrors", year: 2007, project: "Twisted Records" },
      { name: "Spike", year: 2010, project: "Twisted Records" }
    ],
    links: [
      { type: "Discogs", url: "https://www.discogs.com/artist/19870-Prometheus" },
      { type: "Bandcamp", url: "https://prometheusmusicuk.bandcamp.com/" }
    ],
    tracks: [
      { id: "mOHU4co1iYo", title: "Corridor Of Mirrors (Full Album)", year: 2007 },
      { id: "NGZw1YUahaM", title: "O.K Computer", year: null }
    ]
  },
  {
    id: "growling-mad-scientists",
    realName: "GMS - Riktam (Avi Algranati) & Bansi (Yoad Nevo)",
    bio: "Growling Mad Scientists - הדואו הישראלי-לונדוני של ריקטם ובאנסי. אחד הפרויקטים המגדירים של פסיטראנס הקלאסי. הוקמו בלונדון של אמצע שנות ה-90.",
    notable: "אלבום הביכורים 'Chaos Laboratory' (1997) - מהמכוננים של פסיטראנס מודרני",
    albums: [
      { name: "Chaos Laboratory", year: 1997, project: "Hadshot Haheizar / Avatar" },
      { name: "Live Experiments Vol. 1", year: 1998, project: "Avatar" },
      { name: "Reactivate", year: 2002, project: "Spun Records" }
    ],
    links: [
      { type: "Website", url: "https://gms-records.com/growling-mad-scientists/" },
      { type: "YouTube", url: "https://www.youtube.com/@Gms-music" }
    ],
    tracks: [
      { id: "A8fogsOQ5jE", title: "Chaos Laboratory (Full Album, 1997)", year: 1997 },
      { id: "U9LV5cHdX8c", title: "Juno Reactor - Zombie (GMS Remix)", year: null },
      { id: "WdcabEUNz7E", title: "Juno Reactor & Undercover - Dakota (GMS Remix)", year: null }
    ]
  },
  {
    id: "doctor-vagator",
    realName: "Doctor Vagator",
    bio: "DJ ותיק של גואה טראנס - דמות מפעם הסצנה הגואית של שנות ה-90. נראה רוקד על הדאי-מפלצת מעל Spaghetti Beach בגואה ב-1997, הקלאסיקה של תרבות הגואה.",
    notable: "DJ של D.A.T sets - מעמודי התווך של הסצנה החיה הקלאסית",
    albums: [],
    links: [],
    tracks: [
      { id: "LshhJJWJoMw", title: "Trance goa D.A.T set by Doctor Vagator", year: null }
    ]
  },
  {
    id: "anoebis",
    realName: "Joske Vranken (Anoebis)",
    bio: "DJ בלגי גואה אדיקטיבי, מנהל החותמת ומייסד-שותף של Suntrip Records (2004) יחד עם פאביאן 'מרס' מרסו. הקים את החותמת כי סצנת הגואה המלודי-אקיד שאהב התמעטה - והפך אותה לאחת החשובות בז'אנר.",
    notable: "מייסד-שותף של Suntrip Records - חותמת המפתח של הגואה החדש",
    albums: [],
    links: [
      { type: "SoundCloud", url: "https://soundcloud.com/anoebis" },
      { type: "Discogs", url: "https://www.discogs.com/user/anoebis" },
      { type: "Website", url: "https://www.suntriprecords.com/" }
    ],
    tracks: [
      { id: "ehAGi_wPAEg", title: "20 Years Suntrip Morning Story (Goa Trance Mix)", year: null },
      { id: "f-b68TVnc5U", title: "History of Goa Trance - 2001", year: null },
      { id: "jt94xMN-neM", title: "The History of Goa Trance - 2000", year: null },
      { id: "fkbgMy9C-ZQ", title: "The History of Goatrance - 1995", year: null },
      { id: "Jj7cVp70u34", title: "The Resurgence of Goa Trance with Dj Anoebis (Suntrip)", year: null }
    ]
  },
  {
    id: "cyan",
    realName: "CYAN - Mike Dee & Nikos Chrisoulakis",
    bio: "פרויקט גואה טראנס מרומם מיוון - הדואו של מייק די וניקוס כריסולקיס. החלו את המסע המוזיקלי בסוף שנות ה-90 תחת חותמת Discobole Recordings, ואלבום הביכורים 'Beast From The East' (1998) הגדיר את הסאונד המלודי-רגשי שלהם.",
    notable: "'Beast From The East' (1998, Discobole) - מהמכוננים של גואה יווני",
    albums: [
      { name: "Beast From The East", year: 1998, project: "Discobole Recordings" },
      { name: "Medieval Tales EP (2026 Remastered)", year: 2026, project: "CYAN" }
    ],
    links: [
      { type: "Bandcamp", url: "https://cyan-ofc.bandcamp.com/" },
      { type: "Discogs", url: "https://www.discogs.com/artist/186482-Cyan-4" },
      { type: "YouTube", url: "https://www.youtube.com/channel/UCYe4MO3x1TLBq-7IJCfxskA" }
    ],
    tracks: [
      { id: "hmGE0sz4gcQ", title: "Aizen Myoo (Official Audio HD)", year: 1998 },
      { id: "Zg3bS5pg8js", title: "Tripulation (Official Audio HD)", year: 1998 },
      { id: "Ps2s-RjNZIw", title: "The Beast Comes Out (Official Audio HD)", year: 1998 }
    ]
  },
  {
    id: "spiralkinder",
    realName: "Spiralkinder - Arne Schaffhausen & Marco Schmedding",
    bio: "פרויקט גואה/אמביינט גרמני שהחל ב-1991-1992. ארנה שאפהאוזן (לימים Extrawelt, Spirallianz, Midimiliz) ומרקו שמדינג. שיתפו פעולה עם X-Dream (Marcus Maichel & Jan Müller), Planet B.E.N., Morphem ואחרים. מהמרכיבים של הסצנה הגרמנית האפלה והניסיונית של תחילת שנות ה-90.",
    notable: "פרויקט אגדי ונדיר - מעט הופעות חיות. ZNA 2026 = הזדמנות חד-פעמית",
    albums: [
      { name: "Various collaborations with X-Dream / Planet B.E.N. / Morphem", year: null, project: "Spiralkinder" }
    ],
    links: [
      { type: "Last.fm", url: "https://www.last.fm/music/Spiralkinder" },
      { type: "Spotify", url: "https://open.spotify.com/artist/4Ld7CBJuKaVcmpBKmX6nOR" }
    ],
    tracks: [
      { id: "p-VYV57uHuU", title: "Planet B.E.N. & Spiralkinder - Parakusis", year: null }
    ]
  },
  {
    id: "hypnoxock",
    realName: "Victor Solsona (Hypnoxock)",
    bio: "ויקטור סולסונה מברצלונה - 15+ שנות הפקה מוזיקה פסיכדלית. בעשור האחרון מתמקד בגואה טראנס. אלבומים על Suntrip Records, Goa Madness, Matsuri Digital. הופיע בפסטיבלים גדולים: Ozora, ZNA Gathering, Sun Festival ועוד.",
    notable: "'Beyond The Wormhole' (2020, Suntrip) - האלבום הששי שלו",
    albums: [
      { name: "Beyond The Wormhole", year: 2020, project: "Suntrip Records" },
      { name: "Magma EP", year: 2025, project: "Suntrip Records" }
    ],
    links: [
      { type: "SoundCloud", url: "https://soundcloud.com/hypnoxock" },
      { type: "YouTube", url: "https://www.youtube.com/@hypnoxock" },
      { type: "Bandcamp", url: "https://suntriprecords.bandcamp.com/album/beyond-the-wormhole" }
    ],
    tracks: [
      { id: "dIgr4olBSbs", title: "Beyond The Wormhole (Full Album HD, 2020)", year: 2020 },
      { id: "HWE_myksDho", title: "Wormhole", year: 2020 }
    ]
  },
  {
    id: "artifact303",
    realName: "Artifact303",
    bio: "אומן הונגרי-רומני - אחד הכוכבים העולים הבולטים של גואה מלודי. אלבום הביכורים 'Back To Space' (2011, Suntrip) קיבע את שמו ב-genre. עשור אחרי - 'From The Stars' (Global Sect).",
    notable: "'Back To Space' (2011, Suntrip) - מהאלבומים החשובים של גואה החדש",
    albums: [
      { name: "Back To Space", year: 2011, project: "Suntrip Records" },
      { name: "From The Stars", year: 2021, project: "Global Sect" }
    ],
    links: [
      { type: "Bandcamp", url: "https://suntriprecords.bandcamp.com/album/artifact303-back-to-space" },
      { type: "Discogs", url: "https://www.discogs.com/release/2882358-Artifact303-Back-To-Space" }
    ],
    tracks: [
      { id: "g-3dV0086cs", title: "Back To Space (Full Album, 2011)", year: 2011 },
      { id: "ubyu2Z2UzzY", title: "They Will Communicate", year: 2011 },
      { id: "HJfp2sDdiqM", title: "Beyond Lightspeed", year: null }
    ]
  },
  {
    id: "proxeeus",
    realName: "Jerome Lesterps (Proxeeus)",
    bio: "ז'רום לסטרפס - מפיק צרפתי-בלגי, ממובילי הגואה החדש. מוזיקתו מושפעת עמוקות מ-H.P. Lovecraft (Dream Cycle, Cthulhu Mythos). ארבעה אלבומי סטודיו ב-Neogoa Records, שיתופי פעולה עם Suntrip.",
    notable: "'Celephaïs' (2019, Neogoa) - מסע מלודי בעקבות Lovecraft. גם 'Weep From Within' (2023, Goa Madness)",
    albums: [
      { name: "Celephaïs", year: 2019, project: "Neogoa Records" },
      { name: "At The Mountains Of Madness", year: null, project: "Neogoa Records" },
      { name: "Weep From Within", year: 2023, project: "Goa Madness Records" }
    ],
    links: [
      { type: "Bandcamp", url: "https://neogoarecords.bandcamp.com/album/celepha-s" },
      { type: "Booking", url: "https://olibookings.com/artists/proxeeus/" }
    ],
    tracks: [
      { id: "u1dhFojIdwU", title: "Celephaïs (Full Album, 2019)", year: 2019 }
    ]
  },
  {
    id: "mark-allen",
    realName: "Mark Allen (Quirk / Phantasm)",
    bio: "DJ ומפיק בריטי - מחלוצי גואה טראנס. נכנס לסצנה ב-1991 בביקור ראשון בגואה. שותף ב-Quirk עם Tim Healey, חבר ב-Mindfield, בעל החותמת Phantasm. ארגן את מסיבות 'Return to the Source' בלונדון מ-1994 שהפכו לגלובליות (UK / US / Europe / Japan / Israel) עד 2001.",
    notable: "Phantasm Records (founder) + Return to the Source parties - מהמכוננים של גואה בריטית",
    albums: [
      { name: "Deck Wizards 1 - Goa Trance Mix", year: 1996, project: "Phantasm Records" },
      { name: "Quirk releases", year: null, project: "with Tim Healey" }
    ],
    links: [
      { type: "Wikipedia", url: "https://en.wikipedia.org/wiki/Mark_Allen_(DJ)" },
      { type: "Discogs", url: "https://www.discogs.com/artist/74240-Mark-Allen" },
      { type: "SoundCloud", url: "https://soundcloud.com/phantasmrecords" }
    ],
    tracks: [
      { id: "HYHZTWTdJN4", title: "A Pinch Of Psychedelic mix (Chaos Unlimited, 1995)", year: 1995 },
      { id: "kq5IgRSYac0", title: "Brainforest Mix (Chaos Unlimited, 1995)", year: 1995 }
    ]
  },
  {
    id: "silicon-sound",
    realName: "Silicon Sound",
    bio: "פרויקט גואה טראנס - חלוץ צרפתי שהופיע במופעים כמו 'Genesis of Psytrance' (Bologna, 2009). ידוע ברמיקס שלו ל-'Mai Mai' של Jaïa.",
    notable: "Silicon Sound 90's Remix של Jaïa - 'Mai Mai'",
    albums: [],
    links: [
      { type: "Discogs", url: "https://www.discogs.com/artist/57781-Silicon-Sound" },
      { type: "Beatport", url: "https://www.beatport.com/artist/silicon-sound/12014" },
      { type: "Bandcamp", url: "https://jaia.bandcamp.com/track/mai-mai-silicon-sound-90s-remix" }
    ],
    tracks: []
  },
  {
    id: "sun-project",
    realName: "S.U.N. Project - Marco Menichelli + Matthias Rumoeller + McCoy",
    bio: "S.U.N. Project - קולקטיב גואה טראנס מהמבורג, גרמניה. שלושה מוזיקאים שהושפעו ממסיבות גואה המקוריות בהודו ושילבו את שורשי הרוק שלהם בסאונד הפסיכדלי. EP ראשון 'Crazy Stories' (1996, Spirit Zone), אלבום ביכורים 'Drosophila' (1997).",
    notable: "'Drosophila' (1997, Spirit Zone) - מהאלבומים הקלאסיים של גואה גרמני",
    albums: [
      { name: "Crazy Stories EP", year: 1996, project: "Spirit Zone Records" },
      { name: "Drosophila", year: 1997, project: "Spirit Zone Records" },
      { name: "A Voyage", year: 2014, project: "as Marco & Matt / Stereo Society" },
      { name: "Secret Original Mixes 1996-2000", year: 2021, project: "Classic Goa Trax" }
    ],
    links: [
      { type: "Discogs", url: "https://www.discogs.com/artist/22666-SUN-Project" },
      { type: "SoundCloud", url: "https://soundcloud.com/sun-project" },
      { type: "Bandcamp", url: "https://classicgoatrax.bandcamp.com/album/secret-original-mixes-1996-2000" }
    ],
    tracks: [
      { id: "nIi_6PMUjDg", title: "Drosophila (Full Album, 1997)", year: 1997 },
      { id: "zWWIiXrV1eE", title: "Drosophila (Full Album Mix)", year: 1997 }
    ]
  },
  {
    id: "reefer-decree",
    realName: "Reefer Decree",
    bio: "פרויקט פסיטראנס מתקדם שהיה השם הראשון ששוחרר על Iboga Records של דנמרק ב-1999. אלבום הביכורים 'Soundframes' עדיין נחשב לשחרור הויניל הנמכר ביותר אי פעם של Iboga. טראקים מוכרים: Nightvision, Curved Air.",
    notable: "'Soundframes' (Iboga Records) - שחרור הויניל הנמכר ביותר של החותמת",
    albums: [
      { name: "Soundframes", year: 2020, project: "Iboga Records (orig. 1999)" },
      { name: "Point Of You", year: null, project: "Iboga Records" }
    ],
    links: [
      { type: "Discogs", url: "https://www.discogs.com/artist/27650-Reefer-Decree" },
      { type: "Bandcamp", url: "https://iboga-beatspace.bandcamp.com/album/reefer-decree-sound-frames-iboga-records" }
    ],
    tracks: [
      { id: "1tuV4BwyUC0", title: "Soundframed", year: 2020 },
      { id: "1Ebe4EiV0pw", title: "O.tonin", year: null }
    ]
  },
  {
    id: "mini-spacer",
    realName: "Mini Spacer",
    bio: "פרויקט גואה טראנס המופיע על Timewarp Records - חותמת שמתמקדת בסגנון קלאסי עם הפקה מודרנית. EP ביכורים 'The Spirit Of Trance' (2021).",
    notable: "'The Spirit Of Trance' EP (2021, Timewarp Records) - אלבום ביכורים גואה",
    albums: [
      { name: "The Spirit Of Trance EP", year: 2021, project: "Timewarp Records" }
    ],
    links: [
      { type: "Bandcamp", url: "https://timewarprecords.bandcamp.com/album/mini-spacer-the-spirit-of-trance-timewarp168-timewarp" }
    ],
    tracks: []
  },
  {
    id: "moon-beasts",
    realName: "Moon Beasts - Ephedra (Alexandre Cohen) + Proxeeus (Jerome Lesterps)",
    bio: "פרויקט שיתופי בין Ephedra (אלכסנדר כהן, בלגיה) ו-Proxeeus (ז'רום לסטרפס, צרפת). התחילו ב-2019 עם הופעה משולבת בפורטוגל - מאז, פרויקט מלא. מתערבב הצד המלודי-מרחף של Ephedra עם הצליל האגרסיבי של Proxeeus. חתום על Goa Madness Records.",
    notable: "Collab בין Ephedra ל-Proxeeus - שני שמות מובילים בגואה החדש",
    albums: [],
    links: [
      { type: "Goa Madness Records", url: "https://goamadnessrecordsofficial.bandcamp.com/" }
    ],
    tracks: []
  },
  {
    id: "antidot-and-dica",
    realName: "Antidot & DICA",
    bio: "שיתוף פעולה בין שני אומנים צרפתיים מסצנת ה-Acid/Goa - DICA (ידוע בסצנת Acid) ו-Antidot. חוצים אסיד-טכנו עם גואה בסט גבה-אנרגיה.",
    notable: "EP 'From Dawn To Dusk' (2025, Suntrip Records) + 'Soulbinder' באוסף 'Acidum Influxum'",
    albums: [
      { name: "From Dawn To Dusk EP", year: 2025, project: "Suntrip Records" },
      { name: "Acidum Influxum (compilation, with 'Soulbinder')", year: 2023, project: "Suntrip Records" }
    ],
    links: [
      { type: "Bandcamp", url: "https://suntriprecords.bandcamp.com/album/from-dawn-to-dusk-digital-12" }
    ],
    tracks: [
      { id: "pHL7QOh9Yu4", title: "Soulbinder", year: 2023 },
      { id: "c69lcDiMvPc", title: "From Dawn To Dusk", year: 2025 }
    ]
  },
  {
    id: "andrew-till",
    realName: "Andrew Till (Psy-Harmonics co-founder)",
    bio: "אנדרו טיל - שותף-מייסד של Psy-Harmonics האוסטרלי יחד עם Ollie Olsen ב-1993. הלייבל התמקד בקצוות הניסיוניים, ברייקביט וגואה מעוקף שיצאו מאוסטרליה, יפן וניו זילנד. אנדרו ממשיך את הלייבל עד היום ומופיע ב-ZNA במעבר משלל לאור.",
    notable: "Psy-Harmonics (1993) - הלייבל האוסטרלי האייקוני שהפיק את Zen Paradox, Mystic Force, Shaolin Wooden Men ועוד",
    albums: [
      { name: "Psy-Harmonics catalog (curator)", year: "1993-present", project: "Co-founder & curator" }
    ],
    links: [
      { type: "Bandcamp", url: "https://psy-harmonics.bandcamp.com/" },
      { type: "Discogs", url: "https://www.discogs.com/label/5557-Psy-Harmonics" }
    ],
    tracks: []
  },
  {
    id: "cosmosis-vs-laughing-buddha",
    realName: "Cosmosis vs Laughing Buddha (Bill Halsey + Jez 'Buddha')",
    bio: "מפגש מחדש של שני שמות אגדיים: Bill Halsey (Cosmosis) ו-Jez 'Buddha' (Laughing Buddha) ייחד הפיקו את 'Cosmology' (1996, Transient) - מהאלבומים המכוננים של גואה הקלאסי. אחרי שלושים שנה הם מתאחדים ל-B2B מיוחד ב-ZNA 2026.",
    notable: "co-producers על אלבום הביכורים 'Cosmology' (1996, Transient) - איחוד היסטורי",
    albums: [
      { name: "Cosmology", year: 1996, project: "Cosmosis + Laughing Buddha (Transient)" },
      { name: "Sacred Technology", year: 2010, project: "Laughing Buddha (Nano Records) - solo" },
      { name: "Illusions & Collusions", year: 2014, project: "Laughing Buddha - collaborations album" }
    ],
    links: [
      { type: "Discogs (Laughing Buddha)", url: "https://www.discogs.com/artist/11425-Laughing-Buddha" },
      { type: "Bandcamp (Laughing Buddha)", url: "https://laughingbuddha.bandcamp.com/" },
      { type: "Discogs (Cosmosis)", url: "https://www.discogs.com/artist/11439-Cosmosis" }
    ],
    tracks: [
      { id: "p9yPtqdVQxI", title: "Laughing Buddha - Sacred Technology (Full Album, 2010)", year: 2010 },
      { id: "EIrJVemIMBI", title: "Laughing Buddha - Illusions & Collusions (Full Album, 2014)", year: 2014 }
    ]
  },
  {
    id: "domino-vs-ree-k",
    realName: "Domino vs Ree.K (B2B)",
    bio: "מפגש שתי דמויות מהדור הראשון של גואה: Domino - ה-DJ הראשונה שמוכרת בסצנת גואה הקלאסית, מנגנת מ-DATs (digital audio tape) - וריקיי היפנית. ב-ZNA 2026 הן חוצות בין הקלאסי לחדש.",
    notable: "B2B אגדי בין שתי דמויות מובילות מהדור הראשון של גואה",
    albums: [
      { name: "Goa", year: 2000, project: "Domino (Avatar Records)" },
      { name: "Stardrops Over The Ocean", year: null, project: "Domino - life story mix" },
      { name: "Journey Through Time", year: 2022, project: "Domino curation (SpaceWarp)" }
    ],
    links: [
      { type: "Discogs (Domino)", url: "https://www.discogs.com/artist/215255-Domino-6" },
      { type: "Bandcamp (Domino)", url: "https://avatarmusic.bandcamp.com/album/goa" },
      { type: "Bandcamp (Ree.K)", url: "https://psy-harmonics.bandcamp.com/album/yammataikoku" }
    ],
    tracks: [
      { id: "TsugnBwlreY", title: "Domino - Goa Mix (2000)", year: 2000 },
      { id: "7U8D4brQo5c", title: "Domino - Moon Mix", year: null },
      { id: "TPIUjK_4aXA", title: "Ree.K Live @ Unite - Psytrance Sessions", year: null }
    ]
  },
  {
    id: "skizologic-vs-filteria",
    realName: "Skizologic vs Filteria (Maor Hasbani vs Jannis Tzikas)",
    bio: "מפגש בין Skizologic (מאור הסבני, ישראל) - אומן Goa-Psytrance עם פיוז'ן רטרו-עתידני - ו-Filteria (יאניס ציקאס, יוון/שטוקהולם), ממנהיגי תחיית הגואה. שניהם רעיונות מובילים בגואה החדש.",
    notable: "מפגש בין שני שמות מובילים בגואה החדש - ישראל × שבדיה",
    albums: [
      { name: "Stimulation", year: null, project: "Skizologic - solo" },
      { name: "Hallucinated 002", year: 2024, project: "Skizologic (Future Music Records)" }
    ],
    links: [
      { type: "Discogs (Skizologic)", url: "https://www.discogs.com/artist/3140564-Skizologic" },
      { type: "Bandcamp (Skizologic)", url: "https://skizologicmusic.bandcamp.com/" },
      { type: "Bandcamp (Filteria)", url: "https://filteria.bandcamp.com/album/sky-input" }
    ],
    tracks: [
      { id: "aSyfsyIGdaE", title: "Skizologic Set @ Unite - Psytrance Sessions", year: null }
    ]
  },
  {
    id: "mittelstandskinder-ohne-strom",
    realName: "M.O.S. - Christian Bruckhaus & Andi 'N.D.M.' Muller",
    bio: "פרויקט פסיטראנס/גואה גרמני שהוקם ב-1995. השם בגרמנית = 'ילדי המעמד הבינוני ללא חשמל'. ידועים ברמיקס הקיצוני שלהם ל-'We Are The Mammoth Hunters' של Ticon. אלבומים: Доклад о революции, Drive, Bug.",
    notable: "M.O.S. - שם מפתח של הסצנה הגרמנית הקלאסית (פעיל מ-1995)",
    albums: [
      { name: "Single Collection (pre-2000 tracks)", year: 2020, project: "Classic Goa Trax" },
      { name: "Drive", year: null, project: "M.O.S." },
      { name: "Bug", year: null, project: "M.O.S." }
    ],
    links: [
      { type: "Bandcamp", url: "https://classicgoatrax.bandcamp.com/album/single-collection" },
      { type: "Last.fm", url: "https://www.last.fm/music/Mittelstandskinder%20Ohne%20Strom" }
    ],
    tracks: [
      { id: "tBKc9AnCY3M", title: "The Wave Inside (Nirhtak EP, 1997)", year: 1997 }
    ]
  },
  {
    id: "encens-vs-ominus",
    realName: "Encens (Cello Bonifacii) vs Ominus (Cello + Miranda + Dara Lee)",
    bio: "מפגש מחדש של 29 שנה: Marcello Bonifacii (Encens) ו-Dara Lee (Koyote Records founder) על במת Zambu Temple. Encens עם 'Spiritual Transgression' ו-'Psychedelic Sun' מ-Koyote. Ominus היה supergroup: Cello + Dara Lee + Miranda, ויצא ב-1997 על Koyote.",
    notable: "Reunion של 29 שנה - Encens ו-Ominus חוזרים לבמה",
    albums: [
      { name: "Psychedelic Sun / Infinite Image", year: 1996, project: "Encens / Koyote Records" },
      { name: "Spiritual Transgression / Energy Gate", year: 1996, project: "Encens / Koyote Records" },
      { name: "Venus Zen / Morphic Resonance", year: null, project: "Encens / Koyote Records" },
      { name: "Ominus", year: 1997, project: "Ominus = Encens + Miranda + Dara Lee" }
    ],
    links: [
      { type: "Discogs (Encens)", url: "https://www.discogs.com/artist/12449-Encens" },
      { type: "Discogs (Ominus)", url: "https://www.discogs.com/master/15044-Ominus-Ominus" }
    ],
    tracks: [
      { id: "ifVeU6dDESU", title: "Encens - Spiritual Transgression (1996)", year: 1996 },
      { id: "yvxuXoWSeQw", title: "Ominus - Ominus (Full Album, 1997)", year: 1997 }
    ]
  },
  {
    id: "gangguru-vs-cop",
    realName: "Gangguru (Pierre Branet + Phil Weiss + Willy Boutron) vs COP (with Jan Müller / X-Dream)",
    bio: "Gangguru - טריו צרפתי שהוקם ב-1994 ע\"י פייר בראנה, פיל וייס וויי בוטרון. השם 'Be Your Own Guru' בא מהחוויה שלהם בפסטיבל Vuuv 1993 עם DJ Antaro. COP (Children Of Paradise) הוא פרויקט שיתופי שלהם עם יאן מולר מ-X-Dream.",
    notable: "'Be Your Own Guru' (DAT Records, 2018) - 33 טראקים שנשמרו על DATs ושוחזרו",
    albums: [
      { name: "Be Your Own Guru", year: 2018, project: "Gangguru / DAT Records (33 tracks)" },
      { name: "Dreamtime / X-3 EP", year: 1999, project: "Gangguru / 3rd Mind Records" },
      { name: "Alternate Realities", year: null, project: "Gangguru / Unreleased Goa Records" },
      { name: "94/96 EP", year: null, project: "GangGuru Mad Stof / newom records" }
    ],
    links: [
      { type: "Bandcamp", url: "https://datrecords.bandcamp.com/album/be-your-own-guru" },
      { type: "Discogs", url: "https://www.discogs.com/master/29121-COP-Urban-Alien" }
    ],
    tracks: [
      { id: "nMgczwijrRE", title: "Gangguru - Be Your Own Guru (Full Album)", year: 2018 },
      { id: "aFagZLMTPZw", title: "Gangguru - X-3", year: 1999 }
    ]
  },
  {
    id: "drop-dash-vs-germinator",
    realName: "Germinator - Frederik Möller + Jan Richter + Steve Lavell (Australo-Swedish trio)",
    bio: "Germinator - טריו אוסטרלו-שבדי מ-90's עם 2 אלבומים בלתי נשכחים. אחרי שנים של שתיקה, חשפו את ה-Single Collection של ה-12\" שלהם ושל פסים שלא יצאו על אוספים. סאונד עמוק ופאנקי של גואה אוסטרלית קלאסית.",
    notable: "Single Collection (Classic Goa Trax / Suntrip) - אוצרות של גואה 90's",
    albums: [
      { name: "Single Collection (vinyl 12\" + comp tracks)", year: null, project: "Germinator / Classic Goa Trax" }
    ],
    links: [
      { type: "Bandcamp", url: "https://classicgoatrax.bandcamp.com/album/single-collection-14" }
    ],
    tracks: []
  },
  {
    id: "psyko-disko-vs-spies",
    realName: "Psyko Disko - Fred Disko & Ollie Olsen (Psy-Harmonics)",
    bio: "Psyko Disko - שיתוף פעולה אוסטרלי-בינלאומי בין Fred Disko (אחד מ-DJs המוקדמים של גואה גיל ב-Goa Trance) ל-Ollie Olsen (Shaolin Wooden Men, מייסד Psy-Harmonics). אלבום 'Psycho Disco' על Psy-Harmonics.",
    notable: "Fred Disko - מהדמויות המוקדמות שהפכו את גואה לטראנס אלקטרוני (יחד עם Laurent ו-Goa Gil ב-1983)",
    albums: [
      { name: "Psycho Disco", year: null, project: "Psyko Disko / Psy-Harmonics" }
    ],
    links: [
      { type: "Bandcamp", url: "https://psy-harmonics.bandcamp.com/album/psycho-disco" }
    ],
    tracks: [
      { id: "2QKgRfMOKt0", title: "Nobody (Ace Ventura & Skizologic Remix)", year: null }
    ]
  },
  {
    id: "jordan",
    realName: "Jordan Bonyo (Disco Hooligans / Outer World Elements)",
    bio: "DJ יווני - היסטוריה ארוכה במחתרת המוזיקלית: היפ-הופ ואסיד האוס של שנות ה-80, אל סצנת גואה בלונדון מ-1995. שותף-מייסד של Disco Hooligans (יחד עם Nectarios Meidanis) - דואו פסיטראנס אופטימי, ואחרי 2012 גם של Outer World Elements (יחד עם John Petsopoulos מאתונה). מיוצג ע\"י DAT Universe.",
    notable: "Disco Hooligans - 'Clear Skies' (אלבום ביכורים) ו-'Darjeeling Express'. גם Outer World Elements (פעיל מ-2013)",
    albums: [
      { name: "Clear Skies", year: null, project: "Disco Hooligans (with Nectarios Meidanis)" },
      { name: "Darjeeling Express", year: null, project: "Disco Hooligans (with Nectarios Meidanis)" }
    ],
    links: [
      { type: "SoundCloud", url: "https://soundcloud.com/dj-jordan1" },
      { type: "Outer World Elements SC", url: "https://soundcloud.com/outer-world-elements" }
    ],
    tracks: []
  },
  {
    id: "larsik",
    realName: "Larsik",
    bio: "DJ ב-'Goa Guardians' - מהדמויות הקבועות שמשמרות את המורשת הגואית הקלאסית. שומרים, אוצרים ומספרי סיפורים של הסצנה - חלק מהם מחזיקים אוצרים נדירים של edits ושחרורים שלא יצאו, שאפילו המפיקים המקוריים כבר לא מחזיקים אצלם.",
    notable: "Goa Guardians (pre-party for ZNA Gathering) - שומר המורשת",
    albums: [],
    links: [],
    tracks: []
  },
  {
    id: "dj-eden",
    realName: "DJ Eden",
    bio: "DJ פסיטראנס/גואה - חלק מקהילת ה-DJs הבינלאומית. נוכחות ב-Spotify ו-YouTube.",
    notable: "Goa Guardians DJ",
    albums: [],
    links: [
      { type: "Spotify", url: "https://open.spotify.com/artist/3cITmfgifFLopotKbfBbli" },
      { type: "YouTube", url: "https://www.youtube.com/channel/UCEqXr6nICnt82N-ngb_dscg" }
    ],
    tracks: []
  },
  {
    id: "sancho-meiso",
    realName: "Sancho Meiso Chaya - Shin Sasama",
    bio: "Shin Sasama מטוקיו - הקריירה התחילה בשנות ה-90 כסקסופוניסט בלהקת הדאב Cultivator ובהפקות רגאיי יפני. בתחילת שנות ה-2000 פתח את הפרויקט הסולו Sancho Meiso Chaya עם אמביינט וניסיון אלקטרוני. הסאונד שלו משלב אטמוספרות עמוקות עם קצבים מאולתרים. הופעות חיות ב-Ozora, Mo:Dem, ו-ZNA Gathering.",
    notable: "פרויקט דאב/ניסיוני יפני - 3 אלבומים + EPs (b.p.f.records 2008-2009)",
    albums: [
      { name: "EP1", year: 2008, project: "Sancho Meiso Chaya / b.p.f.Records" },
      { name: "EP2", year: 2008, project: "Sancho Meiso Chaya / b.p.f.Records" },
      { name: "EP3", year: 2009, project: "Sancho Meiso Chaya / b.p.f.records" },
      { name: "Misukumi EP", year: null, project: "Sancho Meiso Chaya / Bandcamp" },
      { name: "April Dub (with Koyas)", year: null, project: "psymatics" }
    ],
    links: [
      { type: "Linktree", url: "https://linktr.ee/sanchomeisochaya" },
      { type: "SoundCloud", url: "https://soundcloud.com/sanchomeisochaya" },
      { type: "Bandcamp", url: "https://sanchomeisochaya.bandcamp.com/" },
      { type: "Resident Advisor", url: "https://ra.co/dj/sanchomeisochaya" }
    ],
    tracks: [
      { id: "YiUYBzI1jg0", title: "Live Session / Sancho Meiso Chaya", year: null }
    ]
  },
  {
    id: "goaacen",
    realName: "Goaacen (Tiago Lopes)",
    bio: "מהמובילים של DJs פורטוגזים בגואה טראנס. DJ של Suntrip Records וחלק מ-604 Productions. אוהב לחקור טריטוריות אפלות יותר של גואה. ב-ZNA הוא מראה איך מסע של שעתיים יכול לטוס במהירות.",
    notable: "DJ של Suntrip Records + 604 Freaks Productions (Portugal)",
    albums: [],
    links: [
      { type: "SoundCloud", url: "https://soundcloud.com/tiago-lopes-646831806" },
      { type: "Facebook", url: "https://www.facebook.com/Gooaacen/" }
    ],
    tracks: []
  },
  {
    id: "bill-robin-maya",
    realName: "Bill Robin & Maya Wada",
    bio: "Bill Robin & Maya Wada - דואו DJs ב-Market Stage של ZNA 2026. Maya Wada יפנית עם נוכחות ב-SoundCloud ו-Discogs. הופעה חיה במשפט הדאב/אקספרימנטל בסצנה היפנית.",
    notable: "Market Stage duo - Japan",
    albums: [],
    links: [
      { type: "SoundCloud (Maya Wada)", url: "https://soundcloud.com/maya-wada-983351163" },
      { type: "Discogs (Maya Wada)", url: "https://www.discogs.com/artist/2823275-Maya-Wada" }
    ],
    tracks: []
  },
  {
    id: "dara-lee",
    realName: "Dara Lee (Koyote Records founder)",
    bio: "מייסדת Koyote Records — חותמת גואה/פסיכדלי טראנס מ-Brighton (UK) שהושקה בנובמבר 1995. ה-DJ והמפיקה Dara-Lee ניהלה את Koyote/Peyote Records ואת ה-distribution. שותפה ב-Ominus (1997) יחד עם Encens (Marcello Bonifacii) ו-Miranda — גם זה collab שמופיע ב-ZNA 2026.",
    notable: "מייסדת Koyote Records (1995, Brighton) — אחת הדמויות המרכזיות של גואה בריטי קלאסי",
    albums: [
      { name: "Virtual Transgression", year: 1995, project: "Dara Lee solo cassette" },
      { name: "Koyote Records catalog (curator)", year: "1995-1998", project: "Founder & label head" },
      { name: "Ominus", year: 1997, project: "Ominus = Dara Lee + Encens + Miranda" }
    ],
    links: [
      { type: "Discogs", url: "https://www.discogs.com/artist/77381-Dara-Lee" },
      { type: "Mixcloud", url: "https://www.mixcloud.com/AstralFairyMarga/dj-dara-lee-psychedelic-trance-tape/" }
    ],
    tracks: [
      { id: "8FjSRkW4SEk", title: "A Taste Of Koyote Records 1995-1998", year: null },
      { id: "aAIzM7J5BSQ", title: "Ominus - Psychic Race", year: 1997 },
      { id: "oeYEk_jwvJs", title: "Ominus - Acid Tester (Mirrors Of Sense Mix)", year: 1997 }
    ]
  },
  {
    id: "ultravibe",
    realName: "Ultravibe = Cosmosis + Filteria",
    bio: "פרויקט שיתופי בין Bill Halsey (Cosmosis) ל-Jannis Tzikas (Filteria) — שני ותיקים מובילים של גואה. Cosmosis הוא חלוץ הז'אנר משחרור 'Cosmology' (1996), ו-Filteria החזיר את הסאונד הקלאסי לחיים ב-2004. Ultravibe מערבב את הסאונד הגואה הקלאסי עם הפקה מודרנית.",
    notable: "EP 'Electrosurge' (אוקטובר 2024) ואלבום 'Transmitter' (דצמבר 2024) על Future Music Records",
    albums: [
      { name: "Electrosurge EP", year: 2024, project: "Ultravibe = Cosmosis + Filteria / Future Music Records" },
      { name: "Transmitter", year: 2024, project: "Ultravibe = Cosmosis + Filteria / Future Music Records" }
    ],
    links: [
      { type: "Bandcamp (Cosmosis)", url: "https://cosmosis.bandcamp.com/album/transmitter" },
      { type: "Bandcamp (Future Music)", url: "https://beatspace-futuremusic.bandcamp.com/album/transmitter" }
    ],
    tracks: [
      { id: "WvM8lxA6R4I", title: "Transmitter", year: 2024 },
      { id: "GoMFvO_jYCg", title: "Squelch", year: 2024 },
      { id: "3GyVXcvN0E8", title: "Electrosurge (Psychedelic Visuals)", year: 2024 },
      { id: "MXm8WFKDjHo", title: "The One Thing", year: 2024 },
      { id: "oQzgA77S8eY", title: "Liquid Love", year: 2024 }
    ]
  },
  {
    id: "ephedra",
    realName: "Ephedra (Alexandre Cohen)",
    bio: "מפיק/DJ בלגי מבריסל. אומן Goatrance מובהק - 5 אלבומים על Goa Madness Records (לייבל בלגי שהוא מנהל יחד עם Kuririn). חלק גם מהפרויקט המשותף Moon Beasts יחד עם Proxeeus.",
    notable: "5 אלבומי גואה על Goa Madness Records: Journey Through My Head (2014), Flying Over The Universe (2016), What The Future Brings (2018), Another Place On Earth (2021), Resilient Horizon (2024)",
    albums: [
      { name: "Journey Through My Head", year: 2014, project: "Goa Madness Records (debut)" },
      { name: "Flying Over The Universe", year: 2016, project: "Goa Madness Records" },
      { name: "What The Future Brings", year: 2018, project: "Goa Madness Records" },
      { name: "Another Place On Earth", year: 2021, project: "Goa Madness Records" },
      { name: "Resilient Horizon", year: 2024, project: "Goa Madness Records" },
      { name: "Moon Beasts (project with Proxeeus)", year: null, project: "with Proxeeus / Goa Madness" }
    ],
    links: [
      { type: "Bandcamp", url: "https://goamadnessrecordsofficial.bandcamp.com/album/ephedra-journey-through-my-head" },
      { type: "MusicBrainz", url: "https://musicbrainz.org/artist/eb866c5e-2a32-44a0-aefc-e303d1179c9b" }
    ],
    tracks: [
      { id: "KrAaFohbcvc", title: "Enter Eternity 2015 (Goa Trance Set)", year: 2015 },
      { id: "n0yasoYvfcA", title: "Beyond Spaces (Official)", year: null },
      { id: "LqLCRclq1jY", title: "Crispy Biscuits (Official)", year: null }
    ]
  },
  {
    id: "space-cat-vs-talamasca",
    realName: "Space Cat (Avi Algranati / Israel) vs Talamasca (Cédric Dassule / France)",
    bio: "מפגש שני אבות הפסיטראנס: Space Cat - אבי אלגרנטי מבת ים, ישראל - אלבום הביכורים 'Beam Me Up' (1999, HOMmega) הוא אחד החשובים ביותר בהיסטוריה של גואה טראנס, עם שיתופי פעולה עם Hallucinogen, Transwave, Infected Mushroom, Oforia ו-Elysium. Talamasca - Cédric Dassule הצרפתי (גם DJ Lestat) - אלבום 'Musica Divinorum' (2001, Spiral Trax) קיבע את שמו.",
    notable: "Space Cat - 'Beam Me Up' (1999, HOMmega) אבן יסוד של פסיטראנס. Talamasca - 'Musica Divinorum' (2001, Spiral Trax)",
    albums: [
      { name: "Beam Me Up", year: 1999, project: "Space Cat / HOMmega Productions" },
      { name: "Musica Divinorum", year: 2001, project: "Talamasca / Spiral Trax" },
      { name: "Psychedelic Trance", year: 2013, project: "Talamasca / Dacru Records" }
    ],
    links: [
      { type: "Discogs (Space Cat)", url: "https://www.discogs.com/artist/904-Space-Cat" },
      { type: "Discogs (Talamasca)", url: "https://www.discogs.com/artist/27716-Talamasca" },
      { type: "Bandcamp (Space Cat)", url: "https://hommega.bandcamp.com/album/beam-me-up" },
      { type: "Website (Talamasca)", url: "https://www.talamasca.fr/discography-albums/" }
    ],
    tracks: [
      { id: "F6KyTuR-III", title: "Space Cat - Beam Me Up [Full Album]", year: 1999 },
      { id: "xUDRtZ4ndew", title: "Space Cat - Beam Me Up [Full Album HQ]", year: 1999 },
      { id: "EJPlfvava7A", title: "Space Cat - Space Cats (Remaster 2025)", year: 2025 },
      { id: "NWKv2l-c9TU", title: "Space Cat - Kreak (psytrance)", year: 1999 },
      { id: "xnItH9mJzWs", title: "Talamasca - Psy Trance (Full Album)", year: 2013 },
      { id: "hbzWBmKNtnQ", title: "Talamasca - Musica Divinorum (2001)", year: 2001 }
    ]
  },
  {
    id: "infinity-project-vs-excess-head",
    realName: "The Infinity Project vs Excess Head (Graham Wood — same artist, two aliases)",
    bio: "סט מיוחד של Graham Wood — שני האליאסים שלו ב-ZNA 2026: The Infinity Project (יחד עם Raja Ram, מקימי TIP Records ב-1994 — סולו אחרי 1998) ו-Excess Head (האליאס הסולו שלו עם חומר ענק שלא יצא לאור). שני מסעות משלימים: הנוסטלגיה של TIP הקלאסי + ההתרגשות מסאונד שלא נשמע מאי פעם.",
    notable: "Graham Wood - אליאסים סולו: TIP (Mystical Experiences 1995, Feeling Weird 1995) + Excess Head (חומר נדיר)",
    albums: [
      { name: "Mystical Experiences", year: 1995, project: "The Infinity Project / TIP Records" },
      { name: "Feeling Weird", year: 1995, project: "The Infinity Project / TIP Records" }
    ],
    links: [
      { type: "Discogs", url: "https://www.discogs.com/artist/4512-The-Infinity-Project" },
      { type: "Bandcamp", url: "https://tiprecords.bandcamp.com/" }
    ],
    tracks: [
      { id: "IEe22M6Prts", title: "Mystical Experiences (1995) - Full Album", year: 1995 },
      { id: "R9E8DPXHkuI", title: "Feeling Weird (1995) - Full Album", year: 1995 },
      { id: "VjI_ERtkB2c", title: "Yellow Energy (Graham Wood)", year: null }
    ]
  },
  {
    id: "jean-borelli-vs-sid-shanti",
    realName: "Jean Borelli (Orion) vs Sid Shanti — vinyl B2B exclusive",
    bio: "סט VS אקסקלוסיבי בויניל בין Jean Borelli (Orion) לבין Sid Shanti — מפגש בין שני אבות הסצנה הקלאסית. Orion דמות מפתח של פסיטראנס מתחילת שנות ה-90, Sid Shanti אומן Phantasm Records ידוע ב-mixed CDs מ-1996-1999.",
    notable: "B2B אקסקלוסיבי בויניל - מפגש בין שני אספני הקלאסי",
    albums: [],
    links: [
      { type: "Discogs (Jean Borelli)", url: "https://www.discogs.com/artist/77371-Jean-Borelli" },
      { type: "Discogs (Sid Shanti)", url: "https://www.discogs.com/artist/180461-Sid-Shanti" }
    ],
    tracks: [
      { id: "msWKsfC0RnQ", title: "Sid Shanti - Phantasm & Psychic Deli mix", year: 1999 }
    ]
  },
  {
    id: "dado-vs-dino-psaras",
    realName: "Dado (Frédéric Holyszewski / Deedrah / Transwave) vs Dino Psaras",
    bio: "Dado - פרדריק הוליצ'בסקי הצרפתי, ידוע גם כ-Deedrah, חצי מ-Transwave (יחד עם Christof Drouillet / Absolum, 1994), ו-Synthetic. אלבום סולו ראשון 'Self Oscillation' (1997) פרץ את הסאונד הגואה הקלאסי. Dino Psaras - מאבות הפסיטראנס העולמי, פעיל מ-1988, חבר ב-Ayahuasca עם Steve Ronan ו-Joti Sidhu.",
    notable: "מפגש בין שני אבות הסצנה - Transwave/Deedrah pgs Ayahuasca/Lick It (Oktava 2003)",
    albums: [
      { name: "Self Oscillation", year: 1997, project: "Deedrah - solo debut" },
      { name: "Lick It", year: 2003, project: "Dino Psaras / Oktava Records" },
      { name: "Transwave releases", year: null, project: "Dado as half of Transwave (with Absolum)" }
    ],
    links: [
      { type: "Wikipedia (Transwave)", url: "https://en.wikipedia.org/wiki/Transwave" },
      { type: "PsyDB (Dino Psaras)", url: "https://www.psydb.net/artist/dino-psaras/3597" },
      { type: "SoundCloud (Deedrah)", url: "https://soundcloud.com/syntheticdado" }
    ],
    tracks: [
      { id: "7psOFbVonWM", title: "Dino Psaras - Lick It (Full Album, 2003)", year: 2003 },
      { id: "yOKcpB5UNvs", title: "Dino Psaras - Lick It [Full Album HQ]", year: 2003 },
      { id: "GF4Ve5hgRIk", title: "Deedrah - Singles & EP's 2014-2018", year: null },
      { id: "XMZzXkNWc-M", title: "Dino Psaras - White Lights Psy", year: null }
    ]
  },
  {
    id: "masaray",
    announcedAt: "2026-05-11",
    name: "Masaray",
    realName: "Ray Castle (NZ/AU) + Masa = Masayuki Kurihara (JP)",
    country: "🇳🇿 ניו זילנד / 🇯🇵 יפן",
    age: null,
    born: "פעילים מ-1995",
    stage: "retro",
    role: "Live",
    tags: ["Goa Trance", "Pioneer", "Psy-Harmonics"],
    color: "#9b51e0",
    bio: "Masaray - שיתוף פעולה היסטורי בין Ray Castle (החלוץ הניו-זילנדי-אוסטרלי שעיצב את מסיבות Pagan Productions באירופה 1987-1991) ל-Masa - מאסיוקי קוריהארה היפני (החלוץ של גואה היפני, X-Tron). שני אבות מייסדים של גואה הבינלאומי - מיפן ועד אוסטרליה. אלבום הביכורים 'Cosmic Trancer' (1995, Psy-Harmonics) הוא אבן יסוד של גואה הקלאסי. ה-EP 'Time Traveler Of Trance' (נובמבר 1995) - יצירת מופת פסיכדלית עם סינתסייזרים נוהים, סיפור-סיפור מורחב וגרוב נמתח שכמעט פינק-פלוידי. הוקלט מעל המסעדה המשפחתית של מאסה בטוקיו. הופעת חיים מיוחדת ב-Zambu Temple של ZNA 2026.",
    notable: "'Cosmic Trancer' (1995, Psy-Harmonics) ו-'Time Traveler Of Trance EP' (1995) - מאלפי המאסטרים של גואה הקלאסי. רימאסטר ב-2018 על Hypnodisk",
    albums: [
      { name: "Cosmic Trancer", year: 1995, project: "Psy-Harmonics (Australia)" },
      { name: "Time Traveler Of Trance EP", year: 1995, project: "Psy-Harmonics 12\"" },
      { name: "Cosmic Trancer (re:master)", year: 2018, project: "Hypnodisk" }
    ],
    links: [
      { type: "Discogs", url: "https://www.discogs.com/artist/26559-Masaray" },
      { type: "Bandcamp (re:master)", url: "https://hypnodisk.bandcamp.com/album/cosmic-trancer-re-master" },
      { type: "Bandcamp (Ray Castle)", url: "https://suntriprecords.bandcamp.com/album/mystique-of-the-metaverse" },
      { type: "Spotify", url: "https://open.spotify.com/album/6uZ5zvwWH3S2PFFDrgbOCp" }
    ],
    tracks: [
      { id: "oeq2CHG_cYE", title: "Cosmic Trancer", year: 1995 },
      { id: "CNeEcQYUpmA", title: "Cosmic Trancer (Psy-Harmonics 1995)", year: 1995 },
      { id: "QL5sYHb28J0", title: "Time Traveler Of Trance", year: 1995 },
      { id: "JM-FZh_gojg", title: "Time Traveler", year: 1995 },
      { id: "s_HIUmQjb7E", title: "Time Traveller (alternate mix)", year: 1995 }
    ]
  },
  {
    id: "dj-emico-amore",
    announcedAt: "2026-03-04",
    name: "DJ Emico Amore",
    realName: "Emico Amore",
    country: "🇯🇵 יפן",
    age: null,
    born: "פעילה מ-1993",
    stage: "guardians",
    role: "DJ Set",
    tags: ["Goa Guardians", "DAT Universe", "Tokyo Underground"],
    color: "#00d4ff",
    bio: "אמיקו אמורה - DJ ותיקה של פסיטראנס וגואה מטוקיו, חברה ב-DAT Universe. נחשפה לאלקטרוניקה גואה לראשונה ב-1993 ומאז לא הסתכלה לאחור. נעה בין השחר של הסצנה היפנית התת-קרקעית לחופי גואה, השתתפה אקטיבית בלילות הזהב של שנות ה-90 והכירה את האנשים שעיצבו את הסצנה. החלה את הקריירה כ-DJ עם דגש על אמביינט, ועם השנים העבירה את המוקד לרחבת הריקודים - סטים עם תחושת סיפור חזקה ועומק רגשי שמגיע מאהבה אמיתית לרוח הגואה.",
    notable: "DAT Universe / Goa Guardians (Japan) - דמות מפתח של גואה ביפן מ-1993",
    albums: [],
    links: [
      { type: "Mixcloud", url: "https://www.mixcloud.com/djemikoamore/" },
      { type: "Facebook", url: "https://www.facebook.com/people/DJ-Emico-Amore/100048926726118/" },
      { type: "Instagram", url: "https://www.instagram.com/djemicoamore" }
    ],
    tracks: []
  },
  {
    id: "nouveau-shamanique",
    announcedAt: "2025-12-25",
    name: "Nouveau Shamanique",
    realName: "Triquetra (Elric & Jurian Reinartz) × Dragon Twins (Mathias Pico)",
    country: "🇧🇪 בלגיה",
    age: null,
    born: "פרויקט חדש 2025",
    stage: "zambu",
    role: "Live",
    tags: ["Futuristic Reality", "New School Goa", "Suntrip", "Hardware Live"],
    color: "#ff006e",
    bio: "פרויקט חי חדש (2025) של שני שמות מובילים בגואה הבלגי החדש: Triquetra - התאומים אלריק וג'וריאן ריינארץ, ידועים בסטים אנלוגיים עם סמפלרים, מכונות מתוכנתות ודידג'רידו (אלבומים על Suntrip Records: 'Ecstatic Planet' 2018, 'Human Control' 2020, ו-'Myriad Vision') - יחד עם Dragon Twins - מאתיאס פיקו מאנטוורפן, בעל הפקות אקדיות חזקות שמופיעות ב-Cronomi, Underground Alien Factory ובאוסף 'Suntrip Classix Vol. 3 - Gaia'. ב-ZNA 2026 השניים יופיעו חיים עם 100% חומרה על הבמה - פיוז'ן ריתמי, ניסיוני ופסיכדלי במיוחד שמרגיש כמו שנות ה-90 הזהובות עם ראייה רטרו-עתידנית.",
    notable: "Triquetra × Dragon Twins - הופעה חיה עם 100% חומרה (Suntrip Records, 2025)",
    albums: [
      { name: "Ecstatic Planet", year: 2018, project: "Triquetra / Suntrip Records (debut)" },
      { name: "Human Control", year: 2020, project: "Triquetra / Suntrip Records" },
      { name: "Myriad Vision", year: null, project: "Triquetra / Suntrip Records" },
      { name: "Suntrip Classix Vol. 3 - Gaia (compilation)", year: null, project: "Dragon Twins - 'Eating Crow'" }
    ],
    links: [
      { type: "Discogs (Triquetra)", url: "https://www.discogs.com/artist/5252321-Triquetra-3" },
      { type: "Discogs (Dragon Twins)", url: "https://www.discogs.com/artist/3531478-Dragon-Twins" },
      { type: "Bandcamp (Triquetra)", url: "https://suntriprecords.bandcamp.com/album/triquetra-ecstatic-planet" },
      { type: "Bandcamp (Human Control)", url: "https://suntriprecords.bandcamp.com/album/human-control" },
      { type: "SoundCloud (Triquetra)", url: "https://soundcloud.com/triquetra-2" },
      { type: "SoundCloud (Dragon Twins)", url: "https://soundcloud.com/djunasaurus" }
    ],
    tracks: [
      { id: "c9xzED0OtZE", title: "Triquetra - Ecstatic Planet (Full Album)", year: 2018 },
      { id: "AasQuFMRB9M", title: "Triquetra - Sunstream Hardware Live", year: 2020 },
      { id: "wLAYeYhFxPg", title: "Triquetra - Full Hardware Live", year: 2019 },
      { id: "NKajxMh1v54", title: "Triquetra - Home Studio Live", year: 2019 },
      { id: "sxsxjbKQ00Q", title: "Triquetra - Talk Binary to Me", year: null },
      { id: "vQbg0LQxmmo", title: "Dragon Twins - MPC Live (Studio Session)", year: 2020 }
    ]
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
  },
  "masaray": {
    representedBy: "Psy-Harmonics (historical) · Hypnodisk (re:master)",
    channels: {
      spotify: "https://open.spotify.com/album/6uZ5zvwWH3S2PFFDrgbOCp",
      bandcamp: "https://hypnodisk.bandcamp.com/album/cosmic-trancer-re-master"
    }
  },
  "dj-emico-amore": {
    representedBy: "DAT Universe · JP",
    channels: {
      mixcloud: "https://www.mixcloud.com/djemikoamore/"
    }
  },
  "nouveau-shamanique": {
    representedBy: "Suntrip Records · BE",
    channels: {
      soundcloud: "https://soundcloud.com/triquetra-2",
      bandcamp: "https://suntriprecords.bandcamp.com/album/triquetra-ecstatic-planet"
    }
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
      "country": "🇮🇱 Israel",
      "born": "active in the scene"
    },
    "pt": {
      "bio": "Artista do Retro Universe — faz parte da viagem retro Goa do ZNA 2026.",
      "notable": "Retro Universe",
      "country": "🇮🇱 Israel",
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
      "country": "🇮🇱 Israel",
      "born": "active in the scene"
    },
    "pt": {
      "bio": "Artista do Retro Universe no ZNA 2026.",
      "notable": "Retro Universe",
      "country": "🇮🇱 Israel",
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
      "country": "🇮🇱 Israel",
      "born": "active in the scene"
    },
    "pt": {
      "bio": "Selector do Retro Universe — faz parte da família ZNA 2026.",
      "notable": "Retro Universe",
      "country": "🇮🇱 Israel",
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
      "country": "🇮🇱 Israel",
      "born": "active in the scene"
    },
    "pt": {
      "bio": "Selector do Retro Universe — membro da família ZNA 2026.",
      "notable": "Retro Universe",
      "country": "🇮🇱 Israel",
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
      "country": "🇫🇮 Finland",
      "born": "active in the scene"
    },
    "pt": {
      "bio": "DJ de referência do género Suomisaundi — o Goa Trance finlandês excêntrico e de espírito livre. Dirige a editora sem fins lucrativos Random Records, que apoia organizações de direitos dos povos indígenas.",
      "notable": "Random Records — uma editora activista",
      "country": "🇫🇮 Finlândia",
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
  },
  "doof": {
    "en": {
      "bio": "Nick Barber, a London-based British producer and guitarist. His debut album 'Let's Turn On' (TIP Records, 1996) is considered a foundational Goa Trance classic. He worked closely with Simon Posford (Hallucinogen) on tracks like Born Again and Angelic Particles.",
      "notable": "'Let's Turn On' (1996, TIP) — a cornerstone of Goa. Remastered in 2015 on DAT Records",
      "country": "🇬🇧 UK",
      "born": "active since the 90s"
    },
    "pt": {
      "bio": "Nick Barber, produtor e guitarrista britânico de Londres. O seu álbum de estreia 'Let's Turn On' (TIP Records, 1996) é considerado um clássico fundador do Goa Trance. Colaborou de perto com Simon Posford (Hallucinogen) em temas como Born Again e Angelic Particles.",
      "notable": "'Let's Turn On' (1996, TIP) — uma pedra angular do Goa. Remasterizado em 2015 na DAT Records",
      "country": "🇬🇧 Reino Unido",
      "born": "ativo desde os anos 90"
    }
  },
  "prometheus": {
    "en": {
      "bio": "Benji Vaughan — a British psychedelic trance producer. The solo project Prometheus is signed to Twisted Records (Simon Posford / Hallucinogen). Known for distinctive bass lines and intense arrangements that blend diatonic melody with glitchy percussion patterns.",
      "notable": "Twisted Records albums: Robot.O.Chan (2004), Corridor Of Mirrors (2007), Spike (2010)",
      "country": "🇬🇧 UK",
      "born": "active since the 2000s"
    },
    "pt": {
      "bio": "Benji Vaughan — produtor britânico de trance psicadélico. O projecto solo Prometheus está assinado pela Twisted Records (Simon Posford / Hallucinogen). Conhecido pelas suas linhas de baixo distintas e arranjos intensos que misturam melodia diatónica com padrões de percussão glitchy.",
      "notable": "Álbuns na Twisted Records: Robot.O.Chan (2004), Corridor Of Mirrors (2007), Spike (2010)",
      "country": "🇬🇧 Reino Unido",
      "born": "ativo desde os anos 2000"
    }
  },
  "growling-mad-scientists": {
    "en": {
      "bio": "Growling Mad Scientists — the Israeli-London duo of Riktam (Avi Algranati) and Bansi (Yoad Nevo). One of the defining projects of classic psytrance, formed in mid-90s London.",
      "notable": "Debut album 'Chaos Laboratory' (1997) — a foundational record of modern psytrance",
      "country": "🇮🇱 Israel / 🇬🇧 UK",
      "born": "active since the mid-90s"
    },
    "pt": {
      "bio": "Growling Mad Scientists — o duo israelita-londrino de Riktam (Avi Algranati) e Bansi (Yoad Nevo). Um dos projectos definidores do psytrance clássico, formado em Londres em meados dos anos 90.",
      "notable": "Álbum de estreia 'Chaos Laboratory' (1997) — uma obra fundadora do psytrance moderno",
      "country": "🇮🇱 Israel / 🇬🇧 Reino Unido",
      "born": "ativo desde meados dos anos 90"
    }
  },
  "doctor-vagator": {
    "en": {
      "bio": "A veteran Goa Trance DJ — a figure from the original Goa scene of the 90s. Famously seen dancing on the dragon-monster above Spaghetti Beach in Goa in 1997, an iconic moment of Goa culture.",
      "notable": "DJ of D.A.T sets — one of the pillars of the classic live scene",
      "country": "🇫🇷 France",
      "born": "active since the 90s"
    },
    "pt": {
      "bio": "Um DJ veterano do Goa Trance — uma figura da cena original de Goa dos anos 90. Foi visto a dançar sobre o monstro-dragão acima da Spaghetti Beach em Goa em 1997, um momento icónico da cultura Goa.",
      "notable": "DJ de sets em D.A.T — um dos pilares da cena ao vivo clássica",
      "country": "🇫🇷 França",
      "born": "ativo desde os anos 90"
    }
  },
  "anoebis": {
    "en": {
      "bio": "A devoted Belgian Goa DJ, label manager and co-founder of Suntrip Records (2004) together with Fabien 'Mars' Marsaud. He started the label because the melodic-acid Goa scene he loved was fading — and turned it into one of the most important labels of the genre.",
      "notable": "Co-founder of Suntrip Records — the key label of the new Goa wave",
      "country": "🇧🇪 Belgium",
      "born": "active since the 2000s"
    },
    "pt": {
      "bio": "Um DJ belga dedicado ao Goa, gestor de editora e co-fundador da Suntrip Records (2004) juntamente com Fabien 'Mars' Marsaud. Fundou a editora porque a cena Goa melódica-acid que adorava estava a desaparecer — e transformou-a numa das mais importantes do género.",
      "notable": "Co-fundador da Suntrip Records — a editora chave do novo Goa",
      "country": "🇧🇪 Bélgica",
      "born": "ativo desde os anos 2000"
    }
  },
  "cyan": {
    "en": {
      "bio": "An uplifting Goa Trance project from Greece — the duo of Mike Dee and Nikos Chrisoulakis. They began their musical journey in the late 90s under Discobole Recordings, and the debut album 'Beast From The East' (1998) defined their melodic, emotional sound.",
      "notable": "'Beast From The East' (1998, Discobole) — a foundational Greek Goa album",
      "country": "🇬🇷 Greece",
      "born": "active since the late 90s"
    },
    "pt": {
      "bio": "Um projecto de Goa Trance elevado da Grécia — o duo de Mike Dee e Nikos Chrisoulakis. Começaram o seu percurso musical no final dos anos 90 pela Discobole Recordings, e o álbum de estreia 'Beast From The East' (1998) definiu o seu som melódico e emocional.",
      "notable": "'Beast From The East' (1998, Discobole) — um álbum fundador do Goa grego",
      "country": "🇬🇷 Grécia",
      "born": "ativo desde finais dos anos 90"
    }
  },
  "spiralkinder": {
    "en": {
      "bio": "A German Goa/ambient project that started in 1991-1992. Arne Schaffhausen (later Extrawelt, Spirallianz, Midimiliz) and Marco Schmedding. Collaborated with X-Dream (Marcus Maichel & Jan Müller), Planet B.E.N., Morphem and others. One of the building blocks of the dark, experimental German scene of the early 90s.",
      "notable": "A legendary and rare project — few live shows. ZNA 2026 = a one-off opportunity",
      "country": "🇩🇪 Germany",
      "born": "active since 1991"
    },
    "pt": {
      "bio": "Um projecto alemão de Goa/ambient que começou em 1991-1992. Arne Schaffhausen (mais tarde Extrawelt, Spirallianz, Midimiliz) e Marco Schmedding. Colaboraram com os X-Dream (Marcus Maichel & Jan Müller), Planet B.E.N., Morphem e outros. Uma das pedras de construção da cena alemã sombria e experimental do início dos anos 90.",
      "notable": "Um projecto lendário e raro — poucos concertos ao vivo. ZNA 2026 = uma oportunidade única",
      "country": "🇩🇪 Alemanha",
      "born": "ativo desde 1991"
    }
  },
  "hypnoxock": {
    "en": {
      "bio": "Victor Solsona from Barcelona — over 15 years of producing psychedelic music. In the past decade he has focused on Goa Trance. Albums on Suntrip Records, Goa Madness and Matsuri Digital. He has played at major festivals: Ozora, ZNA Gathering, Sun Festival and others.",
      "notable": "'Beyond The Wormhole' (2020, Suntrip) — his sixth album",
      "country": "🇪🇸 Spain",
      "born": "active since the 2000s"
    },
    "pt": {
      "bio": "Victor Solsona de Barcelona — mais de 15 anos a produzir música psicadélica. Na última década focou-se no Goa Trance. Álbuns na Suntrip Records, Goa Madness e Matsuri Digital. Tocou em grandes festivais: Ozora, ZNA Gathering, Sun Festival e outros.",
      "notable": "'Beyond The Wormhole' (2020, Suntrip) — o seu sexto álbum",
      "country": "🇪🇸 Espanha",
      "born": "ativo desde os anos 2000"
    }
  },
  "artifact303": {
    "en": {
      "bio": "A Hungarian-Romanian artist — one of the most prominent rising stars of melodic Goa. The debut album 'Back To Space' (2011, Suntrip) cemented his name in the genre. A decade later — 'From The Stars' (Global Sect).",
      "notable": "'Back To Space' (2011, Suntrip) — one of the key albums of the new Goa",
      "country": "🇷🇴 Romania",
      "born": "active since the 2010s"
    },
    "pt": {
      "bio": "Um artista húngaro-romeno — uma das estrelas em ascensão mais notáveis do Goa melódico. O álbum de estreia 'Back To Space' (2011, Suntrip) cimentou o seu nome no género. Uma década depois — 'From The Stars' (Global Sect).",
      "notable": "'Back To Space' (2011, Suntrip) — um dos álbuns chave do novo Goa",
      "country": "🇷🇴 Roménia",
      "born": "ativo desde a década de 2010"
    }
  },
  "proxeeus": {
    "en": {
      "bio": "Jerome Lesterps — a French-Belgian producer, one of the leaders of the new Goa. His music is deeply influenced by H.P. Lovecraft (Dream Cycle, Cthulhu Mythos). Four studio albums on Neogoa Records, plus collaborations with Suntrip.",
      "notable": "'Celephaïs' (2019, Neogoa) — a melodic journey in Lovecraft's footsteps. Also 'Weep From Within' (2023, Goa Madness)",
      "country": "🇫🇷 France",
      "born": "active since the 2010s"
    },
    "pt": {
      "bio": "Jerome Lesterps — produtor franco-belga, um dos líderes do novo Goa. A sua música é profundamente influenciada por H.P. Lovecraft (Dream Cycle, Cthulhu Mythos). Quatro álbuns de estúdio na Neogoa Records, além de colaborações com a Suntrip.",
      "notable": "'Celephaïs' (2019, Neogoa) — uma viagem melódica nos passos de Lovecraft. Também 'Weep From Within' (2023, Goa Madness)",
      "country": "🇫🇷 França",
      "born": "ativo desde a década de 2010"
    }
  },
  "mark-allen": {
    "en": {
      "bio": "A British DJ and producer — one of the pioneers of Goa Trance. He entered the scene in 1991 on his first trip to Goa. Partner in Quirk with Tim Healey, member of Mindfield, owner of the Phantasm label. He organised the 'Return to the Source' parties in London from 1994, which went global (UK / US / Europe / Japan / Israel) until 2001.",
      "notable": "Phantasm Records (founder) + Return to the Source parties — foundational figure of British Goa",
      "country": "🇬🇧 UK",
      "born": "active since 1991"
    },
    "pt": {
      "bio": "DJ e produtor britânico — um dos pioneiros do Goa Trance. Entrou na cena em 1991 na sua primeira visita a Goa. Sócio do Quirk com Tim Healey, membro dos Mindfield, dono da editora Phantasm. Organizou as festas 'Return to the Source' em Londres a partir de 1994, que se tornaram globais (Reino Unido / EUA / Europa / Japão / Israel) até 2001.",
      "notable": "Phantasm Records (fundador) + festas Return to the Source — figura fundadora do Goa britânico",
      "country": "🇬🇧 Reino Unido",
      "born": "ativo desde 1991"
    }
  },
  "silicon-sound": {
    "en": {
      "bio": "A Goa Trance project — a French pioneer who appeared at events like 'Genesis of Psytrance' (Bologna, 2009). Known for his remix of Jaïa's 'Mai Mai'.",
      "notable": "Silicon Sound 90's Remix of Jaïa — 'Mai Mai'",
      "country": "🇫🇷 France",
      "born": "active since the 90s"
    },
    "pt": {
      "bio": "Um projecto de Goa Trance — um pioneiro francês que apareceu em eventos como 'Genesis of Psytrance' (Bolonha, 2009). Conhecido pelo seu remix de 'Mai Mai' dos Jaïa.",
      "notable": "Silicon Sound 90's Remix de Jaïa — 'Mai Mai'",
      "country": "🇫🇷 França",
      "born": "ativo desde os anos 90"
    }
  },
  "sun-project": {
    "en": {
      "bio": "S.U.N. Project — a Goa Trance collective from Hamburg, Germany. Three musicians who were inspired by the original Goa parties in India and merged their rock roots into the psychedelic sound. First EP 'Crazy Stories' (1996, Spirit Zone), debut album 'Drosophila' (1997).",
      "notable": "'Drosophila' (1997, Spirit Zone) — one of the classic German Goa albums",
      "country": "🇩🇪 Germany",
      "born": "active since the mid-90s"
    },
    "pt": {
      "bio": "S.U.N. Project — um colectivo de Goa Trance de Hamburgo, Alemanha. Três músicos inspirados pelas festas originais de Goa na Índia que fundiram as suas raízes rock no som psicadélico. Primeiro EP 'Crazy Stories' (1996, Spirit Zone), álbum de estreia 'Drosophila' (1997).",
      "notable": "'Drosophila' (1997, Spirit Zone) — um dos álbuns clássicos do Goa alemão",
      "country": "🇩🇪 Alemanha",
      "born": "ativo desde meados dos anos 90"
    }
  },
  "reefer-decree": {
    "en": {
      "bio": "A progressive psytrance project that was the first name released on Denmark's Iboga Records in 1999. The debut album 'Soundframes' is still considered Iboga's best-selling vinyl release ever. Known tracks: Nightvision, Curved Air.",
      "notable": "'Soundframes' (Iboga Records) — the label's best-selling vinyl release",
      "country": "🇩🇰 Denmark",
      "born": "active since 1999"
    },
    "pt": {
      "bio": "Um projecto de psytrance progressivo que foi o primeiro nome a sair pela Iboga Records dinamarquesa em 1999. O álbum de estreia 'Soundframes' continua a ser o lançamento em vinil mais vendido de sempre da Iboga. Temas conhecidos: Nightvision, Curved Air.",
      "notable": "'Soundframes' (Iboga Records) — o lançamento em vinil mais vendido da editora",
      "country": "🇩🇰 Dinamarca",
      "born": "ativo desde 1999"
    }
  },
  "mini-spacer": {
    "en": {
      "bio": "A Goa Trance project that releases on Timewarp Records — a label focused on the classic style with modern production. Debut EP 'The Spirit Of Trance' (2021).",
      "notable": "'The Spirit Of Trance' EP (2021, Timewarp Records) — debut Goa release",
      "country": "🇧🇪 Belgium",
      "born": "active since the 2020s"
    },
    "pt": {
      "bio": "Um projecto de Goa Trance que lança pela Timewarp Records — uma editora focada no estilo clássico com produção moderna. EP de estreia 'The Spirit Of Trance' (2021).",
      "notable": "EP 'The Spirit Of Trance' (2021, Timewarp Records) — lançamento Goa de estreia",
      "country": "🇧🇪 Bélgica",
      "born": "ativo desde a década de 2020"
    }
  },
  "moon-beasts": {
    "en": {
      "bio": "A collaborative project between Ephedra (Alexandre Cohen, Belgium) and Proxeeus (Jerome Lesterps, France). They started in 2019 with a joint show in Portugal — since then, a full project. Mixes Ephedra's melodic, floating side with Proxeeus's aggressive sound. Signed to Goa Madness Records.",
      "notable": "Collab between Ephedra and Proxeeus — two leading names in the new Goa",
      "country": "🇫🇷 France / 🇧🇪 Belgium",
      "born": "active since 2019"
    },
    "pt": {
      "bio": "Um projecto colaborativo entre Ephedra (Alexandre Cohen, Bélgica) e Proxeeus (Jerome Lesterps, França). Começaram em 2019 com um concerto conjunto em Portugal — desde então, um projecto a tempo inteiro. Mistura o lado melódico e flutuante de Ephedra com o som agressivo de Proxeeus. Assinou pela Goa Madness Records.",
      "notable": "Colaboração entre Ephedra e Proxeeus — dois nomes de topo do novo Goa",
      "country": "🇫🇷 França / 🇧🇪 Bélgica",
      "born": "ativo desde 2019"
    }
  },
  "antidot-and-dica": {
    "en": {
      "bio": "A collaboration between two French artists from the Acid/Goa scene — DICA (known in the Acid scene) and Antidot. They cross acid-techno with Goa in a high-energy set.",
      "notable": "EP 'From Dawn To Dusk' (2025, Suntrip Records) + 'Soulbinder' on the 'Acidum Influxum' compilation",
      "country": "🇫🇷 France",
      "born": "active since the 2020s"
    },
    "pt": {
      "bio": "Uma colaboração entre dois artistas franceses da cena Acid/Goa — DICA (conhecido na cena Acid) e Antidot. Cruzam acid-techno com Goa num set de alta energia.",
      "notable": "EP 'From Dawn To Dusk' (2025, Suntrip Records) + 'Soulbinder' na colectânea 'Acidum Influxum'",
      "country": "🇫🇷 França",
      "born": "ativo desde a década de 2020"
    }
  },
  "andrew-till": {
    "en": {
      "bio": "Andrew Till — co-founder of Australia's Psy-Harmonics together with Ollie Olsen in 1993. The label focused on the experimental edges, breakbeat and twisted Goa coming out of Australia, Japan and New Zealand. Andrew still runs the label today and plays at ZNA in the transition from night to light.",
      "notable": "Psy-Harmonics (1993) — the iconic Australian label that put out Zen Paradox, Mystic Force, Shaolin Wooden Men and more",
      "country": "🇦🇺 Australia",
      "born": "active since 1993"
    },
    "pt": {
      "bio": "Andrew Till — co-fundador da australiana Psy-Harmonics em conjunto com Ollie Olsen em 1993. A editora focou-se nas margens experimentais, breakbeat e Goa torcido vindos da Austrália, Japão e Nova Zelândia. Andrew continua a gerir a editora até hoje e toca no ZNA na transição entre a noite e a luz.",
      "notable": "Psy-Harmonics (1993) — a editora australiana icónica que lançou Zen Paradox, Mystic Force, Shaolin Wooden Men e mais",
      "country": "🇦🇺 Austrália",
      "born": "ativo desde 1993"
    }
  },
  "cosmosis-vs-laughing-buddha": {
    "en": {
      "bio": "A reunion of two legendary names: Bill Halsey (Cosmosis) and Jez 'Buddha' (Laughing Buddha) jointly produced 'Cosmology' (1996, Transient) — one of the foundational albums of classic Goa. Thirty years on, they reunite for a special B2B at ZNA 2026.",
      "notable": "Co-producers of debut album 'Cosmology' (1996, Transient) — a historic reunion",
      "country": "🇬🇧 UK",
      "born": "active since the 90s"
    },
    "pt": {
      "bio": "Um reencontro de dois nomes lendários: Bill Halsey (Cosmosis) e Jez 'Buddha' (Laughing Buddha) co-produziram 'Cosmology' (1996, Transient) — um dos álbuns fundadores do Goa clássico. Trinta anos depois, reúnem-se para um B2B especial no ZNA 2026.",
      "notable": "Co-produtores do álbum de estreia 'Cosmology' (1996, Transient) — um reencontro histórico",
      "country": "🇬🇧 Reino Unido",
      "born": "ativo desde os anos 90"
    }
  },
  "domino-vs-ree-k": {
    "en": {
      "bio": "A meeting of two figures from the first generation of Goa: Domino — the first DJ widely recognised in the classic Goa scene, playing from DATs (digital audio tape) — and Ree.K from Japan. At ZNA 2026 they cross between the classic and the new.",
      "notable": "Legendary B2B between two leading figures from Goa's first generation",
      "country": "🇬🇧 UK / 🇯🇵 Japan",
      "born": "active since the 90s"
    },
    "pt": {
      "bio": "Um encontro entre duas figuras da primeira geração do Goa: Domino — a primeira DJ reconhecida na cena Goa clássica, a tocar a partir de DATs (digital audio tape) — e Ree.K do Japão. No ZNA 2026 cruzam o clássico com o novo.",
      "notable": "B2B lendário entre duas figuras de topo da primeira geração do Goa",
      "country": "🇬🇧 Reino Unido / 🇯🇵 Japão",
      "born": "ativas desde os anos 90"
    }
  },
  "skizologic-vs-filteria": {
    "en": {
      "bio": "A meeting between Skizologic (Maor Hasbani, Israel) — a Goa-Psytrance artist with a retro-futuristic fusion — and Filteria (Jannis Tzikas, Greece/Stockholm), one of the leaders of the Goa revival. Both are leading voices of the new Goa.",
      "notable": "A meeting between two leading names of the new Goa — Israel × Sweden",
      "country": "🇮🇱 Israel / 🇸🇪 Sweden",
      "born": "active since the 2000s"
    },
    "pt": {
      "bio": "Um encontro entre Skizologic (Maor Hasbani, Israel) — um artista de Goa-Psytrance com uma fusão retro-futurista — e Filteria (Jannis Tzikas, Grécia/Estocolmo), um dos líderes do renascimento do Goa. Ambos são vozes de topo do novo Goa.",
      "notable": "Um encontro entre dois nomes de topo do novo Goa — Israel × Suécia",
      "country": "🇮🇱 Israel / 🇸🇪 Suécia",
      "born": "ativos desde os anos 2000"
    }
  },
  "mittelstandskinder-ohne-strom": {
    "en": {
      "bio": "A German psytrance/Goa project formed in 1995. The name in German means 'middle-class kids without electricity'. Known for their extreme remix of Ticon's 'We Are The Mammoth Hunters'. Albums: Доклад о революции, Drive, Bug.",
      "notable": "M.O.S. — a key name of the classic German scene (active since 1995)",
      "country": "🇩🇪 Germany",
      "born": "active since 1995"
    },
    "pt": {
      "bio": "Um projecto alemão de psytrance/Goa formado em 1995. O nome em alemão significa 'crianças da classe média sem electricidade'. Conhecidos pelo seu remix extremo de 'We Are The Mammoth Hunters' dos Ticon. Álbuns: Доклад о революции, Drive, Bug.",
      "notable": "M.O.S. — um nome chave da cena alemã clássica (activo desde 1995)",
      "country": "🇩🇪 Alemanha",
      "born": "ativo desde 1995"
    }
  },
  "encens-vs-ominus": {
    "en": {
      "bio": "A 29-year reunion: Marcello Bonifacii (Encens) and Dara Lee (Koyote Records founder) on the Zambu Temple stage. Encens with 'Spiritual Transgression' and 'Psychedelic Sun' on Koyote. Ominus was a supergroup: Cello + Dara Lee + Miranda, released in 1997 on Koyote.",
      "notable": "A 29-year reunion — Encens and Ominus return to the stage",
      "country": "🇩🇪 Germany / 🇬🇧 UK",
      "born": "active since the 90s"
    },
    "pt": {
      "bio": "Um reencontro de 29 anos: Marcello Bonifacii (Encens) e Dara Lee (fundadora da Koyote Records) no palco Zambu Temple. Encens com 'Spiritual Transgression' e 'Psychedelic Sun' na Koyote. Ominus foi um supergrupo: Cello + Dara Lee + Miranda, lançado em 1997 pela Koyote.",
      "notable": "Reencontro de 29 anos — Encens e Ominus regressam ao palco",
      "country": "🇩🇪 Alemanha / 🇬🇧 Reino Unido",
      "born": "ativos desde os anos 90"
    }
  },
  "gangguru-vs-cop": {
    "en": {
      "bio": "Gangguru — a French trio formed in 1994 by Pierre Branet, Phil Weiss and Willy Boutron. The name 'Be Your Own Guru' came from their experience at the Vuuv festival in 1993 with DJ Antaro. COP (Children Of Paradise) is their collaborative project with Jan Müller of X-Dream.",
      "notable": "'Be Your Own Guru' (DAT Records, 2018) — 33 tracks preserved on DATs and restored",
      "country": "🇫🇷 France / 🇩🇪 Germany",
      "born": "active since 1994"
    },
    "pt": {
      "bio": "Gangguru — um trio francês formado em 1994 por Pierre Branet, Phil Weiss e Willy Boutron. O nome 'Be Your Own Guru' veio da sua experiência no festival Vuuv em 1993 com o DJ Antaro. COP (Children Of Paradise) é o seu projecto colaborativo com Jan Müller dos X-Dream.",
      "notable": "'Be Your Own Guru' (DAT Records, 2018) — 33 temas preservados em DATs e restaurados",
      "country": "🇫🇷 França / 🇩🇪 Alemanha",
      "born": "ativos desde 1994"
    }
  },
  "drop-dash-vs-germinator": {
    "en": {
      "bio": "Germinator — an Australo-Swedish 90s trio with two unforgettable albums. After years of silence, they unveiled the Single Collection of their 12\" releases and tracks that didn't make it onto compilations. A deep, funky sound of classic Australian Goa.",
      "notable": "Single Collection (Classic Goa Trax / Suntrip) — treasures of 90s Goa",
      "country": "🇸🇪 Sweden / 🇦🇺 Australia",
      "born": "active since the 90s"
    },
    "pt": {
      "bio": "Germinator — um trio australo-sueco dos anos 90 com dois álbuns inesquecíveis. Após anos de silêncio, revelaram a Single Collection dos seus 12\" e de temas que não saíram em colectâneas. Um som profundo e funky do Goa australiano clássico.",
      "notable": "Single Collection (Classic Goa Trax / Suntrip) — tesouros do Goa dos anos 90",
      "country": "🇸🇪 Suécia / 🇦🇺 Austrália",
      "born": "ativos desde os anos 90"
    }
  },
  "psyko-disko-vs-spies": {
    "en": {
      "bio": "Psyko Disko — an Australian-international collaboration between Fred Disko (one of the early DJs of Goa alongside Goa Gil) and Ollie Olsen (Shaolin Wooden Men, founder of Psy-Harmonics). The album 'Psycho Disco' is on Psy-Harmonics.",
      "notable": "Fred Disko — one of the early figures who turned Goa into electronic trance (with Laurent and Goa Gil in 1983)",
      "country": "🇦🇺 Australia / 🇫🇷 France",
      "born": "active since the 80s"
    },
    "pt": {
      "bio": "Psyko Disko — uma colaboração australo-internacional entre Fred Disko (um dos primeiros DJs do Goa, ao lado de Goa Gil) e Ollie Olsen (Shaolin Wooden Men, fundador da Psy-Harmonics). O álbum 'Psycho Disco' saiu pela Psy-Harmonics.",
      "notable": "Fred Disko — uma das primeiras figuras que transformou o Goa em trance electrónico (com Laurent e Goa Gil em 1983)",
      "country": "🇦🇺 Austrália / 🇫🇷 França",
      "born": "ativos desde os anos 80"
    }
  },
  "jordan": {
    "en": {
      "bio": "A Greek DJ — a long history in the musical underground: 80s hip-hop and acid house, into the London Goa scene from 1995. Co-founder of Disco Hooligans (with Nectarios Meidanis) — an upbeat psytrance duo, and after 2012 also Outer World Elements (with John Petsopoulos from Athens). Represented by DAT Universe.",
      "notable": "Disco Hooligans — 'Clear Skies' (debut album) and 'Darjeeling Express'. Also Outer World Elements (active since 2013)",
      "country": "🇬🇷 Greece",
      "born": "active since the 80s"
    },
    "pt": {
      "bio": "Um DJ grego — uma longa história no underground musical: hip-hop e acid house dos anos 80, até à cena Goa londrina a partir de 1995. Co-fundador dos Disco Hooligans (com Nectarios Meidanis) — um duo de psytrance optimista, e a partir de 2012 também dos Outer World Elements (com John Petsopoulos de Atenas). Representado pela DAT Universe.",
      "notable": "Disco Hooligans — 'Clear Skies' (álbum de estreia) e 'Darjeeling Express'. Também Outer World Elements (activo desde 2013)",
      "country": "🇬🇷 Grécia",
      "born": "ativo desde os anos 80"
    }
  },
  "larsik": {
    "en": {
      "bio": "A DJ in 'Goa Guardians' — one of the regular figures who preserve the classic Goa heritage. Guardians, curators and storytellers of the scene — some of them hold rare archives of edits and unreleased material that even the original producers no longer keep.",
      "notable": "Goa Guardians (pre-party for ZNA Gathering) — keeper of the legacy",
      "country": "🇨🇭 Switzerland",
      "born": "active in the scene"
    },
    "pt": {
      "bio": "Um DJ dos 'Goa Guardians' — uma das figuras regulares que preservam a herança Goa clássica. Guardiões, curadores e contadores de histórias da cena — alguns deles têm arquivos raros de edits e material inédito que nem os próprios produtores originais já conservam.",
      "notable": "Goa Guardians (pre-party do ZNA Gathering) — guardião do legado",
      "country": "🇨🇭 Suíça",
      "born": "activo na cena"
    }
  },
  "dj-eden": {
    "en": {
      "bio": "A psytrance/Goa DJ — part of the international DJ community. Presence on Spotify and YouTube.",
      "notable": "Goa Guardians DJ",
      "country": "🇮🇱 Israel",
      "born": "active in the scene"
    },
    "pt": {
      "bio": "Uma DJ de psytrance/Goa — parte da comunidade internacional de DJs. Presença no Spotify e no YouTube.",
      "notable": "DJ dos Goa Guardians",
      "country": "🇮🇱 Israel",
      "born": "activa na cena"
    }
  },
  "sancho-meiso": {
    "en": {
      "bio": "Shin Sasama from Tokyo — his career began in the 90s as a saxophonist in the dub band Cultivator and on Japanese reggae productions. In the early 2000s he opened the solo project Sancho Meiso Chaya with ambient and electronic experimentation. His sound combines deep atmospheres with improvised rhythms. Live shows at Ozora, Mo:Dem and ZNA Gathering.",
      "notable": "A Japanese dub/experimental project — 3 albums + EPs (b.p.f.records 2008-2009)",
      "country": "🇯🇵 Japan",
      "born": "active since the 90s"
    },
    "pt": {
      "bio": "Shin Sasama de Tóquio — a sua carreira começou nos anos 90 como saxofonista da banda de dub Cultivator e em produções de reggae japonês. No início dos anos 2000 abriu o projecto solo Sancho Meiso Chaya com ambient e experimentação electrónica. O seu som combina atmosferas profundas com ritmos improvisados. Concertos ao vivo no Ozora, Mo:Dem e ZNA Gathering.",
      "notable": "Um projecto japonês de dub/experimental — 3 álbuns + EPs (b.p.f.records 2008-2009)",
      "country": "🇯🇵 Japão",
      "born": "ativo desde os anos 90"
    }
  },
  "goaacen": {
    "en": {
      "bio": "One of the leading Portuguese DJs in Goa Trance. A DJ for Suntrip Records and part of 604 Productions. Loves to explore the darker territories of Goa. At ZNA he shows how a two-hour journey can fly by.",
      "notable": "DJ for Suntrip Records + 604 Freaks Productions (Portugal)",
      "country": "🇵🇹 Portugal",
      "born": "active in the scene"
    },
    "pt": {
      "bio": "Um dos principais DJs portugueses de Goa Trance. DJ da Suntrip Records e parte da 604 Productions. Adora explorar os territórios mais sombrios do Goa. No ZNA mostra como uma viagem de duas horas pode passar a voar.",
      "notable": "DJ da Suntrip Records + 604 Freaks Productions (Portugal)",
      "country": "🇵🇹 Portugal",
      "born": "ativo na cena"
    }
  },
  "bill-robin-maya": {
    "en": {
      "bio": "Bill Robin & Maya Wada — a DJ duo at the Market Stage of ZNA 2026. Maya Wada is Japanese, with a presence on SoundCloud and Discogs. A live performance in the dub/experimental tradition of the Japanese scene.",
      "notable": "Market Stage duo — Japan",
      "country": "🇬🇧 UK / 🇯🇵 Japan",
      "born": "duo"
    },
    "pt": {
      "bio": "Bill Robin & Maya Wada — um duo de DJs no Market Stage do ZNA 2026. Maya Wada é japonesa, com presença no SoundCloud e Discogs. Uma actuação ao vivo na tradição dub/experimental da cena japonesa.",
      "notable": "Duo do Market Stage — Japão",
      "country": "🇬🇧 Reino Unido / 🇯🇵 Japão",
      "born": "duo"
    }
  },
  "dara-lee": {
    "en": {
      "bio": "Founder of Koyote Records — a Goa/psychedelic trance label from Brighton (UK) launched in November 1995. The DJ and producer Dara-Lee ran Koyote/Peyote Records and its distribution. Member of Ominus (1997) together with Encens (Marcello Bonifacii) and Miranda — that collab also appears at ZNA 2026.",
      "notable": "Founder of Koyote Records (1995, Brighton) — one of the central figures of classic British Goa",
      "country": "🇬🇧 UK",
      "born": "active since 1995"
    },
    "pt": {
      "bio": "Fundadora da Koyote Records — uma editora de Goa/trance psicadélico de Brighton (Reino Unido) lançada em Novembro de 1995. A DJ e produtora Dara-Lee geriu a Koyote/Peyote Records e a sua distribuição. Membro de Ominus (1997) com Encens (Marcello Bonifacii) e Miranda — essa colaboração também aparece no ZNA 2026.",
      "notable": "Fundadora da Koyote Records (1995, Brighton) — uma das figuras centrais do Goa britânico clássico",
      "country": "🇬🇧 Reino Unido",
      "born": "activa desde 1995"
    }
  },
  "ultravibe": {
    "en": {
      "bio": "A collaborative project between Bill Halsey (Cosmosis) and Jannis Tzikas (Filteria) — two leading Goa veterans. Cosmosis is a pioneer of the genre since the 'Cosmology' release (1996), and Filteria brought the classic sound back to life in 2004. Ultravibe blends the classic Goa sound with modern production.",
      "notable": "EP 'Electrosurge' (October 2024) and album 'Transmitter' (December 2024) on Future Music Records",
      "country": "🇸🇪 Sweden / 🇬🇧 UK",
      "born": "active since 2024"
    },
    "pt": {
      "bio": "Um projecto colaborativo entre Bill Halsey (Cosmosis) e Jannis Tzikas (Filteria) — dois veteranos de topo do Goa. Cosmosis é pioneiro do género desde o lançamento de 'Cosmology' (1996), e Filteria devolveu o som clássico à vida em 2004. Ultravibe mistura o som clássico do Goa com produção moderna.",
      "notable": "EP 'Electrosurge' (Outubro de 2024) e álbum 'Transmitter' (Dezembro de 2024) na Future Music Records",
      "country": "🇸🇪 Suécia / 🇬🇧 Reino Unido",
      "born": "activos desde 2024"
    }
  },
  "ephedra": {
    "en": {
      "bio": "A Belgian producer/DJ from Brussels. A pure Goatrance artist — 5 albums on Goa Madness Records (the Belgian label he runs together with Kuririn). Also part of the joint project Moon Beasts with Proxeeus.",
      "notable": "5 Goa albums on Goa Madness Records: Journey Through My Head (2014), Flying Over The Universe (2016), What The Future Brings (2018), Another Place On Earth (2021), Resilient Horizon (2024)",
      "country": "🇧🇪 Belgium",
      "born": "active since the 2010s"
    },
    "pt": {
      "bio": "Um produtor/DJ belga de Bruxelas. Um artista de Goatrance puro — 5 álbuns na Goa Madness Records (a editora belga que gere com Kuririn). Também parte do projecto conjunto Moon Beasts com Proxeeus.",
      "notable": "5 álbuns Goa na Goa Madness Records: Journey Through My Head (2014), Flying Over The Universe (2016), What The Future Brings (2018), Another Place On Earth (2021), Resilient Horizon (2024)",
      "country": "🇧🇪 Bélgica",
      "born": "ativo desde a década de 2010"
    }
  },
  "space-cat-vs-talamasca": {
    "en": {
      "bio": "A meeting of two psytrance fathers: Space Cat — Avi Algranati from Bat Yam, Israel — whose debut album 'Beam Me Up' (1999, HOMmega) is one of the most important in the history of Goa Trance, with collaborations with Hallucinogen, Transwave, Infected Mushroom, Oforia and Elysium. Talamasca — the Frenchman Cédric Dassule (also DJ Lestat) — whose album 'Musica Divinorum' (2001, Spiral Trax) cemented his name.",
      "notable": "Space Cat — 'Beam Me Up' (1999, HOMmega), a cornerstone of psytrance. Talamasca — 'Musica Divinorum' (2001, Spiral Trax)",
      "country": "🇮🇱 Israel / 🇫🇷 France",
      "born": "active since the late 90s"
    },
    "pt": {
      "bio": "Um encontro entre dois pais do psytrance: Space Cat — Avi Algranati de Bat Yam, Israel — cujo álbum de estreia 'Beam Me Up' (1999, HOMmega) é um dos mais importantes da história do Goa Trance, com colaborações com Hallucinogen, Transwave, Infected Mushroom, Oforia e Elysium. Talamasca — o francês Cédric Dassule (também DJ Lestat) — cujo álbum 'Musica Divinorum' (2001, Spiral Trax) cimentou o seu nome.",
      "notable": "Space Cat — 'Beam Me Up' (1999, HOMmega), uma pedra angular do psytrance. Talamasca — 'Musica Divinorum' (2001, Spiral Trax)",
      "country": "🇮🇱 Israel / 🇫🇷 França",
      "born": "ativos desde o final dos anos 90"
    }
  },
  "infinity-project-vs-excess-head": {
    "en": {
      "bio": "A special set by Graham Wood — his two aliases at ZNA 2026: The Infinity Project (with Raja Ram, founders of TIP Records in 1994 — solo after 1998) and Excess Head (his solo alias with a huge body of unreleased material). Two complementary journeys: the nostalgia of classic TIP plus the thrill of a sound never heard before.",
      "notable": "Graham Wood — solo aliases: TIP (Mystical Experiences 1995, Feeling Weird 1995) + Excess Head (rare material)",
      "country": "🇬🇧 UK",
      "born": "active since 1994"
    },
    "pt": {
      "bio": "Um set especial de Graham Wood — os seus dois aliases no ZNA 2026: The Infinity Project (com Raja Ram, fundadores da TIP Records em 1994 — solo a partir de 1998) e Excess Head (o seu alias solo com uma grande quantidade de material inédito). Duas viagens complementares: a nostalgia do TIP clássico mais a emoção de um som nunca antes ouvido.",
      "notable": "Graham Wood — aliases solo: TIP (Mystical Experiences 1995, Feeling Weird 1995) + Excess Head (material raro)",
      "country": "🇬🇧 Reino Unido",
      "born": "ativo desde 1994"
    }
  },
  "jean-borelli-vs-sid-shanti": {
    "en": {
      "bio": "An exclusive vinyl VS set between Jean Borelli (Orion) and Sid Shanti — a meeting between two fathers of the classic scene. Orion is a key psytrance figure from the early 90s; Sid Shanti is a Phantasm Records artist known for mixed CDs from 1996-1999.",
      "notable": "Exclusive B2B on vinyl — a meeting between two collectors of the classic sound",
      "country": "🇩🇰 Denmark / 🇬🇧 UK",
      "born": "active since the 90s"
    },
    "pt": {
      "bio": "Um set VS exclusivo em vinil entre Jean Borelli (Orion) e Sid Shanti — um encontro entre dois pais da cena clássica. Orion é uma figura chave do psytrance do início dos anos 90; Sid Shanti é um artista da Phantasm Records, conhecido pelos CDs misturados de 1996-1999.",
      "notable": "B2B exclusivo em vinil — um encontro entre dois coleccionadores do som clássico",
      "country": "🇩🇰 Dinamarca / 🇬🇧 Reino Unido",
      "born": "ativos desde os anos 90"
    }
  },
  "dado-vs-dino-psaras": {
    "en": {
      "bio": "Dado — the Frenchman Frédéric Holyszewski, also known as Deedrah, half of Transwave (with Christof Drouillet / Absolum, 1994), and Synthetic. His first solo album 'Self Oscillation' (1997) broke open the classic Goa sound. Dino Psaras — one of the fathers of global psytrance, active since 1988, member of Ayahuasca with Steve Ronan and Joti Sidhu.",
      "notable": "A meeting between two fathers of the scene — Transwave/Deedrah and Ayahuasca/Lick It (Oktava 2003)",
      "country": "🇫🇷 France / 🇬🇧 UK",
      "born": "active since the late 80s"
    },
    "pt": {
      "bio": "Dado — o francês Frédéric Holyszewski, também conhecido como Deedrah, metade dos Transwave (com Christof Drouillet / Absolum, 1994), e Synthetic. O seu primeiro álbum solo 'Self Oscillation' (1997) abriu o som clássico do Goa. Dino Psaras — um dos pais do psytrance global, activo desde 1988, membro dos Ayahuasca com Steve Ronan e Joti Sidhu.",
      "notable": "Um encontro entre dois pais da cena — Transwave/Deedrah e Ayahuasca/Lick It (Oktava 2003)",
      "country": "🇫🇷 França / 🇬🇧 Reino Unido",
      "born": "ativos desde o final dos anos 80"
    }
  },
  "masaray": {
    "en": {
      "bio": "Masaray — a historic collaboration between Ray Castle (the New Zealand/Australian pioneer who ran Pagan Productions parties across Europe 1987-1991) and Masa = Masayuki Kurihara (the Japanese Goa pioneer, X-Tron). Two founding fathers of international Goa Trance — from Japan to Australia. Their debut album 'Cosmic Trancer' (1995, Psy-Harmonics) is a cornerstone of classic Goa. The 'Time Traveler Of Trance' EP (November 1995) is a psychedelic masterpiece with wailing synths, extended storytelling and a slow droning groove almost Pink Floyd-like in feel. Recorded above Masa's family restaurant in Tokyo. A special live performance at Zambu Temple, ZNA 2026.",
      "notable": "'Cosmic Trancer' (1995, Psy-Harmonics) and 'Time Traveler Of Trance EP' (1995) — classics of golden-era Goa. Re-mastered in 2018 on Hypnodisk",
      "country": "🇳🇿 New Zealand / 🇯🇵 Japan",
      "born": "active since 1995"
    },
    "pt": {
      "bio": "Masaray — uma colaboração histórica entre Ray Castle (o pioneiro neozelandês/australiano que organizou as festas Pagan Productions pela Europa em 1987-1991) e Masa = Masayuki Kurihara (o pioneiro do Goa japonês, X-Tron). Dois pais fundadores do Goa Trance internacional — do Japão à Austrália. O álbum de estreia 'Cosmic Trancer' (1995, Psy-Harmonics) é uma pedra angular do Goa clássico. O EP 'Time Traveler Of Trance' (Novembro de 1995) é uma obra-prima psicadélica com sintetizadores lamentosos, narrativa estendida e um groove lento e arrastado quase à Pink Floyd. Gravado por cima do restaurante da família do Masa em Tóquio. Uma actuação ao vivo especial no Zambu Temple, ZNA 2026.",
      "notable": "'Cosmic Trancer' (1995, Psy-Harmonics) e 'Time Traveler Of Trance EP' (1995) — clássicos da era de ouro do Goa. Remasterizado em 2018 na Hypnodisk",
      "country": "🇳🇿 Nova Zelândia / 🇯🇵 Japão",
      "born": "activos desde 1995"
    }
  },
  "dj-emico-amore": {
    "en": {
      "bio": "Emico Amore — a veteran psytrance and Goa DJ from Tokyo, part of DAT Universe. Her first encounter with Goa electronica was in 1993, and she has never looked back. She moved between the dawn of the Tokyo underground scene and the beaches of Goa, actively participating in the golden 90s nights and forging close ties with the people who shaped the scene. She started her DJ career focused on ambient, and over the years shifted to the dance arena — sets with a strong sense of narrative and the emotional depth of someone who truly loves the spirit of Goa.",
      "notable": "DAT Universe / Goa Guardians (Japan) — a key figure of Japanese Goa since 1993",
      "country": "🇯🇵 Japan",
      "born": "active since 1993"
    },
    "pt": {
      "bio": "Emico Amore — uma DJ veterana de psytrance e Goa de Tóquio, parte do DAT Universe. O seu primeiro encontro com a electrónica Goa foi em 1993 e nunca olhou para trás. Moveu-se entre o despertar da cena underground de Tóquio e as praias de Goa, participando activamente nas noites douradas dos anos 90 e construindo laços com as pessoas que moldaram a cena. Começou a carreira de DJ focada em ambient e ao longo dos anos passou para a pista de dança — sets com forte sentido narrativo e a profundidade emocional de quem ama verdadeiramente o espírito Goa.",
      "notable": "DAT Universe / Goa Guardians (Japão) — uma figura-chave do Goa japonês desde 1993",
      "country": "🇯🇵 Japão",
      "born": "activa desde 1993"
    }
  },
  "nouveau-shamanique": {
    "en": {
      "bio": "A new live project (2025) by two leading names of new-school Belgian Goa: Triquetra — the twins Elric & Jurian Reinartz, known for analogue live sets with samplers, programmed machines and didgeridoo (albums on Suntrip Records: 'Ecstatic Planet' 2018, 'Human Control' 2020 and 'Myriad Vision') — joined by Dragon Twins — Mathias Pico from Antwerp, whose powerful acid productions appear on Cronomi, Underground Alien Factory and the 'Suntrip Classix Vol. 3 - Gaia' compilation. At ZNA 2026 the two perform live with 100% hardware on stage — a rhythmic, experimental and especially psychedelic fusion that feels like the golden 90s seen through retro-futuristic eyes.",
      "notable": "Triquetra × Dragon Twins — live performance with 100% hardware on stage (Suntrip Records, 2025)",
      "country": "🇧🇪 Belgium",
      "born": "new project — 2025"
    },
    "pt": {
      "bio": "Um novo projecto ao vivo (2025) de dois nomes de referência do Goa belga da nova escola: Triquetra — os gémeos Elric & Jurian Reinartz, conhecidos pelos sets ao vivo analógicos com samplers, máquinas programadas e didgeridoo (álbuns na Suntrip Records: 'Ecstatic Planet' 2018, 'Human Control' 2020 e 'Myriad Vision') — juntando-se a Dragon Twins — Mathias Pico de Antuérpia, cujas produções ácidas e poderosas aparecem na Cronomi, Underground Alien Factory e na compilação 'Suntrip Classix Vol. 3 - Gaia'. No ZNA 2026 os dois actuam ao vivo com 100% hardware no palco — uma fusão rítmica, experimental e especialmente psicadélica que parece os anos 90 dourados vistos por olhos retro-futuristas.",
      "notable": "Triquetra × Dragon Twins — actuação ao vivo com 100% hardware no palco (Suntrip Records, 2025)",
      "country": "🇧🇪 Bélgica",
      "born": "novo projecto — 2025"
    }
  }
};
