from flask import Flask, jsonify, request
from dotenv import load_dotenv
import os

# Load environment variables (if you’ll use API keys later)
load_dotenv()

app = Flask(__name__)

# --- Example route ---
@app.route("/")
def home():
    return jsonify({"message": "Kaizen backend is running!"})

# --- Example API endpoint ---
@app.route("/api/trade", methods=["POST"])
def trade():
    data = request.json
    return jsonify({
        "status": "success",
        "action": data.get("action"),
        "symbol": data.get("symbol"),
        "mode": data.get("mode", "mock")
    })

if __name__ == "__main__":
    app.run(debug=True)