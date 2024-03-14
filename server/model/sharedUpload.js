const mongoose = require("mongoose");
const { isEmail } = require("validator");

const { Schema } = mongoose;

const sharedUploadSchema = new Schema({
  items: { type: Schema.Types.Mixed, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  sharedBy: { type: String, required: true },
  sharedTo: { type: String, required: true },
});

const virtual = sharedUploadSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

sharedUploadSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.SharedUpload = mongoose.model("SharedUpload", sharedUploadSchema);
