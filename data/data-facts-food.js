// Fact Detective: food facts.
// To add a fact, copy one line below and change it:
//   id      - unique, e.g. "food-031"          level  - "easy" | "medium" | "hard"
//   answer  - true = נכון, false = שטויות במיץ עגבניות!
//   text    - the clue the player sees       explain - one short sentence (for a myth: the truth)
// Please fact-check new facts before adding them.
const FACTS_FOOD = [
  // ---------- TRUE ----------
  { id: "food-001", topic: "food", level: "medium", answer: true,
    text: "מבחינה מדעית, עגבנייה היא פרי.",
    explain: "בפרי יש זרעים בפנים, ובעגבנייה יש. קוראים לה ירק כי שמים אותה בסלט, אבל היא בעצם פרי." },
  { id: "food-002", topic: "food", level: "medium", answer: true,
    text: "דבש יכול להישאר טוב לאכילה אלפי שנים.",
    explain: "בדבש סגור יש מעט מאוד מים, ולכן חיידקים לא גדלים בו. מצאו דבש טוב לאכילה בקברים מצריים עתיקים." },
  { id: "food-003", topic: "food", level: "easy", answer: true,
    text: "שוקולד עשוי מגרעינים של עץ הקקאו.",
    explain: "קוצרים את הגרעינים מהפרי של העץ, מייבשים וטוחנים אותם, ומהם מכינים שוקולד." },
  { id: "food-004", topic: "food", level: "medium", answer: true,
    text: "פופקורן מתפוצץ בגלל המים שיש בתוך הגרעין.",
    explain: "כשמחממים, המים בתוך הגרעין הופכים לקיטור. הלחץ גדל עד שהקליפה נפתחת והפופקורן קופץ החוצה." },
  { id: "food-005", topic: "food", level: "medium", answer: true,
    text: "אורז הוא המזון העיקרי של כמחצית מאוכלוסיית העולם.",
    explain: "בעיקר באסיה, מיליארדי אנשים אוכלים אורז כמעט בכל יום." },
  { id: "food-006", topic: "food", level: "easy", answer: true,
    text: "יוגורט עשוי מחלב וחיידקים טובים.",
    explain: "החיידקים הטובים הופכים את החלב ליוגורט חמצמץ, והם גם טובים לבטן." },
  { id: "food-007", topic: "food", level: "easy", answer: true,
    text: "אבטיח הוא בעיקר מים.",
    explain: "כ-92% מהאבטיח הוא מים, ולכן הוא מרווה כל כך." },
  { id: "food-008", topic: "food", level: "medium", answer: true,
    text: "הפיצה שאנחנו מכירים נולדה בנאפולי שבאיטליה.",
    explain: "בעיר נאפולי התחילו להכין את הפיצה עם עגבנייה וגבינה, ומשם היא התפשטה לכל העולם." }, // TODO: verify this fact
  { id: "food-009", topic: "food", level: "medium", answer: true,
    text: "הנקודות הקטנות על התות הן בעצם פירות זעירים.",
    explain: "בכל אחת מהנקודות האלה יש זרע. התות עצמו הוא החלק האדום והעסיסי שמחזיק אותן." },
  { id: "food-010", topic: "food", level: "medium", answer: true,
    text: "מחממים חלב כדי להרוג חיידקים מזיקים.",
    explain: "זה נקרא פסטור. הוא עושה את החלב בטוח לשתייה." },

  // ---------- FALSE ----------
  // ---------- FALSE ----------
  { id: "food-011", topic: "food", level: "medium", answer: false,
    text: "בננות גדלות על עצים.",
    explain: "בננה גדלה על צמח ענק שהוא לא עץ. הגזע שלו עשוי מעלים עבים שדחוסים יחד." },
  { id: "food-012", topic: "food", level: "medium", answer: false,
    text: "גזר עוזר לראות בחושך.",
    explain: "גזר טוב לעיניים, אבל הוא לא נותן ראיית לילה. הסיפור התחיל כתעמולה במלחמת העולם השנייה." },
  { id: "food-013", topic: "food", level: "medium", answer: false,
    text: "סוכר גורם לילדים להיות היפראקטיביים.",
    explain: "מחקרים רבים מצאו שסוכר לא עושה את זה. הילדים פשוט מתרגשים במסיבות!" },
  { id: "food-014", topic: "food", level: "easy", answer: false,
    text: "מסטיק שנבלע נשאר בבטן שבע שנים.",
    explain: "מסטיק עובר בגוף כמו אוכל ויוצא תוך כמה ימים. אבל עדיף בכל זאת לא לבלוע אותו." },
  { id: "food-015", topic: "food", level: "medium", answer: false,
    text: "פטריות הן צמחים.",
    explain: "פטריות הן לא צמחים ולא חיות. הן קבוצה נפרדת של יצורים חיים." },
  { id: "food-016", topic: "food", level: "hard", answer: false,
    text: "מבחינה מדעית, בוטנים הם אגוזים.",
    explain: "בוטן הוא קטנית, כמו אפונה ושעועית, והוא גדל מתחת לאדמה." },
  { id: "food-017", topic: "food", level: "easy", answer: false,
    text: "אפשר לאכול כל פטרייה שמוצאים ביער.",
    explain: "יש פטריות רעילות שדומות מאוד לפטריות טובות. לעולם לא אוכלים פטריות מהטבע בלי מבוגר שמבין בזה!" },
  { id: "food-018", topic: "food", level: "medium", answer: false,
    text: "אננס גדל על עץ.",
    explain: "אננס גדל על צמח נמוך על הקרקע, לא על עץ גבוה." }, // TODO: verify this fact
  { id: "food-019", topic: "food", level: "hard", answer: false,
    text: "העגבנייה הגיעה במקור מאיטליה.",
    explain: "העגבנייה הגיעה מדרום ומרכז אמריקה, ורק לפני כמה מאות שנים הגיעה לאירופה." },
  { id: "food-020", topic: "food", level: "medium", answer: false,
    text: "ביצים חומות בריאות יותר מביצים לבנות.",
    explain: "צבע הקליפה תלוי בסוג התרנגולת. בפנים הביצים אותו דבר, מבחינת ערכים תזונתיים." }
];
