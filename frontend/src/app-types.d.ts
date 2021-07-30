import {Action as ReduxAction} from "redux";

declare interface Action<T = any>{
    readonly type: string;
    readonly payload?: T;
}

export declare type Dispatch<T = any> = (_: Action<T>) => void;

export type Role = {
    _id: string;
    code: string;
};

export type User = {
    _id: string;
    name: string;
    roles: Array<Role>;
    profilePicUrl?: string;
};

export type Message = {
    text: string;
    type: 'success' | 'warning' | 'error' | 'info'
};

export type EventInfo = {
    _id: string,
    registeredTeams: Array<string>,
    status: boolean,
    //TODO: Добавить enum
    code: string,
    description: string,
    name: string,
    place: string,
    questionAmount: number,
    questionInTour: number,
    startDate: Date,
    updatedAt: Date,
    createdAt: Date
}


type TeamInfo = {
    _id: string,
    status: boolean,
    overallPlace: number,
    rating: number,
    teamMates: Array<string>,
    name: string,
    capitan: User
}

type EventTeamResults = {
    _id: string,
    place: number,
    rightAnswers: number,
    questionResult: string,
    rating: number,
    playersOnGame: Array<string>
    eventInfo: EventInfo[]
}

export type UserTeam = {
    teamInfo: TeamInfo;
    eventResults: EventTeamResults[];
    
}




