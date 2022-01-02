import { AuthState } from '@/app/generated-types'
import AppNavigator from '../components/AppNavigator'
import useIntializeAuthstate from '../hooks/useInitializedAuthState'

interface ProtectedAppNavigatorProps {
    loadingComponent: JSX.Element
    getAuthorizedScreens: (state: AuthState) => JSX.Element[]
}

export default function ProtectedAppNavigator({
    loadingComponent,
    getAuthorizedScreens
}: ProtectedAppNavigatorProps) {
    const authState = useIntializeAuthstate()

    if (!authState) return loadingComponent

    return (
        <AppNavigator authState={authState}>
            {getAuthorizedScreens(authState)}
        </AppNavigator>
    )
}
