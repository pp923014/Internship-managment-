import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// export const isUserAdmin = async (req, res, next)=>{
//   try {
//     const token = req.cookies.jwt;

//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized - No Token Provided" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     if (!decoded) {
//       return res.status(401).json({ message: "Unauthorized - Invalid Token" });
//     }

//     const user = await User.findById(decoded.userId).select("-password");

//     // If the user doesn't exist, return false
//     if (!user) {
//       console.log('User not found');
//       return false;
//     }

//     // Check if the user is an admin
//     if (user.isAdmin) {
//       console.log('User is an admin');
//       return true;
//     }
//      else {
//       console.log('User is not an admin');
//       return false;
//     }
//     next();

//   } catch (error) {
//     console.error('Error checking if user is admin:', error);
//     return false;
//   }
// }

export const isUserAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    // Check if token exists
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the token is valid
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    // Find the user by ID and exclude the password field
    const user = await User.findById(decoded.userId).select("-password");

    // If the user doesn't exist, return a 404 error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is an admin
    if (user.isAdmin) {
      console.log("User is an admin");
      next(); // Allow access to the protected route
    } else {
      console.log("User is not an admin");
      return res
        .status(403)
        .json({ message: "Forbidden - Admin privileges required" });
    }
  } catch (error) {
    console.error("Error checking if user is admin:", error);

    // Handle specific JWT errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized - Token Expired" });
    }

    // Handle other errors
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
