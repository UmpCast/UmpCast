import { NavigatorScreenParams } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { AuthEmailLoginParams } from '@/features/AuthEmail/model'

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
    Login = 'Login',
    LoginLink = 'LoginLink',
    LoginLinkAlt = 'LoginLinkAlt',
    LoginLinkSent = 'LoginLinkSent'
}

export type RootStackParamList = {
    [RootStackRoute.Login]: undefined
    [RootStackRoute.LoginLinkSent]: {
        email: string
    }
    [RootStackRoute.LoginLinkAlt]: AuthEmailLoginParams
    [RootStackRoute.LoginLink]: AuthEmailLoginParams
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