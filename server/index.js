import express from "express";
import bodyParser from "body-parser";

import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import donorRoutes from "./routes/donor_routes.js";
import dEventRoutes from "./routes/d_events_routes.js";
import itemsRoutes from "./routes/items_routes.js";
import items_outRoutes from "./routes/items_out_routes.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import treeplantation from "./routes/treeplantation.js";
import sponsors from "./routes/sponsors.js";
import ocr from "./routes/ocr_routes.js";

/* CONFIGURATION */
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["https://esm-deploy.vercel.app"],
    method: ["POST", "GET"],
    credentials: true,
  })
);
//all done
/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);
app.use("/donors", donorRoutes);
app.use("/donorevents", dEventRoutes);
app.use("/items", itemsRoutes);
app.use("/items_out", items_outRoutes);
app.use("/treePlantationEvent", treeplantation);
app.use("/sponsors", sponsors);
app.use("/ocr", ocr);

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

/* MONGOOSE SETUP */
const PORT = 5000 || 9000;
mongoose
  .connect(
    "mongodb+srv://ghost:ghost99@esm.gjtd61h.mongodb.net/ESM?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.get("/", (req, res) => {
      res.send("Hello World!");
    });
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
