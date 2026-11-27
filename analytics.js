/* RDC public website only. Basic consent mode; no third-party tag before opt-in. */
(() => {
  "use strict";
  const meta = document.querySelector('meta[name="rdc-analytics"]');
  const mode = meta?.content;
  const prod = mode === "G-V41994JW12" && location.protocol === "https:" && location.hostname === "royaldigitalclarity.com";
  const test = mode === "test";
  const routes = new Set(["/","/index.html","/website-lift.html","/website-intake.html","/workflow.html","/services.html","/about.html","/privacy.html","/questionnaire.html"]);
  if ((!prod && !test) || !routes.has(location.pathname)) return;
  const id = "G-V41994JW12", key = "rdc-analytics-preference-v1";
  const lifetime = 180 * 24 * 60 * 60 * 1000;
  const eventNames = new Set(["page_view","service_view","intake_start","intake_complete","assessment_start","assessment_complete","booking_click","email_click","phone_click","brief_download","brief_email_draft"]);
  const campaignKeys = new Set(["utm_source","utm_medium","utm_campaign","utm_id","utm_content","utm_term","gclid","gbraid","wbraid","package"]);
  const denied = {analytics_storage:"denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"};
  const granted = {...denied,analytics_storage:"granted"};
  const globalPrivacy = () => navigator.globalPrivacyControl === true;
  let active = false, started = false, tag = null;
  const seen = new Set();
  const canonicalPath = location.pathname === "/index.html" ? "/" : location.pathname;
  const page = location.origin + canonicalPath;
  const referrerHosts = new Set(["www.google.com","google.com","www.bing.com","bing.com","search.yahoo.com","duckduckgo.com","www.facebook.com","facebook.com","l.facebook.com","m.facebook.com","www.linkedin.com","linkedin.com","www.instagram.com","instagram.com","l.instagram.com","www.youtube.com","youtube.com"]);
  let referrer="";
  try {const r=new URL(document.referrer);if(r.protocol==="https:"&&referrerHosts.has(r.hostname))referrer=r.origin+"/";}catch{}
  // Unknown parameters or fragments might contain private data. Never initialize on these URLs.
  function safeLocation(){
    if(location.hash) return false;
    for(const [key,value] of new URLSearchParams(location.search)){
      if(!campaignKeys.has(key) || !/^[a-zA-Z0-9_-]{1,160}$/.test(value))return false;
      if(key==="package" && !["essential","growth","premium","hosting"].includes(value))return false;
    }
    return true;
  }
  function readChoice(){
    if(globalPrivacy())return "reject";
    try {
      const x=JSON.parse(localStorage.getItem(key));
      return x && ["allow","reject"].includes(x.choice) && Number.isFinite(x.until) && x.until>Date.now() && x.until<=Date.now()+lifetime ? x.choice : null;
    } catch {return null;}
  }
  function store(choice){
    try {localStorage.setItem(key,JSON.stringify({choice,until:Date.now()+lifetime}));return true;} catch{return false;}
  }
  function clearCookies(){
    for(const entry of document.cookie.split(";")){
      const name=entry.split("=")[0].trim();
      if(!/^(_ga(?:_[A-Z0-9]+)?|_gid)$/i.test(name))continue;
      for(const domain of ["", "; domain="+location.hostname, "; domain=.royaldigitalclarity.com"]){
        document.cookie=name+"=; Max-Age=0; path=/; SameSite=Lax"+domain+(location.protocol==="https:"?"; Secure":"");
      }
    }
  }
  function send(name){
    if(!active || globalPrivacy() || !safeLocation() || !eventNames.has(name))return;
    if(test){document.dispatchEvent(new CustomEvent("rdc:analytics-test",{detail:{event:name}}));return;}
    window.gtag("event",name,{send_to:id,page_location:page,page_referrer:referrer,page_title:document.title});
  }
  function once(name){if(!seen.has(name)&&active){seen.add(name);send(name);}}
  function start(){
    if(started || globalPrivacy() || !safeLocation())return;
    started=true;active=true;
    if(prod){
      window["ga-disable-"+id]=false;
      window.dataLayer=window.dataLayer||[];
      window.gtag=function(){window.dataLayer.push(arguments);};
      window.gtag("consent","default",denied);
      window.gtag("consent","update",granted);
      window.gtag("set","ads_data_redaction",true);
      window.gtag("js",new Date());
      window.gtag("config",id,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,page_location:page,page_referrer:referrer,page_title:document.title});
      tag=document.createElement("script");
      tag.async=true;tag.referrerPolicy="no-referrer";
      tag.src="https://www.googletagmanager.com/gtag/js?id="+id;
      document.head.append(tag);
    }
    once("page_view");
    if(["/services.html","/website-lift.html"].includes(canonicalPath))once("service_view");
  }
  function stop(){
    active=false;
    if(test)started=false;
    if(prod){
      window["ga-disable-"+id]=true;
      if(tag){tag.remove();tag=null;}
      clearCookies();
    }
  }
  const panel=document.createElement("section");
  panel.className="rdc-consent";panel.hidden=true;panel.setAttribute("role","region");panel.setAttribute("aria-label","Cookie preferences");
  panel.innerHTML='<h2>Privacy choices</h2><p>We use essential storage to remember your choice. Optional Google Analytics helps us understand website use. Advertising cookies and personalized advertising are not enabled. <a href="/privacy.html">Privacy notice</a></p><p class="rdc-consent-test" hidden>Test mode: no data is sent to Google.</p><div class="rdc-consent-actions"><button type="button" data-choice="reject">Reject optional</button><button type="button" data-choice="allow">Accept analytics</button><button type="button" data-choice="custom">Customize</button></div><div class="rdc-consent-custom" hidden><label><input type="checkbox" data-analytics> Allow optional analytics</label><p>Essential preferences remain available. Advertising is off.</p><button type="button" data-choice="save">Save preferences</button></div><p class="rdc-consent-status" role="status"></p>';
  document.body.append(panel);
  if(test)panel.querySelector(".rdc-consent-test").hidden=false;
  const pref=document.createElement("button");pref.type="button";pref.className="rdc-privacy-trigger";pref.textContent="Cookie preferences";
  (document.querySelector("footer")||document.body).append(pref);
  const custom=panel.querySelector(".rdc-consent-custom"), check=panel.querySelector("[data-analytics]"),status=panel.querySelector(".rdc-consent-status");
  function show(focus=false){check.checked=readChoice()==="allow";check.disabled=globalPrivacy();panel.querySelector('[data-choice="allow"]').disabled=globalPrivacy();status.textContent=globalPrivacy()?"Global Privacy Control is enabled; optional analytics is off.":!safeLocation()?"Analytics is disabled for this URL.":"";panel.hidden=false;custom.hidden=true;if(focus)panel.querySelector('[data-choice="reject"]').focus();}
  function choose(choice){
    if(globalPrivacy())choice="reject";
    const persisted=store(choice);
    if(choice==="allow"){start();}
    else {const reload=prod&&started;stop();if(reload){location.reload();return;}}
    panel.hidden=true;custom.hidden=true;pref.focus();
    if(!persisted)pref.textContent="Cookie preferences (this page only)";
  }
  pref.addEventListener("click",()=>show(true));
  panel.addEventListener("click",e=>{
    const choice=e.target.closest("[data-choice]")?.dataset.choice;
    if(choice==="custom"){custom.hidden=false;check.focus();return;}
    if(choice==="save")choose(check.checked?"allow":"reject");
    else if(choice==="allow"||choice==="reject")choose(choice);
  });
  window.addEventListener("storage",e=>{if(e.key===key||e.key===null){if(readChoice()!=="allow"){const reload=prod&&started;stop();if(reload)location.reload();}}});
  document.addEventListener("click",e=>{
    const link=e.target.closest("a[href]");
    if(!link)return;
    const href=link.getAttribute("href")||"";
    if(link.id==="email-brief"||link.id==="email-summary")once("brief_email_draft");
    else if(/^mailto:/i.test(href))once("email_click");
    else if(/^tel:/i.test(href))once("phone_click");
    else {try{const u=new URL(href,location.href);if(u.hostname==="outlook.office.com" && u.pathname.startsWith("/book/"))once("booking_click");}catch{}}
  });
  const website=document.getElementById("demo-brief"), assessment=document.getElementById("assessment");
  website?.addEventListener("input",()=>once("intake_start"));
  assessment?.addEventListener("input",()=>once("assessment_start"));
  document.addEventListener("rdc:brief-ready",()=>once("intake_complete"));
  document.addEventListener("rdc:assessment-ready",()=>once("assessment_complete"));
  for(const name of ["download-brief","download-summary"])document.getElementById(name)?.addEventListener("click",()=>once("brief_download"));
  if(readChoice()==="allow")start();
  else if(readChoice()===null)show();
  else if(globalPrivacy())stop();
})();