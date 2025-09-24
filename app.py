from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
headers = {"Authorization": f"token {GITHUB_TOKEN}"} if GITHUB_TOKEN else {}

def search_repos(skill):
    url = f"https://api.github.com/search/repositories?q=language:{skill}+good-first-issues:>1&sort=stars&order=desc&per_page=3"
    response = requests.get(url, headers=headers)
    data = response.json()
    results = []

    if "items" not in data:
        return results

    for repo in data["items"]:
        results.append({
            "name": repo["full_name"],
            "link": repo["html_url"],
            "stars": repo["stargazers_count"],
            "issues": repo["open_issues_count"],
            "updated": repo["updated_at"][:10]
        })
    return results

@app.route("/")
def home():
    return {"message": "Backend is running! Use /recommend endpoint"}

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.json
    skills = data.get("skills", [])
    results = {}
    for skill in skills:
        repos = search_repos(skill)
        results[skill] = repos
    return jsonify(results)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
