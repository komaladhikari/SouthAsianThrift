const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const authHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

const parseResponse = async (response) => {
  const data = await response.json();

  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const getCart = async (token) => {
  const response = await fetch(`${API_URL}/api/cart`, {
    headers: authHeaders(token),
  });

  return parseResponse(response);
};

export const addToCart = async ({ token, productId, quantity = 1 }) => {
  const response = await fetch(`${API_URL}/api/cart/add`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({ productId, quantity }),
  });

  return parseResponse(response);
};

export const removeFromCart = async ({ token, productId }) => {
  const response = await fetch(`${API_URL}/api/cart/remove/${productId}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });

  return parseResponse(response);
};

export const clearCart = async (token) => {
  const response = await fetch(`${API_URL}/api/cart/clear`, {
    method: "DELETE",
    headers: authHeaders(token),
  });

  return parseResponse(response);
};
