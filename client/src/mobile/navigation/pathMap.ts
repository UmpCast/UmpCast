import { PathConfigMap } from '@react-navigation/native'
import { parse, format, parseISO, formatISO } from 'date-fns'

import { SEASON_CALENDAR_DAY_PARAM } from '@/config/constants/dfns'
import { GroupsTopTabRoute } from '@/mobile/navigation/navigators/Groups/TopTab'

import { HomeBottomTabRoute } from './navigators/Home/BottomTab'
import { RootStackParamList, RootStackRoute } from './navigators/Root/Stack'

const navigationPathMap: PathConfigMap<RootStackParamList> = {
    [RootStackRoute.Account]: 'account',
    [RootStackRoute.AddPosition]: 'position/add',
    [RootStackRoute.DivisionPositionNew]: 'position/create',
    [RootStackRoute.Login]: 'sign-in',
    [RootStackRoute.LoginLinkSent]: 'email/sent',
    [RootStackRoute.LoginLinkAlt]: '__/auth/action',
    [RootStackRoute.LoginLink]: 'email/link',
    [RootStackRoute.Game]: 'game/:gameId',
    [RootStackRoute.GameListingAssignee]:
        'game/listing/:gameListingId/assignee',
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
    [RootStackRoute.SeasonCalendar]: {
        parse: {
            day: (day) => parse(day, SEASON_CALENDAR_DAY_PARAM, new Date())
        },
        path: 'season/:seasonId/calendar/:day?',
        stringify: {
            day: (day) => format(day, SEASON_CALENDAR_DAY_PARAM)
        }
    },
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
    [RootStackRoute.SeasonParticipantProfile]:
        'season/:seasonId/participant/:userId/profile',
    [RootStackRoute.SeasonParticipants]: 'season/:seasonId/members',
    [RootStackRoute.SeasonParticipantsAdd]: 'season/:seasonId/members/add',
    [RootStackRoute.SeasonStructure]: 'season/:seasonId/structure',
    [RootStackRoute.SeasonStructureV2]: 'season/:seasonId/structurev2',
    [RootStackRoute.SeasonProfile]: 'season/:seasonId/edit',
    [RootStackRoute.Position]: 'position/:positionId'
}

export default navigationPathMap
