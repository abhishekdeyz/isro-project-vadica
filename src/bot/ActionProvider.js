import httpService from "../apiServices/httpService";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, mode) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.mode = mode;

    this.typingInterval = null;
  }

  startTypingIndicator = () => {
    const loadingMessageId = Math.random().toString(36).substring(7);
    let dotCount = 1;

    const message = this.createChatBotMessage(".");

    message.id = loadingMessageId;

    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));

    this.typingInterval = setInterval(() => {
      dotCount = (dotCount % 3) + 1;
      const dots = ".".repeat(dotCount);

      this.setState((prev) => ({
        ...prev,
        messages: prev.messages.map((msg) =>
          msg.id === loadingMessageId ? { ...msg, message: dots } : msg
        ),
      }));
    }, 500);

    return loadingMessageId;
  };

  stopTypingIndicator = (loadingMessageId, finalMessage) => {
    clearInterval(this.typingInterval);

    this.setState((prev) => ({
      ...prev,
      messages: prev.messages.map((msg) =>
        msg.id === loadingMessageId ? finalMessage : msg
      ),
    }));
  };

  handleMessage = async (message) => {
    const loadingMessageId = this.startTypingIndicator();

    try {
      const res = await httpService.post("/vadica/chat", {
        message,
        mode: this.mode,
      });

      const botMessage = this.createChatBotMessage(res.data.reply);
      this.stopTypingIndicator(loadingMessageId, botMessage);
    } catch (error) {
      const errorMsg = this.createChatBotMessage("Oops, something went wrong.");
      this.stopTypingIndicator(loadingMessageId, errorMsg);
    }
  };
}

export default ActionProvider;
