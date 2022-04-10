import { GroupsTopTabRoute } from '@/navigation/navigators/Groups/TopTab'

import { HomeBottomTabRoute } from './navigators/Home/BottomTab'
import { RootStackRoute } from './navigators/Root/Stack'

const navigationConfig = {
    screens: {
        [RootStackRoute.Login]: 'sign-in',
        [RootStackRoute.LoginLinkSent]: 'email/sent',
        [RootStackRoute.LoginLinkAlt]: '__/auth/action',
        [RootStackRoute.LoginLink]: 'email/link',
        [RootStackRoute.SeasonDivisionNew]: 'division/create',
        [RootStackRoute.Home]: 'home',
        [RootStackRoute.Home]: {
            screens: {
                [HomeBottomTabRoute.Groups]: {
                    screens: {
                        [GroupsTopTabRoute.Season]: 'groups/season',
                        [GroupsTopTabRoute.Org]: 'groups/organization'
                    }
                },
                [HomeBottomTabRoute.Account]: 'account'
            }
        },
        [RootStackRoute.OrganizationNew]: 'organization/create',
        [RootStackRoute.OrganizationSettingsProfile]:
            'organization/:orgId/edit',
        [RootStackRoute.OrganizationMembers]: 'organization/:orgId/members',
        [RootStackRoute.OrganizationSeasons]: 'organization/:orgId/seasons',
        [RootStackRoute.OrganizationSettings]: 'organization/:orgId/settings',
        [RootStackRoute.Register]: 'register',
        [RootStackRoute.SeasonCalendar]: 'season/:seasonId/calendar/:day?',
        [RootStackRoute.Settings]: 'season/:seasonId/settings',
        [RootStackRoute.SeasonMeManager]: 'season/:seasonId/manager',
        [RootStackRoute.SeasonMeReferee]: 'season/:seasonId/referee',
        [RootStackRoute.OrganizationSeasonNew]: 'season/create',
        [RootStackRoute.SeasonParticipants]: 'season/:seasonId/members',
        [RootStackRoute.SeasonParticipantsAdd]: 'season/:seasonId/members/add',
        [RootStackRoute.SeasonStructure]: 'season/:seasonId/structure',
        [RootStackRoute.SettingsProfile]: 'season/:seasonId/edit',
        [RootStackRoute.DivisionPositionNew]: 'position/create'
    }
}

export default navigationConfig
