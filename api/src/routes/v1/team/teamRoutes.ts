import express from "express";
import authetication from "../../../auth/authetication";
import create from "./create";
import capitan from "./capitan";
import publicProfile from "./publicProfile";

const router = express.Router();

router.use('/public', publicProfile);

router.use('/', authetication);
router.use('/create', create);

//эндпоинты для капитанов
router.use('/capitan', capitan);

export default router;