const { Chat } = require("../model/chat");

const errorAlert = (error) => {
  let errors = { username: "", date: "", message: "" };

  if (error.message.includes("Chat validation failed")) {
    Object.values(error.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

exports.createChat = async (req, res) => {
  const chat = new Chat(req.body);
  try {
    const doc = await chat.save();
    res.status(200).json(doc);
  } catch (error) {
    let errors = errorAlert(error);
    res.status(400).json({ errors });
  }
};

exports.fetchChats = async (req, res) => {
  try {
    const chats = await Chat.find({}).exec();
    res.status(200).json(chats);
  } catch (error) {
    res.status(400).json(error);
  }
};
