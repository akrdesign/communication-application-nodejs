const { User } = require("../model/user");

exports.fetchUsers = async (req, res) => {
  try {
    const users = await User.find({}).exec();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.fetchUserById = async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};
