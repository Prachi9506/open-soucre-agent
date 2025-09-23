async function getRecommendations() {
    const skillsInput = document.getElementById("skills").value;
    const skills = skillsInput.split(",").map(s => s.trim()).filter(s => s);

    if (skills.length === 0) {
        alert("Please enter at least one skill!");
        return;
    }

    const res = await fetch("http://127.0.0.1:5000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: skills })
    });

    const data = await res.json();
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    for (const skill in data) {
        const section = document.createElement("div");
        section.innerHTML = `<h2>🔧 ${skill}</h2>`;
        data[skill].forEach(repo => {
            section.innerHTML += `
            <div class="repo-card">
              <strong>${repo.name}</strong><br>
              ⭐ Stars: ${repo.stars} | 🟢 Issues: ${repo.issues} | 📅 Updated: ${repo.updated}<br>
              <a href="${repo.link}" target="_blank">View Repo</a>
            </div>`;
        });
        resultsDiv.appendChild(section);
    }
}