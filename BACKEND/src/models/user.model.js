const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {
        type: String, 
        required: true, 
        unique:true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
const model = mongoose.model("user", schema);

exports.UserModel = model;