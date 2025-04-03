const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  firstname: { type: String, required: true },
  bio: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  pfp: { type: String },  // Link to profile picture
  salary: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  reparation: { type: mongoose.Schema.Types.Mixed, ref: "Reparation", default: null }
}, { timestamps: true });

// employeeSchema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
