const mongoose = require("mongoose");
const { buffer } = require("stream/consumers");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  resume:{
    type: buffer,
    required:true,
  }
});

const Candidate = mongoose.model("candidate_data", schema);
module.exports = Candidate;
