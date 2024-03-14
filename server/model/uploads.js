const mongoose = require("mongoose");

const { Schema } = mongoose;

const uploadSchema = new Schema({
  description: { type: String, required: true },
  file: { type: String, required: true },
  shared: { type: [Schema.Types.Mixed], required: true },
});

const virtual = uploadSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

uploadSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Upload = mongoose.model("Upload", uploadSchema);
