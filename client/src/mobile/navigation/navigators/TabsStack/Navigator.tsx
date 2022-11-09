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
import HomeScreen from '@/mobile/screens/HomeScreen'
import AccountScreen from '@/mobile/screens/AccountScreen'
import GameSearchScreen from '@/mobile/screens/GameSearchScreen'
import SeasonCalendarScreen from '@/mobile/screens/SeasonCalendarScreen'

interface Props {
    initialRoute: TabsStackRoute
}

export default function TabsStackNavigator({ initialRoute }: Props) {
    return (
        <TabsStack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{
                headerBackTitle: 'Back',
                title: ''
            }}
        >
            <TabsStack.Screen
                component={HomeScreen}
                name={TabsStackRoute.Home}
            />
            <TabsStack.Screen
                component={GameSearchScreen}
                name={TabsStackRoute.Search}
            />
            <TabsStack.Screen
                component={AccountScreen}
                name={TabsStackRoute.Account}
            />
            <TabsStack.Screen
                component={JoinOrgScreen}
                name={TabsStackRoute.JoinOrg}
            />
            <TabsStack.Screen
                component={RefereeSettingsScreen}
                name={TabsStackRoute.RefreeSettings}
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
                component={GameScreen}
                name={TabsStackRoute.Game}
            />
            <TabsStack.Screen
                component={OrgAboutScreen}
                name={TabsStackRoute.OrgAbout}
            />
            <TabsStack.Screen
                component={CreateGameScreen}
                name={TabsStackRoute.CreateGame}
            />
            <TabsStack.Screen component={OrgScreen} name={TabsStackRoute.Org} />
            <TabsStack.Screen
                component={OrgMembersScreen}
                name={TabsStackRoute.OrgMembers}
            />
            <TabsStack.Screen
                component={JoinedOrgsScreen}
                name={TabsStackRoute.JoinedOrgs}
            />
            <TabsStack.Screen
                component={OrgSeasonsScreen}
                name={TabsStackRoute.OrgSeasons}
            />
            <TabsStack.Screen
                component={SeasonScreen}
                name={TabsStackRoute.Season}
            />
            <TabsStack.Screen
                component={ViewerAboutScreen}
                name={TabsStackRoute.ViewerAbout}
            />
            <TabsStack.Screen
                component={SeasonAboutScreen}
                name={TabsStackRoute.SeasonAbout}
            />
            <TabsStack.Screen
                component={CreateSeasonScreen}
                name={TabsStackRoute.CreateSeason}
            />
            <TabsStack.Screen
                component={SeasonParticipantsScreen}
                name={TabsStackRoute.SeasonParticipants}
            />
            <TabsStack.Screen
                component={SeasonCalendarScreen}
                name={TabsStackRoute.SeasonCalendar}
            />
            <TabsStack.Screen
                component={AddSeasonParticipantsScreen}
                name={TabsStackRoute.AddSeasonParticipants}
            />
            <TabsStack.Screen
                component={SeasonParticipantProfileScreen}
                name={TabsStackRoute.SeasonParticipantProfile}
            />
            <TabsStack.Screen
                component={SeasonDivisionsScreen}
                name={TabsStackRoute.SeasonDivisions}
            />
            <TabsStack.Screen
                component={AddPositionScreen}
                name={TabsStackRoute.AddPosition}
            />
            <TabsStack.Screen
                component={PositionScreen}
                name={TabsStackRoute.Position}
            />
            <TabsStack.Screen
                component={AddDivisionScreen}
                name={TabsStackRoute.AddDivision}
            />
            <TabsStack.Screen
                component={DivisionScreen}
                name={TabsStackRoute.Division}
            />
        </TabsStack.Navigator>
    )
}
