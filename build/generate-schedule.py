#!/usr/bin/env python3
"""Generate schedule.js + new-artist work order from the official ZNA 2026
timetable JSON (final June 2026 poster data, verified against znagathering.com).

Usage: python3 build/generate-schedule.py <timetable.json>

Outputs:
  schedule.js                     — SCHEDULE_2026 data + lineup-merge IIFE
  build/new-artists-workorder.json — per-new-artist source material (bios etc.)
"""
import json, sys, unicodedata, re, os
from collections import defaultdict

SRC = sys.argv[1] if len(sys.argv) > 1 else "build/zna2026-timetable.json"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

VENUE_IDS = {
    "Zambu Temple": "zambu",
    "The Peninsula": "peninsula",
    "Market": "market",
    "Zenbuspace Classes": "zenbu-classes",
    "Zenbuspace Workshops": "zenbu-workshops",
}
SECTION_IDS = {
    "Goa Guardians": "guardians",
    "Retro Universe": "retro",
    "Futuristic Reality": "futuristic",
    "Welcome Party": "welcome",
    None: None,
}
CATEGORY_IDS = {"Music": "music", "Class": "class", "Workshop": "workshop"}

def norm(name):
    n = unicodedata.normalize("NFKD", name).encode("ascii", "ignore").decode()
    return re.sub(r"\s+", " ", n.lower().strip())

# Poster name (normalized) -> final artist id.
# Existing ids come from official-artists.js / data.js; "NEW:" ids are created
# in lineup-additions.js; None = schedule-only (no artist card).
ALIAS = {
    # ---- existing artists (incl. spelling variants poster vs site) ----
    "psara": "psara", "gabi von dub": "gabi-von-dub", "ukiro": "ukiro",
    "eden": "dj-eden", "dark el kante": "dark-el-kante",
    "dr. vagator": "doctor-vagator", "sjama'dan": "sjamadan",
    "larsik": "larsik", "emico amore": "dj-emico-amore", "jordan": "jordan",
    "simon blue room": "simon-ghahary", "atmos": "atmos",
    "alphanaut": "alphanaut", "psyko disko vs spies": "psyko-disko-vs-spies",
    "germinator vs drop & dash": "drop-dash-vs-germinator",
    "u.x. vs syb unity nettwerk": "kris-kylven", "solitare": "solitare",
    "ree-k vs domino": "domino-vs-ree-k", "nick barber (doof)": "doof",
    "cyan": "cyan", "yahel": "yahel", "bill robin & maya wada": "bill-robin-maya",
    "tecnica": "tecnica", "reefer decree": "reefer-decree",
    "alien rain": "alien-rain", "eat static": "merv-eat-static",
    "joti sidhu": "joti-sidhu", "mark allen": "mark-allen",
    "mark van der vlugt": "marc-van-der-vlugt", "andrew till": "andrew-till",
    "masaray": "masaray", "the infinity project": "infinity-project-vs-excess-head",
    "the infinity project by graham wood": "infinity-project-vs-excess-head",
    "doof": "doof", "gabriel le mar": "gabriel-le-mar",
    "blue planet corporation": "blue-planet-corporation",
    "extrawelt": "extrawelt", "benji vaughan": "prometheus",
    "jaia": "jaia", "anais linn": "anais-lin",
    "gangguru vs c.o.p.": "gangguru-vs-cop", "ree-k": "ree-k",
    "spiralkinder": "spiralkinder",
    "battle of the future buddhas": "battle-future-buddhas",
    "encens vs ominus": "encens-vs-ominus", "s.u.n. project": "sun-project",
    "space cat vs talamasca": "space-cat-vs-talamasca",
    "silicon sound": "silicon-sound", "sancha meiso chaya": "sancho-meiso",
    "ray castle": "ray-castle", "prometheus": "prometheus",
    "klil.co": "klil-co", "robert leiner": "robert-leiner",
    "growling mad scientists": "growling-mad-scientists",
    "damir ludvig": "damir-ludvig", "triple distilled": "triple-distilled",
    "triple distilled disco squad": "triple-distilled",
    "dara lee": "dara-lee",
    "sid shanti vs jean borelli": "jean-borelli-vs-sid-shanti",
    "dogma": "dogma", "tsuyoshi suzuki": "tsuyoshi-suzuki",
    "cosmosis vs laughing buddha": "cosmosis-vs-laughing-buddha",
    "e-sko": "e-sko", "cheers": "extra-cheers",
    "dado vs dino psaras": "dado-vs-dino-psaras", "cosmosis": "cosmosis",
    "earl peal": "earl-peal", "nouveau shamanique": "nouveau-shamanique",
    "alex tolstey": "alex-tolstey", "moon beasts": "moon-beasts",
    "proxeeus": "proxeeus", "goaacen": "goaacen", "mini spacer": "mini-spacer",
    "artifact303": "artifact303", "antidot & dica": "antidot-and-dica",
    "skizologic vs filteria": "skizologic-vs-filteria",
    "ultravibe": "ultravibe", "james monro": "james-monro",
    "hypnoxock": "hypnoxock", "ephedra": "ephedra", "anoebis": "anoebis",
    "mathew jonson presents freedom engine": "mathew-jonson",
    # ---- new artists ----
    "x_t.i.g.m.a.": "NEW:x-tigma", "virtuart": "NEW:virtuart",
    "max lanfranconi": "NEW:max-lanfranconi", "goastral": "NEW:goastral",
    "sharon": "NEW:sharon",
    "david maurette ft. irina mikhailova": "NEW:david-maurette-irina-mikhailova",
    "etnica in dub": "NEW:etnica-in-dub", "henriq": "NEW:henriq",
    "angular momentum": "NEW:angular-momentum", "dezoncondor": "NEW:dezoncondor",
    "zen baboon": "NEW:zen-baboon", "irina mikhailova": "NEW:irina-mikhailova",
    "sergio walgood": "NEW:sergio-walgood", "ololiuqui": "NEW:ololiuqui",
    "balance": "NEW:balance", "gagarin": "NEW:gagarin",
    "oliver jones": "NEW:oliver-jones", "holeg spies": "NEW:holeg-spies",
    "one man game vs mystica": "NEW:one-man-game-vs-mystica",
    "synergy dub": "NEW:synergy-dub", "youth in dub": "NEW:youth-in-dub",
    "saafi brothers": "NEW:saafi-brothers", "m.o.s.": "NEW:mos",
    "daniel sol": "NEW:daniel-sol", "ubar tmar": "NEW:ubar-tmar",
    "floating machine": "NEW:floating-machine", "kala hari": "NEW:kala-hari",
    "mixmaster morris": "NEW:mixmaster-morris", "jonas": "NEW:jonas",
    "nervasystem": "NEW:nervasystem", "fishimself": "NEW:fishimself",
    "wacamolo": "NEW:wacamolo", "process": "NEW:process",
    "psychaos": "NEW:psychaos", "shahar": "NEW:shahar",
    "ludvig & stelar": "NEW:ludvig-stelar",
    "process vs aether": "NEW:process-vs-aether",
    "man with no name": "NEW:man-with-no-name",
    "mike stellar": "NEW:mike-stellar", "indra": "NEW:indra",
    "andrew sigil": "NEW:andrew-sigil", "organica": "NEW:organica",
    "federico baltimore": "NEW:federico-baltimore", "gumi": "NEW:gumi",
    "kukan dub lagan": "NEW:kukan-dub-lagan", "ott": "NEW:ott",
    # ---- schedule-only (no artist card) ----
    "lsd all stars": None, "nois'r'us": None, "surprise!!": None,
}

