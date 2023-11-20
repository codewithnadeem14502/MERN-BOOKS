import express from "express";
import { book } from "../models/bookModels.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const Bookdata = await book.create(newBook);
    return res.status(201).send(Bookdata);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.messgae });
  }
});

router.get("/", async (req, res) => {
  try {
    const allbook = await book.find({});
    res.status(200).json({ count: allbook.length, data: allbook });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const bookdata = await book.findById(id);
    if (!bookdata) return res.status(404).json({ message: "book not found" });
    res.status(200).json(bookdata);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const updatedbook = await book.findByIdAndUpdate(id, req.body);

    if (!updatedbook) {
      return res.status(404).json({ message: "Book Not Found" });
    }

    return res.status(200).json({ message: "Updated book successfull" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedbook = await book.findByIdAndDelete(id);

    if (!updatedbook) {
      return res.status(404).json({ message: "Book Not Found" });
    }

    return res.status(200).json({ message: "DELETED book successfull" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

export default router;
