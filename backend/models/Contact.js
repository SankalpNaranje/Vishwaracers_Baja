const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContactSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message:{
    type :String ,
    required:true,
  },
  mobileNumber : {
    type : String
  },
  date: {
    type: Date,
    default: Date.now,
  },
  
});

const Contact = mongoose.model("contact", ContactSchema);
module.exports = Contact;