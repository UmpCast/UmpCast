import { Text } from 'native-base'

import useAuthState from '@/core/App/Auth/useState'
import AuthSignInScreen from '@/core/App/SignIn/Screen'
import { AppAuthState } from '@/core/App/model'
import AuthEmailReceiveSignInLinkScreen from '@/core/AuthEmail/ReceiveSignInLink/Screen'
import AuthEmailSentConfirmation from '@/core/AuthEmail/SendSignInLink/Confirmation'
import DivisionCreateScreen from '@/core/Division/Create/DivisionCreateScreen'
import OrgCreateScreen from '@/core/Org/Create/Screen'
import OrgEditScreen from '@/core/Org/Edit/Screen'
import OrgSettingsScreen from '@/core/Org/Settings/Screen'
import OrgMemberListScreen from '@/core/OrgMember/List/Screen'
import OrgMemberListScreenRightHeader from '@/core/OrgMember/List/ScreenRightHeader'
import SeasonCreateScreen from '@/core/OrgSeason/Create/Screen'
import OrgSeasonListScreen from '@/core/OrgSeason/List/Screen'
import PositionCreateScreen from '@/core/Position/Create/Screen'
import SeasonAboutScreen from '@/core/Season/About/Screen'
import SeasonEditScreen from '@/core/Season/EditDetails/Screen'
import SeasonEditStructScreen from '@/core/Season/EditStruct/Screen'
import SeasonStructureRightHeader from '@/core/Season/EditStruct/ScreenRightHeader'
import SeasonParticipantAddScreen from '@/core/SeasonParticipant/BatchAdd/Screen'
import SeasonParticipantListScreen from '@/core/SeasonParticipant/List/Screen'
import SeasonParticipantListHeaderRight from '@/core/SeasonParticipant/List/ScreenHeaderRight'
import SeasonRefereeAboutScreen from '@/core/SeasonReferee/About/Screen'
import UserRegisterScreen from '@/core/User/Register/Screen'

import AppBottomNavigator from '../../User/Home/BottomTabNavigator'

import { AppRootStackRoute, AppRootStack } from './Stack'

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
                component={SeasonEditScreen}
                name={AppRootStackRoute.SeasonEdit}
                options={{
                    title: 'Edit Details'
                }}
            />
            <AppRootStack.Screen
                component={SeasonAboutScreen}
                name={AppRootStackRoute.SeasonAbout}
                options={{
                    title: 'About'
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
