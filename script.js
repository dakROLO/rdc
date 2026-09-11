document.querySelectorAll("#year").forEach((el)=>{el.textContent=new Date().getFullYear()});

const form=document.querySelector("#assessment");
if(form){
  const steps=[...form.querySelectorAll(".form-step")];
  const back=document.querySelector("#back");
  const next=document.querySelector("#next");
  const progress=document.querySelector("#progress-bar");
  const formStatus=document.querySelector("#form-status");
  const results=document.querySelector("#results");
  let current=0;

  function showStep(index,scroll=true){
    current=index;
    steps.forEach((step,i)=>step.classList.toggle("active",i===current));
    back.hidden=current===0;
    next.textContent=current===steps.length-1?"Build my summary":"Continue";
    progress.style.width=`${((current+1)/steps.length)*100}%`;
    formStatus.textContent="";
    if(scroll) form.scrollIntoView({behavior:"smooth",block:"start"});
  }
  function validateStep(){
    const required=[...steps[current].querySelectorAll("[required]")];
    const invalid=required.find((field)=>!field.checkValidity());
    if(invalid){
      formStatus.textContent="Please complete the required fields before continuing.";
      invalid.focus();
      return false;
    }
    return true;
  }
  const values=(name)=>[...form.querySelectorAll(`[name="${name}"]:checked`)].map((el)=>el.value);
  const value=(name)=>form.elements[name]?.value.trim()||"Not provided";
  const has=(name)=>value(name)!=="Not provided";
  const score=(items)=>Math.min(5,items.filter(Boolean).length);

  function buildSummary(){
    const files=[...(form.elements.invoices.files||[])].map((file)=>file.name);
    const scores={
      systems:score([values("systems").length,has("plans"),has("spend"),has("unused"),files.length]),
      ownership:score([has("admins"),has("it"),has("website"),has("domain"),has("billing")]),
      workflow:score([has("intake"),has("scheduling"),has("handoffs"),has("duplicate"),has("truth")]),
      visibility:score([has("reporting"),has("frustration"),has("outcome"),has("deadline"),has("notes")])
    };
    Object.entries(scores).forEach(([key,val])=>{document.querySelector(`[data-score="${key}"]`).textContent=val});
    const summary=`RDC PRE-CONSULTATION INTAKE
Generated: ${new Date().toLocaleDateString()}

BUSINESS
Business: ${value("business")}
Contact: ${value("name")} · ${value("email")}
Industry: ${value("industry")}
System users: ${value("employees")}
Locations / remote teams: ${value("locations")}
Work delivered: ${value("work")}

SYSTEMS AND COST
Systems in use: ${values("systems").join(", ")||"Not provided"}
Plans / licenses: ${value("plans")}
Estimated monthly spend: ${value("spend")}
Possibly unused features: ${value("unused")}
Invoice filenames: ${files.join(", ")||"None selected"}

OWNERSHIP AND RISK
Platform administrator: ${value("admins")}
IT support: ${value("it")}
Website owner / platform: ${value("website")}
Domain / DNS owner: ${value("domain")}
Billing / renewals owner: ${value("billing")}
Former employee or vendor access: ${value("departed")}
Known concerns: ${values("risks").join(", ")||"None selected"}

WORKFLOW
New-work intake: ${value("intake")}
Assignment / scheduling: ${value("scheduling")}
Fragile handoffs: ${value("handoffs")}
Duplicate entry: ${value("duplicate")}
Current source of truth: ${value("truth")}
Visibility / reporting gap: ${value("reporting")}

PRIORITY
Biggest frustration: ${value("frustration")}
Required 90-day outcome: ${value("outcome")}
Deadline / trigger: ${value("deadline")}
Investment range: ${value("budget")}
Other notes: ${value("notes")}

DIRECTIONAL CLARITY SCORES
Systems ${scores.systems}/5 · Workflow ${scores.workflow}/5 · Ownership ${scores.ownership}/5 · Visibility ${scores.visibility}/5

Note: This intake is a conversation starter, not an audit or security certification.`;
    document.querySelector("#summary").textContent=summary;
    form.hidden=true;
    document.querySelector(".aside-card").hidden=true;
    results.classList.add("active");
    results.scrollIntoView({behavior:"smooth",block:"start"});
    const subject=encodeURIComponent(`RDC intake — ${value("business")}`);
    const body=encodeURIComponent(summary.slice(0,7000));
    document.querySelector("#email-summary").href=`mailto:dakota@royaldigitalclarity.com?subject=${subject}&body=${body}`;
  }
  next.addEventListener("click",()=>{if(!validateStep())return;if(current<steps.length-1)showStep(current+1);else buildSummary()});
  back.addEventListener("click",()=>showStep(Math.max(0,current-1)));
  document.querySelector("#copy-summary").addEventListener("click",async()=>{
    try{await navigator.clipboard.writeText(document.querySelector("#summary").textContent);document.querySelector("#result-status").textContent="Summary copied."}
    catch{document.querySelector("#result-status").textContent="Copy was blocked. Select the summary text and copy it manually."}
  });
  document.querySelector("#download-summary").addEventListener("click",()=>{
    const blob=new Blob([document.querySelector("#summary").textContent],{type:"text/plain"});
    const link=document.createElement("a");link.href=URL.createObjectURL(blob);link.download="RDC-operational-clarity-intake.txt";link.click();URL.revokeObjectURL(link.href);
  });
  document.querySelector("#edit-answers").addEventListener("click",()=>{results.classList.remove("active");form.hidden=false;document.querySelector(".aside-card").hidden=false;showStep(0)});
  showStep(0,false);
}
