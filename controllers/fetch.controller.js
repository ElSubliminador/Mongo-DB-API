import {Capacitado} from "../models/capacitado.js"
import {Estadisticas} from "../models/estadisticas.js"
import mongoose from "mongoose";

export const fetchCapNom = async (req,res,next) => {
    const {name} = req.params;
    try {
        let capacitado = await Capacitado.find({
            $or: [
                { nomCompleto: { $regex: name, $options: 'i' } },
              ]
        }).collation({"locale" : "en", "strength" : 1});
        if (capacitado.length<=0){
          res.status(404).json({error: "No se encontraron capacitados"})
          return;
        }
        res.status(200).send(capacitado);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en la búsqueda' });
      }
} 

export const fetchCapCurp = async (req,res,next) => {
    const {curp} = req.params;
    try {
        let capacitado = await Capacitado.find({
            $or: [
                { curp: { $regex: curp, $options: 'i' } },
              ]
        }).collation({"locale" : "en", "strength" : 1});
        if (capacitado.length<=0){
          res.status(404).json({error: "No se encontraron capacitados"})
          return;
        }
        res.status(200).send(capacitado);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en la búsqueda' });
      }
}

export const fetchStatsIndv = async (req,res,next) => {
  const { _id } = req.params;
  try {
    const estadisticas = await Estadisticas.find({ capacitado: _id });

    if (estadisticas.length<=0){
      res.status(404).json({error: "No se han encontrado estaditicas"})
      return;
    }

     // Filtrar los datos según las condiciones necesarias
     const PreGuia = estadisticas.filter((item) => item.espreguia === true && item.wasCompleted === true);
     const PostGuia = estadisticas.filter((item) => item.espreguia === false && item.wasCompleted === true);
     const PreGuiaUC = estadisticas.filter((item) => item.espreguia === true && item.wasCompleted === false);
     const PostGuiaUC = estadisticas.filter((item) => item.espreguia === false && item.wasCompleted === false);
     // Calcular promedios
     const promedios = {
       erroresPre: calcularPromedio(PreGuia.concat(PreGuiaUC),"canterr"),
       erroresPost: calcularPromedio(PostGuia.concat(PostGuiaUC),"canterr"),
       tiemposPre: calcularPromedio(PreGuia,"ctiempo"),
       tiemposPost: calcularPromedio(PostGuia,"ctiempo"),
       cantPreguia_c: PreGuia.length,
       cantPostguia_c: PostGuia.length,
       cantPreguia_uc: PreGuiaUC.length,
       cantPostguia_uc: PostGuiaUC.length,
     };

      res.status(200).json(promedios);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}

export const fetchStatsGlob = async (req,res,next) => {
  const {anio} = req.params;
  try{
    let estadisticas = await Estadisticas.find({ anio });

    if (estadisticas.length<=0){
      res.status(404).json({error: "No se han encontrado estaditicas"})
      return;
    }

    const PreGuia = estadisticas.filter((item) => item.espreguia === true && item.wasCompleted === true);
    const PostGuia = estadisticas.filter((item) => item.espreguia === false && item.wasCompleted === true);
    const PreGuiaUC = estadisticas.filter((item) => item.espreguia === true && item.wasCompleted === false);
    const PostGuiaUC = estadisticas.filter((item) => item.espreguia === false && item.wasCompleted === false);

    const datos = {
      erroresPre: calcularPromedio(PreGuia.concat(PreGuiaUC),"canterr"),
      erroresPost: calcularPromedio(PostGuia.concat(PostGuiaUC),"canterr"),
      tiemposPre: calcularPromedio(PreGuia,"ctiempo"),
      tiemposPost: calcularPromedio(PostGuia,"ctiempo"),
      Ex_Pre: PreGuia.length,
      Fra_Pre: PreGuiaUC.length,
      Ex_Post: PostGuia.length,
      Fra_Post: PostGuiaUC.length,
      Freq_err: calcularFreqErr(PreGuia.concat(PostGuia).concat(PreGuiaUC).concat(PostGuiaUC)),
    }
      res.status(200).json(datos);
    
  } catch(error){
    console.error(error);
    res.status(500).json({error: error})
  }
}

const calcularPromedio = (data,id) => {
  if (data.length === 0) {
    return 0; // Devolver 0 si no hay datos
  }
  const sum = data.reduce((acc, item) => acc + item[id], 0);
  return sum / data.length;
};

const calcularFreqErr = (data) =>{
  const obj_aux = {
    err0: 0,
    err1: 0,
    err2: 0,
    err3: 0,
    err4: 0,
  }
  
  data.forEach((stats)=>{
    stats.errores.forEach((error)=>{
      if(obj_aux.hasOwnProperty(error))
        obj_aux[error]++;
    })
  })

  let aux = [];
  for (const key in obj_aux) {
    aux.push(obj_aux[key]);
  }
  return aux;
}