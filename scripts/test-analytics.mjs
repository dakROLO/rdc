import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import vm from "node:vm";
const source=readFileSync(new URL("../analytics.js",import.meta.url),"utf8");
class Element {
  constructor(){this.handlers={};this.children=[];this.selectors=new Map();this.hidden=false;}
  addEventListener(n,fn){(this.handlers[n]??=[]).push(fn);}
  fire(n,e={}){for(const fn of this.handlers[n]||[])fn(e);}
  append(x){this.children.push(x);}
  remove(){this.removed=true;}
  focus(){}
  setAttribute(){}
  querySelector(s){if(!this.selectors.has(s))this.selectors.set(s,new Element());return this.selectors.get(s);}
}
function fixture({mode="G-V41994JW12",host="royaldigitalclarity.com",path="/",query="",hash="",gpc=false,choice=null,blockedStorage=false,referrer=""}={}){
 const doc=new Element(),win=new Element(),storage=new Map(),events=[];
 doc.head=new Element();doc.body=new Element();doc.footer=new Element();doc.title="RDC";doc.cookie="";doc.referrer=referrer;
 doc.querySelector=s=>s==="footer"?doc.footer:s==='meta[name="rdc-analytics"]'?{content:mode}:null;
 doc.createElement=()=>new Element();
 doc.getElementById=id=>doc.selectors.has(id)?doc.selectors.get(id):null;
 for(const id of ["demo-brief","assessment","download-brief","download-summary"])doc.selectors.set(id,new Element());
 doc.dispatchEvent=e=>{events.push(e);doc.fire(e.type,e);};
 const key="rdc-analytics-preference-v1";
 if(choice)storage.set(key,JSON.stringify({choice,until:Date.now()+10000}));
 const location={protocol:"https:",hostname:host,pathname:path,search:query,hash,origin:"https://"+host,href:"https://"+host+path+query+hash,reloads:0,reload(){this.reloads++;}};
 const localStorage={getItem:k=>{if(blockedStorage)throw Error();return storage.get(k)||null;},setItem:(k,v)=>{if(blockedStorage)throw Error();storage.set(k,v);}};
 class CustomEvent{constructor(type,opts={}){this.type=type;this.detail=opts.detail;}}
 vm.runInNewContext(source,{document:doc,window:win,location,localStorage,navigator:{globalPrivacyControl:gpc},URL,URLSearchParams,CustomEvent,Date});
 const panel=doc.body.children[0];
 const choose=choice=>panel.fire("click",{target:{closest:()=>({dataset:{choice}})}});
 const payloads=()=>Array.from(win.dataLayer||[],v=>Array.from(v));
 return {doc,win,location,panel,choose,payloads,events,storage};
}
const first=fixture();
assert.equal(first.doc.head.children.length,0);
assert.equal(first.panel.hidden,false);
assert(first.panel.innerHTML.includes('data-choice="allow">Accept analytics</button><button type="button" data-choice="reject">Reject optional'));
first.choose("reject");
assert.equal(first.doc.head.children.length,0);
assert.equal(first.panel.hidden,true);
assert.equal(fixture({choice:"reject"}).doc.head.children.length,0);
const yes=fixture({path:"/website-intake.html",query:"?package=growth",referrer:"https://www.google.com/search?q=secret"});
yes.choose("allow");
assert.equal(yes.doc.head.children.length,1);
assert.match(yes.doc.head.children[0].src,/G-V41994JW12$/);
let p=yes.payloads();
assert.equal(p[0][0],"consent");assert.equal(p[0][2].analytics_storage,"denied");
assert.equal(p[1][2].analytics_storage,"granted");assert.equal(p[1][2].ad_user_data,"denied");
assert.equal(p[1][2].ad_personalization,"denied");
yes.doc.getElementById("demo-brief").fire("input",{target:{value:"private@example.com"}});
yes.doc.dispatchEvent({type:"rdc:brief-ready",detail:{name:"private@example.com"}});
yes.doc.dispatchEvent({type:"rdc:brief-ready"});
p=yes.payloads();const names=p.filter(x=>x[0]==="event").map(x=>x[1]);
assert.deepEqual(names,["page_view","intake_start","intake_complete"]);
assert(!JSON.stringify(p).includes("private@example.com"));assert(!JSON.stringify(p).includes("package=growth"));
assert(!JSON.stringify(p).includes("q=secret"));assert(JSON.stringify(p).includes("https://www.google.com/"));
yes.choose("reject");
assert.equal(yes.win["ga-disable-G-V41994JW12"],true);
assert.equal(yes.location.reloads,1);
assert.equal(yes.doc.head.children[0].removed,true);
assert.equal(fixture({gpc:true,choice:"allow"}).doc.head.children.length,0);
assert.equal(fixture({choice:"allow",query:"?email=private@example.com"}).doc.head.children.length,0);
assert.equal(fixture({choice:"allow",hash:"#private"}).doc.head.children.length,0);
assert.equal(fixture({choice:"allow",path:"/portal/"}).panel,undefined);
assert.equal(fixture({choice:"allow",host:"test.royaldigitalclarity.com"}).panel,undefined);
const test=fixture({mode:"test",host:"test.royaldigitalclarity.com"});
test.choose("allow");assert.equal(test.doc.head.children.length,0);assert.equal(test.events[0].detail.event,"page_view");
test.choose("reject");test.doc.dispatchEvent({type:"rdc:brief-ready"});assert.equal(test.events.filter(x=>x.type==="rdc:analytics-test").length,1);
test.choose("allow");test.doc.dispatchEvent({type:"rdc:brief-ready"});assert.equal(test.events.filter(x=>x.type==="rdc:analytics-test").length,2);
const unavailable=fixture({blockedStorage:true});unavailable.choose("reject");assert.equal(unavailable.doc.head.children.length,0);
console.log("Analytics consent/event unit tests passed (mock DOM; no network).");
