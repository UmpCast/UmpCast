import ProtectedAppNavigator from '../containers/ProtectedAppNavigator'
import getAuthorizedScreens from '../utils/getAuthorizedScreens'
import AppNavigationProvider from './AppNavigationProvider'
import AppLoadingView from './AppLoadingView'

export default function NavigatedApp() {
    return (
        <AppNavigationProvider>
            <ProtectedAppNavigator
                loadingComponent={<AppLoadingView />}
                getAuthorizedScreens={getAuthorizedScreens}
            />
        </AppNavigationProvider>
    )
}
