import express from 'express';
import {Types} from 'mongoose';
import authetication from "../../../auth/authetication";
import role from "../../../helpers/role";
import {RoleCode} from "../../../database/model/Role";
import authorization from "../../../auth/authorization";
import asyncHandler from "../../../helpers/asyncHandler";
import {ProtectedRequest} from "app-request";
import {BadRequestError} from "../../../core/ApiError";
import TeamRepo from "../../../database/repository/TeamRepo";
import EventRepo from "../../../database/repository/EventRepo";
import {SuccessMsgResponse} from "../../../core/ApiResponse";

const router = express.Router();

router.use('/', authetication, role(RoleCode.CAPITAN), authorization);
//TODO: Валидатор
router.put(
    '/register/:id',
    asyncHandler(async(req:ProtectedRequest, res)=>{
        const team = await TeamRepo.findByCapitan(req.user);

        if (!team) throw new BadRequestError('Team does not exist');

        await EventRepo.addTeamById(team, Types.ObjectId(req.params.id));

        return new SuccessMsgResponse('Team registered successful').send(res);
    })
)

export default router;