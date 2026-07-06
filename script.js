
const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

const API_URL = "https://sj-ai-api.sharan-k-jayan-78.workers.dev";

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

async function sendMessage() {
  const message = input.value.trim();

  if (!message) return;

  chatBox.innerHTML += `
    <div class="user-message">${message}</div>
  `;

  input.value = "";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: message
      })
    });

    const data = await response.json();

    chatBox.innerHTML += `
      <div class="ai-message">${data.reply || data.message || "No reply"}</div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (err) {
    chatBox.innerHTML += `
      <div class="ai-message">❌ ${err.message}</div>
    `;
  }
  }
