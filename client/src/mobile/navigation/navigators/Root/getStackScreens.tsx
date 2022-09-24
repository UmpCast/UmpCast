import SeasonNavigateHeader from '@/features/Season/core/Navigate/Header'
import SeasonRefereeAboutScreen from '@/features/SeasonReferee/About/Screen'
import AccountScreen from '@/mobile/screens/Account'
import DivisionPositionNewScreen from '@/mobile/screens/DivisionPositionNew'
import GameScreen from '@/nx/mobile/screens/GameScreen'
import GameListingAssigneeScreen from '@/mobile/screens/GameListingAssignee'
import LoginScreen from '@/mobile/screens/Login'
import LoginLinkScreen from '@/mobile/screens/LoginLink'
import LoginLinkSentScreen from '@/mobile/screens/LoginLinkSent'
import OrganizationMembersScreen from '@/mobile/screens/OrganizationMembers'
import OrganizationMembersScreenRightHeader from '@/mobile/screens/OrganizationMembers/RightHeader'
import OrganizationNewScreen from '@/mobile/screens/OrganizationNew/Screen'
import OrganizationSeasonNew from '@/mobile/screens/OrganizationSeasonNew'
import OrganizationSeasonsScreen from '@/mobile/screens/OrganizationSeasons'
import OrgSettingsScreen from '@/mobile/screens/OrganizationSettings/Screen'
import OrganizationSettingsProfileScreen from '@/mobile/screens/OrganizationSettingsProfile'
import UserRegisterScreen from '@/mobile/screens/Register'
import SeasonDivisionNewScreen from '@/mobile/screens/SeasonDivisionNew'
import SeasonGameNewScreen from '@/mobile/screens/SeasonGameNew'
import SeasonParticipantsScreen from '@/mobile/screens/SeasonParticipants'
import SeasonParticipantsScreenHeaderRight from '@/mobile/screens/SeasonParticipants/RightHeader'
import SeasonParticipantsAddScreen from '@/mobile/screens/SeasonParticipantsAdd'
import SeasonProfileScreen from '@/mobile/screens/SeasonProfile'
import SeasonSettingsScreen from '@/mobile/screens/SeasonSettings'
import SeasonStructureScreen from '@/mobile/screens/SeasonStructureScreen'
import SeasonStructureRightHeader from '@/mobile/screens/SeasonStructureScreen/RightHeader'
import { AuthState } from '@/nx/hooks/useAuthState'
import AddPositionScreen from '@/nx/mobile/screens/AddPositionScreen'
import CreateSeasonScreen from '@/nx/mobile/screens/CreateSeasonScreen'
import DivisionScreen from '@/nx/mobile/screens/DivisionScreen'
import PositionScreen from '@/nx/mobile/screens/PositionScreen'
import SeasonCalendarScreen from '@/nx/mobile/screens/SeasonCalendarScreen'
import SeasonDivisionsScreen from '@/nx/mobile/screens/SeasonDivisionsScreen'
import SeasonParticipantProfileScreen from '@/nx/mobile/screens/SeasonParticipantProfileScreen'

import AddDivisionScreen from '../../../../nx/mobile/screens/AddDivisionScreen/index'

import { RootStack, RootStackRoute } from './Stack'
import OrgScreen from '../../../../nx/mobile/screens/OrgScreen/index'
import AppBottomTabNavigator from '../App/BottomTabNavigator'

