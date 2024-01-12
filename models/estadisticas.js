import mongoose from "mongoose";

const estadisticasSchema = mongoose.Schema({
    anio: {
        type: Number,
        required: [true, "el año es requerido"]
    },
    mes: {
        type: Number,
        required: [true, "el mes es requerido"]
    },
    dia: {
        type: Number,
        required: [true, "el dia es requerido"]
    },
    espreguia: {
        type: Boolean,
        required: [true, "El tipo de ejercicio realizado es requerido"]
    },
    wasCompleted:{
        type: Boolean,
        required: [true, "Se debe indicar si el ejercicio fue completado"]
    },
    errores:{
        type: [String],
        required: false 
    },
    canterr:{
        type: Number,
        requerid: false
    },
    stiempo:{
        type: Number,
        required: [true, "El tiempo que definio el supervisor es requerido"],
    },
    ctiempo:{
        type: Number,
        required: [true, "El tiempo en el que termino el capacitado es requerido"],
    },
    capacitado:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Capacitado"
    }

});

export const Estadisticas = mongoose.model("Estadisticas",estadisticasSchema);