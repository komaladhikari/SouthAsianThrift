import productModel from "./product.model.js";

const createProduct = (productData) => {
  return productModel.create(productData);
};

const findAllProducts = () => {
  return productModel.find({}).sort({ createdAt: -1 });
};

const deleteProductById = (id) => {
  return productModel.findByIdAndDelete(id);
};

export { createProduct, findAllProducts, deleteProductById };
