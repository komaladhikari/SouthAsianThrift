import cartModel from "./cart.model.js";
import productModel from "../products/product.model.js";

const getOrCreateCart = async (userId) => {
  let cart = await cartModel.findOne({ user: userId });

  if (!cart) {
    cart = await cartModel.create({ user: userId, items: [] });
  }

  return cart;
};

const findCartByUser = (userId) => {
  return cartModel
    .findOne({ user: userId })
    .populate("items.product")
    .sort({ updatedAt: -1 });
};

const addItemToCart = async (userId, productId, quantity = 1) => {
  const product = await productModel.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.isSold || product.stock <= 0) {
    throw new Error("Product is not available");
  }

  const cart = await getOrCreateCart(userId);
  const cartItem = cart.items.find((item) => item.product.toString() === productId);
  const quantityToAdd = Number(quantity) || 1;

  if (cartItem) {
    const nextQuantity = cartItem.quantity + quantityToAdd;

    if (nextQuantity > product.stock) {
      throw new Error("Not enough stock available");
    }

    cartItem.quantity = nextQuantity;
  } else {
    if (quantityToAdd > product.stock) {
      throw new Error("Not enough stock available");
    }

    cart.items.push({ product: productId, quantity: quantityToAdd });
  }

  await cart.save();

  return findCartByUser(userId);
};

const removeItemFromCart = async (userId, productId) => {
  const cart = await getOrCreateCart(userId);

  cart.items = cart.items.filter((item) => item.product.toString() !== productId);
  await cart.save();

  return findCartByUser(userId);
};

const clearUserCart = async (userId) => {
  const cart = await getOrCreateCart(userId);

  cart.items = [];
  await cart.save();

  return findCartByUser(userId);
};

export {
  addItemToCart,
  clearUserCart,
  findCartByUser,
  getOrCreateCart,
  removeItemFromCart,
};
