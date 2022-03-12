import { Text } from 'native-base'

import { RootStackRoutes, RootStack } from '@/core/App/Root/Stack'
import AuthEmailReceiveEntry from '@/core/Auth/Email/ReceiveLink'
import AuthEmailSentScreen from '@/core/Auth/Email/SentConfirmation'
import AuthSignInScreen from '@/core/Auth/SignIn/Screen'
import DivisionCreateScreen from '@/core/Division/Create/Screen'
import OrgCreateScreen from '@/core/Org/Create/Screen'
import OrgEditScreen from '@/core/Org/Edit/Screen'
import OrgMemberHeaderRight from '@/core/Org/Member/Info/HeaderRight'
import OrgMemberScreen from '@/core/Org/Member/Info/Screen'
import OrgSeasonScreen from '@/core/Org/Season/List/Screen'
import OrgSettingsScreen from '@/core/Org/Settings/Screen'
import PositionCreateScreen from '@/core/Position/Create/Screen'
import SeasonCreateScreen from '@/core/Season/Create/Screen'
import SeasonEditScreen from '@/core/Season/Edit/Screen'
import SeasonAboutScreen from '@/core/Season/Info/Screen'
import SeasonParticipantAddScreen from '@/core/Season/Participant/Add/Screen'
import SeasonParticipantListHeaderRight from '@/core/Season/Participant/List/HeaderRight'
import SeasonParticipantListScreen from '@/core/Season/Participant/List/Screen'
import SeasonRefereeInfoScreen from '@/core/Season/Referee/Info/Screen'
import SeasonStructureRightHeader from '@/core/Season/Structure/RightHeader'
import SeasonStructureScreen from '@/core/Season/Structure/Screen'
import UserRegistrationScreen from '@/core/User/Registration/Screen'

import AppBottomNavigator from '../Bottom/Navigator'
import { AuthState } from '../model'

import useAuthState from './useAuthState'

export const getInitialRoute = (state: AuthState) => {
    if (!state.authenticated) return RootStackRoutes.AuthSignIn
    if (!state.registered) return RootStackRoutes.Register
    return RootStackRoutes.Home
}

export const renderProtectedScreens = (state: AuthState) => {
    if (!state.authenticated)
        return (
            <RootStack.Group
                key="SignIn"
                screenOptions={{
                    headerShown: false
                }}
            >
                <RootStack.Screen
                    component={AuthSignInScreen}
                    name={RootStackRoutes.AuthSignIn}
                />
                <RootStack.Screen
                    component={AuthEmailSentScreen}
                    name={RootStackRoutes.AuthEmailSent}
                />
                <RootStack.Screen
                    component={AuthEmailReceiveEntry}
                    name={RootStackRoutes.AuthEmailReceiveLink}
                />
                <RootStack.Screen
                    component={AuthEmailReceiveEntry}
                    name={RootStackRoutes.AuthEmailReceiveLinkAlt}
                />
            </RootStack.Group>
        )

    if (!state.registered)
        return (
            <RootStack.Screen
                component={UserRegistrationScreen}
                name={RootStackRoutes.Register}
                options={{ headerShown: false }}
            />
        )

    return (
        <>
            <RootStack.Group screenOptions={{ headerShown: false }}>
                <RootStack.Screen
                    component={AppBottomNavigator}
                    name={RootStackRoutes.Home}
                    options={{
                        headerShown: false
                    }}
                />
            </RootStack.Group>
            <RootStack.Screen
                component={PositionCreateScreen}
                name={RootStackRoutes.PositionCreate}
                options={{
                    title: 'Create Position'
                }}
            />
            <RootStack.Screen
                component={DivisionCreateScreen}
                name={RootStackRoutes.DivisionCreate}
                options={{
                    title: 'Create Division'
                }}
            />
            <RootStack.Screen
                component={SeasonStructureScreen}
                name={RootStackRoutes.SeasonStructure}
                options={(props) => ({
                    title: 'Season Structure',
                    headerRight: () => <SeasonStructureRightHeader {...props} />
                })}
            />
            <RootStack.Screen
                component={OrgCreateScreen}
                name={RootStackRoutes.OrgCreate}
                options={{
                    title: 'Create Organization'
                }}
            />
            <RootStack.Screen
                component={OrgEditScreen}
                name={RootStackRoutes.OrgEdit}
                options={{
                    title: 'Organization Profile'
                }}
            />
            <RootStack.Screen
                component={OrgSettingsScreen}
                name={RootStackRoutes.OrgSettings}
                options={{
                    title: 'Organization Settings'
                }}
            />
            <RootStack.Screen
                component={OrgMemberScreen}
                name={RootStackRoutes.OrgMembers}
                options={{
                    title: 'Members',
                    headerRight: () => <OrgMemberHeaderRight />
                }}
            />
            <RootStack.Screen
                component={OrgSeasonScreen}
                name={RootStackRoutes.OrgSeasons}
                options={{
                    title: 'Seasons'
                }}
            />
            <RootStack.Screen
                component={SeasonCreateScreen}
                name={RootStackRoutes.SeasonCreate}
                options={{
                    title: 'Create Season'
                }}
            />
            <RootStack.Screen
                component={SeasonParticipantListScreen}
                name={RootStackRoutes.SeasonParticipants}
                options={{
                    title: 'Members',
                    headerRight: () => <SeasonParticipantListHeaderRight />
                }}
            />
            <RootStack.Screen
                component={SeasonParticipantAddScreen}
                name={RootStackRoutes.SeasonParticipantsAdd}
                options={{
                    title: 'Members'
                }}
            />
            <RootStack.Screen
                component={SeasonEditScreen}
                name={RootStackRoutes.SeasonEdit}
                options={{
                    title: 'Edit Details'
                }}
            />
            <RootStack.Screen
                component={SeasonAboutScreen}
                name={RootStackRoutes.SeasonAbout}
                options={{
                    title: 'About'
                }}
            />
            <RootStack.Screen
                component={SeasonRefereeInfoScreen}
                name={RootStackRoutes.SeasonAboutReferee}
                options={{
                    title: 'Referee'
                }}
            />
        </>
    )
}

export default function AppInitializedNavigator() {
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
