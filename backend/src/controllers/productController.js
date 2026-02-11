import Product from "../models/ProductModel.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: false });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      isDeleted: false,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || !q.trim()) {
      return res.status(200).json({
        success: true,
        products: [],
      });
    }

    const keyword = q.trim();

    const products = await Product.find({
      title: {
        $regex: "^" + keyword, 
        $options: "i", 
      },
      isDeleted: false,
    }).limit(20); 

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const getAllCategories = async (req, res) => {
  const categories = await Product.distinct("category", {
    isDeleted: false,
  });

  res.json({ success: true, categories });
};


export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const products = await Product.find({
      category: category.toLowerCase(),
      isDeleted: false,
    });

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
