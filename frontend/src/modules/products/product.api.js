const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const parseResponse = async (response) => {
  const data = await response.json();

  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const listProducts = async () => {
  const response = await fetch(`${API_URL}/api/products/list`);
  return parseResponse(response);
};

export const addProduct = async (product) => {
  const response = await fetch(`${API_URL}/api/products/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  return parseResponse(response);
};

export const removeProduct = async (productId) => {
  const response = await fetch(`${API_URL}/api/products/remove/${productId}`, {
    method: "DELETE",
  });

  return parseResponse(response);
};
