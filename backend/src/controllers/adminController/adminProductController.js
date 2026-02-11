import Product from "../../models/ProductModel.js";

export const getAdminAllProducts = async (req, res) => {
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

export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    if (!title || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Product image is required",
      });
    }

    const product = await Product.create({
      title,
      description,
      price,
      category,
      image: req.file.path,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndUpdate(
      productId,
      { isDeleted: true },
      { new: true },
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error delting product",
      error: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = {};

    if (req.body.title) {
      updateData.title = req.body.title;
    }

    if (req.body.description) {
      updateData.description = req.body.description;
    }

    if (req.body.price !== undefined) {
      updateData.price = req.body.price;
    }

    if (req.body.category) {
      updateData.category = req.body.category.toLowerCase();
    }

    if (req.file) {
      updateData.image = req.file.path;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No data provided for update",
      });
    }

    const product = await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
};



// export const getProductByCategory = async (req, res) => {
//   try {
//     const { category } = req.params;

//     const products = await Product.find({
//       category: category.toLowerCase(),
//       isDeleted: false,
//     });

//     if (!products.length) {
//       return res.status(404).json({
//         success: false,
//         message: "No products found in this category",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       count: products.length,
//       products,
//     });
//   } catch (error) {
//     console.error("Category Fetch Error:", error);

//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch products",
//     });
//   }
// };