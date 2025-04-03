const Employee = require('../models/Manager/Employee');

// Register a new Employee
exports.registerEmployee = async (req, res) => {
    try {
        const { name, firstname, bio, email, password, pfp, salary } = req.body;

        // Check if email already exists
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ message: "Email already in use." });
        }

        // Create and save Employee
        const newEmployee = new Employee({
            name,
            firstname,
            bio,
            email,
            password,
            pfp,
            salary
        });

        await newEmployee.save();
        res.status(201).json({ message: "Employee registered successfully!" });

    } catch (error) {
        res.status(500).json({ message: "Error registering Employee", error: error.message });
    }
};

// Get all Employees
exports.getAllEmployees = async (req, res) => {
    try {
        const Employees = await Employee.find().select('-password'); // Exclude password
        res.status(200).json(Employees);
    } catch (error) {
        res.status(500).json({ message: "Error fetching Employees", error: error.message });
    }
};

// Get Employee by ID
exports.getEmployeeById = async (req, res) => {
    try {
        const Employee = await Employee.findById(req.params.id).select('-password');
        if (!Employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json(Employee);
    } catch (error) {
        res.status(500).json({ message: "Error fetching Employee", error: error.message });
    }
};

//update Employee
exports.updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ message: "Error updating Employee", error: error.message });
    }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting Employee", error: error.message });
    }
};
