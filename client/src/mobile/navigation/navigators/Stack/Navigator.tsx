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
            <Stack.Screen component={OrgScreen} name={TabsStackRoute.Org} />
            <Stack.Screen
                component={SeasonScreen}
                name={TabsStackRoute.Season}
            />
            <Stack.Screen
                component={SeasonParticipantsScreen}
                name={TabsStackRoute.SeasonParticipants}
            />
            <Stack.Screen
                component={SeasonParticipantProfileScreen}
                name={TabsStackRoute.SeasonParticipantProfile}
            />
            <Stack.Screen
                component={SeasonDivisionsScreen}
                name={TabsStackRoute.SeasonDivisions}
            />
            <Stack.Screen
                component={PositionScreen}
                name={TabsStackRoute.Position}
            />
            <Stack.Screen
                component={DivisionScreen}
                name={TabsStackRoute.Division}
            />
            <Stack.Screen
                component={RefereeSettingsScreen}
                name={TabsStackRoute.RefreeSettings}
            />
            <Stack.Screen
                component={OrgAboutScreen}
                name={TabsStackRoute.OrgAbout}
            />
            <Stack.Screen
                component={OrgMembersScreen}
                name={TabsStackRoute.OrgMembers}
            />
            <Stack.Screen
                component={JoinedOrgsScreen}
                name={TabsStackRoute.JoinedOrgs}
            />
            <Stack.Screen
                component={OrgSeasonsScreen}
                name={TabsStackRoute.OrgSeasons}
            />
            <Stack.Screen
                component={ViewerAboutScreen}
                name={TabsStackRoute.ViewerAbout}
            />
            <Stack.Screen
                component={SeasonCalendarScreen}
                name={TabsStackRoute.SeasonCalendar}
            />
            <Stack.Screen
                component={SeasonAboutScreen}
                name={TabsStackRoute.SeasonAbout}
            />
            <Stack.Screen component={GameScreen} name={TabsStackRoute.Game} />
        </Stack.Navigator>
    )
}
