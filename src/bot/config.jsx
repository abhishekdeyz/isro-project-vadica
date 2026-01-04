import { createChatBotMessage } from "react-chatbot-kit";

// Custom Bot Avatar Component
const CustomBotAvatar = () => {
  return (
    <div
      className="react-chatbot-kit-chat-bot-avatar-container"
      style={avatarContainerStyle}
    >
      <div style={avatarLetterStyle}>V</div>
    </div>
  );
};

const CustomUserAvatar = () => {
  return (
    <div
      className="react-chatbot-kit-chat-user-avatar-container ml-4"
      style={userAvatarContainerStyle}
    >
      <div style={userAvatarLetterStyle}>U</div>
    </div>
  );
};

const avatarContainerStyle = {
  backgroundColor: "#212121",
  width: "40px",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const userAvatarContainerStyle = {
  backgroundColor: "#424242", 
  width: "40px",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
};

// Common letter styles
const avatarLetterStyle = {
  color: "#fff",
  fontWeight: "bold",
  fontSize: "20px",
};

const userAvatarLetterStyle = {
  color: "#fff",
  fontWeight: "bold",
  fontSize: "20px",
};

const botName = "Vadica";

// Chatbot config
const config = {
  botName,
  initialMessages: [
    createChatBotMessage(`Hi! I'm ${botName}. How can I help you today?`),
  ],
  customComponents: {
    botAvatar: (props) => <CustomBotAvatar {...props} />,
    userAvatar: (props) => <CustomUserAvatar {...props} />,
  },
  customStyles: {
    botMessageBox: {
      backgroundColor: "#212121",
      color: "#ffffff",
    },
    chatButton: {
      backgroundColor: "#212121",
      color: "#ffffff",
    },
    userMessageBox: {
      backgroundColor: "#424242",
      color: "#000000",
    },
  },
};

export default config;
