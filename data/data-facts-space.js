// Fact Detective: space facts.
// To add a fact, copy one line below and change it:
//   id      - unique, e.g. "space-031"   level - "easy" | "medium" | "hard"   pic - drawing name from data/pics-space.js
//   answer  - true = נכון, false = שטויות במיץ עגבניות!
//   text    - the clue the player sees       explain - one short sentence (for a myth: the truth)
// Please fact-check new facts before adding them.
const FACTS_SPACE = [
  // ---------- TRUE ----------
  { id: "space-001", topic: "space", pic: "sun", level: "easy", answer: true,
    text: "השמש היא כוכב.",
    explain: "השמש היא כוכב, בדיוק כמו הכוכבים שרואים בלילה. היא רק הרבה יותר קרובה אלינו." },
  { id: "space-002", topic: "space", pic: "astronaut", level: "easy", answer: true,
    text: "בחלל אי אפשר לשמוע קולות.",
    explain: "קול צריך אוויר כדי לעבור, ובחלל אין אוויר." },
  { id: "space-003", topic: "space", pic: "sun", level: "medium", answer: true,
    text: "האור מהשמש מגיע אלינו בערך תוך שמונה דקות.",
    explain: "אפילו האור, שהוא הדבר הכי מהיר שיש, צריך כשמונה דקות כדי לעבור את כל הדרך מהשמש." },
  { id: "space-004", topic: "space", pic: "mars", level: "medium", answer: true,
    text: "יום על מאדים ארוך כמעט כמו יום על כדור הארץ.",
    explain: "יום על מאדים נמשך בערך 24 שעות ו-40 דקות." },
  { id: "space-005", topic: "space", pic: "mars", level: "medium", answer: true,
    text: "מאדים נראה אדום בגלל חלודה.",
    explain: "באדמה של מאדים יש הרבה ברזל, והוא חלוד, כמו חלודה על ברזל אצלנו." },
  { id: "space-006", topic: "space", pic: "venus", level: "hard", answer: true,
    text: "על נוגה, סיבוב אחד סביב עצמה לוקח יותר זמן מהקפה אחת סביב השמש.",
    explain: "נוגה מסתובבת לאט מאוד: סיבוב אחד לוקח כ-243 ימי כדור הארץ, והקפה סביב השמש רק כ-225." },
  { id: "space-007", topic: "space", pic: "saturn", level: "medium", answer: true,
    text: "הטבעות של שבתאי עשויות מהמון חתיכות קרח וסלעים.",
    explain: "הן לא טבעת מוצקה אחת. הן מורכבות מחתיכות קרח וסלע, מגרגירים קטנים ועד גושים גדולים כמו בית!" },
  { id: "space-008", topic: "space", pic: "sun", level: "medium", answer: true,
    text: "כמעט כל החומר במערכת השמש נמצא בשמש.",
    explain: "השמש היא יותר מ-99% מכל מה שיש במערכת השמש. כל שאר הכוכבים והירחים הם רק קצת." },
  { id: "space-009", topic: "space", pic: "uranus", level: "medium", answer: true,
    text: "אורנוס מסתובב על הצד.",
    explain: "הציר של אורנוס נוטה כל כך שהוא נראה כמו כדור שמתגלגל על הצד. כנראה בגלל התנגשות ענקית לפני הרבה שנים." },
  { id: "space-010", topic: "space", pic: "astronaut", level: "hard", answer: true,
    text: "אסטרונאוט שנמצא זמן בחלל נעשה גבוה יותר בכמה סנטימטרים.",
    explain: "בחלל כמעט אין כוח משיכה שלוחץ על עמוד השדרה, אז הוא מתיישר. כשחוזרים לכדור הארץ, חוזרים לגובה הרגיל." },

  // ---------- FALSE ----------
  // ---------- FALSE ----------
  { id: "space-011", topic: "space", pic: "moon", level: "easy", answer: false,
    text: "הירח מפיק אור משלו.",
    explain: "הירח לא מפיק אור. אנחנו רואים אותו כי הוא מחזיר אלינו את האור של השמש." },
  { id: "space-012", topic: "space", pic: "great-wall", level: "medium", answer: false,
    text: "אפשר לראות את החומה הגדולה של סין מהחלל בעין בלתי מזוינת.",
    explain: "החומה ארוכה מאוד אבל צרה, ואסטרונאוטים אומרים שאי אפשר לראות אותה מהחלל בלי מצלמה עם זום." },
  { id: "space-013", topic: "space", pic: "mercury", level: "medium", answer: false,
    text: "כוכב חמה, שהכי קרוב לשמש, הוא כוכב הלכת החם ביותר.",
    explain: "נוגה הכי חם! האטמוספרה העבה שלה לוכדת את החום, ובכוכב חמה כמעט אין אטמוספרה." },
  { id: "space-014", topic: "space", pic: "space-station", level: "hard", answer: false,
    text: "בתחנת החלל הבינלאומית אין כוח משיכה בכלל.",
    explain: "יש שם כוח משיכה, כמעט כמו אצלנו. האסטרונאוטים צפים כי התחנה והם נופלים כל הזמן סביב כדור הארץ." },
  { id: "space-015", topic: "space", pic: "moon", level: "medium", answer: false,
    text: "הירח משלים הקפה אחת סביב כדור הארץ בכל יום.",
    explain: "הקפה אחת של הירח סביב כדור הארץ לוקחת בערך חודש." },
  { id: "space-016", topic: "space", pic: "saturn", level: "easy", answer: false,
    text: "שבתאי הוא כוכב הלכת הגדול ביותר במערכת השמש.",
    explain: "צדק הוא הגדול ביותר. שבתאי במקום השני." },
  { id: "space-017", topic: "space", pic: "shooting-star", level: "easy", answer: false,
    text: "כוכב נופל הוא כוכב אמיתי שנופל לכדור הארץ.",
    explain: "כוכב נופל הוא אבן קטנה מהחלל. היא נשרפת באוויר שלנו ויוצרת פס אור." },
  { id: "space-018", topic: "space", pic: "pluto", level: "medium", answer: false,
    text: "פלוטו הוא אחד משמונת כוכבי הלכת.",
    explain: "פלוטו הוא כוכב לכת ננסי. יש שמונה כוכבי לכת במערכת השמש.", verified: false }, // TODO: verify this fact (verified:false = hidden from the game until checked)
  { id: "space-019", topic: "space", pic: "earth", level: "easy", answer: false,
    text: "יום ולילה קורים כי השמש מסתובבת סביב כדור הארץ.",
    explain: "כדור הארץ מסתובב סביב עצמו פעם ב-24 שעות, אז לפעמים הצד שלנו פונה לשמש ולפעמים לא." },
  { id: "space-020", topic: "space", pic: "earth", level: "hard", answer: false,
    text: "בקיץ חם כי כדור הארץ קרוב יותר לשמש.",
    explain: "העונות קורות בגלל שכדור הארץ נוטה. בקיץ שלנו כדור הארץ דווקא נמצא הכי רחוק מהשמש!" }
];
