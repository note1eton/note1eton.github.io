const form = document.getElementById("chat-form");
const input = document.getElementById("message-input");
const messages = document.getElementById("messages");

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

  addMessage("Thinking...", "ai");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: text
      })
    });

    const data = await response.json();

    // Remove "Thinking..."
    messages.lastChild.remove();

    addMessage(data.reply, "ai");

  } catch (error) {
    messages.lastChild.remove();
    addMessage("Sorry, something went wrong.", "ai");
  }
});