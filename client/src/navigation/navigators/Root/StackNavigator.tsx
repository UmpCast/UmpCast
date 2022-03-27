import { Text } from 'native-base'

import { RootStackRoute, RootStack } from './Stack'
import SeasonRefereeAboutScreen from '@/features/SeasonReferee/About/Screen'
import SeasonAboutEditScreen from '@/screens/SeasonSettingsAbout'
import SeasonParticipantsScreen from '@/screens/SeasonParticipants'
import SeasonParticipantsScreenHeaderRight from '@/screens/SeasonParticipants/RightHeader'
import SeasonParticipantsAddScreen from '@/screens/SeasonParticipantsAdd'
import AppBottomNavigator from '../Home/BottomTabNavigator'
import UserRegisterScreen from '@/screens/Register'
import SignInScreen from '@/screens/Signin'
import useAuthState from '@/features/Auth/hooks/useState'
import { AppAuthState } from '@/features/Auth/model'
import OrganizationMembersScreen from '@/screens/OrganizationMembers'
import OrgCreateScreen from '@/screens/OrganizationNew/Screen'
import OrgSettingsScreen from '@/screens/OrganizationSettings/Screen'
import OrganizationSettingsProfileScreen from '@/screens/OrganizationSettingsProfile'
import SeasonSettingsScreen from '@/screens/SeasonSettings'
import SeasonStructureScreen from '@/screens/SeasonStructure'
import SeasonStructureRightHeader from '@/screens/SeasonStructure/RightHeader'
import SignInLinkScreen from '@/screens/SigninLink/Screen'
import SigninLinkSentScreen from '@/screens/SigninLinkSent'
import DivisionPositionNewScreen from '@/screens/DivisionPositionNew'
import SeasonDivisionNewScreen from '@/screens/SeasonDivisionNew'
import OrganizationSeasonNew from '@/screens/OrganizationSeasonNew'
import OrganizationSeasonsScreen from '@/screens/OrganizationSeasons'
import OrganizationMembersScreenRightHeader from '@/screens/OrganizationMembers/RightHeader'

export const getInitialRoute = (state: AppAuthState) => {
    if (!state.authenticated) return RootStackRoute.Signin
    if (!state.registered) return RootStackRoute.Register
    return RootStackRoute.Home
}

export const renderProtectedScreens = (state: AppAuthState) => {
    if (!state.authenticated)
        return (
            <RootStack.Group
                key="SignIn"
                screenOptions={{
                    headerShown: false
                }}
            >
                <RootStack.Screen
                    component={SignInScreen}
                    name={RootStackRoute.Signin}
                />
                <RootStack.Screen
                    component={SigninLinkSentScreen}
                    name={RootStackRoute.SigninLinkSent}
                />
                <RootStack.Screen
                    component={SignInLinkScreen}
                    name={RootStackRoute.SigninLink}
                />
                <RootStack.Screen
                    component={SignInLinkScreen}
                    name={RootStackRoute.SigninLinkAlt}
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
            <RootStack.Group screenOptions={{ headerShown: false }}>
                <RootStack.Screen
                    component={AppBottomNavigator}
                    name={RootStackRoute.Home}
                    options={{
                        headerShown: false
                    }}
                />
            </RootStack.Group>
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
                component={OrgCreateScreen}
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
                options={{
                    title: 'Members',
                    headerRight: () => <OrganizationMembersScreenRightHeader />
                }}
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
                name={RootStackRoute.SeasonSettingsProfile}
                options={{
                    title: 'Edit Details'
                }}
            />
            <RootStack.Screen
                component={SeasonSettingsScreen}
                name={RootStackRoute.SeasonSettings}
                options={{
                    title: 'Settings'
                }}
            />
            <RootStack.Screen
                component={SeasonRefereeAboutScreen}
                name={RootStackRoute.SeasonMeReferee}
                options={{
                    title: 'Referee'
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
        <RootStack.Navigator initialRouteName={initialRoute}>
            {protectedScreens}
        </RootStack.Navigator>
    )
}
