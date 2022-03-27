import { NavigatorScreenParams } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { AuthEmailSignInParams } from '@/features/AuthEmail/model'
import { UserHomeBottomTabParamList } from '../Home/BottomTab'

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
    SeasonParticipants = 'SeasonParticipants',
    SeasonParticipantsAdd = 'SeasonParticipantsAdd',
    SeasonStructure = 'SeasonStructure',
    SeasonEdit = 'SeasonEdit',
    SeasonSettings = 'SeasonSettings',
    SeasonAboutReferee = 'SeasonSettingsReferee',
    SeasonAboutManager = 'SeasonSettingsManager'
}

export type AppRootStackParamList = {
    [AppRootStackRoute.AuthSignIn]: undefined
    [AppRootStackRoute.AuthEmailSent]: {
        email: string
    }
    [AppRootStackRoute.AuthEmailReceiveLinkAlt]: AuthEmailSignInParams
    [AppRootStackRoute.AuthEmailReceiveLink]: AuthEmailSignInParams
    [AppRootStackRoute.Register]: undefined
    [AppRootStackRoute.Home]: NavigatorScreenParams<UserHomeBottomTabParamList>
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
    [AppRootStackRoute.SeasonSettings]: {
        seasonId: string
    }
    [AppRootStackRoute.SeasonAboutReferee]: {
        seasonId: string
    }
    [AppRootStackRoute.SeasonAboutManager]: {
        seasonId: string
    }
}

export const AppRootStack = createStackNavigator<AppRootStackParamList>()
