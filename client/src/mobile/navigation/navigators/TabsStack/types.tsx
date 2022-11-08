import { createNativeStackNavigator } from '@react-navigation/native-stack';

export enum TabsStackRoute {
    Account = 'Account',
    AddDivision = 'AddDivision',
    AddPosition = 'AddPosition',
    AddSeasonParticipants = 'AddSeasonParticipants',
    ChangeGameListingAssignee = 'ChangeGameListingAssignee',
    CreateGame = 'CreateGame',
    CreateOrg = 'CreateOrg',
    CreateSeason = 'CreateSeason',
    Division = 'Division',
    Game = 'Game',
    Home = 'Home',
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
    Search = 'Search',
    SignIn = 'SignIn',
    ViewerAbout = 'ViewerAbout'
}

export type TabsStackParamList = {
    [TabsStackRoute.Account]: undefined
    [TabsStackRoute.AddDivision]: {
        seasonId: string
    }
    [TabsStackRoute.AddPosition]: {
        divisionId: string
    }
    [TabsStackRoute.AddSeasonParticipants]: {
        seasonId: string
    }
    [TabsStackRoute.ChangeGameListingAssignee]: {
        gameListingId: string
    }
    [TabsStackRoute.CreateGame]: {
        seasonId: string
    }
    [TabsStackRoute.CreateOrg]: undefined
    [TabsStackRoute.CreateSeason]: {
        orgId: string
    }
    [TabsStackRoute.Division]: {
        divisionId: string
    }
    [TabsStackRoute.Game]: {
        gameId: string
    }
    [TabsStackRoute.Home]: undefined
    [TabsStackRoute.JoinedOrgs]: undefined
    [TabsStackRoute.JoinOrg]: undefined
    [TabsStackRoute.Org]: {
        orgId: string
    }
    [TabsStackRoute.OrgAbout]: {
        orgId: string
    }
    [TabsStackRoute.OrgMembers]: {
        orgId: string
    }
    [TabsStackRoute.OrgSeasons]: {
        orgId: string
    }
    [TabsStackRoute.Position]: {
        positionId: string
    }
    [TabsStackRoute.RefreeSettings]: {
        seasonId: string
        userId: string
    }
    [TabsStackRoute.Register]: undefined
    [TabsStackRoute.Season]: {
        seasonId: string
    }
    [TabsStackRoute.SeasonAbout]: {
        seasonId: string
    }
    [TabsStackRoute.SeasonCalendar]: {
        seasonId: string
    }
    [TabsStackRoute.SeasonDivisions]: {
        seasonId: string
    }
    [TabsStackRoute.SeasonParticipantProfile]: {
        seasonId: string
        userId: string
    }
    [TabsStackRoute.SeasonParticipants]: {
        seasonId: string
    }
    [TabsStackRoute.SeasonProfile]: {
        seasonId: string
    }
    [TabsStackRoute.SeasonSettings]: {
        seasonId: string
    }
    [TabsStackRoute.Search]: undefined
    [TabsStackRoute.SignIn]: undefined
    [TabsStackRoute.ViewerAbout]: undefined
}

export const TabsStack = createNativeStackNavigator<TabsStackParamList>()
