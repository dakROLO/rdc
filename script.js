const WORKDAYS_PER_YEAR = 250;

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

function clampNumber(value, min, max, fallback) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(Math.max(parsed, min), max);
}

function updateWorkflowEstimate() {
  const peopleInput = document.getElementById("people");
  const minutesInput = document.getElementById("minutes");
  const hourlyRateInput = document.getElementById("hourly-rate");
  const result = document.getElementById("annual-cost");
  const hoursResult = document.getElementById("annual-hours");

  if (!peopleInput || !minutesInput || !hourlyRateInput || !result || !hoursResult) return;

  const people = clampNumber(peopleInput.value, 1, 5000, 10);
  const minutes = clampNumber(minutesInput.value, 1, 480, 15);
  const hourlyRate = clampNumber(hourlyRateInput.value, 1, 1000, 40);

  const annualHours = people * (minutes / 60) * WORKDAYS_PER_YEAR;
  const annualCost = annualHours * hourlyRate;

  result.textContent = moneyFormatter.format(annualCost);
  hoursResult.textContent = `${Math.round(annualHours).toLocaleString("en-US")} hours`;
}

function initializeCalculator() {
  const calculator = document.getElementById("workflow-calculator");
  if (!calculator) return;

  calculator.addEventListener("input", updateWorkflowEstimate);
  updateWorkflowEstimate();
}

function initializeYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
}

initializeCalculator();
initializeYear();
