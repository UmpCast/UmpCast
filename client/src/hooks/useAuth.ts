import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { IsRegisteredDocument, IsRegisteredQuery } from '@/generated'
import { authMachine } from '@/machines/authMachine'
import { useInterpret } from '@xstate/react'
import { Client } from 'urql'
import { pipe, toObservable, map } from 'wonka'
import { Subscribable } from 'xstate'

export default function useAuthPhase({ client }: { client: Client }) {
    const authService = useInterpret(authMachine, {
        devTools: true,
        context: {
            client
        },
        services: {
            listenFirebase: (_) => (callback) =>
                onAuthStateChanged(getAuth(), (user) => {
                    callback(user !== null ? 'HAS_USER' : 'NO_USER')
                }),
            listenRegistration: (_) =>
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

    return authService
}
