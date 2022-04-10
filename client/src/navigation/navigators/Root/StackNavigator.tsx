import { Text } from 'native-base'

import useAuthState from '@/features/Auth/hooks/useState'
import { AppAuthState } from '@/features/Auth/model'
import SeasonNavigateHeader from '@/features/Season/core/Navigate/Header'
import SeasonRefereeAboutScreen from '@/features/SeasonReferee/About/Screen'
import DivisionPositionNewScreen from '@/screens/DivisionPositionNew'
import LoginScreen from '@/screens/Login'
import LoginLinkScreen from '@/screens/LoginLink'
import LoginLinkSentScreen from '@/screens/LoginLinkSent'
import OrganizationMembersScreen from '@/screens/OrganizationMembers'
import OrganizationMembersScreenRightHeader from '@/screens/OrganizationMembers/RightHeader'
import OrganizationNewScreen from '@/screens/OrganizationNew/Screen'
import OrganizationSeasonNew from '@/screens/OrganizationSeasonNew'
import OrganizationSeasonsScreen from '@/screens/OrganizationSeasons'
import OrgSettingsScreen from '@/screens/OrganizationSettings/Screen'
import OrganizationSettingsProfileScreen from '@/screens/OrganizationSettingsProfile'
import UserRegisterScreen from '@/screens/Register'
import SeasonCalendarScreen from '@/screens/SeasonCalendar'
import SeasonDivisionNewScreen from '@/screens/SeasonDivisionNew'
import SeasonParticipantsScreen from '@/screens/SeasonParticipants'
import SeasonParticipantsScreenHeaderRight from '@/screens/SeasonParticipants/RightHeader'
import SeasonParticipantsAddScreen from '@/screens/SeasonParticipantsAdd'
import SeasonSettingsScreen from '@/screens/SeasonSettings'
import SeasonAboutEditScreen from '@/screens/SeasonSettingsAbout'
import SeasonStructureScreen from '@/screens/SeasonStructure'
import SeasonStructureRightHeader from '@/screens/SeasonStructure/RightHeader'

import NavHeaderTitle from '../../HeaderTitle'
import AppBottomNavigator from '../Home/BottomTabNavigator'

import { RootStackRoute, RootStack } from './Stack'

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
                    title: 'Create Position'
                }}
            />
            <RootStack.Screen
                component={SeasonDivisionNewScreen}
                name={RootStackRoute.SeasonDivisionNew}
                options={{
                    title: 'Create Division'
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
                    title: 'Create Organization'
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
                component={SeasonAboutEditScreen}
                name={RootStackRoute.SettingsProfile}
                options={{
                    title: 'Edit Details'
                }}
            />
            <RootStack.Screen
                component={SeasonSettingsScreen}
                name={RootStackRoute.Settings}
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
