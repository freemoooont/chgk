import express from "express";
import asyncHandler from "../../../helpers/asyncHandler";
import {PublicRequest} from "app-request";
import TeamRepo from "../../../database/repository/TeamRepo";
import {InternalError} from "../../../core/ApiError";
import {SuccessResponse} from "../../../core/ApiResponse";

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

export default router;