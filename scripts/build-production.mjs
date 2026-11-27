import {cp,mkdir,readFile,writeFile,rm,readdir,stat} from 'node:fs/promises';
import {join} from 'node:path';
const dist='dist',domain='https://www.royaldigitalclarity.com',portal='https://portal.royaldigitalclarity.com/';
const pages=['index.html','website-lift.html','website-intake.html','workflow.html','services.html','about.html','privacy.html','404.html','questionnaire.html'];
await rm(dist,{recursive:true,force:true});await mkdir(dist,{recursive:true});
for(const f of [...pages,'redesign.css','redesign.js','demo-brief.js','script.js'])await cp(f,join(dist,f));
for(const d of ['assets','downloads','connect'])await cp(d,join(dist,d),{recursive:true});
await rm(join(dist,'assets','this'),{force:true});
const edits=[
['YOUR FIRST WEBSITE DEMO','YOUR WEBSITE PROJECT'],
['A few answers.<br>Something you can<br><em>actually try.</em>','A few answers.<br>A clearer<br><em>starting point.</em>'],
['We turn that into a focused first preview.','We use that to discuss scope and the right next step. Complimentary concepts are available only by personal invitation.'],
['Eight short questions give us the audience, content, and direction for your first website demo.','Eight short questions help us understand your business and recommend the right scope. A demo is not automatically included.'],
['Start my demo brief','Start my project brief'],
['What must the first demo get right?','What must your website get right?'],
['Review my demo brief','Review my project brief'],
['Your website demo brief.','Your website project brief.'],
['Direction first.<br>Then a demo.','Direction first.<br>Then a plan.'],
['Use the demo to agree direction.','Agree the next step. Complimentary previews require a personal invitation.'],
['No. It supplies the direction for discovery and an initial demo. We agree scope, costs, and publication separately.','No. It supplies direction for discovery. A complimentary concept is available by personal invitation only. We agree scope, costs, and publication separately.'],
['STARTING OFFERS FOR REVIEW','STARTING INVESTMENTS'],
['These are the existing test-site offers. Your written proposal confirms scope, providers, ongoing costs, and support.','Indicative starting prices, not fixed quotes. Pricing may vary with design, content preparation, functionality, integrations, security, testing, and support complexity rather than page count. Your written proposal confirms scope, costs, and applicable taxes.'],
['Up to 5 core pages','Focused informational experience and straightforward customer action'],
['Up to 10 pages and improved service copy','Multiple service journeys and richer content or structured content management'],
['Up to 15 pages and deeper content planning','Advanced workflows, custom functionality, or higher integration complexity'],
['Illustrative workspace · Explore the test version','Illustrative customer workspace'],
['A place for the plan, actions, decisions, and final handoff. Explore the redesigned sample workspace alongside this test website.','A place for the plan, actions, decisions, and final handoff. Existing customers can access their separate secure workspace.'],
['Try the workspace preview','Open customer workspace'],
['The test workspace uses sample data and does not connect to live customer records.','Illustration only. Access to customer records requires authorized sign-in.'],
['Explore the sample workspace','Open customer workspace'],
['The workspace is a sample preview. The website brief stays in your browser unless you choose to send or share it.','The website brief stays in your browser unless you choose to send or share it.'],
['Privacy for the RDC test website','Privacy for the RDC website'],
['How the RDC test questionnaire and sample workspace handle information','How the RDC questionnaire handles information'],
['TEST WEBSITE PRIVACY','WEBSITE PRIVACY'],
['This notice describes this redesign test site and its browser-only workspace preview.','This notice describes the public RDC website and its browser-only questionnaire.'],
['The workspace uses sample project data. Actions and choices change this tab only. Exporting a review downloads a file to your device. There is no connection to live customer records, payment services, or portal sign-in in this preview.','The separate customer portal requires authorized access. Do not send passwords, private records, or payment details through the public questionnaire.'],
['This test release adds no analytics or advertising scripts.','This public release adds no analytics or advertising scripts.'],
['Test release notice · November 8, 2026. Production practices and policies must be reviewed before this redesign is published live.','Public website notice · November 23, 2026.'],
['The requested RDC test page could not be found.','The requested RDC page could not be found.'],
['Website demo questionnaire','Website project questionnaire'],
['Eight short questions for a useful first website demo.','Eight short questions for a useful first website brief.']
];
async function rewrite(path){
 let s=await readFile(path,'utf8');
 s=s.replace(/<div class="preview-ribbon"[^>]*>[\s\S]*?<\/div>/g,'');
 s=s.replace(/<div class="test-banner">[\s\S]*?<\/div>/g,'').replace(/<span>Test release [^<]*<\/span>/g,'');
 s=s.replace(/<meta name="robots" content="noindex, nofollow">/g,path.endsWith('/404.html')?'<meta name="robots" content="noindex, follow">':'<meta name="robots" content="index, follow">');
 s=s.replaceAll('https://test.royaldigitalclarity.com',domain).replaceAll('href="/portal/"','href="'+portal+'"').replaceAll('https://royaldigitalclarity.com',domain).replaceAll(domain+'/index.html"',domain+'/"');
 for(const [a,b] of edits)s=s.replaceAll(a,b);
 // The old downloadable questionnaire is not yet approved for public distribution.
 s=s.replace(/<a[^>]*href="\/downloads\/RDC-Website-Demo-Questionnaire\.docx"[^>]*>[\s\S]*?<\/a>/g,'');
 if(path.endsWith('/website-intake.html')){
  const formStart='<form id="demo-brief" class="brief-form">';
  if(!s.includes(formStart))throw Error('Intake form anchor missing');
  s=s.replace(formStart,formStart+'<p class="fine-print intake-disclosure">This is a request for discussion, not an entitlement to complimentary design. Personal invitations are arranged directly with RDC.</p>');
  s=s.replace('YOUR FIRST WEBSITE DEMO ·','YOUR WEBSITE PROJECT ·');
 }
 // The public app and all shared metadata use the verified www hostname.
 s=s.replace(/<link rel="icon"[^>]*>/g,'<link rel="icon" href="/assets/favicon.svg?v=20261126" type="image/svg+xml"><link rel="alternate icon" href="/assets/favicon.ico?v=20261126"><link rel="apple-touch-icon" href="/assets/apple-touch-icon.png?v=20261126">');
 await writeFile(path,s);
}
for(const p of [...pages,'connect/index.html','connect/dakota/index.html'])await rewrite(join(dist,p));
await rm(join(dist,'downloads','RDC-Website-Demo-Questionnaire.docx'),{force:true});
for(const file of ['connect/dakota/dakota-king.vcf','connect/connect.js']){
 const path=join(dist,file);let text=await readFile(path,'utf8');
 text=text.replaceAll('https://royaldigitalclarity.com',domain);
 if(file.endsWith('.js'))text=text.replace('new URL(window.location.pathname,window.location.origin)','new URL(window.location.pathname,'+JSON.stringify(domain)+')');
 await writeFile(path,text);
}
for(const f of ['demo-brief.js','redesign.js']){
 const p=join(dist,f);let s=await readFile(p,'utf8');
 s=s.replaceAll('RDC WEBSITE DEMO BRIEF','RDC WEBSITE PROJECT BRIEF').replaceAll('RDC-Website-Demo-Brief.txt','RDC-Website-Project-Brief.txt').replaceAll('What must the first demo get right?','What must your website get right?').replaceAll('Explore the working sample from the customer workspace link.','Existing customers can open their separate workspace.');
 await writeFile(p,s);
}
const config={routes:[{route:'/connect/dakota',redirect:'/connect/dakota/',statusCode:301},{route:'/connect',redirect:'/connect/',statusCode:301},{route:'/portal',redirect:portal,statusCode:302},{route:'/api/*',statusCode:404}],responseOverrides:{'404':{rewrite:'/404.html'}},globalHeaders:{'X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','Permissions-Policy':'camera=(), microphone=(), geolocation=()','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'"}};
// SWA treats trailing-slash variants as duplicate routes.
const normalizedRoutes=new Set();
for(const rule of config.routes){
 const route=rule.route.replace(/\/+$/,'')||'/';
 if(normalizedRoutes.has(route))throw Error('Duplicate SWA route: '+route);
 normalizedRoutes.add(route);
}
await writeFile(join(dist,'staticwebapp.config.json'),JSON.stringify(config,null,2)+'\n');
const urls=['/','/website-lift.html','/website-intake.html','/workflow.html','/services.html','/about.html','/privacy.html','/questionnaire.html','/connect/','/connect/dakota/'];
await writeFile(join(dist,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: '+domain+'/sitemap.xml\n');
await writeFile(join(dist,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+urls.map(p=>'<url><loc>'+domain+p+'</loc></url>').join('')+'</urlset>\n');
await writeFile(join(dist,'version.json'),JSON.stringify({version:'2026.11.27-launch-r4',environment:'production',portal:'separate',source:process.env.GITHUB_SHA??'local-candidate'})+'\n');
for(const p of [...pages,'connect/index.html','connect/dakota/index.html']){
 const s=await readFile(join(dist,p),'utf8');
 if(/test\.royaldigitalclarity\.com|class="test-banner"|href="\/portal\/"|Up to \d+ (?:core )?pages/i.test(s))throw Error('Unresolved release boundary: '+p);
 if(p!=='404.html'&&/content="noindex/i.test(s))throw Error('Unexpected noindex: '+p);
 if(/<script\b[^>]*>\s*\S/i.test(s.replace(/<script\b[^>]*src=[^>]*>\s*<\/script>/gi,'')))throw Error('Inline script needs review: '+p);
}
// Every sitemap path must map to an actual packaged file.
for(const route of urls){
 const file=route.endsWith('/')?route+'index.html':route;
 await stat(join(dist,file.slice(1)));
}
for(const file of ['assets/favicon.svg','assets/favicon.ico','assets/apple-touch-icon.png','404.html','robots.txt','sitemap.xml','connect/dakota/dakota-king.vcf'])await stat(join(dist,file));
const intake=await readFile(join(dist,'website-intake.html'),'utf8');
if(!intake.includes('<section class="intake-layout shell"><form id="demo-brief" class="brief-form"><p class="fine-print intake-disclosure">'))throw Error('Intake grid children changed unexpectedly');
if(intake.includes('https://royaldigitalclarity.com/'))throw Error('Noncanonical intake URL');
for(const forbidden of ['portal','portal-preview','docs','.github','api','AGENTS.md']){
 try{await stat(join(dist,forbidden));throw Error('Forbidden output '+forbidden);}catch(e){if(e.code!=='ENOENT')throw e;}
}
console.log('Production static package verified: distinct customer portal, indexed public pages, no sample portal or repository docs, scope-based prices.');
