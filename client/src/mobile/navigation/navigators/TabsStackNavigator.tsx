import AddDivisionScreen from '@/mobile/screens/AddDivisionScreen'
import AddPositionScreen from '@/mobile/screens/AddPositionScreen'
import AddSeasonParticipantsScreen from '@/mobile/screens/AddSeasonParticipantsScreen'
import ChangeGameListingAssigneeScreen from '@/mobile/screens/ChangeGameListingAssigneeScreen'
import CreateGameScreen from '@/mobile/screens/CreateGameScreen'
import CreateOrgScreen from '@/mobile/screens/CreateOrgScreen'
import CreateSeasonScreen from '@/mobile/screens/CreateSeasonScreen'
import JoinOrgScreen from '@/mobile/screens/JoinOrgScreen'
import { TabsStack, NavRoute } from '../routes'
import TabsNavigator from './TabsNavigator'

export default function TabsStackNavigator() {
    return (
        <TabsStack.Navigator
            screenOptions={{
                headerBackTitle: 'Back',
                title: '',
                headerShadowVisible: false
            }}
        >
            <TabsStack.Screen
                component={TabsNavigator}
                name={NavRoute.Tabs_}
                options={{
                    headerShown: false
                }}
            />
            <TabsStack.Screen
                component={JoinOrgScreen}
                name={NavRoute.JoinOrg}
            />
            <TabsStack.Screen
                component={ChangeGameListingAssigneeScreen}
                name={NavRoute.ChangeGameListingAssignee}
            />
            <TabsStack.Screen
                component={CreateOrgScreen}
                name={NavRoute.CreateOrg}
            />
            <TabsStack.Screen
                component={CreateGameScreen}
                name={NavRoute.CreateGame}
            />
            <TabsStack.Screen
                component={CreateSeasonScreen}
                name={NavRoute.CreateSeason}
            />
            <TabsStack.Screen
                component={AddSeasonParticipantsScreen}
                name={NavRoute.AddSeasonParticipants}
            />
            <TabsStack.Screen
                component={AddPositionScreen}
                name={NavRoute.AddPosition}
            />
            <TabsStack.Screen
                component={AddDivisionScreen}
                name={NavRoute.AddDivision}
            />
        </TabsStack.Navigator>
    )
}
