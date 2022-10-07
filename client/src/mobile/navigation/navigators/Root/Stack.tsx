import { NavigatorScreenParams } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { AppBottomTabParamList } from '../App/BottomTab'

export enum RootStackRoute {
    Org = 'Org',
    Orgs = 'Orgs',
    OrgSeasons = 'OrgSeasons',
    OrgAbout = 'OrgAbout',
    CreateGame = 'CreateGame',
    Account = 'Account',
    DivisionPositionNew = 'PositionCreate',
    AddDivision = 'AddDivision',
    AddPosition = 'AddPosition',
    RefreeSettings = 'RefereeSettings',
    Division = 'Division',
    Game = 'Game',
    GameListingAssignee = 'GameListingAssignee',
    Season = 'Season',
    SeasonAbout = 'SeasonAbout',
    App = 'App',
    OrgMembers = 'OrgMembers',
    OrganizationNew = 'OrganizationNew',
    CreateOrg = 'CreateOrg',
    ChangeGameListingAssignee = 'ChangeGameListingAssignee',
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
    SeasonDivisions = 'SeasonDivisions',
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
    [RootStackRoute.OrgAbout]: {
        orgId: string
    }
    [RootStackRoute.SeasonAbout]: {
        seasonId: string
    }
    [RootStackRoute.Login]: undefined
    [RootStackRoute.LoginLinkSent]: {
        email: string
    }
    [RootStackRoute.Register]: undefined
    [RootStackRoute.RefreeSettings]: {
        seasonId: string
        userId: string
    }
    [RootStackRoute.Org]: {
        orgId: string
    }
    [RootStackRoute.Orgs]: undefined
    [RootStackRoute.OrgSeasons]: {
        orgId: string
    }
    [RootStackRoute.Game]: {
        gameId: string
    }
    [RootStackRoute.CreateGame]: {
        seasonId: string
    }
    [RootStackRoute.GameListingAssignee]: {
        gameListingId: string
    }
    [RootStackRoute.ChangeGameListingAssignee]: {
        gameListingId: string
    }
    [RootStackRoute.App]: NavigatorScreenParams<AppBottomTabParamList>
    [RootStackRoute.SeasonStructure]: {
        seasonId: string
    }
    [RootStackRoute.SeasonDivisions]: {
        seasonId: string
    }
    [RootStackRoute.DivisionPositionNew]: {
        divisionId: string
    }
    [RootStackRoute.OrganizationNew]: undefined
    [RootStackRoute.OrgMembers]: {
        orgId: string
    }
    [RootStackRoute.Season]: {
        seasonId: string
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
    [RootStackRoute.CreateOrg]: undefined
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
