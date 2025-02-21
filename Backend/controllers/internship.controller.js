import multer from "multer";
import Internship from "../models/internship.model.js";
import bcrypt from "bcryptjs";
import Apply from "../models/apply.internship.js";
const upload = multer();
export const sendpost = async (req, res) => {
  const { title } = req.body;
  const image = {
    data: req.file.buffer,
    contentType: req.file.mimetype,
  };

  try {
    const newItem = new Internship({ title, image });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getpost = async (req, res) => {
  try {
    const items = await Internship.find();
    const itemsWithImageUrl = items.map((item) => ({
      ...item._doc,
      imageUrl: `data:${
        item.image.contentType
      };base64,${item.image.data.toString("base64")}`,
    }));
    res.json(itemsWithImageUrl);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// export const getCertificate = async (req, res) => {
//   const { certificateNo } = req.body; // Extract certificateNo from the request body

//   if (!certificateNo) {
//     return res.status(400).json({
//       success: false,
//       message: "Certificate number is required in the request body.",
//     });
//   }

//   try {
//     // Find the document in the Apply collection with the matching certificate number
//     const trainee = await Apply.findOne({ certificate: certificateNo });

//     if (trainee) {
//       // If trainee is found, log their details
//       console.log("Trainee Name:", trainee.name);
//       console.log("Internship Duration:", trainee.internshipDuration);
//       console.log("Internship Type:", trainee.internshipType);
//       res.status(200).json({
//         success: true,
//         data: {
//           name: trainee.name,
//           internshipDuration: trainee.internshipDuration,
//           internshipType: trainee.internshipType,
//         },
//       });
//     } else {
//       // If no trainee is found, log a message
//       console.log("No trainee found with the provided certificate number.");
//       res.status(404).json({
//         success: false,
//         message: "No trainee found with the provided certificate number.",
//       });
//     }
//   } catch (error) {
//     console.error("Error fetching certificate details:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };
// export const getCertificate = async (req, res) => {
//   const { certificateNo } = req.query; // Use req.query instead of req.body

//   if (!certificateNo) {
//     return res.status(400).json({
//       success: false,
//       message: "Certificate number is required in the query parameters.",
//     });
//   }

//   try {
//     const trainee = await Apply.findOne({ certificate: certificateNo });

//     if (trainee) {
//       res.status(200).json({
//         success: true,
//         data: {
//           name: trainee.name,
//           internshipDuration: trainee.internshipDuration,
//           internshipType: trainee.internshipType,
//           certificateNo: trainee.certificate, // Include the certificate number
//         },
//       });
//     } else {
//       res.status(404).json({
//         success: false,
//         message: "No trainee found with the provided certificate number.",
//       });
//     }
//   } catch (error) {
//     console.error("Error fetching certificate details:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

export const getCertificate = async (req, res) => {
  try {
    const { certificateNo } = req.query; // Use req.query instead of req.body

    if (!certificateNo) {
      return res.status(400).json({
        success: false,
        message: "Certificate number is required.",
      });
    }

    const trainee = await Apply.findOne({ certificate: certificateNo });

    if (!trainee) {
      return res.status(200).json({
        success: false,
        message: "No trainee found with the provided certificate number.",
      }); // ✅ Return success: false instead of status 404
    }

    res.status(200).json({
      success: true,
      data: {
        name: trainee.name,
        internshipDuration: trainee.internshipDuration,
        internshipType: trainee.internshipType,
        certificateNo: trainee.certificate, // Include the certificate number
      },
    });
  } catch (error) {
    console.error("Error fetching certificate details:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
