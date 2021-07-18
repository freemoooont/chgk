import express from 'express';
import asyncHandler from "../../../helpers/asyncHandler";
import {ProtectedRequest} from "app-request";
import TeamRepo from "../../../database/repository/TeamRepo";
import {Types} from "mongoose";
import {BadRequestError, ForbiddenError} from "../../../core/ApiError";
import {SuccessResponse} from "../../../core/ApiResponse";
import authetication from "../../../auth/authetication";
import role from "../../../helpers/role";
import {RoleCode} from "../../../database/model/Role";
import authorization from "../../../auth/authorization";

const router = express.Router();

router.use('/', authetication, role(RoleCode.CAPITAN), authorization);
//TODO: Валидатор
router.put(
    '/:id',
    asyncHandler(async(req:ProtectedRequest, res)=>{
        const team = await TeamRepo.findById(Types.ObjectId(req.params.id));
        if (team == null)
            throw new BadRequestError("Team does not exist");

        if(!team.capitan._id.equals(req.user._id))
            throw new ForbiddenError("You don\'t have necessary permissions");

        if (req.body.name) team.name = req.body.name;
        if (req.body.profilePicUrl) team.profilePicUrl = req.body.profilePicUrl;
        if (req.body.teamMates) team.teamMates = req.body.teamMates;

        await TeamRepo.updateInfo(team);
        new SuccessResponse('Team updated successful', team).send(res);
    })
);

export default router;