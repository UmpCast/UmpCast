import AddDivisionScreen from '@/mobile/screens/AddDivisionScreen'
import AddPositionScreen from '@/mobile/screens/AddPositionScreen'
import AddSeasonParticipantsScreen from '@/mobile/screens/AddSeasonParticipantsScreen'
import ChangeGameListingAssigneeScreen from '@/mobile/screens/ChangeGameListingAssigneeScreen'
import CreateGameScreen from '@/mobile/screens/CreateGameScreen'
import CreateOrgScreen from '@/mobile/screens/CreateOrgScreen'
import CreateSeasonScreen from '@/mobile/screens/CreateSeasonScreen'
import DivisionScreen from '@/mobile/screens/DivisionScreen'
import GameScreen from '@/mobile/screens/GameScreen'
import JoinOrgScreen from '@/mobile/screens/JoinOrgScreen'
import JoinedOrgsScreen from '@/mobile/screens/JoinedOrgsScreen'
import OrgAboutScreen from '@/mobile/screens/OrgAboutScreen'
import OrgMembersScreen from '@/mobile/screens/OrgMembersScreen'
import OrgScreen from '@/mobile/screens/OrgScreen'
import OrgSeasonsScreen from '@/mobile/screens/OrgSeasonsScreen'
import PositionScreen from '@/mobile/screens/PositionScreen'
import RefereeSettingsScreen from '@/mobile/screens/RefereeSettingsScreen'
import SeasonAboutScreen from '@/mobile/screens/SeasonAboutScreen'
import SeasonDivisionsScreen from '@/mobile/screens/SeasonDivisionsScreen'
import SeasonParticipantProfileScreen from '@/mobile/screens/SeasonParticipantProfileScreen'
import SeasonParticipantsScreen from '@/mobile/screens/SeasonParticipants'
import SeasonScreen from '@/mobile/screens/SeasonScreen'
import ViewerAboutScreen from '@/mobile/screens/ViewerAboutScreen'

import { TabsStack, TabsStackRoute } from './types'
import SeasonCalendarScreen from '@/mobile/screens/SeasonCalendarScreen'
import TabsNavigator from '../Tabs/Navigator'

export default function TabsStackNavigator() {
    return (
        <TabsStack.Navigator
            screenOptions={{
                headerBackTitle: 'Back',
                title: ''
            }}
        >
            <TabsStack.Screen
                component={TabsNavigator}
                name={TabsStackRoute.Tabs_}
                options={{
                    headerShown: false
                }}
            />
            <TabsStack.Screen
                component={JoinOrgScreen}
                name={TabsStackRoute.JoinOrg}
            />
            <TabsStack.Screen
                component={ChangeGameListingAssigneeScreen}
                name={TabsStackRoute.ChangeGameListingAssignee}
            />
            <TabsStack.Screen
                component={CreateOrgScreen}
                name={TabsStackRoute.CreateOrg}
            />
            <TabsStack.Screen
                component={CreateGameScreen}
                name={TabsStackRoute.CreateGame}
            />
            <TabsStack.Screen
                component={CreateSeasonScreen}
                name={TabsStackRoute.CreateSeason}
            />
            <TabsStack.Screen
                component={AddSeasonParticipantsScreen}
                name={TabsStackRoute.AddSeasonParticipants}
            />
            <TabsStack.Screen
                component={AddPositionScreen}
                name={TabsStackRoute.AddPosition}
            />
            <TabsStack.Screen
                component={AddDivisionScreen}
                name={TabsStackRoute.AddDivision}
            />
        </TabsStack.Navigator>
    )
}