export default function getStackScreens(authState: AuthState) {
    switch (authState) {
        case AuthState.UNAUTHENTICATED:
            return (
                <RootStack.Group
                    key="Login"
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    <RootStack.Screen component={LoginScreen} name={RootStackRoute.Login} />
                    <RootStack.Screen
                        component={LoginLinkSentScreen}
                        name={RootStackRoute.LoginLinkSent}
                    />
                    <RootStack.Screen component={LoginLinkScreen} name={RootStackRoute.LoginLink} />
                    <RootStack.Screen
                        component={LoginLinkScreen}
                        name={RootStackRoute.LoginLinkAlt}
                    />
                </RootStack.Group>
            )
        case AuthState.UNAUTHORIZED:
            return (
                <RootStack.Screen
                    component={UserRegisterScreen}
                    name={RootStackRoute.Register}
                    options={{ headerShown: false }}
                />
            )
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
                        component={DivisionPositionNewScreen}
                        name={RootStackRoute.DivisionPositionNew}
                        options={{
                            title: 'New Position'
                        }}
                    />
                    <RootStack.Screen
                        component={SeasonDivisionNewScreen}
                        name={RootStackRoute.SeasonDivisionNew}
                        options={{
                            title: 'New Division'
                        }}
                    />
                    <RootStack.Screen
                        component={SeasonStructureScreen}
                        name={RootStackRoute.SeasonStructure}
                        options={(props) => ({
                            title: 'Season Structure',
                            headerRight: () => <SeasonStructureRightHeader {...props} />
                        })}
                    />
                    <RootStack.Screen
                        component={OrganizationNewScreen}
                        name={RootStackRoute.OrganizationNew}
                        options={{
                            title: 'New Organization'
                        }}
                    />
                    <RootStack.Screen
                        component={OrganizationSettingsProfileScreen}
                        name={RootStackRoute.OrganizationSettingsProfile}
                        options={{
                            title: 'Organization Profile'
                        }}
                    />
                    <RootStack.Screen
                        component={OrgSettingsScreen}
                        name={RootStackRoute.OrganizationSettings}
                        options={{
                            title: 'Organization Settings'
                        }}
                    />
                    <RootStack.Screen
                        component={OrganizationMembersScreen}
                        name={RootStackRoute.OrganizationMembers}
                        options={(props) => ({
                            title: 'Members',
                            headerRight: () => <OrganizationMembersScreenRightHeader {...props} />
                        })}
                    />
                    <RootStack.Screen
                        component={OrganizationSeasonsScreen}
                        name={RootStackRoute.OrganizationSeasons}
                        options={{
                            title: 'Seasons'
                        }}
                    />
                    <RootStack.Screen
                        component={OrganizationSeasonNew}
                        name={RootStackRoute.OrganizationSeasonNew}
                        options={{
                            title: 'Create Season'
                        }}
                    />
                    <RootStack.Screen
                        component={SeasonParticipantsScreen}
                        name={RootStackRoute.SeasonParticipants}
                        options={{
                            title: 'Members',
                            headerRight: () => <SeasonParticipantsScreenHeaderRight />
                        }}
                    />
                    <RootStack.Screen
                        component={SeasonParticipantsAddScreen}
                        name={RootStackRoute.SeasonParticipantsAdd}
                        options={{
                            title: 'Members'
                        }}
                    />
                    <RootStack.Screen
                        component={SeasonProfileScreen}
                        name={RootStackRoute.SeasonProfile}
                        options={{
                            title: 'Edit Details'
                        }}
                    />
                    <RootStack.Screen
                        component={SeasonSettingsScreen}
                        name={RootStackRoute.SeasonSettings}
                        options={(props) => ({
                            headerTitle: () => <SeasonNavigateHeader {...props} />
                        })}
                    />
                    <RootStack.Screen
                        component={SeasonRefereeAboutScreen}
                        name={RootStackRoute.SeasonMeReferee}
                        options={{
                            title: 'Referee'
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
                        component={AccountScreen}
                        name={RootStackRoute.Account}
                        options={{
                            title: 'Account'
                        }}
                    />
                    <RootStack.Screen component={OrgScreen} name={RootStackRoute.Org} />
                    <RootStack.Screen
                        component={CreateSeasonScreen}
                        name={RootStackRoute.CreateSeason}
                    />
                    <RootStack.Screen
                        component={SeasonGameNewScreen}
                        name={RootStackRoute.SeasonGameNew}
                        options={{
                            title: 'New Game'
                        }}
                    />
                    <RootStack.Screen component={GameScreen} name={RootStackRoute.Game} />
                    <RootStack.Screen
                        component={GameListingAssigneeScreen}
                        name={RootStackRoute.GameListingAssignee}
                        options={{
                            title: 'Change assignee'
                        }}
                    />
                    <RootStack.Screen
                        component={SeasonParticipantProfileScreen}
                        name={RootStackRoute.SeasonParticipantProfile}
                        options={{
                            title: 'Season Profile'
                        }}
                    />
                    <RootStack.Screen
                        component={SeasonDivisionsScreen}
                        name={RootStackRoute.SeasonDivisionsScreen}
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
