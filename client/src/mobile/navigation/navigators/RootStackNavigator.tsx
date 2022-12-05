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
import SeasonParticipantsScreen from '@/mobile/screens/SeasonParticipantsScreen'
import SeasonScreen from '@/mobile/screens/SeasonScreen'
import ViewerAboutScreen from '@/mobile/screens/ViewerAboutScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavParamList, NavRoute } from '../routes'
import TabsNavigator from './TabsNavigator'

const Stack = createNativeStackNavigator<NavParamList>()

export default function RootStackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerBackTitle: 'Back',
                title: ''
            }}
        >
            <Stack.Screen
                component={TabsNavigator}
                name={NavRoute.Tabs_}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen component={JoinOrgScreen} name={NavRoute.JoinOrg} />
            <Stack.Screen
                component={ChangeGameListingAssigneeScreen}
                name={NavRoute.ChangeGameListingAssignee}
            />
            <Stack.Screen
                component={CreateOrgScreen}
                name={NavRoute.CreateOrg}
            />
            <Stack.Screen
                component={CreateGameScreen}
                name={NavRoute.CreateGame}
            />
            <Stack.Screen
                component={CreateSeasonScreen}
                name={NavRoute.CreateSeason}
            />
            <Stack.Screen
                component={AddSeasonParticipantsScreen}
                name={NavRoute.AddSeasonParticipants}
            />
            <Stack.Screen
                component={AddPositionScreen}
                name={NavRoute.AddPosition}
            />
            <Stack.Screen
                component={AddDivisionScreen}
                name={NavRoute.AddDivision}
            />
        </Stack.Navigator>
    )
}
