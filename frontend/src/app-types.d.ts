import { TeamResult } from "../../api/src/database/model/ChgkResult";

declare interface Action<T = any> {
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
  roles?: Array<Role>;
  profilePicUrl?: string;
};

export type Message = {
  text: string;
  type: "success" | "warning" | "error" | "info";
};

export type EventInfo = {
  _id: string;
  registeredTeams: Array<string>;
  status: boolean;
  //TODO: Добавить enum
  code: string;
  description: string;
  name: string;
  place: string;
  questionAmount: number;
  questionInTour: number;
  startDate: Date;
  updatedAt: Date;
  createdAt: Date;
};

export type TeamInfo = {
  _id: string;
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

type EventTeamResults = {
  _id: string;
  place: number;
  rightAnswers: number;
  questionResult: string;
  rating: number;
  playersOnGame: Array<string>;
  eventInfo: EventInfo[];
};

export type Team = {
  teamInfo: TeamInfo;
  eventResults: EventTeamResults[];
};

export type Event = {
  _id: string;
  name: string;
  description: string;
  code: string;
  startDate: Date;
  place: string;
  registeredTeams?: TeamInfo[];
  status?: boolean;
  questionAmount?: number;
  questionInTour?: number;
  picUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ChgkResult = {
  event: Event;
  teamResults?: TeamResult[];
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TeamResult = {
  team: Team;
  place?: number;
  rightAnswers?: number;
  questionResult?: string;
  rating?: number;
  status?: boolean;
  playersOnGame?: string[];
};
