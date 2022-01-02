import { AuthState } from '@/app/generated-types'
import AppStack from '../components/AppStack'
import useIntializeAuthstate from '../hooks/useInitializedAuthState'

interface ProtectedAppNavigatorContainerProps {
    loadingComponent: JSX.Element
    getAuthorizedScreens: (state: AuthState) => JSX.Element[]
}

export default function ProtectedAppNavigatorContainer({
    loadingComponent,
    getAuthorizedScreens
}: ProtectedAppNavigatorContainerProps) {
    const authState = useIntializeAuthstate()

    if (!authState) return loadingComponent

    return (
        <AppStack.Navigator>
            {getAuthorizedScreens(authState)}
        </AppStack.Navigator>
    )
}
