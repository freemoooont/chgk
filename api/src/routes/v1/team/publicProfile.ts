import express from "express";
import asyncHandler from "../../../helpers/asyncHandler";
import {PublicRequest} from "app-request";
import TeamRepo from "../../../database/repository/TeamRepo";
import {InternalError} from "../../../core/ApiError";
import {SuccessResponse} from "../../../core/ApiResponse";
import {Types} from "mongoose";
import ChgkResultRepo from "../../../database/repository/ChgkResultRepo";

const router = express.Router();

//TODO: Валидация
router.get(
    '/all',
    asyncHandler(async(req:PublicRequest,res)=>{
        const teams = await TeamRepo.findAll();
        if(!teams) throw new InternalError();

        new SuccessResponse('Success', teams).send(res);
    })
);
//TODO: Валидация
router.get(
    '/id/:id',
    asyncHandler(async(req:PublicRequest,res)=>{
        const team = await TeamRepo.findById(Types.ObjectId(req.params.id));
        if (team == null) throw new InternalError();
        const allResults = await ChgkResultRepo.findResultsByTeam(team);
        const data = {
            teamInfo: team,
            eventResults: allResults
        };
        new SuccessResponse('Team info', data).send(res);
    })
)

export default router;