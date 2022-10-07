import { AuthState } from '@/hooks/useAuthState'
import AddDivisionScreen from '@/mobile/screens/AddDivisionScreen'
import AddPositionScreen from '@/mobile/screens/AddPositionScreen'
import ChangeGameListingAssigneeScreen from '@/mobile/screens/ChangeGameListingAssigneeScreen'
import CreateGameScreen from '@/mobile/screens/CreateGameScreen'
import CreateOrgScreen from '@/mobile/screens/CreateOrgScreen'
import CreateSeasonScreen from '@/mobile/screens/CreateSeasonScreen'
import DivisionScreen from '@/mobile/screens/DivisionScreen'
import GameScreen from '@/mobile/screens/GameScreen'
import OrgAboutScreen from '@/mobile/screens/OrgAboutScreen'
import OrgMembersScreen from '@/mobile/screens/OrgMembersScreen'
import OrgScreen from '@/mobile/screens/OrgScreen'
import OrgSeasonsScreen from '@/mobile/screens/OrgSeasonsScreen'
import OrgsScreen from '@/mobile/screens/OrgsScreen'
import PositionScreen from '@/mobile/screens/PositionScreen'
import RefereeSettingsScreen from '@/mobile/screens/RefereeSettingsScreen'
import SeasonAboutScreen from '@/mobile/screens/SeasonAboutScreen'
import SeasonCalendarScreen from '@/mobile/screens/SeasonCalendarScreen'
import SeasonDivisionsScreen from '@/mobile/screens/SeasonDivisionsScreen'
import SeasonParticipantProfileScreen from '@/mobile/screens/SeasonParticipantProfileScreen'
import SeasonScreen from '@/mobile/screens/SeasonScreen'

import AppBottomTabNavigator from '../App/BottomTabNavigator'

import { RootStack, RootStackRoute } from './Stack'
import SeasonParticipantsScreen from '../../../screens/SeasonParticipants/index'
import SeasonParticipantsAddScreen from '@/mobile/screens/AddSeasonParticipantsScreen'
import AddSeasonParticipantsScreen from '@/mobile/screens/AddSeasonParticipantsScreen'

export default function getStackScreens(authState: AuthState) {
    switch (authState) {
        case AuthState.UNAUTHENTICATED:
            return []
        case AuthState.UNAUTHORIZED:
            return []
        case AuthState.AUTHORIZED:
            return (
                <>
                    <RootStack.Screen
                        component={AppBottomTabNavigator}
                        name={RootStackRoute.App}
                        options={{
                            headerShown: false
                        }}
                    />
                    <RootStack.Screen
                        component={SeasonCalendarScreen}
                        name={RootStackRoute.SeasonCalendar}
                        options={{
                            title: 'Calendar'
                        }}
                    />
                    <RootStack.Screen
                        component={RefereeSettingsScreen}
                        name={RootStackRoute.RefreeSettings}
                    />
                    <RootStack.Screen
                        component={ChangeGameListingAssigneeScreen}
                        name={RootStackRoute.ChangeGameListingAssignee}
                    />
                    <RootStack.Screen component={CreateOrgScreen} name={RootStackRoute.CreateOrg} />
                    <RootStack.Screen component={GameScreen} name={RootStackRoute.Game} />
                    <RootStack.Screen component={OrgAboutScreen} name={RootStackRoute.OrgAbout} />
                    <RootStack.Screen
                        component={CreateGameScreen}
                        name={RootStackRoute.CreateGame}
                    />
                    <RootStack.Screen component={OrgScreen} name={RootStackRoute.Org} />
                    <RootStack.Screen
                        component={OrgMembersScreen}
                        name={RootStackRoute.OrgMembers}
                    />
                    <RootStack.Screen component={OrgsScreen} name={RootStackRoute.Orgs} />
                    <RootStack.Screen
                        component={OrgSeasonsScreen}
                        name={RootStackRoute.OrgSeasons}
                    />
                    <RootStack.Screen component={SeasonScreen} name={RootStackRoute.Season} />
                    <RootStack.Screen
                        component={SeasonAboutScreen}
                        name={RootStackRoute.SeasonAbout}
                    />
                    <RootStack.Screen
                        component={CreateSeasonScreen}
                        name={RootStackRoute.CreateSeason}
                    />
                    <RootStack.Screen
                        component={SeasonParticipantsScreen}
                        name={RootStackRoute.SeasonParticipants}
                    />
                    <RootStack.Screen
                        component={AddSeasonParticipantsScreen}
                        name={RootStackRoute.AddSeasonParticipants}
                    />
                    <RootStack.Screen
                        component={SeasonParticipantProfileScreen}
                        name={RootStackRoute.SeasonParticipantProfile}
                    />
                    <RootStack.Screen
                        component={SeasonDivisionsScreen}
                        name={RootStackRoute.SeasonDivisions}
                        options={{
                            title: 'Divisions'
                        }}
                    />
                    <RootStack.Screen
                        component={AddPositionScreen}
                        name={RootStackRoute.AddPosition}
                        options={{
                            title: 'Add Position'
                        }}
                    />
                    <RootStack.Screen
                        component={PositionScreen}
                        name={RootStackRoute.Position}
                        options={{
                            title: 'Position'
                        }}
                    />
                    <RootStack.Screen
                        component={AddDivisionScreen}
                        name={RootStackRoute.AddDivision}
                        options={{
                            title: 'Add Division'
                        }}
                    />
                    <RootStack.Screen
                        component={DivisionScreen}
                        name={RootStackRoute.Division}
                        options={{
                            title: 'Division'
                        }}
                    />
                </>
            )
        default:
            throw new Error(`received invalid authState ${authState}`)
    }
}
