document.addEventListener("DOMContentLoaded", () => {
  console.log("dashboard.js loaded");

  const btn = document.getElementById("recommendBtn");

  btn.addEventListener("click", async () => {
    console.log("Button clicked");

    const soilType = document.getElementById("soilType").value;
    const temperature = document.getElementById("temperature").value;

    try {
      const response = await fetch("/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          soilType: soilType,
          temperature: temperature
        })
      });

      const data = await response.json();
      console.log("Response:", data);

      document.getElementById("results").innerText = data.crops;
      document.getElementById("soilIssues").innerText = data.soil_issues;
      document.getElementById("soilTips").innerText = data.soil_tips;

    } catch (err) {
      console.error(err);
      document.getElementById("results").innerText = "Error fetching data";
    }
  });
});