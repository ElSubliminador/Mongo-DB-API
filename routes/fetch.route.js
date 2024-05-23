import {Router} from "express";
import {fetchCapNom,fetchCapCurp,fetchStatsIndv,fetchStatsGlob} from "../controllers/fetch.controller.js"

const router = Router();

router.get("/nomCap/:name",fetchCapNom);
router.post("/curpCap/",fetchCapCurp);
router.get("/estIndv/:_id",fetchStatsIndv);
router.get("/estGlob/:anio",fetchStatsGlob);

export default router;