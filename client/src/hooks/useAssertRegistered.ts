import { appVar } from '@/apollo/appCache'
import { useGetMyIdLazyQuery, AuthState } from '@/apollo/generated'

export default function useAssertRegistered() {
    const [getMyId] = useGetMyIdLazyQuery()

    const assertRegistered = async () => {
        const { data } = await getMyId()

        const newAuthState = data?.me
            ? AuthState.Authenticated
            : AuthState.Unregistered
        appVar.authState(newAuthState)
    }

    return assertRegistered
}
