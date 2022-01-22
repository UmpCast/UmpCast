import { Client } from 'urql'
import { createMachine, Interpreter, sendParent, State } from 'xstate'

export type AuthContext = {
    client: Client
}

export type AuthEvent =
    | { type: 'NO_USER' }
    | { type: 'HAS_USER' }
    | { type: 'UNREGISTERED' }
    | { type: 'REGISTERED' }

export type AuthTypestate = {
    value:
        | 'loading'
        | 'unauthenticated'
        | 'authenticated'
        | 'authenticated.loading'
        | 'authenticated.unauthorized'
        | 'authenticated.authorized'
    context: AuthContext
}

export const authMachine = createMachine<AuthContext, AuthEvent, AuthTypestate>(
    {
        initial: 'loading',
        invoke: {
            src: 'listenFirebase'
        },
        entry: 'resetClient',
        on: {
            NO_USER: '.unauthenticated',
            HAS_USER: '.authenticated'
        },
        states: {
            loading: {},
            unauthenticated: {
                entry: 'resetClient'
            },
            authenticated: {
                initial: 'loading',
                invoke: {
                    src: 'listenRegistration'
                },
                on: {
                    UNREGISTERED: '.unauthorized',
                    REGISTERED: '.authorized'
                },
                states: {
                    loading: {},
                    unauthorized: {},
                    authorized: {}
                }
            }
        }
    }
)

export type AuthService = Interpreter<
    AuthContext,
    any,
    AuthEvent,
    AuthTypestate
>

export type AuthState = State<AuthContext, AuthEvent, AuthTypestate>
