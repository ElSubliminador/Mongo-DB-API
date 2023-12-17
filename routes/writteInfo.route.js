import {Router} from "express";
import {ponerEstadisticas, registerCap} from "../controllers/writteInfo.controller.js"
import {requiereToken} from "../middlewares/requiereToken.js"

const router = Router();

router.post(
    "/estadisticas",
    ponerEstadisticas);
    
router.post(
    "/register/capacitado",
    registerCap);

export default router;