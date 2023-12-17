import jwt from "jsonwebtoken";
export const generateToken = (sid,nom,ap,am) =>{
    const expiresIn = 60 * 15;
    try {
        const token = jwt.sign({sid:sid,nom:nom,ap:ap,am:am}, process.env.SECRET_KEY,{ expiresIn:'4h'});
        return {token,expiresIn}
    }catch (err) {
        console.log(err);
    }
}