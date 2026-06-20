import {
  addItemToCart,
  clearUserCart,
  findCartByUser,
  getOrCreateCart,
  removeItemFromCart,
} from "./cart.service.js";

const formatCart = (cart) => {
  const items = cart?.items || [];
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => {
    return total + (item.product?.price || 0) * item.quantity;
  }, 0);

  return {
    ...cart.toObject(),
    totalItems,
    totalPrice,
  };
};

const getCart = async (req, res) => {
  try {
    await getOrCreateCart(req.userId);
    const cart = await findCartByUser(req.userId);

    res.json({
      success: true,
      cart: formatCart(cart),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product id is required",
      });
    }

    const cart = await addItemToCart(req.userId, productId, quantity);

    res.status(201).json({
      success: true,
      message: "Product added to cart",
      cart: formatCart(cart),
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const cart = await removeItemFromCart(req.userId, req.params.productId);

    res.json({
      success: true,
      message: "Product removed from cart",
      cart: formatCart(cart),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const cart = await clearUserCart(req.userId);

    res.json({
      success: true,
      message: "Cart cleared",
      cart: formatCart(cart),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addToCart, clearCart, getCart, removeFromCart };
