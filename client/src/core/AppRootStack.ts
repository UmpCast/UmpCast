import { AuthSignInParams } from '@/models/Auth'
import { NavigationProp, NavigatorScreenParams } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AppBottomTabParamList } from './AppBottomTabs'

export enum RootStackRoutes {
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

export type RootStackParamList = {
    [RootStackRoutes.AuthSignIn]: undefined
    [RootStackRoutes.AuthEmailSent]: {
        email: string
    }
    [RootStackRoutes.AuthEmailReceiveLinkAlt]: AuthSignInParams
    [RootStackRoutes.AuthEmailReceiveLink]: AuthSignInParams
    [RootStackRoutes.Register]: undefined
    [RootStackRoutes.Home]: NavigatorScreenParams<AppBottomTabParamList>
    [RootStackRoutes.SeasonStructure]: {
        id: string
    }
    [RootStackRoutes.PositionCreate]: {
        divisionId: string
    }
    [RootStackRoutes.DivisionCreate]: {
        seasonId: string
    }
    [RootStackRoutes.OrgCreate]: undefined
    [RootStackRoutes.OrgEdit]: {
        id: string
    }
    [RootStackRoutes.OrgSettings]: {
        id: string
    }
    [RootStackRoutes.OrgMembers]: {
        id: string
    }
    [RootStackRoutes.OrgSeasons]: {
        id: string
    }
    [RootStackRoutes.SeasonSettings]: {
        id: string
    }
    [RootStackRoutes.SeasonCreate]: {
        orgId: string
    }
    [RootStackRoutes.SeasonParticipants]: {
        seasonId: string
    }
    [RootStackRoutes.SeasonParticipantsAdd]: {
        seasonId: string
    }
    [RootStackRoutes.SeasonEdit]: {
        seasonId: string
    }
    [RootStackRoutes.SeasonAbout]: {
        seasonId: string
    }
    [RootStackRoutes.SeasonAboutReferee]: {
        seasonId: string
    }
    [RootStackRoutes.SeasonAboutManager]: {
        seasonId: string
    }
}

export type RootStackNav<T extends RootStackRoutes> = NavigationProp<
    RootStackParamList,
    T
>

export const RootStack = createStackNavigator<RootStackParamList>()
