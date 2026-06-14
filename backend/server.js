require("dotenv").config();

const app = require("./src/app");
const connectDatabase = require("./src/shared/database/mongoose");

const port = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDatabase();

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();