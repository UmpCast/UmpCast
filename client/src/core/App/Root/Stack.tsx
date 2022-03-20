import { AuthEmailSignInParams } from '@/core/AuthEmail/model'
import { UserHomeBottomTabsParamList } from '@/core/User/Home/BottomTabs'
import { NavigatorScreenParams } from '@react-navigation/native'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'

export enum AppRootStackRoute {
    AuthSignIn = 'AuthSignIn',
    AuthEmailSent = 'AuthEmailSent',
    AuthEmailReceiveLink = 'AuthEmailReceiveLink',
    AuthEmailReceiveLinkAlt = 'AuthEmailReceiveLinkAlt',
    DivisionCreate = 'DivisionCreate',
    Home = 'Home',
    OrgCreate = 'OrgCreate',
    OrgEdit = 'OrgEdit',
    OrgSettings = 'OrgSettings',
    OrgMembers = 'OrgMembers',
    OrgSeasons = 'OrgSeasons',
    PositionCreate = 'PositionCreate',
    Register = 'Register',
    SeasonCreate = 'SeasonCreate',
    SeasonSettings = 'SeasonSettings',
    SeasonParticipants = 'SeasonParticipants',
    SeasonParticipantsAdd = 'SeasonParticipantsAdd',
    SeasonStructure = 'SeasonStructure',
    SeasonEdit = 'SeasonEdit',
    SeasonAbout = 'SeasonAbout',
    SeasonAboutReferee = 'SeasonAboutReferee',
    SeasonAboutManager = 'SeasonAboutManager'
}

export type AppRootStackParamList = {
    [AppRootStackRoute.AuthSignIn]: undefined
    [AppRootStackRoute.AuthEmailSent]: {
        email: string
    }
    [AppRootStackRoute.AuthEmailReceiveLinkAlt]: AuthEmailSignInParams
    [AppRootStackRoute.AuthEmailReceiveLink]: AuthEmailSignInParams
    [AppRootStackRoute.Register]: undefined
    [AppRootStackRoute.Home]: NavigatorScreenParams<UserHomeBottomTabsParamList>
    [AppRootStackRoute.SeasonStructure]: {
        seasonId: string
    }
    [AppRootStackRoute.PositionCreate]: {
        divisionId: string
    }
    [AppRootStackRoute.DivisionCreate]: {
        seasonId: string
    }
    [AppRootStackRoute.OrgCreate]: undefined
    [AppRootStackRoute.OrgEdit]: {
        id: string
    }
    [AppRootStackRoute.OrgSettings]: {
        id: string
    }
    [AppRootStackRoute.OrgMembers]: {
        id: string
    }
    [AppRootStackRoute.OrgSeasons]: {
        id: string
    }
    [AppRootStackRoute.SeasonSettings]: {
        id: string
    }
    [AppRootStackRoute.SeasonCreate]: {
        orgId: string
    }
    [AppRootStackRoute.SeasonParticipants]: {
        seasonId: string
    }
    [AppRootStackRoute.SeasonParticipantsAdd]: {
        seasonId: string
    }
    [AppRootStackRoute.SeasonEdit]: {
        seasonId: string
    }
    [AppRootStackRoute.SeasonAbout]: {
        seasonId: string
    }
    [AppRootStackRoute.SeasonAboutReferee]: {
        seasonId: string
    }
    [AppRootStackRoute.SeasonAboutManager]: {
        seasonId: string
    }
}

export type AppRootStackScreenProps<
    TRoute extends AppRootStackRoute = keyof AppRootStackParamList
> = StackScreenProps<AppRootStackParamList, TRoute>

export const AppRootStack = createStackNavigator<AppRootStackParamList>()
