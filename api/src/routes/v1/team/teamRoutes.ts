import express from "express";
import authetication from "../../../auth/authetication";
import create from "./create";
import update from "./update";
import publicProfile from "./publicProfile";


const router = express.Router();

router.use('/public', publicProfile);

router.use('/', authetication);
router.use('/create', create);

//эндпоинты для капитанов
router.use('/update', update);

export default router;