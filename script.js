const form = document.getElementById("chat-form");
const input = document.getElementById("message-input");
const messages = document.getElementById("messages");

const AI_URL = "https://dawn-scene-64ea.ebennanik.workers.dev/";

function addMessage(text, sender) {
  const message = document.createElement("div");
  message.className = sender;
  message.textContent = text;
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  const thinking = document.createElement("div");
  thinking.className = "ai";
  thinking.textContent = "Thinking...";
  messages.appendChild(thinking);

  try {
    const response = await fetch(AI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: text
      })
    });

    const data = await response.json();

    thinking.remove();

    if (!response.ok) {
      throw new Error(data.error || "Request failed");
    }

    addMessage(data.reply, "ai");

 } catch (error) {
  thinking.remove();
  addMessage(
    "Connection error: " + error.message,
    "ai"
  );
  console.error(error);
}
});