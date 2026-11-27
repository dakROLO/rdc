import {cp,readFile,writeFile,stat} from "node:fs/promises";
import {join} from "node:path";
import assert from "node:assert/strict";

export const analyticsPages=["index.html","website-lift.html","website-intake.html","workflow.html","services.html","about.html","privacy.html","questionnaire.html"];
export async function packageAnalytics(dist,mode){
  assert(["production","test"].includes(mode));
  for(const name of ["analytics.js","analytics.css"])await cp(name,join(dist,name));
  for(const name of analyticsPages){
    const file=join(dist,name);
    let html=await readFile(file,"utf8");
    assert(html.includes("</head>")&&!html.includes('name="rdc-analytics"'),name);
    html=html.replace("</head>",'<meta name="rdc-analytics" content="'+(mode==="production"?"G-V41994JW12":"test")+'"><link rel="stylesheet" href="/analytics.css"><script src="/analytics.js" defer></script></head>');
    if(name==="privacy.html"){
      const original=mode==="production"?"This public release adds no analytics or advertising scripts.":"This test release adds no analytics or advertising scripts.";
      assert(html.includes(original),"Privacy notice anchor changed");
      const notice=mode==="production"?
        'Optional Google Analytics 4 is available only after you choose to allow analytics. It uses cookies and technical information about your browser, device and website interactions to help RDC understand website usage. Google receives analytics events, a restricted page URL, and technical request information. RDC does not intentionally send questionnaire answers, contact details, attachments, or private customer records to Google. Advertising cookies and personalized advertising are disabled in this release. RDC has linked Analytics to Google Ads for measurement preparation; confirmed lead reporting is not yet enabled.':
        'This test website simulates optional analytics consent locally. It does not load Google Analytics or send test events to Google.';
      html=html.replace(original,notice);
      html=html.replace("<h2>Share only what is needed</h2>",'<h2>Cookie preferences</h2><p>We store your analytics preference on your device for up to 180 days. You can accept analytics, reject optional tracking, or customize your choice. Use Cookie preferences at the bottom of the page to change your selection at any time. Declining analytics does not prevent you from using our website. Withdrawing consent stops future collection and removes accessible RDC analytics cookies; it does not erase information already collected. Global Privacy Control disables optional analytics.</p><p>For information about Google’s data practices, see <a href="https://policies.google.com/privacy">Google’s privacy policy</a> and <a href="https://policies.google.com/technologies/partner-sites">how Google uses information from sites that use its services</a>.</p><h2>Share only what is needed</h2>');
      if(mode==="production")html=html.replace("Public website notice · November 23, 2026.","Public website notice · November 27, 2026.");
    }
    await writeFile(file,html);
    assert.equal((html.match(/src="\/analytics\.js"/g)||[]).length,1);
    assert(!html.includes("googletagmanager.com/gtag/js"));
  }
  for(const name of ["404.html","connect/index.html","connect/dakota/index.html"]){
    const html=await readFile(join(dist,name),"utf8");
    assert(!html.includes('name="rdc-analytics"'),"Excluded page has analytics: "+name);
  }
  if(mode==="test"){
    const html=await readFile(join(dist,"portal/index.html"),"utf8");
    assert(!html.includes('name="rdc-analytics"'),"Sample portal has analytics");
  }
  for(const f of ["analytics.js","analytics.css"])await stat(join(dist,f));
}
