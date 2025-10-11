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






async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatbox = document.getElementById("chatbox");
  const userText = input.value.trim();

  if (!userText) return;

  // Add user message
  const userMsgDiv = document.createElement("div");
  userMsgDiv.className = "user-message";
  userMsgDiv.innerText = userText;
  chatbox.appendChild(userMsgDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
  input.value = "";

  // Simulate thinking
  const botMsgDiv = document.createElement("div");
  botMsgDiv.className = "bot-message";
  botMsgDiv.innerText = "Thinking...";
  chatbox.appendChild(botMsgDiv);
  chatbox.scrollTop = chatbox.scrollHeight;

  // Process chatbot logic
  let response = "";

  // If the message contains skills, call your recommendation API
  if (userText.toLowerCase().includes("python") || userText.toLowerCase().includes("java") || userText.toLowerCase().includes("c++")) {
    response = "Got it! Fetching project recommendations...";
    botMsgDiv.innerText = response;

    // Extract skills
    const skills = userText.split(",").map(s => s.trim());

    const res = await fetch("/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skills })
    });

    const data = await res.json();

    let reply = "";
    for (const skill in data) {
      reply += `\n\n🔧 *${skill}* Projects:\n`;
      data[skill].slice(0, 3).forEach(repo => {
        reply += `- ${repo.name} (${repo.stars}⭐) → ${repo.link}\n`;
      });
    }

    botMsgDiv.innerText = reply || "Sorry, I couldn’t find any projects right now.";
  } else {
    // General responses
    const responses = [
      "Try telling me your skills like 'Python, React, JavaScript'.",
      "I can help you find open-source projects to contribute to!",
      "Just type your tech stack and I’ll suggest repositories for you. 🚀"
    ];
    response = responses[Math.floor(Math.random() * responses.length)];
    botMsgDiv.innerText = response;
  }

  chatbox.scrollTop = chatbox.scrollHeight;
}
