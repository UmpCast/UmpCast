import { NavigatorScreenParams } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { AuthEmailLoginParams } from '@/features/AuthEmail/model'

import { RootBottomTabParamList } from './BottomTab'

export enum RootStackRoute {
    Org = 'Org',
    Account = 'Account',
    DivisionPositionNew = 'PositionCreate',
    AddDivision = 'AddDivision',
    AddPosition = 'AddPosition',
    Division = 'Division',
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
    CreateSeason = 'CreateSeason',
    SeasonCalendar = 'SeasonCalendar',
    SeasonDivisionNew = 'SeasonDivisionNew',
    SeasonGameNew = 'SeasonGameNew',
    SeasonMeManager = 'SeasonMeManager',
    SeasonMeReferee = 'SeasonMeReferee',
    SeasonParticipants = 'SeasonParticipants',
    SeasonParticipantsAdd = 'SeasonParticipantsAdd',
    SeasonParticipantProfile = 'SeasonParticipantProfile',
    SeasonSettings = 'SeasonSettings',
    SeasonProfile = 'SeasonProfile',
    SeasonStructure = 'SeasonStructure',
    SeasonDivisionsScreen = 'SeasonStructureV2',
    Position = 'Position',
    Login = 'Login',
    LoginLink = 'LoginLink',
    LoginLinkAlt = 'LoginLinkAlt',
    LoginLinkSent = 'LoginLinkSent'
}

export type RootStackParamList = {
    [RootStackRoute.Account]: undefined
    [RootStackRoute.AddDivision]: {
        seasonId: string
    }
    [RootStackRoute.AddPosition]: {
        divisionId: string
    }
    [RootStackRoute.Division]: {
        divisionId: string
    }
    [RootStackRoute.Login]: undefined
    [RootStackRoute.LoginLinkSent]: {
        email: string
    }
    [RootStackRoute.LoginLinkAlt]: AuthEmailLoginParams
    [RootStackRoute.LoginLink]: AuthEmailLoginParams
    [RootStackRoute.Register]: undefined
    [RootStackRoute.Org]: {
        orgId: string
    },
    [RootStackRoute.Game]: {
        gameId: string
    }
    [RootStackRoute.GameListingAssignee]: {
        gameListingId: string
    }
    [RootStackRoute.Home]: NavigatorScreenParams<RootBottomTabParamList>
    [RootStackRoute.SeasonStructure]: {
        seasonId: string
    }
    [RootStackRoute.SeasonDivisionsScreen]: {
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
    [RootStackRoute.CreateSeason]: {
        orgId: string
    }
    [RootStackRoute.SeasonCalendar]: {
        seasonId: string
    }
    [RootStackRoute.SeasonDivisionNew]: {
        seasonId: string
    }
    [RootStackRoute.SeasonGameNew]: {
        seasonId: string
        date?: Date
    }
    [RootStackRoute.SeasonParticipantProfile]: {
        seasonId: string
        userId: string
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
    [RootStackRoute.Position]: {
        positionId: string
    }
}

export const RootStack = createStackNavigator<RootStackParamList>()
