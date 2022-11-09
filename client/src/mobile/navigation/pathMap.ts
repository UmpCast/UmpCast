import { PathConfigMap } from '@react-navigation/native'
import { NavParamList, NavRoute } from './routes'

const navigationPathMap: PathConfigMap<NavParamList> = {
    [NavRoute.AddDivision]: 'AddDivision',
    [NavRoute.AddPosition]: 'AddPosition',
    [NavRoute.Division]: 'Division',
    [NavRoute.SignIn]: 'SignIn',
    [NavRoute.Game]: 'Game',
    [NavRoute.ViewerAbout]: 'ViewerAbout',
    [NavRoute.CreateGame]: 'CreateGame',
    [NavRoute.CreateOrg]: 'CreateOrg',
    [NavRoute.JoinedOrgs]: 'Orgs',
    [NavRoute.Org]: 'Org',
    [NavRoute.OrgSeasons]: 'OrgSeasons',
    [NavRoute.OrgAbout]: 'OrgAbout',
    [NavRoute.SeasonAbout]: 'SeasonAbout',
    [NavRoute.OrgMembers]: 'OrgMembers',
    [NavRoute.ChangeGameListingAssignee]: 'ChangeGameListingAssignee',
    [NavRoute.CreateSeason]: 'CreateSeason',
    [NavRoute.Register]: 'register',
    [NavRoute.SeasonParticipantProfile]: 'SeasonParticipantProfile',
    [NavRoute.SeasonParticipants]: 'SeasonParticipants',
    [NavRoute.AddSeasonParticipants]: 'AddSeasonParticipants',
    [NavRoute.RefreeSettings]: 'RefereeSettings',
    [NavRoute.SeasonDivisions]: 'SeasonDivisions',
    [NavRoute.JoinOrg]: 'JoinOrg',
    [NavRoute.Season]: 'Season',
}

export default navigationPathMap
