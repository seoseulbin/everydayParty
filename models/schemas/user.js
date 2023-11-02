const { Schema } = require("mongoose");

const UserSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    grade: {
        type: String,
        required: true,
        default: "user",
    },
    email: {
        type: String,
    },
    name: {
        type: String,
    },
    address: {
        type: [String],
        default: undefined,
    },
    phone: {
        type: String,
    },
    birthday: {
        type: Date,
    },
});

module.exports = UserSchema;
