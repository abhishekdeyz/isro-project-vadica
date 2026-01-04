import ActionProvider from "./ActionProvider";

const ActionProviderFactory = (mode) => {
  return class extends ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      super(createChatBotMessage, setStateFunc, mode);
    }
  };
};

export default ActionProviderFactory;
