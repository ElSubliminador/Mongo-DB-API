import mongoose from "mongoose";

const CURPREGEX=/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/

const capacitadoSchema = mongoose.Schema({
        curp:{
            type: String,
            required: [true, "El curp es requerido"],
            trim: true,
            unique: true,
            maxlength: [18, "El CURP no puede ser mayor a 18"],
            minlength: [18, "El CURP no puede ser menor a 18"],
            match:[CURPREGEX,"El curp ingresado no es valido"]
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
        nomCompleto:{
            type: String,
            required: [true, "El nombre es requerido"],
            trim: true
        },
        edad: {
            type: Number,
            required: [true, "La edad es requerida"],
        },
        probVision:{
            type: String,
            required: true,
            trim: true
        }
});

export const Capacitado = mongoose.model("Capacitado",capacitadoSchema);