import {cp,mkdir,readFile,writeFile,rm,readdir} from 'node:fs/promises';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
const root=process.cwd(),dist=join(root,'dist');
if(!process.argv.includes('--test'))throw new Error('This candidate is test-only. Production packaging requires a separately reviewed release.');
await rm(dist,{recursive:true,force:true});await mkdir(dist,{recursive:true});
const files=['index.html','website-lift.html','website-intake.html','workflow.html','services.html','about.html','privacy.html','404.html','questionnaire.html','redesign.css','redesign.js','demo-brief.js','script.js'];
for(const f of files)await cp(join(root,f),join(dist,f));
for(const dir of ['assets','downloads'])await cp(join(root,dir),join(dist,dir),{recursive:true});
await cp(join(root,'portal-preview'),join(dist,'portal'),{recursive:true});
await rm(join(dist,'assets','this'),{force:true});
const hashes=new Set();
async function inspect(dir){for(const item of await readdir(dir,{withFileTypes:true})){const path=join(dir,item.name);if(item.isDirectory())await inspect(path);else if(item.name.endsWith('.html')){const text=await readFile(path,'utf8');for(const script of text.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)){if(script[1].trim())hashes.add("'sha256-"+createHash('sha256').update(script[1]).digest('base64')+"'");}}}}
await inspect(join(dist,'portal'));
const config={routes:[{route:'/portal',redirect:'/portal/',statusCode:301},{route:'/api/*',statusCode:404}],responseOverrides:{'404':{rewrite:'/404.html'}},globalHeaders:{'X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','Permissions-Policy':'camera=(), microphone=(), geolocation=()','X-Robots-Tag':'noindex, nofollow','Content-Security-Policy':`default-src 'self'; script-src 'self' ${[...hashes].join(' ')}; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'`}};
const encoded=JSON.stringify(config,null,2);if(Buffer.byteLength(encoded)>19000)throw new Error('SWA configuration too large');
await writeFile(join(dist,'staticwebapp.config.json'),encoded+'\n');await writeFile(join(dist,'robots.txt'),'User-agent: *\nAllow: /\n');
await writeFile(join(dist,'version.json'),JSON.stringify({version:'2026.11.08-r1',environment:'test',portal:'sample-only',source:process.env.GITHUB_SHA??'local-candidate'})+'\n');
console.log(`Packaged test website and portal. ${hashes.size} Next inline script hashes; no backend, docs, or secrets included.`);
