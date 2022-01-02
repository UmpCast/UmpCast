import ProtectedAppNavigatorContainer from '../containers/ProtectedAppNavigatorContainer'
import getAuthorizedScreens from '../utils/getAuthorizedScreens'
import AppLoadingView from './AppLoadingView'

export default function ProtectedAppNavigator() {
    return (
        <ProtectedAppNavigatorContainer
            loadingComponent={<AppLoadingView />}
            getAuthorizedScreens={getAuthorizedScreens}
        />
    )
}
