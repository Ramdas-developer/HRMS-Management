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

  const DeleteEmployee = async(req,res) =>{
    try {
      const userId = req.params.id;
      const user = await Employee.findByIdAndDelete(userId);
      if(!user){
        res.status(404).json({message:"User not Found!"});
      }
      console.log("deleteUser:",user);     
      res.status(200).json({message:"Employee successfully deleted!",delete_user:user});
    } catch (error) {
      res.status(500).json({message:"Internal Server Error",Error:error.message});
      console.error("Internal Server error :",error); 
    }
  }

  const UpdateEmployee = async(req,res) =>{
    try {
      const userId = req.params.id;
      const user = await Employee.findByIdAndUpdate(userId,
        {
          $set:{
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            position:req.body.position,
            department:req.body.department
          }
        },{new:true},
        console.log("name :",    req.body.name),
        console.log("email :",   req.body.email),
        console.log("phone :",   req.body.phone),
        console.log("position :",req.body.position),
        console.log("department :",req.body.department) 
      );
      if(!user){
        res.status(404).json({message:"User not found!"})
      }
      res.status(200).json({message:"Employee updated successfully!",updateUser:user});
  
    } catch (error) {
      console.log("Internal Server error:", error);
      res.status(500).json({message:"Internal Server Error",Error:error.message});
    }
  }

module.exports = {CreateEmployee, AllEmployee, DeleteEmployee,UpdateEmployee}; 