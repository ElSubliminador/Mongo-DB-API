import jwt from "jsonwebtoken";
export const requiereToken = (req,res,next) => {
    
    const token = req.header('auth-token');
    if(!token) return res.status(401).json({ error: 'Acceso denegado'});
    try {
        const verified = jwt.verify(token,process.env.SECRET_KEY);
        req.user = verified;
        next();
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: 'token no valido'});
    }
}


