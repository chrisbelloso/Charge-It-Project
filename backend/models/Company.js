const { Schema, model } = require("mongoose");


const CompanySchema = Schema({
    name: {
        type: String,
        required: [true, "Name required"],
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: [true, "Address required"]
    },
    latitude: {
        type: Number,
        required: [true, "Longitude required"]
    },
    longitude: {
        type: Number,
        required: [true, "Latitude required"]
    },
});

CompanySchema.methods.toJSON = function () {
    const { password, __v, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model("Company", CompanySchema);