import {Schema, model, Document} from "mongoose";
import Team from "./Team";

export const DOCUMENT_NAME = 'Event';
export const COLLECTION_NAME = 'events';

export const enum EventTypeCode {
    ETAP = 'ETAP',
    TRAINING = 'TRAINING',
    KNOPKI = 'KNOPKI',
    SINHRON = 'SINHRON'
}

export default interface Event extends Document{
    name: string;
    description: string;
    code: string;
    startDate: Date;
    place: string;
    registeredTeams?: Team[];
    status?: boolean;
    questionAmount?: number;
    questionInTour?: number;
    picUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const schema = new Schema(
    {
        name: {
            type: Schema.Types.String,
            required: true,
            maxlength: 100
        },
        description: {
            type: Schema.Types.String,
            required: true
        },
        code: {
            type: Schema.Types.String,
            required: true,
            enum: [EventTypeCode.ETAP, EventTypeCode.KNOPKI, EventTypeCode.SINHRON, EventTypeCode.TRAINING]
        },
        startDate: {
            type: Schema.Types.Date,
            required: true
        },
        place: {
            type: Schema.Types.String,
            required: true,
            trim: true
        },
        registeredTeams: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Team'
                }
            ],
            select: false,
            required: true,
            default: []
        },
        status: {
            type: Schema.Types.Boolean,
            required: true,
            default: true
        },
        questionAmount: {
            type: Schema.Types.Number,
            min: 0,
            select: false
        },
        questionInTour: {
            type: Schema.Types.Number,
            min: 0,
            select: false
        },
        picUrl: {
            type: Schema.Types.String,
            trim: true
        },
        createdAt: {
            type: Date,
            required: true,
            select: false,
        },
        updatedAt: {
            type: Date,
            required: true,
            select: false,
        },
    },
    {
        versionKey: false
    }
);

interface EventModelInterface extends Event, Document {}
export const EventModel = model<EventModelInterface>(DOCUMENT_NAME, schema, COLLECTION_NAME);