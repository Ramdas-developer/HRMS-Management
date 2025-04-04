const { Router } = require("express");
const {SignUp, getAdmin, loginAdmin} = require("../controllers/adminController");
const { upload, CreateCandidate, AllCandidate, DownloadResume } = require("../controllers/candidateController");
const {CreateEmployee, AllEmployee, DeleteEmployee, UpdateEmployee} = require("../controllers/employeeController");
const authMiddleware = require("../middleware/authMiddleware");

const adminRoute = Router();

// admin
adminRoute.post('/signup',SignUp);
adminRoute.get('/adminDetails', authMiddleware,getAdmin)
adminRoute.post('/login',loginAdmin)

// candidate 
adminRoute.post('/addcandidate', upload.single("resume"),CreateCandidate);
adminRoute.get('/allcandidate', AllCandidate);
adminRoute.get('/download/:id', DownloadResume) 

// employee
adminRoute.post('/addemployee', CreateEmployee)   
adminRoute.get('/allemployee', AllEmployee)
adminRoute.delete('/deleteEmployee/:id', DeleteEmployee);
adminRoute.put('/updateEmployee/:id', UpdateEmployee)


module.exports = adminRoute; 