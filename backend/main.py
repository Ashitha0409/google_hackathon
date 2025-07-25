import time
import firebase_admin
from firebase_admin import credentials, db
import google.generativeai as genai
import os
from datetime import datetime, timezone

# �� ENVIRONMENT CONFIG
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = r"D:\hackthon\drishti\backend\vertex-service-account.json"

# 🔧 CONFIG
FIREBASE_PATH = "anomalies/test1"
SUMMARY_PATH = "summaries/current"

# Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "AIzaSyCM7_pdh31kb7V8Swot8A_4TvEXxoXReKI")

# Initialize Gemini
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")

# Setup Firebase (avoid re-init if already initialized)
if not firebase_admin._apps:
    cred = credentials.Certificate("firebase-key.json")
    firebase_admin.initialize_app(cred, {
        "databaseURL": "https://drishti2-5022b-default-rtdb.firebaseio.com/"
    })

def summarize_all_anomalies(data):
    if not data:
        return "No anomalies found."
    prompt = "Summarize these anomaly records for emergency monitoring:\n\n"
    if isinstance(data, dict) and all(isinstance(v, dict) for v in data.values()):
        for key, anomaly in data.items():
            prompt += (
                f"- [{key}] {anomaly.get('type')} in {anomaly.get('zone')} "
                f"| Severity: {anomaly.get('severity')} | Source: {anomaly.get('source')} "
                f"| Time: {anomaly.get('timestamp')}\n"
            )
    elif isinstance(data, dict):
        prompt += (
            f"- [update] {data.get('type')} in {data.get('zone')} "
            f"| Severity: {data.get('severity')} | Source: {data.get('source')} "
            f"| Time: {data.get('timestamp')}\n"
        )
    else:
        return "Invalid data format."
    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print("❌ Gemini error:", e)
        return "Summary generation failed."

def get_data():
    return db.reference(FIREBASE_PATH).get()

def write_summary(summary, data):
    # Extract fields for insights
    if isinstance(data, dict):
        if all(isinstance(v, dict) for v in data.values()):
            # Take the first anomaly for insights (customize as needed)
            first = next(iter(data.values()))
        else:
            first = data
        severity = first.get('severity', '')
        zone = first.get('zone', '')
        source = first.get('source', '')
        # Recommendations based on severity
        if severity.lower() == "high":
            recommendations_list = [
                "Take immediate action",
                "Alert emergency response teams",
                "Initiate evacuation protocol"
            ]
        elif severity.lower() == "medium":
            recommendations_list = [
                "Increase monitoring frequency",
                "Prepare emergency teams"
            ]
        else:
            recommendations_list = [
                "Continue regular monitoring",
                "Report any changes"
            ]
    else:
        severity = zone = source = ''
        recommendations_list = []
    db.reference(SUMMARY_PATH).set({
        "summary": summary,
        "insights": [
            f"Severity: {severity}",
            f"Zone: {zone}",
            f"Source: {source}",
        ],
        "recommendations": recommendations_list,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    })

def main_loop():
    last_data = None
    while True:
        current_data = get_data()
        if current_data != last_data:
            print("🔔 Change detected in Firebase!")
            summary = summarize_all_anomalies(current_data)
            print("📋 Summary:", summary)
            write_summary(summary, current_data)
            last_data = current_data
        else:
            print("⏳ No change in Firebase data.")
        time.sleep(5)  # Check every 5 seconds

if __name__ == "__main__":
    main_loop()
