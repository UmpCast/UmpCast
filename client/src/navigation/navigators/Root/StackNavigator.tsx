import { Text } from 'native-base'

import { AppRootStackRoute, AppRootStack } from './Stack'
import SeasonEditStructScreen from '@/features/Season/core/EditStruct/Screen'
import SeasonStructureRightHeader from '@/features/Season/core/EditStruct/ScreenRightHeader'
import SeasonSettingsScreen from '@/features/Season/core/Settings/Screen'
import useAuthState from '@/features/Auth/hooks/useState'
import { AppAuthState } from '@/features/Auth/model'
import AuthEmailReceiveSignInLinkScreen from '@/screens/SigninLink/Screen'
import AuthEmailSentConfirmation from '@/features/AuthEmail/core/SendSignInLink/Confirmation'
import DivisionCreateScreen from '@/features/Division/Create/DivisionCreateScreen'
import OrgCreateScreen from '@/features/Org/core/Create/Screen'
import OrgEditScreen from '@/features/Org/core/Edit/Screen'
import OrgSettingsScreen from '@/features/Org/core/Settings/Screen'
import OrgMemberListScreen from '@/features/OrgMember/core/List/Screen'
import OrgMemberListScreenRightHeader from '@/features/OrgMember/core/List/ScreenRightHeader'
import SeasonCreateScreen from '@/features/OrgSeason/core/Create/Screen'
import OrgSeasonListScreen from '@/features/OrgSeason/core/List/Screen'
import PositionCreateScreen from '@/features/Position/Create/Screen'
import SeasonRefereeAboutScreen from '@/features/SeasonReferee/About/Screen'
import SeasonAboutEditScreen from '@/screens/SeasonAboutEdit'
import SeasonParticipantListScreen from '@/screens/SeasonParticipants'
import SeasonParticipantListHeaderRight from '@/screens/SeasonParticipants/RightHeader'
import SeasonParticipantAddScreen from '@/screens/SeasonParticipantsAdd'
import AppBottomNavigator from '../Home/BottomTabNavigator'
import UserRegisterScreen from '@/screens/Register'
import AuthSignInScreen from '@/screens/Signin'

export const getInitialRoute = (state: AppAuthState) => {
    if (!state.authenticated) return AppRootStackRoute.AuthSignIn
    if (!state.registered) return AppRootStackRoute.Register
    return AppRootStackRoute.Home
}

export const renderProtectedScreens = (state: AppAuthState) => {
    if (!state.authenticated)
        return (
            <AppRootStack.Group
                key="SignIn"
                screenOptions={{
                    headerShown: false
                }}
            >
                <AppRootStack.Screen
                    component={AuthSignInScreen}
                    name={AppRootStackRoute.AuthSignIn}
                />
                <AppRootStack.Screen
                    component={AuthEmailSentConfirmation}
                    name={AppRootStackRoute.AuthEmailSent}
                />
                <AppRootStack.Screen
                    component={AuthEmailReceiveSignInLinkScreen}
                    name={AppRootStackRoute.AuthEmailReceiveLink}
                />
                <AppRootStack.Screen
                    component={AuthEmailReceiveSignInLinkScreen}
                    name={AppRootStackRoute.AuthEmailReceiveLinkAlt}
                />
            </AppRootStack.Group>
        )

    if (!state.registered)
        return (
            <AppRootStack.Screen
                component={UserRegisterScreen}
                name={AppRootStackRoute.Register}
                options={{ headerShown: false }}
            />
        )

    return (
        <>
            <AppRootStack.Group screenOptions={{ headerShown: false }}>
                <AppRootStack.Screen
                    component={AppBottomNavigator}
                    name={AppRootStackRoute.Home}
                    options={{
                        headerShown: false
                    }}
                />
            </AppRootStack.Group>
            <AppRootStack.Screen
                component={PositionCreateScreen}
                name={AppRootStackRoute.PositionCreate}
                options={{
                    title: 'Create Position'
                }}
            />
            <AppRootStack.Screen
                component={DivisionCreateScreen}
                name={AppRootStackRoute.DivisionCreate}
                options={{
                    title: 'Create Division'
                }}
            />
            <AppRootStack.Screen
                component={SeasonEditStructScreen}
                name={AppRootStackRoute.SeasonStructure}
                options={(props) => ({
                    title: 'Season Structure',
                    headerRight: () => <SeasonStructureRightHeader {...props} />
                })}
            />
            <AppRootStack.Screen
                component={OrgCreateScreen}
                name={AppRootStackRoute.OrgCreate}
                options={{
                    title: 'Create Organization'
                }}
            />
            <AppRootStack.Screen
                component={OrgEditScreen}
                name={AppRootStackRoute.OrgEdit}
                options={{
                    title: 'Organization Profile'
                }}
            />
            <AppRootStack.Screen
                component={OrgSettingsScreen}
                name={AppRootStackRoute.OrgSettings}
                options={{
                    title: 'Organization Settings'
                }}
            />
            <AppRootStack.Screen
                component={OrgMemberListScreen}
                name={AppRootStackRoute.OrgMembers}
                options={{
                    title: 'Members',
                    headerRight: () => <OrgMemberListScreenRightHeader />
                }}
            />
            <AppRootStack.Screen
                component={OrgSeasonListScreen}
                name={AppRootStackRoute.OrgSeasons}
                options={{
                    title: 'Seasons'
                }}
            />
            <AppRootStack.Screen
                component={SeasonCreateScreen}
                name={AppRootStackRoute.SeasonCreate}
                options={{
                    title: 'Create Season'
                }}
            />
            <AppRootStack.Screen
                component={SeasonParticipantListScreen}
                name={AppRootStackRoute.SeasonParticipants}
                options={{
                    title: 'Members',
                    headerRight: () => <SeasonParticipantListHeaderRight />
                }}
            />
            <AppRootStack.Screen
                component={SeasonParticipantAddScreen}
                name={AppRootStackRoute.SeasonParticipantsAdd}
                options={{
                    title: 'Members'
                }}
            />
            <AppRootStack.Screen
                component={SeasonAboutEditScreen}
                name={AppRootStackRoute.SeasonEdit}
                options={{
                    title: 'Edit Details'
                }}
            />
            <AppRootStack.Screen
                component={SeasonSettingsScreen}
                name={AppRootStackRoute.SeasonSettings}
                options={{
                    title: 'Settings'
                }}
            />
            <AppRootStack.Screen
                component={SeasonRefereeAboutScreen}
                name={AppRootStackRoute.SeasonAboutReferee}
                options={{
                    title: 'Referee'
                }}
            />
        </>
    )
}

export default function AppRootStackNavigator() {
    const authState = useAuthState()
    if (authState.loading) return <Text>Loading...</Text>

    const initialRoute = getInitialRoute(authState)
    const protectedScreens = renderProtectedScreens(authState)

    return (
        <AppRootStack.Navigator initialRouteName={initialRoute}>
            {protectedScreens}
        </AppRootStack.Navigator>
    )
}
