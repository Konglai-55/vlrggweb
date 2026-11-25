import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const base = process.env.PLAYER_CHECK_BASE_URL || "http://127.0.0.1:4511";
const home = await fetch(new URL("/", base), { redirect: "manual" });
assert.equal(home.status, 307, "The homepage should open the Taurus profile");
assert.equal(new URL(home.headers.get("location"), base).pathname, "/player/Taurus");

const profiles = [
  { path: "/player/Taurus/", handle: "Taurus", name: "曹铠瑞", team: "AG Young" },
  { path: "/player/Ivring/", handle: "Ivring", name: "周柯烨", team: "AG Young" },
  { path: "/player/Finally/", handle: "Finally", name: "江牧聪", team: "AG Young" },
  { path: "/player/Yun/", handle: "Yun", name: "倪国钧", team: "Trace Esports" },
  { path: "/player/Ziooo/", handle: "Ziooo", name: "许子扬", team: "AG Young" },
  { path: "/player/Lincas/", handle: "Lincas", name: "李林巍", team: "AG Young" },
  { path: "/player/JingMi88/", handle: "JingMi88", name: "陈景觅", team: "AG Young" },
  { path: "/player/66427/Tenson/", handle: "Tenson", name: "王志斌", team: "Trace Esports" },
];

for (const profile of profiles) {
  const response = await fetch(new URL(profile.path, base));
  assert.equal(response.status, 200, `${profile.path} should be accessible`);
  const html = await response.text();
  for (const text of [profile.handle, profile.name, profile.team]) {
    assert.ok(html.includes(text), `${profile.path} is missing ${text}`);
  }
  if (["Lincas", "Ziooo", "Yun", "Finally", "Ivring", "Taurus"].includes(profile.handle)) {
    assert.ok(html.includes(`<title>${profile.handle}（${profile.name}）: Valorant Player Profile | VLR.gg</title>`));
    assert.ok(html.includes("No past teams"));
    assert.ok(html.includes("No news available"));
    if (profile.handle === "Yun") {
      assert.ok(!html.includes("AG Young"), "Yun must use Trace Esports");
      assert.ok(html.includes("player-yun/yun.jpg"));
    }
    for (const unrelated of ["JingMi88 joins", "Toosy slides", "Havoc &amp; Yonder", "2026-08-01"]) {
      assert.ok(!html.includes(unrelated), `${profile.handle} must not inherit ${unrelated}`);
    }
  }
  console.log(`PASS ${profile.path}`);
}

for (const player of ["lincas", "ziooo", "yun", "finally", "ivring"]) {
  const assetRoot = `/sites/vlr-gg-30a6d823/player-${player}`;
  for (const image of [`${player}.jpg`, player === "yun" ? "trace-esports.png" : "ag-young.png", "flag-cn.png"]) {
    const response = await fetch(new URL(`${assetRoot}/${image}`, base));
    assert.equal(response.status, 200, `${image} should load`);
    if (image === `${player}.jpg`) {
      const local = await readFile(new URL(`../public${assetRoot}/${image}`, import.meta.url));
      const remote = Buffer.from(await response.arrayBuffer());
      const hash = (data) => createHash("sha256").update(data).digest("hex");
      assert.equal(hash(remote), hash(local), "Portrait must match the uploaded image");
    }
    console.log(`PASS ${image}`);
  }
}

const taurus = await fetch(new URL("/player/Taurus/", base));
assert.equal(taurus.status, 200);
const taurusHtml = await taurus.text();
assert.match(taurusHtml, /<h1[^>]*>Taurus<\/h1>/);
assert.match(taurusHtml, /曹铠瑞/);
assert.match(taurusHtml, /AG Young/);
assert.match(taurusHtml, /<header\b/);
assert.match(taurusHtml, /<footer\b/);
for (const section of ["Agents", "Recent Results", "Current Teams", "Past Teams", "Latest News", "Event Placements"]) {
  assert.ok(taurusHtml.includes(`>${section}</h2>`), `Missing section: ${section}`);
}
assert.ok(taurusHtml.includes('id="match-history"'));
assert.match(taurusHtml, /src="\/players\/taurus\.jpg"/);

const taurusPortrait = await fetch(new URL("/players/taurus.jpg", base));
assert.equal(taurusPortrait.status, 200);
const localTaurusPortrait = await readFile(new URL("../public/players/taurus.jpg", import.meta.url));
assert.deepEqual(Buffer.from(await taurusPortrait.arrayBuffer()), localTaurusPortrait);
console.log("PASS /player/Taurus/ and uploaded portrait");
