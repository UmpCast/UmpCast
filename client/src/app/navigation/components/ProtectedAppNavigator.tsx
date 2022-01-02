import { Text } from 'react-native'
import ProtectedAppNavigatorContainer from '../containers/ProtectedAppNavigatorContainer'
import getAuthorizedScreens from '../utils/getAuthorizedScreens'

export default function ProtectedAppNavigator() {
    return (
        <ProtectedAppNavigatorContainer
            loadingComponent={<Text>loading</Text>}
            getAuthorizedScreens={getAuthorizedScreens}
        />
    )
}
