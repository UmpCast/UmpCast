import { Text } from 'native-base'

import useAuthState from '@/hooks/useAuthState'
import { AuthState } from '@/models/Auth'

import AppBottomNavigator from './AppBottomNavigator'
import { RootStackRoutes, RootStack } from './AppRootStack'
import AuthEmailReceiveEntry from './AuthEmailReceiveLink'
import AuthEmailSentConfirmation from './AuthEmailSentConfirmation'
import AuthSignInScreen from './AuthSignInScreen'
import DivisionCreateScreen from './DivisionCreateScreen'
import OrgCreateScreen from './OrgCreateScreen'
import OrgEditScreen from './OrgEditScreen'
import OrgMemberHeaderRight from './OrgMemberInfoHeaderRight'
import OrgMemberScreen from './OrgMemberInfoScreen'
import OrgSeasonScreen from './OrgSeasonListScreen'
import OrgSettingsScreen from './OrgSettingsScreen'
import PositionCreateScreen from './PositionCreateScreen'
import SeasonCreateScreen from './SeasonCreateScreen'
import SeasonEditScreen from './SeasonEditScreen'
import SeasonAboutScreen from './SeasonInfoScreen'
import SeasonParticipantAddScreen from './SeasonParticipantAddScreen'
import SeasonParticipantListHeaderRight from './SeasonParticipantListHeaderRight'
import SeasonParticipantListScreen from './SeasonParticipantListScreen'
import SeasonRefereeInfoScreen from './SeasonRefereeInfoScreen'
import SeasonStructureRightHeader from './SeasonStructureRightHeader'
import SeasonStructureScreen from './SeasonStructureScreen'
import UserRegistrationScreen from './UserRegistrationScreen'

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
                    component={AuthEmailSentConfirmation}
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
