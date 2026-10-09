import fs from "node:fs";
import path from "node:path";

const root = "C:/ExperTech/TempData/oss";
const out = path.resolve("src/lib/oss.ts");

function clean(value) {
  return String(value || "")
    .replace(/\u2014|\u2013/g, ", ")
    .replace(/\s+,/g, ",")
    .replace(/,{2,}/g, ",")
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function clip(value) {
  const text = clean(value);
  if (text.length <= 180) return text;
  const cut = text.slice(0, 180);
  const space = cut.lastIndexOf(" ");
  return `${cut.slice(0, space > 80 ? space : 180)}...`;
}

function frontmatter(file) {
  const text = fs.readFileSync(file, "utf8");
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const block = match ? match[1] : "";
  const fields = {};
  for (const line of block.split(/\r?\n/)) {
    const hit = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!hit) continue;
    fields[hit[1]] = hit[2].replace(/^["']|["']$/g, "");
  }
  return fields;
}

const skillGroups = {
  "بحث وعرض": [
    "product-marketing",
    "customer-research",
    "marketing-plan",
    "marketing-ideas",
    "marketing-psychology",
    "offers",
    "pricing",
    "competitors",
    "competitor-profiling",
  ],
  "نص ومحتوى": [
    "copywriting",
    "copy-editing",
    "content-strategy",
    "social",
    "emails",
    "sms",
    "video",
    "image",
    "ad-creative",
  ],
  "ظهور في البحث": [
    "seo-audit",
    "ai-seo",
    "schema",
    "site-architecture",
    "programmatic-seo",
    "aso",
  ],
  "تحويل وقياس": [
    "cro",
    "signup",
    "onboarding",
    "popups",
    "paywalls",
    "ab-testing",
    "analytics",
    "attribution",
    "ads",
  ],
};

function skillGroup(slug) {
  for (const [group, slugs] of Object.entries(skillGroups)) {
    if (slugs.includes(slug)) return group;
  }
  return "نمو ومبيعات";
}

const skillsDir = path.join(root, "marketingskills/skills");
const skills = fs
  .readdirSync(skillsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => {
    const file = path.join(skillsDir, entry.name, "SKILL.md");
    if (!fs.existsSync(file)) return null;
    const meta = frontmatter(file);
    const summary = clip(meta.description);
    return {
      slug: entry.name,
      title: entry.name,
      summary,
      group: skillGroup(entry.name),
      href: `https://github.com/coreyhaines31/marketingskills/blob/1efedbc/skills/${entry.name}/SKILL.md`,
    };
  })
  .filter(Boolean)
  .sort((a, b) => a.title.localeCompare(b.title));

const china = new Set([
  "marketing-baidu-seo-specialist.md",
  "marketing-bilibili-content-strategist.md",
  "marketing-china-ecommerce-operator.md",
  "marketing-china-market-localization-strategist.md",
  "marketing-douyin-strategist.md",
  "marketing-kuaishou-strategist.md",
  "marketing-wechat-official-account.md",
  "marketing-weibo-strategist.md",
  "marketing-xiaohongshu-specialist.md",
  "marketing-zhihu-strategist.md",
]);

const agentsDir = path.join(root, "agency-agents/marketing");
const agents = fs
  .readdirSync(agentsDir)
  .filter((name) => name.endsWith(".md"))
  .map((name) => {
    const meta = frontmatter(path.join(agentsDir, name));
    return {
      slug: name.replace(/\.md$/, ""),
      title: clean(meta.name || name),
      summary: clip(meta.vibe || meta.description),
      group: china.has(name) ? "منصات صينية" : "تسويق عام",
      href: `https://github.com/msitarzewski/agency-agents/blob/f99f6aa/marketing/${name}`,
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title));

const file = `/* Generated from C:/ExperTech/TempData/oss. MIT excerpts only. */
export type OssItem = {
  slug: string;
  title: string;
  summary: string;
  group: string;
  href: string;
};

export const OSS_SKILLS: OssItem[] = ${JSON.stringify(skills, null, 2)};

export const OSS_AGENTS: OssItem[] = ${JSON.stringify(agents, null, 2)};

export const OSS_SOURCES = [
  {
    name: "marketingskills",
    owner: "Corey Haines",
    license: "MIT",
    commit: "1efedbc",
    href: "https://github.com/coreyhaines31/marketingskills",
    note: "مهارات تسويق لوكلاء البرمجة. الوصف هنا أول جملة من ملف المهارة.",
  },
  {
    name: "agency-agents",
    owner: "AgentLand Contributors",
    license: "MIT",
    commit: "f99f6aa",
    href: "https://github.com/msitarzewski/agency-agents",
    note: "شخصيات وكلاء. المعروض قسم التسويق فقط، والسطر هو حقل vibe.",
  },
  {
    name: "OpenResearch",
    owner: "alphaXiv",
    license: "MIT",
    commit: "0d3d376",
    href: "https://github.com/alphaXiv/OpenResearch",
    note: "مساحة بحث محلية. لم يُثبَّت على هذا الموقع ولا يشغّل وكيل بحث.",
  },
] as const;
`;

fs.writeFileSync(out, file);
console.log(`skills ${skills.length} agents ${agents.length}`);
