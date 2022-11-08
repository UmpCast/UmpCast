import TabsNavigator from '../Tabs/Navigator'
import TabsStackNavigator from '../TabsStack/Navigator'
import { TabsStackRoute } from '../TabsStack/types'
import { RootStack, RootStackRoute } from './types'

function TabsStackScreen () {
    return <TabsStackNavigator initialRoute={TabsStackRoute.Home}/>
}

export default function RootStackNavigator() {
    return (
        <RootStack.Navigator screenOptions={{
            headerShown: false
        }}>
            <RootStack.Screen
                component={TabsNavigator}
                name={RootStackRoute.Tabs}
            />
            <RootStack.Screen
                component={TabsStackScreen}
                name={RootStackRoute.TabsStack}
            />
        </RootStack.Navigator>
    )
}
