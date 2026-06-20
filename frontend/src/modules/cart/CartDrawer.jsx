import React, { useEffect, useState } from "react";

import fallbackProductImage from "../../assets/img1.jpeg";
import { clearCart, getCart, removeFromCart } from "./cart.api.js";

function CartDrawer({ isOpen, token, refreshKey, onClose, onRequireLogin, onCartChanged }) {
  const [cart, setCart] = useState(null);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loadCart = async () => {
    if (!token) {
      setCart(null);
      return;
    }

    setIsLoading(true);
    setStatus("");

    try {
      const data = await getCart(token);
      setCart(data.cart);
      onCartChanged?.(data.cart?.totalItems || 0);
    } catch (error) {
      setStatus(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadCart();
    }
  }, [isOpen, refreshKey, token]);

  const handleRemove = async (productId) => {
    setStatus("");

    try {
      const data = await removeFromCart({ token, productId });
      setCart(data.cart);
      onCartChanged?.(data.cart?.totalItems || 0);
      setStatus("Item removed.");
    } catch (error) {
      setStatus(error.message);
    }
  };

  const handleClear = async () => {
    setStatus("");

    try {
      const data = await clearCart(token);
      setCart(data.cart);
      onCartChanged?.(0);
      setStatus("Cart cleared.");
    } catch (error) {
      setStatus(error.message);
    }
  };

  if (!isOpen) {
    return null;
  }

  const items = cart?.items || [];

  return (
    <div className="cart-overlay" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <aside className="cart-drawer">
        <div className="cart-header">
          <div>
            <p className="eyebrow">Your Cart</p>
            <h2 id="cart-title">Shopping Bag</h2>
          </div>
          <button type="button" aria-label="Close cart" onClick={onClose}>
            ×
          </button>
        </div>

        {!token ? (
          <div className="cart-empty">
            <p>Please log in to view your cart.</p>
            <button type="button" onClick={onRequireLogin}>
              Login
            </button>
          </div>
        ) : (
          <>
            {status && <p className="cart-status">{status}</p>}

            {isLoading ? (
              <p className="cart-empty">Loading cart...</p>
            ) : items.length === 0 ? (
              <p className="cart-empty">Your cart is empty.</p>
            ) : (
              <div className="cart-items">
                {items.map((item) => (
                  <article className="cart-item" key={item.product?._id}>
                    <img
                      src={item.product?.images?.[0]?.url || fallbackProductImage}
                      alt={item.product?.name || "Cart item"}
                    />
                    <div>
                      <h3>{item.product?.name}</h3>
                      <p>
                        Qty {item.quantity} · ${item.product?.price}
                      </p>
                      <button type="button" onClick={() => handleRemove(item.product._id)}>
                        Remove
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <div className="cart-footer">
              <div>
                <span>Total</span>
                <strong>${cart?.totalPrice || 0}</strong>
              </div>
              <button type="button" onClick={handleClear} disabled={items.length === 0}>
                Clear Cart
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export default CartDrawer;
