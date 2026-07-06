
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

    if (!response.ok) {
  throw new Error(`Server Error: ${response.status}`);
}

const data = await response.json();

const reply =
  data.reply ||
  data.message ||
  "No response from AI.";

chatBox.innerHTML += `
  <div class="ai-message">${reply}</div>
`;

chatBox.scrollTop = chatBox.scrollHeight;

    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (err) {
    chatBox.innerHTML += `
      <div class="ai-message">❌ ${err.message}</div>
    `;
  }
  }
