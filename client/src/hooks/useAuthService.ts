import { IsRegisteredQuery, IsRegisteredDocument } from '@/generated'
import { authMachine } from '@/machines/authMachine'
import { useInterpret } from '@xstate/react'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { Client, useClient } from 'urql'
import { pipe, map, toObservable } from 'wonka'
import { Subscribable } from 'xstate'

export default function useAuthService() {
    const client = useClient()

    return useInterpret(() =>
        authMachine.withConfig({
            services: {
                listenFirebase: (_) => (callback) =>
                    onAuthStateChanged(getAuth(), (user) => {
                        callback(user !== null ? 'HAS_USER' : 'NO_USER')
                    }),
                listenRegistration: () =>
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
    )
}
