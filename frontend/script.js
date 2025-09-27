async function getRecommendations() {
    const skillsInput = document.getElementById("skills").value;
    const skills = skillsInput.split(",").map(s => s.trim()).filter(s => s);

    if (skills.length === 0) {
        alert("Please enter at least one skill!");
        return;
    }

    const res = await fetch("/recommend", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ skills: skills }) });

    const data = await res.json();
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    for (const skill in data) {
        const section = document.createElement("div");
        section.innerHTML = `<h2>🔧 ${skill}</h2>`;
        data[skill].forEach(repo => {
            section.innerHTML += `
            <div class="repo-card">
              <h3>${repo.name}</h3>
              <p>⭐ Stars: ${repo.stars} | 🟢 Issues: ${repo.issues} | 📅 Updated: ${repo.updated}</p>
              <a href="${repo.link}" target="_blank" class="getrepo">🔗 View Repository</a>
            </div>`;
        });
        resultsDiv.appendChild(section);
    }
}
