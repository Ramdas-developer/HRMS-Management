const Employee = require("../modals/employeeModel");

const CreateEmployee = async (req, res) => {
    try {
      const { name, email, phone, position, department } = req.body;
      console.log("req.body", req.body);
  
      // if (!name || !email || !phone || !position || !department) {
      //   return res.status(400).json({ message: "All fields are required." }); 
      // }
  
      const data = await Employee.create({
        name: name,
        email: email,
        phone: phone,
        position: position,
        department: department,
      });

      console.log("data :", data);
      res.status(200).json({message: "New Employee added succesfully",New_Employee: data});

    } catch (error) {
      console.log("error :", error);
      res.status(500).json({ message: "Internal network Error", Error: error.message });
    }
  };
  
  const AllEmployee = async(req,res) => {
      try {
          const employees = await Employee.find();
          res.status(200).json({message: " All Employee show Successfully",All_Employee: employees}); 
          console.log("all candidate:", employees)
      } catch (error) {
          console.log("error :", error);
          res.status(500).json({ message: "Internal network Error", Error: error.message });
      }
  }

module.exports = {CreateEmployee, AllEmployee}; 