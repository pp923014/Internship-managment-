import mongoose from "mongoose";

const FeatureSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});

const Feature = mongoose.model("Feature", FeatureSchema);
export default Feature;
