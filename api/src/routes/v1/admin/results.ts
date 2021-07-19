import express from "express";
import asyncHandler from "../../../helpers/asyncHandler";
import {ProtectedRequest} from "app-request";
import ChgkResultRepo from "../../../database/repository/ChgkResultRepo";
import {GameResultStatusCode, TeamResult} from "../../../database/model/ChgkResult";
import {Types} from "mongoose";
import Event from "../../../database/model/Event";
import {InternalError} from "../../../core/ApiError";
import Team from "../../../database/model/Team";
import {SuccessMsgResponse} from "../../../core/ApiResponse";

const router = express.Router();
//TODO: Валидатор
router.put(
    '/:id/chgk/add',
    asyncHandler(async (req: ProtectedRequest, res) => {
        const resultDoc = await ChgkResultRepo.findAllResultByEvent(
            {
                _id: new Types.ObjectId(req.params.id)
            } as Event);
        if (!resultDoc){
             const preResult = await ChgkResultRepo.createPreResultByEvent({_id: Types.ObjectId(req.params.id)}as Event);
             if (!preResult) throw new InternalError();
        }
        const teamResults: TeamResult[] = req.body.teamResults
            .map(
                (obj: any) => {
                    const team = {_id: Types.ObjectId(obj.team)} as Team;
                    return ({
                        //TODO: Добавить проверку на null у данных пришедших с клиента
                        team: team,
                        place: obj.place,
                        rightAnswers: obj.rightAnswers,
                        questionResult: obj.questionResult,
                        rating: obj.rating,
                        status: obj.status,
                        playersOnGame: obj.playersOnGame
                    } as TeamResult)
                });


        const event = {_id: new Types.ObjectId(req.params.id)} as Event;

        const createdResults = await ChgkResultRepo.updateAllResultByEvent({
                event: event,
                teamResults: teamResults,
                status: GameResultStatusCode.CHECKING
            },
            event
        );

        if (!createdResults)
            throw new InternalError();

        new SuccessMsgResponse('Results added successful').send(res);
    })
);

router.patch(
    '/:id/chgk/closed',
    asyncHandler(async (req: ProtectedRequest, res) => {
        const updated = await ChgkResultRepo
            .ChangeChgkResultStatusByEvent
            (GameResultStatusCode.CLOSED, {_id: new Types.ObjectId(req.params.id)} as Event);
        if (!updated) throw new InternalError();

        new SuccessMsgResponse('Results was closed').send(res);
    })
)

export default router;