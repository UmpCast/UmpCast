import { PathConfigMap } from '@react-navigation/native'
import { parseISO, formatISO } from 'date-fns'

import { GroupsTopTabRoute } from '@/mobile/navigation/navigators/Groups/TopTab'

import { HomeBottomTabRoute } from './navigators/Home/BottomTab'
import { RootStackParamList, RootStackRoute } from './navigators/Root/Stack'

const navigationPathMap: PathConfigMap<RootStackParamList> = {
    [RootStackRoute.Account]: 'account',
    [RootStackRoute.AddDivision]: 'AddDivision',
    [RootStackRoute.AddPosition]: 'AddPosition',
    [RootStackRoute.Division]: 'Division',
    [RootStackRoute.Login]: 'sign-in',
    [RootStackRoute.LoginLinkSent]: 'email/sent',
    [RootStackRoute.LoginLinkAlt]: '__/auth/action',
    [RootStackRoute.LoginLink]: 'email/link',
    [RootStackRoute.Game]: 'game/:gameId',
    [RootStackRoute.GameListingAssignee]: 'game/listing/:gameListingId/assignee',
    [RootStackRoute.Home]: 'home',
    [RootStackRoute.Home]: {
        screens: {
            [HomeBottomTabRoute.Groups]: {
                screens: {
                    [GroupsTopTabRoute.Season]: 'groups/season',
                    [GroupsTopTabRoute.Org]: 'groups/organization'
                }
            }
        }
    },
    [RootStackRoute.OrganizationNew]: 'organization/create',
    [RootStackRoute.OrganizationSettingsProfile]: 'organization/:orgId/edit',
    [RootStackRoute.OrganizationMembers]: 'organization/:orgId/members',
    [RootStackRoute.OrganizationSeasons]: 'organization/:orgId/seasons',
    [RootStackRoute.OrganizationSettings]: 'organization/:orgId/settings',
    [RootStackRoute.OrganizationSeasonNew]: 'organization/:orgId/season/new',
    [RootStackRoute.Register]: 'register',
    [RootStackRoute.SeasonCalendar]: 'SeasonCalendar',
    [RootStackRoute.SeasonDivisionNew]: 'season/:seasonId/division/new',
    [RootStackRoute.SeasonGameNew]: {
        parse: {
            date: (date) => parseISO(date)
        },
        path: 'season/:seasonId/game/new',
        stringify: {
            date: (date) => formatISO(date)
        }
    },
    [RootStackRoute.SeasonSettings]: 'season/:seasonId/settings',
    [RootStackRoute.SeasonMeManager]: 'season/:seasonId/manager',
    [RootStackRoute.SeasonMeReferee]: 'season/:seasonId/referee',
    [RootStackRoute.SeasonParticipantProfile]: 'SeasonParticipantProfile',
    [RootStackRoute.SeasonParticipants]: 'season/:seasonId/members',
    [RootStackRoute.SeasonParticipantsAdd]: 'season/:seasonId/members/add',
    [RootStackRoute.SeasonStructure]: 'season/:seasonId/structure',
    [RootStackRoute.SeasonDivisionsScreen]: 'SeasonDivisions',
    [RootStackRoute.SeasonProfile]: 'season/:seasonId/edit',
    [RootStackRoute.Position]: 'position/:positionId'
}

export default navigationPathMap
