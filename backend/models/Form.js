const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
