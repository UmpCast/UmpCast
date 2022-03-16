import { AppAuthState } from '@/core/App/model'
import AuthSignInScreen from '@/core/App/SignIn/Screen'
import useAuthState from '@/core/App/useAuthState'
import AuthEmailSentConfirmation from '@/core/AuthEmail/SendSignInLink/Confirmation'
import DivisionCreateScreen from '@/core/Division/Create/DivisionCreateScreen'
import OrgCreateScreen from '@/core/Org/Create/Screen'
import OrgEditScreen from '@/core/Org/Edit/OrgEditScreen'
import OrgSeasonScreen from '@/core/OrgSeasons/OrgSeasonListScreen'
import OrgSettingsScreen from '@/core/Org/Settings/OrgSettingsScreen'
import OrgMemberHeaderRight from '@/core/OrgMember/List/OrgMemberInfoHeaderRight'
import OrgMemberScreen from '@/core/OrgMember/List/OrgMemberInfoScreen'
import PositionCreateScreen from '@/core/Position/Create/PositionCreateScreen'
import SeasonCreateScreen from '@/core/OrgSeason/Create/SeasonCreateScreen'
import SeasonEditScreen from '@/core/Season/EditDetails/SeasonEditScreen'
import SeasonStructureRightHeader from '@/core/Season/EditStructure/SeasonStructureRightHeader'
import SeasonStructureScreen from '@/core/Season/EditStructure/SeasonStructureScreen'
import SeasonAboutScreen from '@/core/Season/About/SeasonInfoScreen'
import SeasonParticipantAddScreen from '@/core/SeasonParticipant/Add/SeasonParticipantAddScreen'
import SeasonParticipantListHeaderRight from '@/core/SeasonParticipant/List/SeasonParticipantListHeaderRight'
import SeasonParticipantListScreen from '@/core/SeasonParticipant/List/SeasonParticipantListScreen'
import SeasonRefereeInfoScreen from '@/core/SeasonReferee/Info/SeasonRefereeInfoScreen'
import UserRegistrationScreen from '@/core/User/Register/UserRegistrationScreen'
import { createStackNavigator } from '@react-navigation/stack'
import { Text } from 'native-base'
import AppBottomNavigator from './AppBottomNavigator'
import { RootStackParamList, RootStackRoutes } from './AppRootStackTypes'

export const RootStack = createStackNavigator<RootStackParamList>()

export const getInitialRoute = (state: AppAuthState) => {
    if (!state.authenticated) return RootStackRoutes.AuthSignIn
    if (!state.registered) return RootStackRoutes.Register
    return RootStackRoutes.Home
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
