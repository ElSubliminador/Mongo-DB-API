import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const supervisorSchema = mongoose.Schema({
    usuario:{
        type: String,
        unique: true,
        required: [true, "El nombre de usuario es requerido"],
        maxlength: [20, "El nombre de usuario no puede exceder los 20 caracteres"],
        trim: true,
    },
    nombre: {
        type: String,
        required: [true, "El nombre es requerido"],
        trim: true
    },
    apaterno: {
        type: String,
        required: [true, "El apellido paterno es requerido"],
        trim: true
    },
    amaterno: {
        type: String,
        required: false,
        trim: true
    },
    password: {
        type: String,
        trim: true,
        required: [true, "La contraseña es requerida"],
        minlength: [8, "La contraseseña no puede tener menos de 8 caracteres"],
    }
});
//Antes de guardar en la base de datos, se hashea la contraseña
supervisorSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
        next();
    }catch(err){
        throw new Error("Fallo en el hash de contraseña");
    }
});

supervisorSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password);
}
export const Supervisor = mongoose.model("Supervisor",supervisorSchema);