import mongoose from "mongoose";
import Product from "../models/product.js";
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getProductId = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: product,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Invalid Product ID",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    //check if id is valid mongo objectid

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Product ID format",
      });
    }

    //update with proper options

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body,

      {
        new: true, //return updated document not stale
        runValidators: true, // apply schema validations on update (required and all stuffs)
      },
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updateProduct,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    //check if id is valid mongo objectid

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Product ID format",
      });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.json(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    (res.status(500),
      json({
        success: false,
        message: "Internal server error",
      }));
  }
};
