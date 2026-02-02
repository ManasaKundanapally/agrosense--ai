from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

def load_json(path):
    with open(path, "r") as f:
        return json.load(f)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/recommend", methods=["POST"])
def recommend():
    try:
        user_data = request.get_json()

        season = user_data.get("season")
        soil = user_data.get("soil")
        temperature = int(user_data.get("temperature", 0))

        crops = load_json("data/crops.json")
        results = []

        for crop in crops:
            score = 0

            if crop["season"] == season:
                score += 30

            if soil in crop["soil"]:
                score += 30

            if crop["temp_min"] <= temperature <= crop["temp_max"]:
                score += 40

            if score > 0:
                results.append({
                    "crop": crop["name"],
                    "score": score
                })

        results = sorted(results, key=lambda x: x["score"], reverse=True)
        return jsonify(results[:3])

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/soil-info", methods=["POST"])
def soil_info():
    data = request.get_json()
    soil = data.get("soil")

    soil_data = load_json("data/soil.json")

    info = soil_data.get(soil, {
        "issues": "No data available",
        "tips": "No tips available"
    })

    return jsonify(info)


if __name__ == "__main__":
    app.run(debug=True)
