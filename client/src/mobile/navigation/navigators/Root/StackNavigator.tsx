import { Text } from 'native-base'

import useAuthState from '@/features/Auth/hooks/useState'
import { AppAuthState } from '@/features/Auth/model'
import SeasonNavigateHeader from '@/features/Season/core/Navigate/Header'
import SeasonRefereeAboutScreen from '@/features/SeasonReferee/About/Screen'

import GameScreen from '../../../screens/Game/index'
import NavHeaderTitle from '../../HeaderTitle'
import AppBottomNavigator from '../Home/BottomTabNavigator'

import { RootStackRoute, RootStack } from './Stack'
import AccountScreen from '@/mobile/screens/Account'
import DivisionPositionNewScreen from '@/mobile/screens/DivisionPositionNew'
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
import SeasonCalendarScreen from '@/mobile/screens/SeasonCalendar'
import SeasonDivisionNewScreen from '@/mobile/screens/SeasonDivisionNew'
import SeasonGameNewScreen from '@/mobile/screens/SeasonGameNew'
import SeasonParticipantsScreen from '@/mobile/screens/SeasonParticipants'
import SeasonParticipantsScreenHeaderRight from '@/mobile/screens/SeasonParticipants/RightHeader'
import SeasonParticipantsAddScreen from '@/mobile/screens/SeasonParticipantsAdd'
import SeasonSettingsScreen from '@/mobile/screens/SeasonSettings'
import SeasonStructureScreen from '@/mobile/screens/SeasonStructure'
import SeasonStructureRightHeader from '@/mobile/screens/SeasonStructure/RightHeader'
import SeasonProfileScreen from '@/mobile/screens/SeasonProfile'

export const getInitialRoute = (state: AppAuthState) => {
    if (!state.authenticated) return RootStackRoute.Login
    if (!state.registered) return RootStackRoute.Register
    return RootStackRoute.Home
}

export const renderProtectedScreens = (state: AppAuthState) => {
    if (!state.authenticated)
        return (
            <RootStack.Group
                key="Login"
                screenOptions={{
                    headerShown: false
                }}
            >
                <RootStack.Screen
                    component={LoginScreen}
                    name={RootStackRoute.Login}
                />
                <RootStack.Screen
                    component={LoginLinkSentScreen}
                    name={RootStackRoute.LoginLinkSent}
                />
                <RootStack.Screen
                    component={LoginLinkScreen}
                    name={RootStackRoute.LoginLink}
                />
                <RootStack.Screen
                    component={LoginLinkScreen}
                    name={RootStackRoute.LoginLinkAlt}
                />
            </RootStack.Group>
        )

    if (!state.registered)
        return (
            <RootStack.Screen
                component={UserRegisterScreen}
                name={RootStackRoute.Register}
                options={{ headerShown: false }}
            />
        )

    return (
        <>
            <RootStack.Screen
                component={AppBottomNavigator}
                name={RootStackRoute.Home}
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
                    headerRight: () => (
                        <OrganizationMembersScreenRightHeader {...props} />
                    )
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
            <RootStack.Screen
                component={SeasonGameNewScreen}
                name={RootStackRoute.SeasonGameNew}
                options={{
                    title: 'New Game'
                }}
            />
            <RootStack.Screen
                component={GameScreen}
                name={RootStackRoute.Game}
            />
        </>
    )
}

export default function RootStackNavigator() {
    const authState = useAuthState()
    if (authState.loading) return <Text>Loading...</Text>

    const initialRoute = getInitialRoute(authState)
    const protectedScreens = renderProtectedScreens(authState)

    return (
        <RootStack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{
                headerTitle: ({ children }) => (
                    <NavHeaderTitle>{children}</NavHeaderTitle>
                )
            }}
        >
            {protectedScreens}
        </RootStack.Navigator>
    )
}