def main():
    data = json.load(open(SRC))
    acts = data["activities"]

    out_acts, unmatched, new_artists = [], [], defaultdict(lambda: {"sets": []})
    for a in acts:
        cat = CATEGORY_IDS[a["category"]]
        aid = None
        if cat == "music":
            key = norm(a["name"])
            if key not in ALIAS:
                unmatched.append(a["name"])
                continue
            aid = ALIAS[key]
        rec = {
            "id": a["id"].replace("zna2026-", ""),
            "venue": VENUE_IDS[a["venue"]],
            "section": SECTION_IDS.get(a.get("section")),
            "cat": cat,
            "artistId": (aid or "").replace("NEW:", "") or None,
            "name": a["name"],
            "setType": a.get("set_type"),
            "start": a["start"],
            "end": a["end"],
            "day": a["day"],
        }
        if a.get("presenter"):
            rec["presenter"] = a["presenter"]
        if a.get("crosses_midnight"):
            rec["xMid"] = True
        if a.get("description"):
            rec["desc"] = a["description"]
        if a.get("note"):
            rec["note"] = a["note"]
        out_acts.append(rec)
        if aid and aid.startswith("NEW:"):
            nid = aid[4:]
            n = new_artists[nid]
            n["id"] = nid
            n["name"] = a["name"]
            n["sets"].append({
                "venue": rec["venue"], "section": rec["section"],
                "start": a["start"], "end": a["end"],
                "weekday": a["weekday"], "setType": a.get("set_type"),
            })
            if a.get("description"):
                n.setdefault("descriptions", []).append(a["description"])
            if a.get("note"):
                n.setdefault("notes", []).append(a["note"])
            n["infoSource"] = a.get("info_source")

    if unmatched:
        print("UNMATCHED MUSIC NAMES:")
        for n in sorted(set(unmatched)):
            print("  -", n)
        sys.exit(1)

    header = (
        "// schedule.js — ZNA Gathering 2026 official timetable (final June 2026\n"
        "// posters, verified against znagathering.com). GENERATED by\n"
        "// build/generate-schedule.py from build/zna2026-timetable.json — edit\n"
        "// the JSON + regenerate rather than hand-editing the activity list.\n"
        "// Times are local festival time (Europe/Lisbon, WEST/UTC+1).\n"
    )
    venues_js = json.dumps([
        {"id": "zambu", "label": "Zambu Temple"},
        {"id": "peninsula", "label": "The Peninsula"},
        {"id": "market", "label": "Market"},
        {"id": "zenbu-classes", "label": "Zenbuspace Classes"},
        {"id": "zenbu-workshops", "label": "Zenbuspace Workshops"},
    ], ensure_ascii=False, indent=2)
    acts_js = json.dumps(out_acts, ensure_ascii=False, indent=1)

    with open(os.path.join(ROOT, "schedule.js"), "w") as f:
        f.write(header)
        f.write("\nconst SCHEDULE_2026 = {\n")
        f.write('  timezone: "Europe/Lisbon",\n')
        f.write('  // Welcome Party opens 14 Jul 18:00; music ends 22 Jul 00:00.\n')
        f.write('  firstDay: "2026-07-14",\n  lastDay: "2026-07-21",\n')
        f.write(f"  venues: {venues_js},\n")
        f.write(f"  activities: {acts_js}\n")
        f.write("};\n")
        f.write(MERGE_IIFE)

    order = sorted(new_artists.values(), key=lambda n: n["id"])
    with open(os.path.join(ROOT, "build/new-artists-workorder.json"), "w") as f:
        json.dump(order, f, ensure_ascii=False, indent=1)

    music = [x for x in out_acts if x["cat"] == "music"]
    print(f"activities: {len(out_acts)} (music {len(music)}), new artists: {len(order)}")
    print(f"music with artistId: {sum(1 for x in music if x['artistId'])}, schedule-only: {sum(1 for x in music if not x['artistId'])}")

