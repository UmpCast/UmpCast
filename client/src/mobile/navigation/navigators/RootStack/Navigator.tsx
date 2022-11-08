import SeasonCalendarScreen from '@/mobile/screens/SeasonCalendarScreen'
import TabsNavigator from '../Tabs/Navigator'
import { RootStack, RootStackRoute } from './types'

export default function RootStackNavigator() {
    return (
        <RootStack.Navigator>
            <RootStack.Screen
                component={TabsNavigator}
                name={RootStackRoute.Tabs}
                options={{
                    headerShown: false
                }}
            />
            <RootStack.Screen
                component={SeasonCalendarScreen}
                name={RootStackRoute.SeasonCalendar}
            />
        </RootStack.Navigator>
    )
}
