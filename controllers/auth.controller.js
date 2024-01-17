import {Supervisor} from "../models/supervisor.js";
import {generateToken} from "../Utils/tokenManager.js";

export const login = async (req, res, next) => {
    try{
        const {usuario,password} = req.body;
        let supervisor = await Supervisor.findOne({usuario});
        if(!supervisor){
            return res.status(401).json({error: "Usuario  incorrecto o inexistente"});
        }
        
        const respuestaPassword = await supervisor.comparePassword(password);
        
        if(!respuestaPassword){
            return res.status(401).json({error: "Contraseña incorrecta"});
        }else{
            //Se genera el token y se envia
            const {token,expiresIn} = generateToken(supervisor.id,supervisor.nombre,supervisor.apaterno,supervisor.amaterno);
            return res.status(200).send(token);
        }
    }catch (err) {
        console.log(err);
        return res.status(500).json({error: "Error en el servidor"});
    }
};

export const registerSup = async (req, res, next) => {
    const {usuario,nombre,apaterno,amaterno,password} = req.body;
    try {
        const supervisor = new Supervisor({usuario,nombre,apaterno,amaterno,password});
        await supervisor.save();
        
        return res.status(201).json({ok:"Exito al crear"});
    }catch (err) {
        console.log(err);
        if(err.code === 11000){
            return res.status(400).json({error: "El usuario ya existe"});
        }
        return res.status(500).json({error: "Error en el servidor"});
    }
};