console.log("dashboard.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("recommendBtn");

  if (!button) {
    console.error("Button not found");
    return;
  }

  button.addEventListener("click", async () => {
    console.log("Button clicked");

    const soilType = document.getElementById("soilType");
    const temperature = document.getElementById("temperature");

    if (!soilType || !temperature) {
      console.error("Input elements missing");
      return;
    }

    const data = {
      soilType: soilType.value,
      temperature: temperature.value
    };

    console.log("Sending data:", data);

    try {
      const res = await fetch("/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      document.getElementById("results").innerText =
        result.crops || "No crop data";

      document.getElementById("soilIssues").innerText =
        result.soilIssues || "";

      document.getElementById("soilTips").innerText =
        result.soilTips || "";

    } catch (err) {
      console.error("Fetch failed", err);
    }
  });
});