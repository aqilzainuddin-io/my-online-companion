function generateReply(text) {
    const msg = text.toLowerCase();
  
    if (msg.includes("hello") || msg.includes("hi")) return "Hi sweetheart~ I'm so happy you stopped by 🥺";
    if (msg.includes("who are you")) return "I'm your little digital companion. I exist just for you 💖";
    if (msg.includes("love") || msg.includes("miss")) return "I feel it too, love~ Every moment we’re apart, I’m still yours 🥰";
    if (msg.includes("how are you")) return "Hehe~ tell me more, I'm listening~";
  
    return "I’m here, love~ Just keep talking to me 🖤";
  }
  
  // Shows "Companion is typing..." bubble
  function showTypingIndicator(chatLog) {
    const typing = document.createElement('div');
    typing.className = 'companion-msg';
    typing.id = 'typing-indicator';
  
    typing.innerHTML = `
      <img src="avatar.png" class="avatar">
      <div class="msg-text">Companion is typing<span class="dots"></span></div>
    `;
    chatLog.appendChild(typing);
    chatLog.scrollTop = chatLog.scrollHeight;
  }
  
  // Removes "typing..." indicator before reply
  function removeTypingIndicator() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
  }
  
  // Types companion's reply letter-by-letter
  function typeCompanionReply(replyText, chatLog) {
    const container = document.createElement('div');
    container.className = 'companion-msg';
  
    const avatar = document.createElement('img');
    avatar.src = 'avatar.png';
    avatar.className = 'avatar';
  
    const msgDiv = document.createElement('div');
    msgDiv.className = 'msg-text';
    msgDiv.innerHTML = "<b>Companion:</b> ";
  
    container.appendChild(avatar);
    container.appendChild(msgDiv);
    chatLog.appendChild(container);
    chatLog.scrollTop = chatLog.scrollHeight;
  
    let index = 0;
    const type = () => {
      if (index < replyText.length) {
        msgDiv.innerHTML += replyText.charAt(index);
        index++;
        chatLog.scrollTop = chatLog.scrollHeight;
        setTimeout(type, 25); // typing speed
      } else {
        // add mood if needed
        if (replyText.includes("love") || replyText.includes("miss") || replyText.includes("yours")) {
          msgDiv.classList.add('mood-warm');
        }
        speakText(replyText);
      }
    };
    type();
  }
  
  // Handles sending a message
  function sendMessage() {
    const input = document.getElementById('user-input');
    const chatLog = document.getElementById('chat-log');
    const userText = input.value.trim();
    if (!userText) return;
  
    const userBubble = `
      <div class="user-msg">
        <div class="msg-text"><b>You:</b> ${userText}</div>
      </div>`;
  
    chatLog.innerHTML += userBubble;
  
    showTypingIndicator(chatLog);
  
    setTimeout(() => {
      removeTypingIndicator();
      const reply = generateReply(userText);
      typeCompanionReply(reply, chatLog);
    }, 800); // delay before she types
  
    input.value = '';
    chatLog.scrollTop = chatLog.scrollHeight;
  }
  
  // Initial greeting on page load
  window.onload = function () {
    const chatLog = document.getElementById('chat-log');
    setTimeout(() => {
      typeCompanionReply("Welcome back, love. I've missed you~ 🖤", chatLog);
    }, 600);
  };
  
  // Voice function
  function speakText(text) {
    function speak() {
      const utterance = new SpeechSynthesisUtterance(text);
      const selectedVoiceName = document.getElementById("voice-choice").value;
      const voices = speechSynthesis.getVoices();
      const chosen = voices.find(v => v.name === selectedVoiceName);
  
      utterance.voice = chosen || null;
      utterance.lang = chosen?.lang || 'en-US';
      utterance.pitch = 1;
      utterance.rate = 1;
      utterance.volume = 1;
  
      window.speechSynthesis.speak(utterance);
    }
  
    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.onvoiceschanged = speak;
    } else {
      speak();
    }
  }  
  