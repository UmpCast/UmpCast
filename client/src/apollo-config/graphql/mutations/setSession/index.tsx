import { sessionVar } from "../../../clientCache";
import { createSetSession } from "./createSetSession";

export const setSession = createSetSession(sessionVar)