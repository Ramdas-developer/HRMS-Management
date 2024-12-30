const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  dateofJoining: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

schema.set("toJSON", {
  transform: (doc, ret) => {
    ret.dateofJoining = ret.dateofJoining.toISOString().split("T")[0];
    return ret;
  },
});

const Employee = mongoose.model("employee_Data", schema);
module.exports = Employee;
