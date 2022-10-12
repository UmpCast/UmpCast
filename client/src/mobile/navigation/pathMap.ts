import { PathConfigMap } from '@react-navigation/native'

import { AppBottomTabRoute } from './navigators/BottomTab/types'
import { RootStackParamList, RootStackRoute } from './navigators/Root/Stack'

const navigationPathMap: PathConfigMap<RootStackParamList> = {
    [RootStackRoute.AddDivision]: 'AddDivision',
    [RootStackRoute.AddPosition]: 'AddPosition',
    [RootStackRoute.Division]: 'Division',
    [RootStackRoute.SignIn]: 'SignIn',
    [RootStackRoute.Game]: 'Game',
    [RootStackRoute.ViewerAbout]: 'ViewerAbout',
    [RootStackRoute.CreateGame]: 'CreateGame',
    [RootStackRoute.CreateOrg]: 'CreateOrg',
    [RootStackRoute.JoinedOrgs]: 'Orgs',
    [RootStackRoute.Org]: 'Org',
    [RootStackRoute.OrgSeasons]: 'OrgSeasons',
    [RootStackRoute.OrgAbout]: 'OrgAbout',
    [RootStackRoute.SeasonAbout]: 'SeasonAbout',
    [RootStackRoute.OrgMembers]: 'OrgMembers',
    [RootStackRoute.ChangeGameListingAssignee]: 'ChangeGameListingAssignee',
    [RootStackRoute.CreateSeason]: 'CreateSeason',
    [RootStackRoute.Register]: 'register',
    [RootStackRoute.SeasonCalendar]: 'SeasonCalendar',
    [RootStackRoute.SeasonParticipantProfile]: 'SeasonParticipantProfile',
    [RootStackRoute.SeasonParticipants]: 'SeasonParticipants',
    [RootStackRoute.AddSeasonParticipants]: 'AddSeasonParticipants',
    [RootStackRoute.RefreeSettings]: 'RefereeSettings',
    [RootStackRoute.SeasonDivisions]: 'SeasonDivisions',
    [RootStackRoute.JoinOrg]: 'JoinOrg',
    [RootStackRoute.Season]: 'Season',
    [RootStackRoute.App]: {
        screens: {
            [AppBottomTabRoute.Home]: 'Home',
            [AppBottomTabRoute.GameSearch]: 'GameSearch',
            [AppBottomTabRoute.Inbox]: 'Inbox',
            [AppBottomTabRoute.Account]: 'Account'
        }
    }
}

export default navigationPathMap
