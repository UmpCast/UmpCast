import { AppVar } from '@/apollo/appCache'
import { useGetMyInfoLazyQuery, AuthState } from '@/apollo/generated'

export default function useAssertRegistered() {
    const [getMyInfo] = useGetMyInfoLazyQuery()

    const assertRegistered = async () => {
        const { data } = await getMyInfo()

        const newAuthState = data?.me
            ? AuthState.Authenticated
            : AuthState.Unregistered
        AppVar.authState(newAuthState)
    }

    return assertRegistered
}
