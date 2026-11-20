// Fact Detective: art facts.
// To add a fact, copy one line below and change it:
//   id      - unique, e.g. "art-031"          level  - "easy" | "medium" | "hard"
//   answer  - true = נכון, false = שטויות במיץ עגבניות!
//   text    - the clue the player sees       explain - one short sentence (for a myth: the truth)
//   pic     - name of a drawing in data/pics-art.js (must not give away the answer)
// Please fact-check new facts before adding them.
const FACTS_ART = [
  // ---------- TRUE ----------
  { id: "art-001", topic: "art", pic: "mona-lisa", level: "easy", answer: true,
    text: "את המונה ליזה צייר ליאונרדו דה וינצ'י.",
    explain: "ליאונרדו היה צייר, אבל גם מדען ומהנדס שהמציא המון רעיונות." },
  { id: "art-002", topic: "art", pic: "louvre", level: "easy", answer: true,
    text: "ציור המונה ליזה תלוי במוזיאון הלובר שבפריז.",
    explain: "הרבה מאוד אנשים מבקרים בלובר כדי לראות אותה." },
  { id: "art-003", topic: "art", pic: "starry-night", level: "easy", answer: true,
    text: "את הציור \"ליל כוכבים\" צייר ואן גוך.",
    explain: "ואן גוך צייר אותו עם משיכות מכחול עבות, ושמיים שנראים כאילו הם מסתובבים." },
  { id: "art-004", topic: "art", pic: "palette", level: "easy", answer: true,
    text: "אם מערבבים כחול וצהוב, מקבלים ירוק.",
    explain: "כחול ועוד צהוב נותנים ירוק. אפשר לנסות את זה בצבעי מים!" },
  { id: "art-005", topic: "art", pic: "palette", level: "easy", answer: true,
    text: "אם מערבבים אדום וצהוב, מקבלים כתום.",
    explain: "אדום ועוד צהוב נותנים כתום. ככה מכינים כתום בלי צבע כתום." },
  { id: "art-006", topic: "art", pic: "white-paint", level: "easy", answer: true,
    text: "כדי להבהיר צבע, אפשר להוסיף לו קצת לבן.",
    explain: "ככל שמוסיפים יותר לבן, הצבע נהיה בהיר ועדין יותר." },
  { id: "art-007", topic: "art", pic: "lapis", level: "medium", answer: true,
    text: "פעם, צבע כחול מסוים היה יקר מאוד.",
    explain: "את הכחול הכי יפה הכינו מאבן יקרה בשם לפיס לזולי. לפעמים הוא עלה כמעט כמו זהב." },
  { id: "art-008", topic: "art", pic: "cave-painting", level: "medium", answer: true,
    text: "ציורי מערות נעשו לפני עשרות אלפי שנים.",
    explain: "אנשים קדומים ציירו חיות על קירות מערות כבר לפני יותר מ-40 אלף שנה." },
  { id: "art-009", topic: "art", pic: "rainbow", level: "medium", answer: true,
    text: "קשת בענן נוצרת כשאור השמש עובר דרך טיפות מים.",
    explain: "הטיפות מפרקות את האור הלבן לכל הצבעים שבו." },
  { id: "art-010", topic: "art", pic: "pixels", level: "easy", answer: true,
    text: "תמונה על מסך עשויה מנקודות קטנות שנקראות פיקסלים.",
    explain: "כל פיקסל הוא נקודה קטנה עם צבע אחד, ויחד הן יוצרות תמונה שלמה." },

  // ---------- FALSE ----------
  // ---------- FALSE ----------
  { id: "art-011", topic: "art", pic: "mona-lisa", level: "easy", answer: false,
    text: "את המונה ליזה צייר פיקאסו.",
    explain: "ליאונרדו דה וינצ'י צייר אותה לפני יותר מ-500 שנה. פיקאסו חי הרבה אחריו." },
  { id: "art-012", topic: "art", pic: "palette", level: "easy", answer: false,
    text: "אם מערבבים צהוב וכחול, מקבלים כתום.",
    explain: "צהוב וכחול נותנים ירוק. כתום מקבלים מאדום וצהוב." },
  { id: "art-013", topic: "art", pic: "louvre", level: "easy", answer: false,
    text: "מוזיאון הלובר נמצא בלונדון.",
    explain: "הלובר נמצא בפריז, בצרפת." },
  { id: "art-014", topic: "art", pic: "sunflowers", level: "medium", answer: false,
    text: "ואן גוך היה צייר איטלקי.",
    explain: "ואן גוך נולד בהולנד, ואת רוב הציורים המפורסמים שלו צייר בצרפת." },
  { id: "art-015", topic: "art", pic: "pencil", level: "medium", answer: false,
    text: "בתוך עיפרון יש עופרת, המתכת הרעילה.",
    explain: "ה\"עופרת\" בעיפרון היא בכלל גרפיט, חומר שחור שבטוח לשימוש. השם נשאר מפעם." },
  { id: "art-016", topic: "art", pic: "statue", level: "hard", answer: false,
    text: "הפסל \"דוד\" של מיכלאנג'לו עשוי מעץ.",
    explain: "הוא עשוי מאבן שיש, וגובהו יותר מחמישה מטרים." },
  { id: "art-017", topic: "art", pic: "color-wheel", level: "medium", answer: false,
    text: "אדום נחשב צבע קר וכחול נחשב צבע חם.",
    explain: "ההפך. אדום וכתום הם צבעים חמים, וכחול וירוק הם צבעים קרים." },
  { id: "art-018", topic: "art", pic: "paper", level: "medium", answer: false,
    text: "הנייר הומצא באירופה.",
    explain: "הנייר הומצא בסין, לפני כמעט אלפיים שנה." },
  { id: "art-019", topic: "art", pic: "film-strip", level: "medium", answer: false,
    text: "כדי ליצור שנייה אחת של סרט אנימציה מספיק לצייר ציור אחד.",
    explain: "בדרך כלל מציירים בין 12 ל-24 ציורים לכל שנייה. זו עבודה של ממש!" },
  { id: "art-020", topic: "art", pic: "mural", level: "easy", answer: false,
    text: "ציור על קיר נקרא פיסול.",
    explain: "ציור גדול על קיר נקרא ציור קיר. פיסול הוא יצירת דמויות בשלושה ממדים, מאבן, חימר או עץ." }
];
