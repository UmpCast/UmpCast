import { AppAuthState } from '@/core/App/model'
import AuthSignInScreen from '@/core/App/SignIn/Screen'
import useAuthState from '@/core/App/useAuthState'
import AuthEmailSentConfirmation from '@/core/AuthEmail/SendSignInLink/Confirmation'
import DivisionCreateScreen from '@/core/Division/Create/DivisionCreateScreen'
import OrgCreateScreen from '@/core/Org/Create/Screen'
import OrgEditScreen from '@/core/Org/Edit/OrgEditScreen'
import OrgSettingsScreen from '@/core/Org/Settings/OrgSettingsScreen'
import OrgMemberHeaderRight from '@/core/OrgMember/List/OrgMemberInfoHeaderRight'
import OrgMemberScreen from '@/core/OrgMember/List/OrgMemberInfoScreen'
import PositionCreateScreen from '@/core/Position/Create/Screen'
import SeasonCreateScreen from '@/core/OrgSeason/Create/SeasonCreateScreen'
import SeasonEditScreen from '@/core/Season/EditDetails/SeasonEditScreen'
import SeasonStructureRightHeader from '@/core/Season/EditStructure/SeasonStructureRightHeader'
import SeasonStructureScreen from '@/core/Season/EditStructure/SeasonStructureScreen'
import SeasonAboutScreen from '@/core/Season/About/SeasonInfoScreen'
import SeasonParticipantAddScreen from '@/core/SeasonParticipant/BatchAdd/Screen'
import SeasonParticipantListHeaderRight from '@/core/SeasonParticipant/List/ScreenHeaderRight'
import SeasonParticipantListScreen from '@/core/SeasonParticipant/List/Screen'
import SeasonRefereeInfoScreen from '@/core/SeasonReferee/Info/SeasonRefereeInfoScreen'
import UserRegisterScreen from '@/core/User/Register/Screen'
import { Text } from 'native-base'
import AppBottomNavigator from '../../User/Home/BottomTabsNavigator'
import { RootStackRoutes } from './Stack'
import OrgSeasonScreen from '@/core/OrgSeason/List/OrgSeasonListScreen'
import AuthEmailReceiveSignInLinkScreen from '@/core/AuthEmail/ReceiveSignInLink/Screen'
import { AppRootStack } from './Stack'

export const getInitialRoute = (state: AppAuthState) => {
    if (!state.authenticated) return RootStackRoutes.AuthSignIn
    if (!state.registered) return RootStackRoutes.Register
    return RootStackRoutes.Home
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
                    name={RootStackRoutes.AuthSignIn}
                />
                <AppRootStack.Screen
                    component={AuthEmailSentConfirmation}
                    name={RootStackRoutes.AuthEmailSent}
                />
                <AppRootStack.Screen
                    component={AuthEmailReceiveSignInLinkScreen}
                    name={RootStackRoutes.AuthEmailReceiveLink}
                />
                <AppRootStack.Screen
                    component={AuthEmailReceiveSignInLinkScreen}
                    name={RootStackRoutes.AuthEmailReceiveLinkAlt}
                />
            </AppRootStack.Group>
        )

    if (!state.registered)
        return (
            <AppRootStack.Screen
                component={UserRegisterScreen}
                name={RootStackRoutes.Register}
                options={{ headerShown: false }}
            />
        )

    return (
        <>
            <AppRootStack.Group screenOptions={{ headerShown: false }}>
                <AppRootStack.Screen
                    component={AppBottomNavigator}
                    name={RootStackRoutes.Home}
                    options={{
                        headerShown: false
                    }}
                />
            </AppRootStack.Group>
            <AppRootStack.Screen
                component={PositionCreateScreen}
                name={RootStackRoutes.PositionCreate}
                options={{
                    title: 'Create Position'
                }}
            />
            <AppRootStack.Screen
                component={DivisionCreateScreen}
                name={RootStackRoutes.DivisionCreate}
                options={{
                    title: 'Create Division'
                }}
            />
            <AppRootStack.Screen
                component={SeasonStructureScreen}
                name={RootStackRoutes.SeasonStructure}
                options={(props) => ({
                    title: 'Season Structure',
                    headerRight: () => <SeasonStructureRightHeader {...props} />
                })}
            />
            <AppRootStack.Screen
                component={OrgCreateScreen}
                name={RootStackRoutes.OrgCreate}
                options={{
                    title: 'Create Organization'
                }}
            />
            <AppRootStack.Screen
                component={OrgEditScreen}
                name={RootStackRoutes.OrgEdit}
                options={{
                    title: 'Organization Profile'
                }}
            />
            <AppRootStack.Screen
                component={OrgSettingsScreen}
                name={RootStackRoutes.OrgSettings}
                options={{
                    title: 'Organization Settings'
                }}
            />
            <AppRootStack.Screen
                component={OrgMemberScreen}
                name={RootStackRoutes.OrgMembers}
                options={{
                    title: 'Members',
                    headerRight: () => <OrgMemberHeaderRight />
                }}
            />
            <AppRootStack.Screen
                component={OrgSeasonScreen}
                name={RootStackRoutes.OrgSeasons}
                options={{
                    title: 'Seasons'
                }}
            />
            <AppRootStack.Screen
                component={SeasonCreateScreen}
                name={RootStackRoutes.SeasonCreate}
                options={{
                    title: 'Create Season'
                }}
            />
            <AppRootStack.Screen
                component={SeasonParticipantListScreen}
                name={RootStackRoutes.SeasonParticipants}
                options={{
                    title: 'Members',
                    headerRight: () => <SeasonParticipantListHeaderRight />
                }}
            />
            <AppRootStack.Screen
                component={SeasonParticipantAddScreen}
                name={RootStackRoutes.SeasonParticipantsAdd}
                options={{
                    title: 'Members'
                }}
            />
            <AppRootStack.Screen
                component={SeasonEditScreen}
                name={RootStackRoutes.SeasonEdit}
                options={{
                    title: 'Edit Details'
                }}
            />
            <AppRootStack.Screen
                component={SeasonAboutScreen}
                name={RootStackRoutes.SeasonAbout}
                options={{
                    title: 'About'
                }}
            />
            <AppRootStack.Screen
                component={SeasonRefereeInfoScreen}
                name={RootStackRoutes.SeasonAboutReferee}
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