MERGE_IIFE = r"""
// ---- Lineup merge -----------------------------------------------------
// Runs after data.js + official-artists.js + lineup-additions.js.
// 1. Folds the per-stage duplicate cards (psara-market etc.) into their
//    base artist so each artist has exactly one card.
// 2. Attaches `sets` (this artist's activities, sorted by start time).
// 3. Re-derives stage/section from the real timetable: stage is the venue
//    the artist plays (first set wins for multi-venue artists), section is
//    the Zambu Temple time-block (guardians / retro / futuristic).
(function mergeScheduleIntoLineup() {
  if (typeof ARTISTS === "undefined" || typeof SCHEDULE_2026 === "undefined") return;

  const DUP_CARDS = {
    "psara-market": "psara",
    "andrew-till-market": "andrew-till",
    "joti-sidhu-market": "joti-sidhu",
    "mark-van-der-vlugt-market": "marc-van-der-vlugt",
  };
  const byId = new Map(ARTISTS.map(a => [a.id, a]));
  Object.entries(DUP_CARDS).forEach(([dupId, baseId]) => {
    const dup = byId.get(dupId), base = byId.get(baseId);
    if (!dup || !base) return;
    // Keep the base card; adopt anything the dup has that the base lacks.
    if (!base.photo && dup.photo) base.photo = dup.photo;
    const seen = new Set((base.tracks || []).map(t => t.id));
    (dup.tracks || []).forEach(t => { if (t && t.id && !seen.has(t.id)) (base.tracks ||= []).push(t); });
    const seenL = new Set((base.links || []).map(l => l.url));
    (dup.links || []).forEach(l => { if (l && l.url && !seenL.has(l.url)) (base.links ||= []).push(l); });
  });
  ARTISTS = ARTISTS.filter(a => !DUP_CARDS[a.id]);

  const setsByArtist = new Map();
  SCHEDULE_2026.activities.forEach(act => {
    if (act.cat !== "music" || !act.artistId) return;
    if (!setsByArtist.has(act.artistId)) setsByArtist.set(act.artistId, []);
    setsByArtist.get(act.artistId).push(act);
  });
  setsByArtist.forEach(list => list.sort((x, y) => x.start.localeCompare(y.start)));

  // The final posters bill this card simply as "The Infinity Project" —
  // Excess Head is not on the 2026 timetable (TIP plays solo + a Graham
  // Wood producer set on The Peninsula).
  const POSTER_RENAMES = { "infinity-project-vs-excess-head": "The Infinity Project" };

  const LEGACY_STAGE = { retro: ["zambu", "retro"], guardians: ["zambu", "guardians"], zambu: ["zambu", null], market: ["market", null] };
  ARTISTS.forEach(a => {
    if (POSTER_RENAMES[a.id]) a.name = POSTER_RENAMES[a.id];
    const sets = setsByArtist.get(a.id) || [];
    a.sets = sets;
    if (sets.length) {
      a.stage = sets[0].venue;
      a.section = sets[0].venue === "zambu" ? sets[0].section : null;
      // Poster set-type is more current than the curated role.
      if (sets[0].setType) a.role = sets[0].setType;
    } else if (LEGACY_STAGE[a.stage]) {
      const [stage, section] = LEGACY_STAGE[a.stage];
      a.stage = stage;
      a.section = section;
      a.notOnFinalTimetable = true;
    }
  });
})();
"""

if __name__ == "__main__":
    main()
