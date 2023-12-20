import "dotenv/config";
import express from 'express';
import "./database/connectdb.js"
import cors from 'cors';
import authRouter from "./routes/auth.route.js";
import fetchRouter from "./routes/fetch.route.js";
import writteInfoRouter from "./routes/writteInfo.route.js"
import {requiereToken} from "./middlewares/requiereToken.js"

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/api/auth",authRouter);
app.use("/api/fetchInfo",requiereToken,fetchRouter);
app.use("/api/writteInfo",requiereToken,writteInfoRouter);

// Ruta principal
app.get("/", (req, res) => {
    res.json({Message: "Coco, te amo <3"});
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Servidor escuchando en: ",port));
