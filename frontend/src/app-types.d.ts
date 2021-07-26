import {Action as ReduxAction} from "redux";

declare interface Action<T = any>{
    readonly type: string;
    readonly payload?: T;
}

declare type Dispatch<T = any> = (_: Action<T>) => void;