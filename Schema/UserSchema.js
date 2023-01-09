const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mongooseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String
    }
});

mongooseSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 12);
        }
        next();
    } catch (err) {
        console.log(err);
    }
});

mongooseSchema.methods.addToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.token = token;
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
};




const mongoModel = mongoose.model("USER", mongooseSchema);

module.exports = mongoModel;


