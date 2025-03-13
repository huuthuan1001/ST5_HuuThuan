const express = require("express");
const router = express.Router();
const categoryModel = require("../schemas/category");
const {
  CreateErrorRes,
  CreateSuccessRes,
} = require("../utils/responseHandler");

// Lấy danh sách category
router.get("/", async (req, res, next) => {
  try {
    const categories = await categoryModel.find({ isDeleted: false });
    CreateSuccessRes(res, categories, 200);
  } catch (error) {
    next(error);
  }
});

// Lấy category theo ID
router.get("/:id", async (req, res, next) => {
  try {
    const category = await categoryModel.findOne({
      _id: req.params.id,
      isDeleted: false,
    });
    CreateSuccessRes(res, category, 200);
  } catch (error) {
    next(error);
  }
});

// Thêm mới category
router.post("/", async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const newCategory = await categoryModel.create({ name, description });
    CreateSuccessRes(res, newCategory, 200);
  } catch (error) {
    next(error);
  }
});

// Cập nhật category
router.put("/:id", async (req, res, next) => {
  try {
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    CreateSuccessRes(res, updatedCategory, 200);
  } catch (error) {
    next(error);
  }
});

// Xóa category (đánh dấu isDeleted)
router.delete("/:id", async (req, res, next) => {
  try {
    const deletedCategory = await categoryModel.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    CreateSuccessRes(res, deletedCategory, 200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
