import AccountScreen from '@/mobile/screens/AccountScreen'
import DivisionScreen from '@/mobile/screens/DivisionScreen'
import GameScreen from '@/mobile/screens/GameScreen'
import GameSearchScreen from '@/mobile/screens/GameSearchScreen'
import HomeScreen from '@/mobile/screens/HomeScreen'
import JoinedOrgsScreen from '@/mobile/screens/JoinedOrgsScreen'
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
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavRoute } from '../routes'

const Stack = createNativeStackNavigator()

type Props = {
    initialRoute: NavRoute
}

export default function RootStackNavigator({ initialRoute }: Props) {
    return (
        <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{
                headerBackTitle: 'Back',
                title: ''
            }}
        >
            <Stack.Screen component={HomeScreen} name={NavRoute.Home} />
            <Stack.Screen
                component={GameSearchScreen}
                name={NavRoute.Search}
            />
            <Stack.Screen
                component={AccountScreen}
                name={NavRoute.Account}
            />
            <Stack.Screen component={OrgScreen} name={NavRoute.Org} />
            <Stack.Screen
                component={SeasonScreen}
                name={NavRoute.Season}
            />
            <Stack.Screen
                component={SeasonParticipantsScreen}
                name={NavRoute.SeasonParticipants}
            />
            <Stack.Screen
                component={SeasonParticipantProfileScreen}
                name={NavRoute.SeasonParticipantProfile}
            />
            <Stack.Screen
                component={SeasonDivisionsScreen}
                name={NavRoute.SeasonDivisions}
            />
            <Stack.Screen
                component={PositionScreen}
                name={NavRoute.Position}
            />
            <Stack.Screen
                component={DivisionScreen}
                name={NavRoute.Division}
            />
            <Stack.Screen
                component={RefereeSettingsScreen}
                name={NavRoute.RefreeSettings}
            />
            <Stack.Screen
                component={OrgAboutScreen}
                name={NavRoute.OrgAbout}
            />
            <Stack.Screen
                component={OrgMembersScreen}
                name={NavRoute.OrgMembers}
            />
            <Stack.Screen
                component={JoinedOrgsScreen}
                name={NavRoute.JoinedOrgs}
            />
            <Stack.Screen
                component={OrgSeasonsScreen}
                name={NavRoute.OrgSeasons}
            />
            <Stack.Screen
                component={ViewerAboutScreen}
                name={NavRoute.ViewerAbout}
            />
            <Stack.Screen
                component={SeasonCalendarScreen}
                name={NavRoute.SeasonCalendar}
            />
            <Stack.Screen
                component={SeasonAboutScreen}
                name={NavRoute.SeasonAbout}
            />
            <Stack.Screen component={GameScreen} name={NavRoute.Game} />
        </Stack.Navigator>
    )
}
