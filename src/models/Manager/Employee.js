const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    firstname: { type: String, required: true },
    bio: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pfp: { type: String },  // Link to profile picture
    salary: { type: Number, required: true }
}, { timestamps: true });

employeeSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
