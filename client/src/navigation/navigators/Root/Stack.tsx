import { NavigatorScreenParams } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { AuthEmailSignInParams } from '@/features/AuthEmail/model'
import { UserHomeBottomTabParamList } from '../Home/BottomTab'

export enum RootStackRoute {
    DivisionPositionNew = 'PositionCreate',
    Home = 'Home',
    OrganizationMembers = 'OrgMembers',
    OrganizationNew = 'OrganizationNew',
    OrganizationSeasonNew = 'SeasonCreate',
    OrganizationSeasons = 'OrgSeasons',
    OrganizationSettings = 'OrganizationSettings',
    OrganizationSettingsProfile = 'OrganizationSettingsProfile',
    Register = 'Register',
    SeasonDivisionNew = 'SeasonDivisionNew',
    SeasonMeManager = 'SeasonMeManager',
    SeasonMeReferee = 'SeasonMeReferee',
    SeasonParticipants = 'SeasonParticipants',
    SeasonParticipantsAdd = 'SeasonParticipantsAdd',
    SeasonSettings = 'SeasonSettings',
    SeasonSettingsProfile = 'SeasonEdit',
    SeasonStructure = 'SeasonStructure',
    Signin = 'Signin',
    SigninLink = 'SigninLink',
    SigninLinkAlt = 'SigninLinkAlt',
    SigninLinkSent = 'SigninLinkSent'
}

export type RootStackParamList = {
    [RootStackRoute.Signin]: undefined
    [RootStackRoute.SigninLinkSent]: {
        email: string
    }
    [RootStackRoute.SigninLinkAlt]: AuthEmailSignInParams
    [RootStackRoute.SigninLink]: AuthEmailSignInParams
    [RootStackRoute.Register]: undefined
    [RootStackRoute.Home]: NavigatorScreenParams<UserHomeBottomTabParamList>
    [RootStackRoute.SeasonStructure]: {
        seasonId: string
    }
    [RootStackRoute.DivisionPositionNew]: {
        divisionId: string
    }
    [RootStackRoute.SeasonDivisionNew]: {
        seasonId: string
    }
    [RootStackRoute.OrganizationNew]: undefined
    [RootStackRoute.OrganizationSettingsProfile]: {
        orgId: string
    }
    [RootStackRoute.OrganizationSettings]: {
        orgId: string
    }
    [RootStackRoute.OrganizationMembers]: {
        orgId: string
    }
    [RootStackRoute.OrganizationSeasons]: {
        orgId: string
    }
    [RootStackRoute.OrganizationSeasonNew]: {
        orgId: string
    }
    [RootStackRoute.SeasonParticipants]: {
        seasonId: string
    }
    [RootStackRoute.SeasonParticipantsAdd]: {
        seasonId: string
    }
    [RootStackRoute.SeasonSettingsProfile]: {
        seasonId: string
    }
    [RootStackRoute.SeasonSettings]: {
        seasonId: string
    }
    [RootStackRoute.SeasonMeReferee]: {
        seasonId: string
    }
    [RootStackRoute.SeasonMeManager]: {
        seasonId: string
    }
}

export const RootStack = createStackNavigator<RootStackParamList>()
