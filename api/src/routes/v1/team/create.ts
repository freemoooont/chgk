import express from 'express';
import asyncHandler from "../../../helpers/asyncHandler";
import {ProtectedRequest} from "app-request";
import TeamRepo from "../../../database/repository/TeamRepo";
import Team from "../../../database/model/Team";
import {SuccessResponse} from "../../../core/ApiResponse";

const router = express.Router()
//TODO: Валидатор
router.post(
    '/',
    asyncHandler(async(req:ProtectedRequest, res)=>{
        const createdTeam = await TeamRepo.create({
            name: req.body.name,
            capitan: req.user,
            teamMates: req.body.teamMates,
            profilePicUrl: req.body.profilePicUrl,
        } as Team);
        new SuccessResponse('Team created successful', createdTeam).send(res);
    })
)

export default router;