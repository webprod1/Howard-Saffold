import assert from 'node:assert/strict';
const base=process.argv[2]||'http://127.0.0.1:5173';
const paths=['/','/about','/books','/books/police-prisons-politics-power','/legacy','/contact','/privacy'];
const titles=new Set();
for(const path of paths){const res=await fetch(base+path,{signal:AbortSignal.timeout(20000)});assert.equal(res.status,200,path);const html=await res.text();assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${path} h1`);assert.ok(!/<meta[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(html),`${path} robots`);assert.match(html,/<link[^>]*rel="canonical"/,`${path} canonical`);assert.match(html,/<meta[^>]*property="og:title"/,`${path} OG`);assert.match(html,/<meta[^>]*name="twitter:card"/,`${path} Twitter`);const title=html.match(/<title>(.*?)<\/title>/)?.[1];assert.ok(title&&!titles.has(title),`${path} unique title`);titles.add(title);console.log('PASS',path);if(path.includes('police-prisons')){assert.match(html,/"@type":"Book"/);assert.match(html,/target="_blank" rel="noopener noreferrer"/);assert.match(html,/https:\/\/www.amazon.com\/Police-Prisons-Politics-Howard-Saffold\/dp\/B0HGQJMW5Q/);}}
const robots=await (await fetch(base+'/robots.txt')).text();assert.match(robots,/Allow: \//);assert.match(robots,/Sitemap: https:/);
const sitemap=await (await fetch(base+'/sitemap.xml')).text();for(const path of paths)assert.ok(sitemap.includes('chatgpt.site'+(path==='/'?'':path)),`sitemap ${path}`);
assert.equal((await fetch(base+'/missing-page')).status,404);
const payload={name:'QA Reader',email:'reader@example.com',subject:'Test inquiry',message:'Validation without email delivery.',website:'',started:Date.now()-5000};
async function post(value,origin=base){return fetch(base+'/api/contact',{method:'POST',headers:{'Content-Type':'application/json',Origin:origin},body:JSON.stringify(value)});}
assert.equal((await post(payload,'https://unrelated.example')).status,403);
assert.equal((await post({...payload,email:'invalid'})).status,400);
assert.equal((await post({...payload,website:'bot.example'})).status,400);
assert.equal((await post({...payload,started:Date.now()+60000})).status,429);
assert.equal((await post({...payload,message:'x'.repeat(17000)})).status,413);
const disabled=await post(payload);assert.equal(disabled.status,409);assert.match(await disabled.text(),/not been sent/);
console.log('PASS robots, sitemap, 404, contact validation, origin protection, honeypot, timing, body limit, disabled delivery');

