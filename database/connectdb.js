import mongoose from "mongoose";

try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado a MongoDB Atlas");
} catch (err) {
    console.error("Error de conexión con MongoDB Atlas"+err);
}

