import {Estadisticas} from "../models/estadisticas.js"
import {Capacitado} from "../models/capacitado.js"

export const ponerEstadisticas = async (req,res,next) => {
    const {anio,mes,dia,espreguia,errores,wasCompleted,canterr,stiempo,ctiempo,capacitado} =req.body;
    try {

        const estadisticas = new Estadisticas({anio,mes,dia,espreguia,wasCompleted,errores,canterr,stiempo,ctiempo,capacitado});
        await estadisticas.save();
      return res.status(201).json({ok:"Exito al crear"});

  }catch (err) {
      console.log(err);
      return res.status(500).json({error: "Error en el servidor"});
  }
}

export const registerCap = async (req, res, next) => {
    const {curp,usuario,nombre,apaterno,amaterno,edad,probVision} = req.body;
    const nomCompleto = nombre + " " + apaterno + " " + amaterno;
    try {
        const capacitado = new Capacitado({curp,usuario,nombre,apaterno,amaterno,nomCompleto,edad,probVision});
        await capacitado.save();
        
        return res.status(201).json({ok:"Exito al crear"});
    }catch (err) {
        console.log(err);
        if(err.code === 11000){
            return res.status(400).json({error: "El usuario ya existe"});
        }
        return res.status(500).json({error: "Error en el servidor"});
    }
};
