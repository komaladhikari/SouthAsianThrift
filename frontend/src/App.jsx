import React, { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const categories = [
  {
    name: "Lehenga",
    image: "https://source.unsplash.com/240x240/?lehenga,indian-fashion",
  },
  {
    name: "Saree",
    image: "https://source.unsplash.com/240x240/?saree",
  },
  {
    name: "Kurti",
    image: "https://source.unsplash.com/240x240/?kurti,indian-dress",
  },
  {
    name: "Anarkali",
    image: "https://source.unsplash.com/240x240/?anarkali,dress",
  },
  {
    name: "Dupatta",
    image: "https://source.unsplash.com/240x240/?dupatta,shawl",
  },
  {
    name: "Accessories",
    image: "https://source.unsplash.com/240x240/?embroidered-bag,indian-accessories",
  },
  {
    name: "Jewelry",
    image: "https://source.unsplash.com/240x240/?south-asian,jewelry",
  },
];

const favorites = [
  {
    name: "Emerald Embroidered Kurti",
    price: "$38",
    image: "https://source.unsplash.com/520x680/?green,kurti,embroidery",
  },
  {
    name: "Mustard Anarkali Dress",
    price: "$64",
    image: "https://source.unsplash.com/520x680/?yellow,anarkali,dress",
  },
  {
    name: "Gold Trim Lehenga Set",
    price: "$92",
    image: "https://source.unsplash.com/520x680/?lehenga,gold,indian-fashion",
  },
  {
    name: "Coral Festive Suit",
    price: "$48",
    image: "https://source.unsplash.com/520x680/?salwar,suit,indian-fashion",
  },
];

const valueProps = [
  ["Pre-Loved & Unique", "Each piece has a story."],
  ["Sustainable Fashion", "Better for the planet."],
  ["Quality Checked", "Handpicked with care."],
  ["Affordable Luxury", "Look good, save more."],
];

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!data.success) {
        if (data.message?.toLowerCase().includes("does not exist")) {
          setAuthMode("register");
          setMessage("No account found. Create one to continue.");
          return;
        }

        setMessage(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      setToken(data.token);
      setMessage("Login successful");
      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage("Could not connect to the backend");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!data.success) {
        setMessage(data.message || "Registration failed");
        return;
      }

      localStorage.setItem("token", data.token);
      setToken(data.token);
      setMessage("Account created. You are logged in.");
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage("Could not connect to the backend");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setMessage("Logged out");
  };

  const openAuth = (mode = "login") => {
    setAuthMode(mode);
    setMessage("");
    setIsLoginOpen(true);
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="/">
          South Asian
          <span>Thrift Store</span>
        </a>

        <nav className="nav-links" aria-label="Primary navigation">
          <a href="/">Home</a>
          <a href="#shop">Shop</a>
          <a href="#collections">Collections</a>
          <a href="#about">About</a>
          <a href="#sustainability">Sustainability</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="header-actions" aria-label="Shopping tools">
          <button type="button" aria-label="Search">
            <span aria-hidden="true">⌕</span>
          </button>
          <button type="button" aria-label="Account" onClick={() => openAuth("login")}>
            <span aria-hidden="true">♙</span>
          </button>
          <button className="cart-button" type="button" aria-label="Cart with 2 items">
            <span aria-hidden="true">▱</span>
            <strong>2</strong>
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <h1>South Asian Thrift Store</h1>
            <p>where Tradition meets sustainability.</p>
            <p className="hero-tagline">Curated. Pre-loved. Timeless.</p>
            <a className="shop-button" href="#shop">
              Shop Now
            </a>
          </div>

          <div className="hero-collage" aria-label="Featured South Asian clothing">
            <img
              className="collage-img image-one"
              src="https://source.unsplash.com/420x560/?green,lehenga"
              alt="Green South Asian outfit on a hanger"
            />
            <img
              className="collage-img image-two"
              src="https://source.unsplash.com/420x560/?yellow,indian-dress"
              alt="Yellow embroidered South Asian dress"
            />
            <img
              className="collage-img image-three"
              src="https://source.unsplash.com/420x560/?purple,lehenga"
              alt="Purple lehenga with gold detail"
            />
            <div className="collection-badge">
              <span>Explore</span>
              <small>The Collection</small>
            </div>
          </div>
        </section>

        <section className="value-strip" aria-label="Store benefits">
          {valueProps.map(([title, text], index) => (
            <article key={title} className="value-item">
              <span aria-hidden="true">{["♧", "♢", "◇", "◉"][index]}</span>
              <div>
                <h2>{title}</h2>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="section-block" id="shop">
          <div className="section-heading">
            <h2>Shop By Category</h2>
            <a href="#shop">View All</a>
          </div>

          <div className="category-row">
            {categories.map((category) => (
              <a className="category-item" href="#shop" key={category.name}>
                <img src={category.image} alt={`${category.name} category`} />
                <span>{category.name}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="section-block" id="collections">
          <div className="section-heading">
            <h2>Handpicked Favorites</h2>
            <a href="#collections">View All</a>
          </div>

          <div className="product-grid">
            {favorites.map((item) => (
              <article className="product-card" key={item.name}>
                <button type="button" aria-label={`Save ${item.name}`}>
                  ♡
                </button>
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.price}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="impact-band" id="sustainability">
          <div>
            <h2>Give timeless fashion a second life.</h2>
            <p>Thank you for supporting sustainable choices and preserving our culture.</p>
          </div>

          <div className="impact-stats">
            <article>
              <strong>500+</strong>
              <span>Unique Pieces</span>
            </article>
            <article>
              <strong>1000+</strong>
              <span>Happy Customers</span>
            </article>
            <article>
              <strong>95%</strong>
              <span>Pre-loved Items</span>
            </article>
            <article>
              <strong>1</strong>
              <span>Sustainable Choice</span>
            </article>
          </div>
        </section>
      </main>

      {isLoginOpen && (
        <div className="auth-overlay" role="dialog" aria-modal="true" aria-labelledby="auth-title">
          <section className="auth-panel">
            <button
              className="close-button"
              type="button"
              aria-label="Close login"
              onClick={() => setIsLoginOpen(false)}
            >
              ×
            </button>

            <div>
              <p className="eyebrow">South Asian Thrift</p>
              <h2 id="auth-title">{authMode === "login" ? "Login" : "Create Account"}</h2>
            </div>

            {token ? (
              <div className="logged-in">
                <p>You are logged in.</p>
                <button type="button" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <form
                onSubmit={authMode === "login" ? handleLogin : handleRegister}
                className="login-form"
              >
                {authMode === "register" && (
                  <label>
                    Name
                    <input
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Your name"
                      required
                    />
                  </label>
                )}

                <label>
                  Email
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </label>

                <label>
                  Password
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </label>

                <button type="submit" disabled={isLoading}>
                  {isLoading
                    ? authMode === "login"
                      ? "Logging in..."
                      : "Creating account..."
                    : authMode === "login"
                      ? "Login"
                      : "Create Account"}
                </button>

                <p className="auth-switch">
                  {authMode === "login" ? "New here?" : "Already have an account?"}{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode(authMode === "login" ? "register" : "login");
                      setMessage("");
                    }}
                  >
                    {authMode === "login" ? "Create an account" : "Login"}
                  </button>
                </p>
              </form>
            )}

            {message && <p className="message">{message}</p>}
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
