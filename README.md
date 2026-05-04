# ZNA Gathering 2026 — Festival Lineup Guide 🌅

מדריך בלתי-רשמי, בעברית, לאומני פסטיבל **ZNA Gathering 2026** — חגיגת גואה טראנס רטרו-פוטוריסטית ביולי 2026 בפורטוגל.

## ✨ מה יש כאן?
- רשימת **כל האומנים** של 2026, חתוכים לפי במות (Retro Universe, Zambu Temple, Goa Guardians, Market).
- עמוד אישי לכל אומן: ביוגרפיה, מדינה, גיל, תגיות סגנון, אלבומים נבחרים וקישורים (Spotify / Bandcamp / Discogs / RA / אתרים רשמיים).
- ויב רטרו-פוטוריסטי: שמש סינתוויב, גריד אופק נע, כוכבים מהבהבים — בדיוק כמו השם של הפסטיבל.

## 🛠 איך זה בנוי
אתר סטטי עם וניל HTML/CSS/JS — בלי build, בלי dependencies, מתאים מצוין ל-GitHub Pages.

```
index.html        — דף ליין-אפ ראשי + סינון לפי במה
artist.html       — תבנית עמוד אומן (?id=<id>)
data.js           — כל נתוני האומנים
app.js            — לוגיקת הדף הראשי
artist.js         — לוגיקת עמוד האומן
styles.css        — העיצוב הרטרו-פוטוריסטי
```

## 🚀 הפעלה מקומית
פתחו את `index.html` בדפדפן, או הריצו שרת מקומי:
```bash
python3 -m http.server 8000
# ואז http://localhost:8000
```

## 🌐 GitHub Pages
האתר מוכן לפרסום:
1. Settings → Pages → Source: `Deploy from a branch`
2. בחרו את הברנץ' `claude/zna-festival-guide-4Uu3t` (או main לאחר merge), Folder: `/ (root)`.
3. שמרו, וה-URL יופיע בדף Pages.

## 📚 מקורות מידע
- [znagathering.com](https://znagathering.com)
- [Music Festival Wizard](https://www.musicfestivalwizard.com/festivals/zna-gathering-2025/)
- [psymedia.co.za](https://psymedia.co.za/festival/zna-gathering/)
- ביוגרפיות מ-Wikipedia, Resident Advisor, Discogs, AllMusic, Last.fm, Bandcamp.

> נבנה באהבה לקראת המסע. Vibes. Trance. Memory. Sun. 🌅
