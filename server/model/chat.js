const mongoose = require("mongoose");

const { Schema } = mongoose;

const chatSchema = new Schema({
    username: { type: String, required: [true, "Username is required"] },
    date: { type: String, required: [true, "Date is required"] },
    message: { type: String, required: [true, "Message is required"] },
})

const virtual = chatSchema.virtual('id');
    virtual.get(function () {
    return this._id;
});

chatSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});

exports.Chat = mongoose.model("Chat", chatSchema)