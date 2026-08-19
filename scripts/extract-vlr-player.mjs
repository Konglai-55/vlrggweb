import { spawn } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const url = process.argv[2] ?? "https://www.vlr.gg/player/66427/toosy/?timespan=30d";
const prefix = url.startsWith("http://127.0.0.1") ? "clone" : "source";
const out = path.resolve("docs/design-references/vlr-gg-30a6d823/player-66427-toosy-30d-159d27bd");
const research = path.resolve("docs/research/vlr-gg-30a6d823/player-66427-toosy-30d-159d27bd");
const edge = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const port = 9466;
const profile = path.resolve(".tmp-vlr-edge-profile");
await rm(profile, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await mkdir(research, { recursive: true });

const browser = spawn(edge, [
  "--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check",
  `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "--window-size=1440,1200", url,
], { stdio: "ignore", windowsHide: true });
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let target;
for (let i = 0; i < 100; i += 1) {
  try {
    const targets = await fetch(`http://127.0.0.1:${port}/json/list`).then((r) => r.json());
    target = targets.find((item) => item.type === "page" && item.url.startsWith("http"));
    if (target?.webSocketDebuggerUrl) break;
  } catch {}
  await sleep(200);
}
if (!target) throw new Error("No Edge target");
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { ws.addEventListener("open", resolve, { once: true }); ws.addEventListener("error", reject, { once: true }); });
let seq = 0;
const pending = new Map();
ws.addEventListener("message", (event) => {
  const msg = JSON.parse(event.data); const p = pending.get(msg.id); if (!p) return;
  pending.delete(msg.id);
  if (msg.error) p.reject(new Error(JSON.stringify(msg.error)));
  else p.resolve(msg.result);
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++seq; pending.set(id, { resolve, reject }); ws.send(JSON.stringify({ id, method, params }));
});
const evaluate = async (expression) => {
  const r = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text); return r.result.value;
};
await send("Page.enable"); await send("Runtime.enable");
for (let i = 0; i < 100; i += 1) { if (await evaluate("document.readyState") === "complete") break; await sleep(150); }
await sleep(3500);

async function setViewport(width, height, name) {
  await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 500, screenWidth: width, screenHeight: height });
  await sleep(700);
  const metrics = await send("Page.getLayoutMetrics");
  const size = metrics.cssContentSize;
  const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: 0, y: 0, width: size.width, height: size.height, scale: 1 } });
  await writeFile(path.join(out, `${name}.png`), Buffer.from(shot.data, "base64"));
  return { width, height, contentWidth: size.width, contentHeight: size.height };
}

const desktop = await setViewport(1440, 1200, `${prefix}-desktop-1440`);
const tablet = await setViewport(768, 1024, `${prefix}-tablet-768`);
const mobile = await setViewport(390, 844, `${prefix}-mobile-390`);
await setViewport(1440, 1200, `${prefix}-desktop-final`);

const data = await evaluate(String.raw`(() => {
  const pick = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect(); const s = getComputedStyle(el);
    return {
      tag: el.tagName.toLowerCase(), id: el.id, className: typeof el.className === 'string' ? el.className : '',
      text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 500),
      rect: { x:r.x, y:r.y+scrollY, width:r.width, height:r.height },
      style: Object.fromEntries(['display','position','fontFamily','fontSize','fontWeight','lineHeight','color','backgroundColor','backgroundImage','padding','margin','border','borderRadius','boxShadow','width','height','maxWidth','minWidth','overflow','gridTemplateColumns','gap','flexDirection','justifyContent','alignItems'].map(k => [k,s[k]])),
    };
  };
  const assets = {
    images: [...document.images].map(img => ({ src:img.currentSrc||img.src, alt:img.alt, width:img.naturalWidth, height:img.naturalHeight, className:img.className })),
    backgrounds: [...document.querySelectorAll('*')].map(el => ({ el, bg:getComputedStyle(el).backgroundImage })).filter(x => x.bg && x.bg !== 'none').map(x => ({ tag:x.el.tagName, className:x.el.className, backgroundImage:x.bg })),
    stylesheets: [...document.styleSheets].map(s => s.href).filter(Boolean),
    icons: [...document.querySelectorAll('link[rel*="icon"]')].map(x => x.href),
  };
  const headings = [...document.querySelectorAll('h1,h2,h3')].map(pick);
  const sections = [...document.querySelectorAll('header,nav,main,footer,.wf-card,.col,.player-header,.player-header-card')].map(pick).filter(Boolean);
  const links = [...document.querySelectorAll('a')].map(a => ({ text:(a.textContent||'').trim().replace(/\s+/g,' '), href:a.href, className:a.className })).filter(x => x.text).slice(0,250);
  return { title:document.title, url:location.href, body:pick(document.body), headings, sections, assets, links, html:document.documentElement.outerHTML };
})()`);
if (prefix === "source") {
  await writeFile(path.join(research, "source-extraction.json"), JSON.stringify({ viewports:{desktop,tablet,mobile}, ...data, html:undefined }, null, 2));
  await writeFile(path.join(research, "source.html"), data.html);
}
console.log(JSON.stringify({ viewports:{desktop,tablet,mobile}, title:data.title, images:data.assets.images.length, backgrounds:data.assets.backgrounds.length, stylesheets:data.assets.stylesheets.length }, null, 2));
ws.close(); browser.kill(); await new Promise(resolve => browser.once("exit", resolve));
await rm(profile, { recursive: true, force: true, maxRetries: 5 }).catch(() => {});
