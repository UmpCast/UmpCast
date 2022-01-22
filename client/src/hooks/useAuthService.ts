import { IsRegisteredQuery, IsRegisteredDocument } from '@/generated'
import { authMachine } from '@/machines/authMachine'
import { useInterpret } from '@xstate/react'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { Client, useClient } from 'urql'
import { pipe, map, toObservable } from 'wonka'
import { Subscribable } from 'xstate'

export interface AuthServiceOptions {
    client: Client
    resetClient: () => void
}

export default function useAuthService({ client, resetClient }: AuthServiceOptions) {
    return useInterpret(
        authMachine
            .withContext({
                client
            })
            .withConfig({
                actions: {
                    resetClient
                },
                services: {
                    listenFirebase: (_) => (callback) =>
                        onAuthStateChanged(getAuth(), (user) => {
                            callback(user !== null ? 'HAS_USER' : 'NO_USER')
                        }),
                    listenRegistration: ({ client }) =>
                        pipe(
                            client.query<IsRegisteredQuery>(
                                IsRegisteredDocument
                            ),
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
    )
}
