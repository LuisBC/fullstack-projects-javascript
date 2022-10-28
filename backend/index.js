process.env.NODE_ENV !== "production" && require("dotenv").config();

const express = require("express");
const morgan = require("morgan"); // Depuración de requests
const multer = require("multer"); // Uso de imágenes
const path = require("path");
const cors = require("cors");

// Initi|alizations
const app = express();
require("./database");

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(morgan("dev"));
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename(req, file, cb) {
    cb(null, new Date().getTime() + path.extname(file.originalname)); // 12132454543.extension
  },
});
app.use(multer({ storage }).single("image")); // Analiza solo una imagen a la vez
app.use(express.urlencoded({ extended: false })); //  Obtener datos de un formulario
app.use(express.json()); // Recibir y enviar jsons
app.use(cors());

// Routes
app.use("/api/books", require("./routes/books"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Start the server
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
