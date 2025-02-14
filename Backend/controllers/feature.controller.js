import multer from "multer";
import Feature from "../models/feature.model.js";
import bcrypt from "bcryptjs";
const upload = multer();
export const sendpost = async (req, res) => {
    const { title, description } = req.body;
    const image = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };
  
    try {
      const newItem = new Feature({ title, description, image });
      await newItem.save();
      res.status(201).json(newItem);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  export const getpost= async (req, res) => {
    try {
      const items = await Feature.find();
      const itemsWithImageUrl = items.map((item) => ({
        ...item._doc,
        imageUrl: `data:${item.image.contentType};base64,${item.image.data.toString('base64')}`,
      }));
      res.json(itemsWithImageUrl);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }