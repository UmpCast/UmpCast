import { AuthState } from '@/app/generated-types'
import AppStack from '../../app/components/AppStack'
import { Text } from 'native-base'
import useIntializeAuthstate from '../hooks/useInitializedAuthState'

interface ProtectedAppNavigatorProps {
    getAuthorizedScreens: (state: AuthState) => JSX.Element[]
}

export default function ProtectedAppNavigator({
    getAuthorizedScreens
}: ProtectedAppNavigatorProps) {
    const authState = useIntializeAuthstate()

    if (!authState) return <Text>Loading</Text>

    return (
        <AppStack.Navigator>
            {getAuthorizedScreens(authState)}
        </AppStack.Navigator>
    )
}
