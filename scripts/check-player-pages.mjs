import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const base = process.env.PLAYER_CHECK_BASE_URL || "http://127.0.0.1:4511";
const profiles = [
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
  if (["Lincas", "Ziooo"].includes(profile.handle)) {
    assert.ok(html.includes(`<title>${profile.handle}（${profile.name}）: Valorant Player Profile | VLR.gg</title>`));
    assert.ok(html.includes("No past teams"));
    assert.ok(html.includes("No news available"));
    for (const unrelated of ["JingMi88 joins", "Toosy slides", "Havoc &amp; Yonder", "2026-08-01"]) {
      assert.ok(!html.includes(unrelated), `${profile.handle} must not inherit ${unrelated}`);
    }
  }
  console.log(`PASS ${profile.path}`);
}

for (const player of ["lincas", "ziooo"]) {
  const assetRoot = `/sites/vlr-gg-30a6d823/player-${player}`;
  for (const image of [`${player}.jpg`, "ag-young.png", "flag-cn.png"]) {
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
