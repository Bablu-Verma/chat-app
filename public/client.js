const socket = io();
let userName;
let textarea = document.getElementById("textarea");
let messagearea = document.getElementById("message_area");
let user_id = document.getElementById("user_id");
let message_error = document.getElementById("message_error");

let error_code = "Please Enter Message";

do {
  userName = prompt("Please Enter Your Name:");
  //   console.log(userName);
  user_id.innerText = userName;
  document.title = `WeChat - ${userName}`;
} while (!userName);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    // validate input
    if (textarea.value.length == 0) {
      message_error.innerText = error_code;
    } else {
      message_error.innerText = "";
      sendMessage(e.target.value);
      e.target.value = "";
    }
  }
});

const send_message = () => {
  // validate input
  if (textarea.value.length == 0) {
    message_error.innerText = error_code;
  } else {
    message_error.innerText = "";
    sendMessage(textarea.value);
    textarea.value = "";
  }
};

const sendMessage = (message) => {
  let msg = {
    user: userName,
    message: message.trim(),
  };

  appendMessage(msg, "outgoing");
  //  send message in server
  socket.emit("message", msg);

  scrollToBottom();
};

// code function
function codeFun(msg) {
  let textMessage;
  const words = msg.message.split(" ");
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const first = word.slice(0, 2);
    const last = word.slice(2, word.length);
    const randomLetters = generateRandomLetters();
    textMessage += last + randomLetters + first + " ";
  }
}

// generateRandomLetters
function generateRandomLetters() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let randomLetters = "";
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    const randomLetter = alphabet[randomIndex];
    randomLetters += randomLetter;
  }
  return randomLetters;
}

const appendMessage = (msg, type) => {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");
  let markup = `
  <div class="inner_box inner_box_${className}">
  <h4>${msg.user}</h4>
  <p>${msg.message}</p>
  </div>
  `;
  mainDiv.innerHTML = markup;
  messagearea.appendChild(mainDiv);
};

// reseve message

socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  //   console.log(msg);
  scrollToBottom();
});

function scrollToBottom() {
  messagearea.scrollTop = messagearea.scrollHeight;
}
