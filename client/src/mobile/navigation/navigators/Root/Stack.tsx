import { NavigatorScreenParams } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { AppBottomTabParamList } from '../BottomTab/types'

export enum RootStackRoute {
    Account = 'Account',
    AddDivision = 'AddDivision',
    AddPosition = 'AddPosition',
    AddSeasonParticipants = 'AddSeasonParticipants',
    App = 'App',
    ChangeGameListingAssignee = 'ChangeGameListingAssignee',
    CreateGame = 'CreateGame',
    CreateOrg = 'CreateOrg',
    CreateSeason = 'CreateSeason',
    Division = 'Division',
    Game = 'Game',
    JoinedOrgs = 'JoinedOrgs',
    JoinOrg = 'JoinOrg',
    Org = 'Org',
    OrgAbout = 'OrgAbout',
    OrgMembers = 'OrgMembers',
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
    SeasonSettings = 'SeasonSettings',
    SignIn = 'SignIn',
    ViewerAbout = 'ViewerAbout'
}

export type RootStackParamList = {
    [RootStackRoute.Account]: undefined
    [RootStackRoute.AddDivision]: {
        seasonId: string
    }
    [RootStackRoute.AddPosition]: {
        divisionId: string
    }
    [RootStackRoute.AddSeasonParticipants]: {
        seasonId: string
    }
    [RootStackRoute.App]: NavigatorScreenParams<AppBottomTabParamList>
    [RootStackRoute.ChangeGameListingAssignee]: {
        gameListingId: string
    }
    [RootStackRoute.CreateGame]: {
        seasonId: string
    }
    [RootStackRoute.CreateOrg]: undefined
    [RootStackRoute.CreateSeason]: {
        orgId: string
    }
    [RootStackRoute.Division]: {
        divisionId: string
    }
    [RootStackRoute.Game]: {
        gameId: string
    }
    [RootStackRoute.JoinedOrgs]: undefined
    [RootStackRoute.JoinOrg]: undefined
    [RootStackRoute.Org]: {
        orgId: string
    }
    [RootStackRoute.OrgAbout]: {
        orgId: string
    }
    [RootStackRoute.OrgMembers]: {
        orgId: string
    }
    [RootStackRoute.OrgSeasons]: {
        orgId: string
    }
    [RootStackRoute.Position]: {
        positionId: string
    }
    [RootStackRoute.RefreeSettings]: {
        seasonId: string
        userId: string
    }
    [RootStackRoute.Register]: undefined
    [RootStackRoute.Season]: {
        seasonId: string
    }
    [RootStackRoute.SeasonAbout]: {
        seasonId: string
    }
    [RootStackRoute.SeasonCalendar]: {
        seasonId: string
    }
    [RootStackRoute.SeasonDivisions]: {
        seasonId: string
    }
    [RootStackRoute.SeasonParticipantProfile]: {
        seasonId: string
        userId: string
    }
    [RootStackRoute.SeasonParticipants]: {
        seasonId: string
    }
    [RootStackRoute.SeasonProfile]: {
        seasonId: string
    }
    [RootStackRoute.SeasonSettings]: {
        seasonId: string
    }
    [RootStackRoute.SignIn]: undefined
    [RootStackRoute.ViewerAbout]: undefined
}

export const RootStack = createStackNavigator<RootStackParamList>()
