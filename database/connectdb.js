import mongoose from "mongoose";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Especifica el puerto deseado en las opciones de configuración
    // por ejemplo, para el puerto 27018:
};

try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado a MongoDB Atlas");
} catch (err) {
    console.error("Error de conexión con MongoDB Atlas"+err);
}