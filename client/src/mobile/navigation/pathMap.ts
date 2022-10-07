import { PathConfigMap } from '@react-navigation/native'

import { AppBottomTabRoute } from './navigators/App/BottomTab'
import { RootStackParamList, RootStackRoute } from './navigators/Root/Stack'

const navigationPathMap: PathConfigMap<RootStackParamList> = {
    [RootStackRoute.Account]: 'account',
    [RootStackRoute.AddDivision]: 'AddDivision',
    [RootStackRoute.AddPosition]: 'AddPosition',
    [RootStackRoute.Division]: 'Division',
    [RootStackRoute.Login]: 'sign-in',
    [RootStackRoute.LoginLinkSent]: 'email/sent',
    [RootStackRoute.Game]: 'Game',
    [RootStackRoute.CreateGame]: 'CreateGame',
    [RootStackRoute.CreateOrg]: 'CreateOrg',
    [RootStackRoute.GameListingAssignee]: 'game/listing/:gameListingId/assignee',
    [RootStackRoute.Orgs]: 'Orgs',
    [RootStackRoute.Org]: 'Org',
    [RootStackRoute.OrgSeasons]: 'OrgSeasons',
    [RootStackRoute.OrgAbout]: 'OrgAbout',
    [RootStackRoute.SeasonAbout]: 'SeasonAbout',
    [RootStackRoute.OrgMembers]: 'OrgMembers',
    [RootStackRoute.ChangeGameListingAssignee]: 'ChangeGameListingAssignee',
    [RootStackRoute.CreateSeason]: 'CreateSeason',
    [RootStackRoute.Register]: 'register',
    [RootStackRoute.SeasonCalendar]: 'SeasonCalendar',
    [RootStackRoute.SeasonSettings]: 'season/:seasonId/settings',
    [RootStackRoute.SeasonMeManager]: 'season/:seasonId/manager',
    [RootStackRoute.SeasonMeReferee]: 'season/:seasonId/referee',
    [RootStackRoute.SeasonParticipantProfile]: 'SeasonParticipantProfile',
    [RootStackRoute.SeasonParticipants]: 'season/:seasonId/members',
    [RootStackRoute.SeasonParticipantsAdd]: 'season/:seasonId/members/add',
    [RootStackRoute.RefreeSettings]: 'RefereeSettings',
    [RootStackRoute.SeasonDivisions]: 'SeasonDivisions',
    [RootStackRoute.Season]: 'Season',
    [RootStackRoute.App]: {
        screens: {
            [AppBottomTabRoute.Home]: 'Home',
            [AppBottomTabRoute.Inbox]: 'Inbox',
            [AppBottomTabRoute.GameSearch]: 'GameSearch'
        }
    }
}

export default navigationPathMap
