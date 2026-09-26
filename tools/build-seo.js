// Sinh dữ liệu có cấu trúc (JSON-LD) cho index.html và cập nhật sitemap.xml từ js/branches.js.
// Chạy lại mỗi khi thay đổi danh sách cơ sở:  node tools/build-seo.js
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SITE = "https://www.lauechhuyenanh.com/";
const BRAND = "Lẩu Ếch Huyền Anh";
const LOGO = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJO_8ilf1ZcAZLCXGy58fn4Husw981VyQoeL6sP8e-gfzSjPz98XzgsLw&s=10";
const IMAGE = "https://images.pexels.com/photos/34688726/pexels-photo-34688726.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop";

const window = {};
new Function("window", fs.readFileSync(path.join(ROOT, "js/branches.js"), "utf8"))(window);

function address(raw) {
  const parts = raw.split(",").map((s) => s.trim());
  return {
    "@type": "PostalAddress",
    streetAddress: raw,
    addressLocality: parts.length > 1 ? parts[parts.length - 2] : parts[0],
    addressRegion: parts[parts.length - 1],
    addressCountry: "VN"
  };
}

const org = {
  "@type": "Organization",
  "@id": SITE + "#org",
  name: BRAND,
  url: SITE,
  logo: LOGO,
  sameAs: ["https://www.facebook.com/lauechhuyenanh.official/"]
};

const branches = window.BRANCHES.map((b) => {
  const r = {
    "@type": "Restaurant",
    name: BRAND + " – " + b.name,
    url: SITE + "#branches",
    image: IMAGE,
    servesCuisine: ["Lẩu ếch", "Lẩu ếch măng cay", "Món Việt"],
    acceptsReservations: true,
    address: address(b.address),
    parentOrganization: { "@id": SITE + "#org" },
    sameAs: [b.facebook]
  };
  if (b.phone) r.telephone = "+84" + b.phone.replace(/^0/, "");
  return r;
});

const site = {
  "@type": "WebSite",
  "@id": SITE + "#website",
  url: SITE,
  name: BRAND,
  inLanguage: "vi-VN",
  publisher: { "@id": SITE + "#org" }
};

const json = JSON.stringify({ "@context": "https://schema.org", "@graph": [org, site, ...branches] }, null, 2);
const block = '<script type="application/ld+json" id="ld-json">\n' + json.replace(/</g, "\\u003c") + "\n  </script>";

const htmlPath = path.join(ROOT, "index.html");
let html = fs.readFileSync(htmlPath, "utf8");
html = /<script type="application\/ld\+json" id="ld-json">[\s\S]*?<\/script>/.test(html)
  ? html.replace(/<script type="application\/ld\+json" id="ld-json">[\s\S]*?<\/script>/, () => block)
  : html.replace("</head>", "  " + block + "\n</head>");
fs.writeFileSync(htmlPath, html);

const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(
  path.join(ROOT, "sitemap.xml"),
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  "  <url>\n    <loc>" + SITE + "</loc>\n    <lastmod>" + today + "</lastmod>\n  </url>\n" +
  "</urlset>\n"
);

console.log("JSON-LD: " + branches.length + " cơ sở · sitemap.xml lastmod " + today);
