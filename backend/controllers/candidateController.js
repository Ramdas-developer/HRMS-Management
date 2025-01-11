const multer = require("multer");
const Candidate = require("../modals/candidateModel");

const CreateCandidate = async (req, res) => {
  try {
    const { name, email, phone, position, experience } = req.body;
    console.log("req.body", req.body);

    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required." });
    }

    const data = await Candidate.create({
      name: name,
      email: email,
      phone: phone,
      position: position,
      experience: experience,
      resume: req.file.buffer,
    });
    console.log("data :", data);
    res.status(200).json({message: "New candidate added succesfully",New_candidate: data});
  } catch (error) {
    console.log("error :", error);
    res.status(500).json({ message: "Internal network Error", Error: error.message });
  }
};

// const AllCandidate = async(req,res) => {
//     try {
//         const candidates = await Candidate.find();
//         console.log("all candidate:", candidates)
//         res.status(200).json({message: "New candidate show Successfully",All_candidate: candidates}); 
//     } catch (error) {
//         console.log("error :", error);
//         res.status(500).json({ message: "Internal network Error", Error: error.message });
//     }
// }
const AllCandidate = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default to page 1, 10 candidates per page
    const skip = (page - 1) * limit;

    const candidates = await Candidate.find()
      .skip(skip)
      .limit(parseInt(limit))
      .select("-resume"); // Exclude resume field for faster response
    const total = await Candidate.countDocuments(); // Total number of candidates

    console.log("Paginated candidates:", candidates);
    res.status(200).json({
      message: "Candidates retrieved successfully",
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      All_candidate: candidates,
    });
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ message: "Internal Server Error", Error: error.message });
  }
};

const DownloadResume = async (req, res) => {
  try {
    const { id } = req.params;

    const candidate = await Candidate.findById(id);
    if (!candidate || !candidate.resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${candidate.name}_resume.pdf`,
    });

    const bufferStream = new require("stream").PassThrough();
    bufferStream.end(candidate.resume); // Stream the buffer
    bufferStream.pipe(res);
    // res.send(candidate.resume);
  } catch (error) {
    console.error("Error downloading resume:", error);
    res.status(500).json({ message: "Internal Server Error", Error: error.message });
  }
};


const storage = multer.memoryStorage(); 
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true); 
    } else {
      cb(new Error("Only PDF files are allowed!"), false);
    }
  },
});

module.exports = { CreateCandidate, upload, AllCandidate,DownloadResume };
