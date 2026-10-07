const base = "http://127.0.0.1:3477";

async function get(path) {
  const res = await fetch(base + path);
  const text = await res.text();
  console.log("GET", path, res.status, text.slice(0, 180).replace(/\s+/g, " "));
  return { res, text };
}

async function post(path, body) {
  const res = await fetch(base + path, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  console.log("POST", path, res.status, text);
  return JSON.parse(text);
}

const home = await get("/");
if (!home.text.includes('dir="rtl"') || !home.text.includes("رتّب التسويق")) {
  throw new Error("home missing rtl or headline");
}
if (!home.text.includes("wa.me/962787523192")) {
  throw new Error("home missing whatsapp digits");
}

const health = await get("/api/health");
if (!health.text.includes('"ok":true')) throw new Error("health failed");

const lead = await post("/api/leads", {
  name: "فحص البناء",
  phone: "962787523192",
  company: "تجربة",
  interest: "quotation",
  message: "طلب تجريبي من فحص التشغيل",
});
if (!lead.ok) throw new Error("lead failed");

const assessment = await post("/api/assessments", {
  businessName: "مخبز الفحص",
  sector: "restaurants",
  weeklyPosts: 4,
  bottleneck: "documents",
});
if (!assessment.ok) throw new Error("assessment failed");
const result = await get("/assessment/" + assessment.id);
if (!result.text.includes("مخبز الفحص")) throw new Error("result page missing name");

const quote = await post("/api/quotations", {
  clientName: "عميل الفحص",
  notes: "لا يرسل",
  vatCode: "JO",
  items: [{ name: "جلسة تصوير", qty: 2, price: 40 }],
});
if (!quote.ok || quote.vatRate !== 16) throw new Error("quote failed");
const expected = Math.round((80 * 1.16) * 100) / 100;
if (Number(quote.total) !== expected) {
  throw new Error("total mismatch " + quote.total + " vs " + expected);
}

const bad = await post("/api/leads", { name: "ا", phone: "12" });
if (bad.ok) throw new Error("validation should fail");

console.log("SMOKE_PASS");
