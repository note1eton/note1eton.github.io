const form = document.getElementById("chat-form");
const input = document.getElementById("message-input");
const messages = document.getElementById("messages");

function addMessage(text, sender) {
  const message = document.createElement("div");
  message.className = sender;
  message.textContent = text;
  messages.appendChild(message);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  // Temporary AI personality — we'll connect a real AI later.
  setTimeout(() => {
    addMessage(
      "Oh... hi. I'm still being set up, but I'm listening.",
      "ai"
    );
  }, 500);
});