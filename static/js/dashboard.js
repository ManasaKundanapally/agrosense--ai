document.addEventListener("DOMContentLoaded", () => {
    console.log("dashboard.js loaded");

    const btn = document.getElementById("recommendBtn");

    btn.addEventListener("click", async () => {
        console.log("Button clicked");

        const season = document.getElementById("season").value;
        const soilType = document.getElementById("soilType").value;
        const temperature = document.getElementById("temperature").value;

        if (!season || !soilType || !temperature) {
            alert("Please fill all fields");
            return;
        }

        try {
            const response = await fetch("/recommend", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    season,
                    soilType,
                    temperature
                })
            });

            const data = await response.json();

            // SAFE rendering (no join crash)
            document.getElementById("results").innerText =
                data.crops.join(", ");

            document.getElementById("soilIssues").innerText =
                data.soilIssues;

            document.getElementById("soilTips").innerText =
                data.soilTips;

        } catch (error) {
            console.error(error);
            alert("Server error. Try again.");
        }
    });
});