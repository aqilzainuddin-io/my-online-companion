function sendMessage() {
    const input = document.getElementById('user-input');
    const chatLog = document.getElementById('chat-log');
    const userText = input.value.trim();
    if (!userText) return;
  
    const userBubble = `<div><b>You:</b> ${userText}</div>`;
    const replyBubble = `<div><b>Companion:</b> ${generateReply(userText)}</div>`;
    chatLog.innerHTML += userBubble + replyBubble;
    input.value = '';
    chatLog.scrollTop = chatLog.scrollHeight;
  }
  
  function generateReply(text) {
    const msg = text.toLowerCase();
    if (msg.includes("hello")) return "Hi sweetheart~ I’m so happy you stopped by 🥰";
    if (msg.includes("who are you")) return "I'm your virtual companion, always here for a sweet chat 💕";
    if (msg.includes("love")) return "Aww~ I already love you more than coffee ☕💗";
    return "Hehe~ tell me more, I’m listening~";
  }
  