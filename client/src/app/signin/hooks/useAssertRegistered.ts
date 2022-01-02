import { AppVar } from '@/app/app/utils/appCache'
import { AuthState, useGetMyInfoLazyQuery } from '@/app/generated-types'

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
