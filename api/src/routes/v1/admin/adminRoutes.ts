import express from 'express';
import authetication from "../../../auth/authetication";
import role from "../../../helpers/role";
import {RoleCode} from "../../../database/model/Role";
import authorization from "../../../auth/authorization";
import event from './event';
import results from "./results";

const router = express.Router();

router.use('/', authetication, role(RoleCode.ADMIN), authorization);

router.use('/event', event);

router.use('/results/event', results);



export default router;