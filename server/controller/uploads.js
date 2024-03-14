const { SharedUpload } = require("../model/sharedUpload");
const { Upload } = require("../model/uploads");

exports.createUpload = async (req, res) => {
  const { body: { description, shared }, file: { filename } } = req
  try {
    const upload = new Upload({
      description: description,
      shared: shared,
      file: filename
    });
    const data = await upload.save();
    res.status(200).json({ success: true, message: "File successfully uploaded!", data });
  } catch (error) {
    // let errors = errorAlert(error);
    res.status(400).json({ success: false, message: error.message, error });
  }
};

exports.fetchUploads = async (req, res) => {
  try {
    const uploads = await Upload.find({}).exec();
    res.status(200).json(uploads);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.fetchUploadById = async (req, res) => {
  const { id } = req.params;
  try {
    const upload = await Upload.findById(id);
    res.status(200).json(upload);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.updateUpload = async (req, res) => {
  const { id } = req.params;
  try {
    const upload = await Upload.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(upload);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteUpload = async (req, res) => {
  const { id } = req.params;
  try {
    const upload = await Upload.findByIdAndDelete(id);
    res.status(200).json(upload);
  } catch (err) {
    res.status(400).json(err);
  }
};