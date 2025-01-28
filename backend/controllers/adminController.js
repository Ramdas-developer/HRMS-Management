const Admin = require("../modals/adminModel");

const SignUp = async (req, res) => {
    try {
      const { name, email, phone, password } = req.body;  
      console.log("req.body", req.body);

      const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({ message: "Email Id is same. Please try another Email Id" });
    }
  
      const data = await Admin.create({
        name: name,
        email: email,
        phone: phone,
        password: password,
      });
      console.log("data :", data);
      res.status(200).json({message:"User register Succesfully Please login now.",Admin_Detail:data});    
    } catch (error) {
        res.status(400).json({message:"User not register",Error:error.message}) 
    }
  };

  const getAdmin = async (req, res) => {
    try {
      const data = await Admin.find();
      res.status(200).json({message:"Admin Data gets Succesfully",Admin_Detail:data});
    } catch (error) {
      res.status(400).json({message:"Admin data getting Error",Error:error.message})
      console.error("data get error :", error);
    }
  };

  const loginAdmin = async(req,res) =>{ 
    try {
        const {email,password} = req.body;
        const user = await Admin.findOne({email});
        if(!user){
            res.status(404).json({message:"User not found for Login Please check email and password"});
            return;
        }
        res.status(200).json({message:"Login Successfull",User:user});
    } catch (error) {
        console.log(' ===========',error)
        res.status(500).json({message:"Internal Server error when user login",Error:error.message}); 
    }
  }

  module.exports = {SignUp,getAdmin,loginAdmin};