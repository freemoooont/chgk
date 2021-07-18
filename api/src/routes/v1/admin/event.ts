import express from 'express';
import asyncHandler from "../../../helpers/asyncHandler";
import {ProtectedRequest} from "app-request";
import EventRepo from "../../../database/repository/EventRepo";
import validator from "../../../helpers/validator";
import schema from "./schema";
import Event from "../../../database/model/Event";
import {SuccessResponse} from "../../../core/ApiResponse";

const router = express.Router();

router.post(
    '/create',
    validator(schema.eventCreate),
    asyncHandler(async (req: ProtectedRequest, res)=>{
        const createdEvent = await EventRepo.create({
            code: req.body.code,
            description: req.body.description,
            name: req.body.name,
            picUrl: req.body.picUrl,
            place: req.body.place,
            questionAmount: req.body.questionAmount,
            questionInTour: req.body.questionInTour,
            startDate: req.body.startDate,
        } as Event);

        new SuccessResponse('Event created successfully', createdEvent).send(res)
    })
);

export default router;