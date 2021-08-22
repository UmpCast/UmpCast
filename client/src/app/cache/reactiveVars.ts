import { makeVar } from "@apollo/client";
import { AuthToken } from "app/auth/models/token";

export const authTokenVar = makeVar<AuthToken | null>(null)