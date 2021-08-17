import { ReactiveVar } from "@apollo/client";
import { Session } from "../../../models/Session";

export const createSetSession = (sessionVar: ReactiveVar<Session>) => {
    return (updates: Partial<Session>) => sessionVar(
        {
            ...sessionVar(), 
            ...updates
        }
    )
}
