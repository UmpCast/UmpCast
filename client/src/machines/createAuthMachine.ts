import createAppClient from '@/client'
import { IsRegisteredQuery, IsRegisteredDocument } from '@/generated'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { Client } from 'urql'
import { pipe, map, toObservable } from 'wonka'
import { Subscribable, assign } from 'xstate'
import { authMachine } from './authMachine'
console.log()
export default function createAuthMachine({createClient = createAppClient}: {createClient: () => Client}) {
    return authMachine
        .withConfig({
            actions: {
                resetClient: assign((_) => {
                    return {
                        client: createClient()
                    }
                })
            },
            services: {
                listenFirebase: (_) => (callback) =>
                    onAuthStateChanged(getAuth(), (user) => {
                        callback(user !== null ? 'HAS_USER' : 'NO_USER')
                    }),
                listenRegistration: ({ client }) =>
                    pipe(
                        client.query<IsRegisteredQuery>(IsRegisteredDocument),
                        map(({ data }) => {
                            return {
                                type: data?.isRegistered
                                    ? 'REGISTERED'
                                    : 'UNREGISTERED'
                            }
                        }),
                        toObservable
                    ) as Subscribable<any>
            }
        })
}
