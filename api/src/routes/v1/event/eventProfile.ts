import express from "express";
import asyncHandler from "../../../helpers/asyncHandler";
import EventRepo from "../../../database/repository/EventRepo";
import {BadRequestError, NoDataError} from "../../../core/ApiError";
import {SuccessResponse} from "../../../core/ApiResponse";
import {ProtectedRequest} from "app-request";
import {Types} from "mongoose";

const router = express.Router();

router.get(
    '/all',
    asyncHandler(async(_,res)=>{
      const events = await EventRepo.findAll();
      if (!events) throw new NoDataError('No events');

      new SuccessResponse('Success', events).send(res);
    })
);

router.get(
    '/:id',
    asyncHandler(async(req: ProtectedRequest,res)=>{
        const event = await EventRepo.findInfoById(Types.ObjectId(req.params.id));
        if(!event) throw new BadRequestError('Event does not exist');

        new SuccessResponse('Success', event).send(res);
    })
);

//TODO: Добавить проверку по GameStatusCode
router.get(
    '/type/:code',
    asyncHandler(async(req: ProtectedRequest,res)=>{
        const code = req.params.code.toUpperCase();
        const events = await EventRepo.findAllByCode(code);
        if(!events) throw new NoDataError('No events');

        new SuccessResponse('Success', events).send(res);
    })
);

export default router;