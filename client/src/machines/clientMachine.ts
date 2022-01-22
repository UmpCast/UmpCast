import { Client } from 'urql'
import { ActorRef, createMachine } from 'xstate'
import { AuthContext } from './authMachine'

export type ClientContext = {
    client: null | Client
    authService: null | ActorRef<any>
}

export type ClientTypestate = {
    value: 'running'
    context: ClientContext & {
        client: Client
        authService: ActorRef<any>
    }
}

export const clientMachine = createMachine<ClientContext, any, ClientTypestate>(
    {
        context: {
            client: null,
            authService: null
        },
        initial: 'running',
        states: {
            running: {
                entry: ['resetClient', 'spawnAuth'],
                on: {
                    RESET_CLIENT: {
                        target: 'running'
                    }
                }
            }
        }
    }
)
