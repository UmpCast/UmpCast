import Navigation from '@/app/navigation'
import AppProvider from './AppProvider'

export default function Main() {
    return (
        <AppProvider>
            <Navigation.ProtectedAppNavigator />
        </AppProvider>
    )
}
