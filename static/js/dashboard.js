const btn = document.getElementById("recommendBtn");

btn.addEventListener("click", async () => {
    const season = document.getElementById("season").value;
    const soil = document.getElementById("soil").value;
    const temperature = document.getElementById("temperature").value;

    const resultsDiv = document.getElementById("results");
    const soilIssues = document.getElementById("soilIssues");
    const soilTips = document.getElementById("soilTips");

    resultsDiv.innerHTML = "<p>Analyzing conditions...</p>";
    soilIssues.innerHTML = "";
    soilTips.innerHTML = "";

    if (temperature === "") {
        resultsDiv.innerHTML = "<p>Please enter temperature</p>";
        return;
    }

    try {
        const response = await fetch("/recommend", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                season: season,
                soil: soil,
                temperature: Number(temperature)
            })
        });

        const data = await response.json();
        resultsDiv.innerHTML = "";

        if (data.length === 0) {
            resultsDiv.innerHTML = "<p>No suitable crops found</p>";
            return;
        }

        data.forEach(item => {
            const card = document.createElement("div");
            card.className = "result-item";

            card.innerHTML = `
                <div class="result-title">
                    ${item.crop} — ${item.score}%
                </div>
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
            `;

            resultsDiv.appendChild(card);

            const fill = card.querySelector(".progress-fill");
            requestAnimationFrame(() => {
                fill.style.width = item.score + "%";
            });
        });

        // Soil insights
        const soilResponse = await fetch("/soil-info", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ soil: soil })
        });

        const soilData = await soilResponse.json();
        soilIssues.innerText = "⚠️ Issues: " + soilData.issues;
        soilTips.innerText = "✅ Tips: " + soilData.tips;

    } catch (err) {
        resultsDiv.innerHTML = "<p>Error fetching data</p>";
        console.error(err);
    }
});