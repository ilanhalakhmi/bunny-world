// Game 2: "המטבח" (Kitchen) - PLACEHOLDER for playtesting.
// Real game later (pantry, pot, recipes in data-recipes.js). For now: tap a food and watch Frooky's face.

GAMES.push({
  id: "kitchen", title: "המטבח של פרוקי", icon: "🍳", color: "orange",
  subtitle() { return "בקרוב! בינתיים אפשר לנסות"; },
  open() { go("kitchen"); }
});

// each reaction: face, sound effect, Hebrew words
const KITCHEN_REACTIONS = [
  { face: "yummy", sfx: "yum", say: ["טעים!", "ממממ, יאמי!", "עוד, עוד!"] },
  { face: "yucky", sfx: "yuck", say: ["איכס!", "בלייייך!", "זה לא טעים..."] },
  { face: "sour", sfx: "sour", say: ["חמוץ!", "אוי, חמוץ מאוד!"] },
  { face: "salty", sfx: "crunch", say: ["מלוח!", "כל כך הרבה מלח!"] },
  { face: "spicy", sfx: "yuck", say: ["חריף! מים!", "אש בפה!"] },
  { face: "sweet", sfx: "yum", say: ["מתוק!", "מתוק כמו סוכר!"] }
];

SCREENS.kitchen = (root) => {
  Snd.music("food");
  const face = h("div", { class: "kitchen-frooky", html: frookyFull("curious") });
  const say = h("div", { class: "bubble" }, "מה נאכיל את פרוקי?");
  let timer = null;
  const keys = shuffle(Object.keys(PICS_FOOD)).slice(0, 8);
  const foods = h("div", { class: "food-grid" }, keys.map(k => h("button", { class: "food", onclick: () => feed() },
    h("span", { html: `<svg viewBox="0 0 200 200">${PICS_FOOD[k]}</svg>` }))));
  function feed() {
    const r = rndItem(KITCHEN_REACTIONS);
    Snd.sfx("splash");
    setTimeout(() => { Snd.sfx(r.sfx); face.innerHTML = frookyFull(r.face); say.textContent = rndItem(r.say); }, 250);
    clearTimeout(timer);
    timer = setTimeout(() => { face.innerHTML = frookyFull("curious"); say.textContent = "מה נאכיל עכשיו?"; }, 2600);
  }
  root.append(h("div", { class: "screen play" },
    h("div", { class: "bg", html: BACKGROUNDS.food }),
    h("div", { class: "play-inner" },
      topBar("המטבח של פרוקי"),
      h("div", { class: "case-card soft" },
        h("p", { class: "big" }, "🚧 המשחק בבנייה"),
        h("p", {}, "זה רק ניסוי קטן: לחצו על אוכל וראו איך פרוקי מגיב. הסיר והמתכונים יגיעו בקרוב!")),
      h("div", { class: "speech-row tight" }, face, say),
      foods)));
};
