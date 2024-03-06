const mongoose = require("mongoose");
const { isEmail } = require("validator")
const bcrypt = require('bcrypt')

const { Schema } = mongoose;

const userSchema = new Schema({
    fullname: { type: String, required: [true, "Please enter a full name"] },
    email: { type: String, required: [true, "Please enter a email"], unique: true, lowercase: true, validate: [isEmail, "Please enter a valid email"] },
    password: { type: String, required: [true, "Please enter a password"], minLength: [6, "The password at least 6 character long"] },
})

const virtual = userSchema.virtual('id');
    virtual.get(function () {
    return this._id;
});

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});

userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    // console.log("before save", this)
    next();
})

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const isAuthenticated = await bcrypt.compare(password, user.password);
        if(isAuthenticated) {
            return user;
        }
        throw Error("incorrect password")
    } else {
        throw Error("incorrect email")
    }
}

exports.User = mongoose.model("User", userSchema)