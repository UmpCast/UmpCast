import { NavigatorScreenParams } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { AppBottomTabParamList } from '../BottomTab/types'

export enum RootStackRoute {
    Account = 'Account',
    AddDivision = 'AddDivision',
    AddPosition = 'AddPosition',
    SignIn = 'SignIn',
    AddSeasonParticipants = 'AddSeasonParticipants',
    App = 'App',
    ViewerAbout = 'ViewerAbout',
    ChangeGameListingAssignee = 'ChangeGameListingAssignee',
    CreateGame = 'CreateGame',
    CreateOrg = 'CreateOrg',
    CreateSeason = 'CreateSeason',
    Division = 'Division',
    Game = 'Game',
    JoinOrg = 'JoinOrg',
    Login = 'Login',
    LoginLink = 'LoginLink',
    LoginLinkAlt = 'LoginLinkAlt',
    LoginLinkSent = 'LoginLinkSent',
    Org = 'Org',
    OrgAbout = 'OrgAbout',
    OrgMembers = 'OrgMembers',
    JoinedOrgs = 'JoinedOrgs',
    OrgSeasons = 'OrgSeasons',
    Position = 'Position',
    RefreeSettings = 'RefereeSettings',
    Register = 'Register',
    Season = 'Season',
    SeasonAbout = 'SeasonAbout',
    SeasonCalendar = 'SeasonCalendar',
    SeasonDivisions = 'SeasonDivisions',
    SeasonParticipantProfile = 'SeasonParticipantProfile',
    SeasonParticipants = 'SeasonParticipants',
    SeasonProfile = 'SeasonProfile',
    SeasonSettings = 'SeasonSettings'
}

export type RootStackParamList = {
    [RootStackRoute.Account]: undefined
    [RootStackRoute.AddDivision]: {
        seasonId: string
    }
    [RootStackRoute.AddPosition]: {
        divisionId: string
    }
    [RootStackRoute.SignIn]: undefined
    [RootStackRoute.JoinOrg]: undefined
    [RootStackRoute.ViewerAbout]: undefined
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
    [RootStackRoute.JoinedOrgs]: undefined
    [RootStackRoute.OrgSeasons]: {
        orgId: string
    }
    [RootStackRoute.Game]: {
        gameId: string
    }
    [RootStackRoute.CreateGame]: {
        seasonId: string
    }
    [RootStackRoute.ChangeGameListingAssignee]: {
        gameListingId: string
    }
    [RootStackRoute.App]: NavigatorScreenParams<AppBottomTabParamList>
    [RootStackRoute.SeasonDivisions]: {
        seasonId: string
    }
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
    [RootStackRoute.CreateOrg]: undefined
    [RootStackRoute.SeasonParticipantProfile]: {
        seasonId: string
        userId: string
    }
    [RootStackRoute.SeasonParticipants]: {
        seasonId: string
    }
    [RootStackRoute.AddSeasonParticipants]: {
        seasonId: string
    }
    [RootStackRoute.SeasonProfile]: {
        seasonId: string
    }
    [RootStackRoute.SeasonSettings]: {
        seasonId: string
    }
    [RootStackRoute.Position]: {
        positionId: string
    }
}

export const RootStack = createStackNavigator<RootStackParamList>()
