import { NavigatorScreenParams } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { AuthEmailLoginParams } from '@/features/AuthEmail/model'

import { HomeBottomTabParamList } from '../Home/BottomTab'

export enum RootStackRoute {
    Account = 'Account',
    DivisionPositionNew = 'PositionCreate',
    Game = 'Game',
    GameListingAssignee = 'GameListingAssignee',
    Home = 'Home',
    OrganizationMembers = 'OrgMembers',
    OrganizationNew = 'OrganizationNew',
    OrganizationSeasonNew = 'SeasonCreate',
    OrganizationSeasons = 'OrgSeasons',
    OrganizationSettings = 'OrganizationSettings',
    OrganizationSettingsProfile = 'OrganizationSettingsProfile',
    Register = 'Register',
    SeasonCalendar = 'SeasonCalendar',
    SeasonDivisionNew = 'SeasonDivisionNew',
    SeasonGameNew = 'SeasonGameNew',
    SeasonMeManager = 'SeasonMeManager',
    SeasonMeReferee = 'SeasonMeReferee',
    SeasonParticipants = 'SeasonParticipants',
    SeasonParticipantsAdd = 'SeasonParticipantsAdd',
    SeasonSettings = 'SeasonSettings',
    SeasonProfile = 'SeasonProfile',
    SeasonStructure = 'SeasonStructure',
    Login = 'Login',
    LoginLink = 'LoginLink',
    LoginLinkAlt = 'LoginLinkAlt',
    LoginLinkSent = 'LoginLinkSent'
}

export type RootStackParamList = {
    [RootStackRoute.Account]: undefined
    [RootStackRoute.Login]: undefined
    [RootStackRoute.LoginLinkSent]: {
        email: string
    }
    [RootStackRoute.LoginLinkAlt]: AuthEmailLoginParams
    [RootStackRoute.LoginLink]: AuthEmailLoginParams
    [RootStackRoute.Register]: undefined
    [RootStackRoute.Game]: {
        gameId: string
    }
    [RootStackRoute.GameListingAssignee]: {
        gameListingId: string
    }
    [RootStackRoute.Home]: NavigatorScreenParams<HomeBottomTabParamList>
    [RootStackRoute.SeasonStructure]: {
        seasonId: string
    }
    [RootStackRoute.DivisionPositionNew]: {
        divisionId: string
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
    [RootStackRoute.SeasonCalendar]: {
        seasonId: string
        day?: Date
    }
    [RootStackRoute.SeasonDivisionNew]: {
        seasonId: string
    }
    [RootStackRoute.SeasonGameNew]: {
        seasonId: string
        date?: Date
    }
    [RootStackRoute.SeasonParticipants]: {
        seasonId: string
    }
    [RootStackRoute.SeasonParticipantsAdd]: {
        seasonId: string
    }
    [RootStackRoute.SeasonProfile]: {
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
