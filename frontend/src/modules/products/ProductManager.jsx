import React, { useEffect, useState } from "react";

import {
  addProduct,
  listProducts,
  removeProduct,
} from "./product.api.js";

const emptyProduct = {
  name: "",
  description: "",
  price: "",
  category: "Kurti",
  size: "Free Size",
  condition: "Good",
  imageUrl: "",
  color: "",
  fabric: "",
  stock: 1,
  isFeatured: false,
};

const categories = [
  "Lehenga",
  "Saree",
  "Kurti",
  "Anarkali",
  "Dupatta",
  "Accessories",
  "Jewelry",
  "Other",
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "Free Size", "One Size"];
const conditions = ["New", "Like New", "Good", "Fair"];

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyProduct);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadProducts = async () => {
    setIsLoading(true);
    setStatus("");

    try {
      const data = await listProducts();
      setProducts(data.products || []);
    } catch (error) {
      setStatus(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    const product = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      images: form.imageUrl ? [{ url: form.imageUrl }] : [],
    };

    delete product.imageUrl;

    try {
      await addProduct(product);
      setForm(emptyProduct);
      setStatus("Product added successfully.");
      await loadProducts();
    } catch (error) {
      setStatus(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemove = async (productId) => {
    setStatus("");

    try {
      await removeProduct(productId);
      setProducts((current) => current.filter((product) => product._id !== productId));
      setStatus("Product removed successfully.");
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <section className="product-admin" id="product-admin">
      <div className="product-admin-header">
        <div>
          <p className="eyebrow">Store Admin</p>
          <h2>Manage Products</h2>
        </div>
        <button type="button" onClick={loadProducts} disabled={isLoading}>
          {isLoading ? "Loading..." : "Refresh List"}
        </button>
      </div>

      <div className="product-admin-layout">
        <form className="product-form" onSubmit={handleSubmit}>
          <label>
            Product Name
            <input
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Green embroidered kurti"
              required
            />
          </label>

          <label>
            Description
            <textarea
              value={form.description}
              onChange={(event) => updateField("description", event.target.value)}
              placeholder="Pre-loved piece with gold detail."
              required
            />
          </label>

          <div className="form-grid">
            <label>
              Price
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(event) => updateField("price", event.target.value)}
                placeholder="38"
                required
              />
            </label>

            <label>
              Stock
              <input
                type="number"
                min="0"
                value={form.stock}
                onChange={(event) => updateField("stock", event.target.value)}
                required
              />
            </label>
          </div>

          <div className="form-grid">
            <label>
              Category
              <select
                value={form.category}
                onChange={(event) => updateField("category", event.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Size
              <select value={form.size} onChange={(event) => updateField("size", event.target.value)}>
                {sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label>
            Condition
            <select
              value={form.condition}
              onChange={(event) => updateField("condition", event.target.value)}
            >
              {conditions.map((condition) => (
                <option key={condition} value={condition}>
                  {condition}
                </option>
              ))}
            </select>
          </label>

          <label>
            Image URL
            <input
              type="url"
              value={form.imageUrl}
              onChange={(event) => updateField("imageUrl", event.target.value)}
              placeholder="https://example.com/product.jpg"
            />
          </label>

          <div className="form-grid">
            <label>
              Color
              <input
                value={form.color}
                onChange={(event) => updateField("color", event.target.value)}
                placeholder="Green"
              />
            </label>

            <label>
              Fabric
              <input
                value={form.fabric}
                onChange={(event) => updateField("fabric", event.target.value)}
                placeholder="Cotton"
              />
            </label>
          </div>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(event) => updateField("isFeatured", event.target.checked)}
            />
            Featured product
          </label>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Product"}
          </button>
        </form>

        <div className="product-list-panel">
          {status && <p className="product-status">{status}</p>}

          {products.length === 0 ? (
            <p className="empty-products">
              {isLoading ? "Loading products..." : "No products added yet."}
            </p>
          ) : (
            <div className="product-table">
              {products.map((product) => (
                <article className="product-row" key={product._id}>
                  <img
                    src={product.images?.[0]?.url || "https://placehold.co/120x120?text=Product"}
                    alt={product.name}
                  />
                  <div>
                    <h3>{product.name}</h3>
                    <p>
                      {product.category} · {product.size} · {product.condition}
                    </p>
                    <strong>${product.price}</strong>
                  </div>
                  <button type="button" onClick={() => handleRemove(product._id)}>
                    Remove
                  </button>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductManager;
