import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema({
  title: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});

const Internship = mongoose.model("Internship", internshipSchema);
export default Internship;
