import AccountScreen from '@/mobile/screens/AccountScreen'
import AddDivisionScreen from '@/mobile/screens/AddDivisionScreen'
import AddPositionScreen from '@/mobile/screens/AddPositionScreen'
import AddSeasonParticipantsScreen from '@/mobile/screens/AddSeasonParticipantsScreen'
import ChangeGameListingAssigneeScreen from '@/mobile/screens/ChangeGameListingAssigneeScreen'
import CreateGameScreen from '@/mobile/screens/CreateGameScreen'
import CreateOrgScreen from '@/mobile/screens/CreateOrgScreen'
import CreateSeasonScreen from '@/mobile/screens/CreateSeasonScreen'
import DivisionScreen from '@/mobile/screens/DivisionScreen'
import GameScreen from '@/mobile/screens/GameScreen'
import GameSearchScreen from '@/mobile/screens/GameSearchScreen'
import HomeScreen from '@/mobile/screens/HomeScreen'
import JoinedOrgsScreen from '@/mobile/screens/JoinedOrgsScreen'
import JoinOrgScreen from '@/mobile/screens/JoinOrgScreen'
import OrgAboutScreen from '@/mobile/screens/OrgAboutScreen'
import OrgMembersScreen from '@/mobile/screens/OrgMembersScreen'
import OrgScreen from '@/mobile/screens/OrgScreen'
import OrgSeasonsScreen from '@/mobile/screens/OrgSeasonsScreen'
import PositionScreen from '@/mobile/screens/PositionScreen'
import RefereeSettingsScreen from '@/mobile/screens/RefereeSettingsScreen'
import SeasonAboutScreen from '@/mobile/screens/SeasonAboutScreen'
import SeasonCalendarScreen from '@/mobile/screens/SeasonCalendarScreen'
import SeasonDivisionsScreen from '@/mobile/screens/SeasonDivisionsScreen'
import SeasonParticipantProfileScreen from '@/mobile/screens/SeasonParticipantProfileScreen'
import SeasonParticipantsScreen from '@/mobile/screens/SeasonParticipants'
import SeasonScreen from '@/mobile/screens/SeasonScreen'
import ViewerAboutScreen from '@/mobile/screens/ViewerAboutScreen'
import { TabsStack, NavRoute } from '../routes'

type Props = {
    initialRoute: NavRoute
}

export default function TabsStackNavigator({ initialRoute }: Props) {
    return (
        <TabsStack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{
                headerBackTitle: 'Back',
                title: '',
                headerShadowVisible: false
            }}
        >
            <TabsStack.Screen component={HomeScreen} name={NavRoute.Home} />
            <TabsStack.Screen
                component={GameSearchScreen}
                name={NavRoute.Search}
            />
            <TabsStack.Screen
                component={AccountScreen}
                name={NavRoute.Account}
            />
            <TabsStack.Screen component={OrgScreen} name={NavRoute.Org} />
            <TabsStack.Screen component={SeasonScreen} name={NavRoute.Season} />
            <TabsStack.Screen
                component={SeasonParticipantsScreen}
                name={NavRoute.SeasonParticipants}
            />
            <TabsStack.Screen
                component={SeasonParticipantProfileScreen}
                name={NavRoute.SeasonParticipantProfile}
            />
            <TabsStack.Screen
                component={SeasonDivisionsScreen}
                name={NavRoute.SeasonDivisions}
            />
            <TabsStack.Screen
                component={PositionScreen}
                name={NavRoute.Position}
            />
            <TabsStack.Screen
                component={DivisionScreen}
                name={NavRoute.Division}
            />
            <TabsStack.Screen
                component={RefereeSettingsScreen}
                name={NavRoute.RefreeSettings}
            />
            <TabsStack.Screen
                component={OrgAboutScreen}
                name={NavRoute.OrgAbout}
            />
            <TabsStack.Screen
                component={OrgMembersScreen}
                name={NavRoute.OrgMembers}
            />
            <TabsStack.Screen
                component={JoinedOrgsScreen}
                name={NavRoute.JoinedOrgs}
            />
            <TabsStack.Screen
                component={OrgSeasonsScreen}
                name={NavRoute.OrgSeasons}
            />
            <TabsStack.Screen
                component={ViewerAboutScreen}
                name={NavRoute.ViewerAbout}
            />
            <TabsStack.Screen
                component={SeasonCalendarScreen}
                name={NavRoute.SeasonCalendar}
            />
            <TabsStack.Screen
                component={SeasonAboutScreen}
                name={NavRoute.SeasonAbout}
            />
            <TabsStack.Screen component={GameScreen} name={NavRoute.Game} />
        </TabsStack.Navigator>
    )
}
