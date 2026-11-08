(function () {
  "use strict";
  var form = document.getElementById("website-project-intake");
  if (!form) return;
  var results = document.getElementById("intake-results");
  var summaryEl = document.getElementById("intake-summary");
  var feedback = document.getElementById("result-feedback");
  var pack = form.elements.namedItem("package");
  var requested = new URLSearchParams(window.location.search).get("package");
  var packages = {essential:"Essential",growth:"Growth",premium:"Premium",hosting:"Hosting only"};
  if (requested && Object.prototype.hasOwnProperty.call(packages, requested.toLowerCase())) {
    pack.value = packages[requested.toLowerCase()];
  }
  function value(name) {
    var element = form.elements.namedItem(name);
    return element && element.value && element.value.trim() ? element.value.trim() : "Not provided";
  }
  function selected(name) {
    var matches = Array.prototype.slice.call(form.querySelectorAll('input[name="' + name + '"]:checked'));
    return matches.length ? matches.map(function (el) { return el.value; }).join(", ") : "Not selected";
  }
  function buildSummary() {
    var lines = [
      "RDC WEBSITE LIFT — CUSTOMER DISCOVERY BRIEF",
      "Date: " + new Date().toLocaleDateString(),
      "",
      "BUSINESS & CONTACT",
      "Business: " + value("business"),
      "Contact: " + value("contact"),
      "Email: " + value("email"),
      "Phone: " + value("phone"),
      "Service area: " + value("area"),
      "Business services: " + value("services"),
      "",
      "CURRENT WEBSITE, OWNERSHIP & COST",
      "Website: " + value("site"),
      "Who built / manages it: " + value("provider"),
      "Platform: " + value("platform"),
      "Current hosting / website cost: " + value("currentcost"),
      "Additional website / marketing costs: " + value("othercost"),
      "Domain and DNS controller: " + value("domain"),
      "Administrator access: " + value("access"),
      "Current problems: " + value("problems"),
      "",
      "WHAT SUCCESS LOOKS LIKE",
      "Goals: " + selected("goals"),
      "Definition of success: " + value("success"),
      "Ideal customer: " + value("customer"),
      "Current customer acquisition: " + value("marketing"),
      "Google Business Profile: " + value("google"),
      "Inspiration / competitors: " + value("inspiration"),
      "",
      "PROJECT FIT & DELIVERY",
      "Package interest: " + value("package"),
      "Timeline: " + value("timeline"),
      "Initial budget: " + value("budget"),
      "Content / imagery: " + value("assets"),
      "Required features: " + value("features"),
      "Notes: " + value("notes"),
      "",
      "For discovery only. Project scope, timeline, deliverables, and price require a written RDC proposal."
    ];
    return lines.join("\n");
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;
    var summary = buildSummary();
    summaryEl.textContent = summary;
    var subject = encodeURIComponent("RDC website discovery — " + value("business"));
    var body = summary;
    if (body.length > 5500) {
      body = body.slice(0, 5200) + "\n\n[Long summary: email apps may truncate this draft. Please attach the downloaded full summary.]";
      feedback.textContent = "Your answers are long. Please download the full summary and attach it to your email, as some email apps limit draft length.";
    } else {
      feedback.textContent = "Please make sure to press Send in your email application.";
    }
    document.getElementById("email-summary").href =
      "mailto:dakota@royaldigitalclarity.com?subject=" + subject + "&body=" + encodeURIComponent(body);
    form.hidden = true;
    document.querySelector(".intake-help").hidden = true;
    results.classList.add("active");
    results.focus();
  });

  document.getElementById("copy-summary").addEventListener("click", async function () {
    try {
      await navigator.clipboard.writeText(summaryEl.textContent);
      feedback.textContent = "Summary copied. Paste it into an email to dakota@royaldigitalclarity.com.";
    } catch (error) {
      feedback.textContent = "Copy unavailable in this browser. Select the summary above and copy it manually.";
    }
  });
  document.getElementById("download-summary").addEventListener("click", function () {
    var blob = new Blob([summaryEl.textContent], {type:"text/plain;charset=utf-8"});
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "RDC-Website-Project-Intake.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function () { URL.revokeObjectURL(link.href); }, 1000);
    feedback.textContent = "Summary downloaded. You can attach it to an email to RDC.";
  });
  document.getElementById("edit-answers").addEventListener("click", function () {
    results.classList.remove("active");
    form.hidden = false;
    document.querySelector(".intake-help").hidden = false;
    form.scrollIntoView({behavior:"smooth",block:"start"});
    form.querySelector("input").focus({preventScroll:true});
  });
})();
