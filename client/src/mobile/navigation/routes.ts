import { createNativeStackNavigator } from '@react-navigation/native-stack'

export enum NavRoute {
    Tabs_ = 'Tabs_',

    Home_ = 'Home_',
    Search_ = 'Search_',
    Account_ = 'Account_',

    AddDivision = 'AddDivision',
    AddPosition = 'AddPosition',
    Home = 'Home',
    Search = 'Search',
    Account = 'Account',
    AddSeasonParticipants = 'AddSeasonParticipants',
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

export type NavParamList = {
    [NavRoute.Tabs_]: undefined

    [NavRoute.Home_]: undefined
    [NavRoute.Search_]: undefined
    [NavRoute.Account_]: undefined

    [NavRoute.Home]: undefined
    [NavRoute.Search]: undefined
    [NavRoute.Account]: undefined
    [NavRoute.AddDivision]: {
        seasonId: string
    }
    [NavRoute.AddPosition]: {
        divisionId: string
    }
    [NavRoute.AddSeasonParticipants]: {
        seasonId: string
    }
    [NavRoute.ChangeGameListingAssignee]: {
        gameListingId: string
    }
    [NavRoute.CreateGame]: {
        seasonId: string
    }
    [NavRoute.CreateOrg]: undefined
    [NavRoute.CreateSeason]: {
        orgId: string
    }
    [NavRoute.Division]: {
        divisionId: string
    }
    [NavRoute.Game]: {
        gameId: string
    }
    [NavRoute.JoinedOrgs]: undefined
    [NavRoute.JoinOrg]: undefined
    [NavRoute.Org]: {
        orgId: string
    }
    [NavRoute.OrgAbout]: {
        orgId: string
    }
    [NavRoute.OrgMembers]: {
        orgId: string
    }
    [NavRoute.OrgSeasons]: {
        orgId: string
    }
    [NavRoute.Position]: {
        positionId: string
    }
    [NavRoute.RefreeSettings]: {
        seasonId: string
        userId: string
    }
    [NavRoute.Register]: undefined
    [NavRoute.Season]: {
        seasonId: string
    }
    [NavRoute.SeasonAbout]: {
        seasonId: string
    }
    [NavRoute.SeasonCalendar]: {
        seasonId: string
    }
    [NavRoute.SeasonDivisions]: {
        seasonId: string
    }
    [NavRoute.SeasonParticipantProfile]: {
        seasonId: string
        userId: string
    }
    [NavRoute.SeasonParticipants]: {
        seasonId: string
    }
    [NavRoute.SeasonProfile]: {
        seasonId: string
    }
    [NavRoute.SeasonSettings]: {
        seasonId: string
    }
    [NavRoute.Tabs_]: undefined
    [NavRoute.SignIn]: undefined
    [NavRoute.ViewerAbout]: undefined
}

export const TabsStack = createNativeStackNavigator<NavParamList>()
