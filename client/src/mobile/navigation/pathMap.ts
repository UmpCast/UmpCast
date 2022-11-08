import { PathConfigMap } from '@react-navigation/native'

import { TabsRoute } from './navigators/Tabs/types'
import { TabsStackParamList, TabsStackRoute } from './navigators/TabsStack/types'

const navigationPathMap: PathConfigMap<TabsStackParamList> = {
    [TabsStackRoute.AddDivision]: 'AddDivision',
    [TabsStackRoute.AddPosition]: 'AddPosition',
    [TabsStackRoute.Division]: 'Division',
    [TabsStackRoute.SignIn]: 'SignIn',
    [TabsStackRoute.Game]: 'Game',
    [TabsStackRoute.ViewerAbout]: 'ViewerAbout',
    [TabsStackRoute.CreateGame]: 'CreateGame',
    [TabsStackRoute.CreateOrg]: 'CreateOrg',
    [TabsStackRoute.JoinedOrgs]: 'Orgs',
    [TabsStackRoute.Org]: 'Org',
    [TabsStackRoute.OrgSeasons]: 'OrgSeasons',
    [TabsStackRoute.OrgAbout]: 'OrgAbout',
    [TabsStackRoute.SeasonAbout]: 'SeasonAbout',
    [TabsStackRoute.OrgMembers]: 'OrgMembers',
    [TabsStackRoute.ChangeGameListingAssignee]: 'ChangeGameListingAssignee',
    [TabsStackRoute.CreateSeason]: 'CreateSeason',
    [TabsStackRoute.Register]: 'register',
    [TabsStackRoute.SeasonParticipantProfile]: 'SeasonParticipantProfile',
    [TabsStackRoute.SeasonParticipants]: 'SeasonParticipants',
    [TabsStackRoute.AddSeasonParticipants]: 'AddSeasonParticipants',
    [TabsStackRoute.RefreeSettings]: 'RefereeSettings',
    [TabsStackRoute.SeasonDivisions]: 'SeasonDivisions',
    [TabsStackRoute.JoinOrg]: 'JoinOrg',
    [TabsStackRoute.Season]: 'Season',
}

export default navigationPathMap
