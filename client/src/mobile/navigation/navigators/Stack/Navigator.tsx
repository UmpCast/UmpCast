import AccountScreen from '@/mobile/screens/AccountScreen'
import GameSearchScreen from '@/mobile/screens/GameSearchScreen'
import HomeScreen from '@/mobile/screens/HomeScreen'
import SeasonCalendarScreen from '@/mobile/screens/SeasonCalendarScreen'

import { TabsStackRoute } from '../TabsStack/types'
import { Stack } from './types'

type Props = {
    initialRoute: TabsStackRoute
}
export default function StackNavigator({ initialRoute }: Props) {
    return (
        <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{
                headerBackTitle: 'Back',
                title: ''
            }}
        >
            <Stack.Screen component={HomeScreen} name={TabsStackRoute.Home} />
            <Stack.Screen
                component={GameSearchScreen}
                name={TabsStackRoute.Search}
            />
            <Stack.Screen
                component={AccountScreen}
                name={TabsStackRoute.Account}
            />
        </Stack.Navigator>
    )
}
