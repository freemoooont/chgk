import {Schema, model, Document} from 'mongoose';
import Event from "./Event";
import Team from "./Team";

export const DOCUMENT_NAME = 'ChgkResult';
export const COLLECTION_NAME = 'chgkresults';

export const enum GameResultStatusCode {
    OPEN="OPEN",
    CLOSED="CLOSED",
    CHECKING = "CHECKING"
}

export interface TeamResult{
    team: Team;
    place?: number;
    rightAnswers?: number;
    questionResult?: string;
    rating?: number;
    status?: boolean;
    playersOnGame?: string[];
}

export default interface ChgkResult {
    event: Event;
    teamResults?: TeamResult[];
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type ChgkResultInterfaceDocument = ChgkResult & Document

const teamResultSchema = new Schema(
    {
        team: {
            type: Schema.Types.ObjectId,
            ref: 'Team',
            required: true
        },
        place: {
            type: Schema.Types.Number,

        },
        rightAnswers: {
            type: Schema.Types.Number,
            required: true,
            default: 0
        },
        questionResult: {
            type: Schema.Types.String,
            trim: true,
            required: true,
            default: '0'
        },
        rating: {
            type: Schema.Types.Number,
            min: 0,
            required: true,
            default: 0
        },
        status: {
            type: Schema.Types.Boolean,
            required: true,
            default: false
        },
        playersOnGame: {
            type: [
                {
                    type: Schema.Types.String
                }
            ],
            required: false,
            default: undefined
        }
    }
)
const schema = new Schema(
    {
        event: {
            type: Schema.Types.ObjectId,
            ref: 'Event',
            required: true
        },
        teamResults: {
            type: [teamResultSchema],
            required: true
        },
        status: {
            type: Schema.Types.String,
            required: true,
            enum: [GameResultStatusCode.CHECKING, GameResultStatusCode.CLOSED, GameResultStatusCode.OPEN],
            default: GameResultStatusCode.CLOSED
        },
        createdAt: {
            type: Date,
            select: false,
        },
        updatedAt: {
            type: Date,
            select: false,
        },
    },
    {
        versionKey: false
    })

export const ChgkResultModel = model<ChgkResultInterfaceDocument>(DOCUMENT_NAME, schema, COLLECTION_NAME)