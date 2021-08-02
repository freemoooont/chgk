import express from "express";
import asyncHandler from "../../../helpers/asyncHandler";
import EventRepo from "../../../database/repository/EventRepo";
import { BadRequestError, NoDataError } from "../../../core/ApiError";
import { SuccessResponse } from "../../../core/ApiResponse";
import { ProtectedRequest, PublicRequest } from "app-request";
import { Types } from "mongoose";
import ChgkResultRepo from "../../../database/repository/ChgkResultRepo";
import Event from "../../../database/model/Event";

const router = express.Router();

router.get(
  "/all",
  asyncHandler(async (_, res) => {
    const events = await EventRepo.findAll();
    if (!events) throw new NoDataError("No events");

    new SuccessResponse("Success", events).send(res);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req: ProtectedRequest, res) => {
    const event = await EventRepo.findInfoById(Types.ObjectId(req.params.id));
    if (!event) throw new BadRequestError("Event does not exist");

    new SuccessResponse("Success", event).send(res);
  })
);

//TODO: Добавить проверку по GameStatusCode. ПОЧНМУ ЗДЕСЬ ПРОТЕКТЕД??/??/7/
router.get(
  "/type/:code",
  asyncHandler(async (req: ProtectedRequest, res) => {
    const code = req.params.code.toUpperCase();
    const events = await EventRepo.findAllByCode(code);
    if (!events) throw new NoDataError("No events");

    new SuccessResponse("Success", events).send(res);
  })
);

router.get(
  "/result/id/:id",
  asyncHandler(async (req: PublicRequest, res) => {
    const result = await ChgkResultRepo.findAllResultByEvent({
      _id: Types.ObjectId(req.params.id),
    } as Event);
    if (!result) throw new BadRequestError("Result does not exist");

    new SuccessResponse("Success", result).send(res);
  })
);

export default router;
