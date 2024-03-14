const { SharedUpload } = require("../model/sharedUpload");

exports.fetchSharedUploads = async (req, res) => {
  try {
    const uploads = await SharedUpload.find({}).exec();
    res.status(200).json(uploads);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.fetchSharedUploadsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const uploads = await SharedUpload.find({ user: userId });
    res.status(200).json(uploads);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.createSharedUpload = async (req, res) => {
  const upload = new SharedUpload(req.body);
  try {
    const doc = await upload.save();
    res.status(201).json(doc);
  } catch (error) {
    console.log("err", error);
    res.status(400).json(error);
  }
};

exports.deleteSharedUpload = async (req, res) => {
  const { id } = req.params;
  try {
    const upload = await SharedUpload.findByIdAndDelete(id);
    res.status(200).json(upload);
  } catch (err) {
    res.status(400).json(err);
  }
};
