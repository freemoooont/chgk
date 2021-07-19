import {model, Schema, Document} from "mongoose";
import User from "./User";

export const DOCUMENT_NAME = 'Team';
export const COLLECTION_NAME = 'teams';

//TODO: Добавить информацию о играх, рейтинг и прочие статистические штуки
export default interface Team extends Document{
    name: string;
    capitan: User;
    status?: boolean;
    overallPlace?: number;
    rating?: number;
    teamMates?: string[];
    profilePicUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

const schema = new Schema(
    {
        name: {
            type: Schema.Types.String,
            required: true,
            maxlength: 100,
        },
        capitan: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
            index: true
        },
        status: {
            type: Schema.Types.Boolean,
            required: true,
            default: true
        },
        overallPlace: {
          type: Schema.Types.Number,
          required: true,
          default: 999
        },
        rating: {
            type: Schema.Types.Number,
            required: true,
            default: 0
        },
        profilePicUrl: {
            type: Schema.Types.String,
            trim: true,
        },
        teamMates: [
            {
                type: Schema.Types.String,
            }
        ],
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
        versionKey: false,
    },
);

export const TeamModel = model<Team>(DOCUMENT_NAME, schema, COLLECTION_NAME);