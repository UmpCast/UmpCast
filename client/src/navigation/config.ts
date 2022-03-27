import { UserGroupsTopTabRoute } from '@/navigation/navigators/Groups/TopTab'
import { UserHomeBottomTabRoute } from './navigators/Home/BottomTab'
import { RootStackRoute } from './navigators/Root/Stack'

const navigationConfig = {
    screens: {
        [RootStackRoute.Signin]: 'sign-in',
        [RootStackRoute.SigninLinkSent]: 'email/sent',
        [RootStackRoute.SigninLinkAlt]: '__/auth/action',
        [RootStackRoute.SigninLink]: 'email/link',
        [RootStackRoute.SeasonDivisionNew]: 'division/create',
        [RootStackRoute.Home]: 'home',
        [RootStackRoute.Home]: {
            screens: {
                [UserHomeBottomTabRoute.Groups]: {
                    screens: {
                        [UserGroupsTopTabRoute.Season]: 'groups/season',
                        [UserGroupsTopTabRoute.Org]: 'groups/organization'
                    }
                }
            }
        },
        [RootStackRoute.OrganizationNew]: 'organization/create',
        [RootStackRoute.OrganizationSettingsProfile]: 'organization/:id/edit',
        [RootStackRoute.OrganizationMembers]: 'organization/:id/members',
        [RootStackRoute.OrganizationSeasons]: 'organization/:id/seasons',
        [RootStackRoute.OrganizationSettings]: 'organization/:id/settings',
        [RootStackRoute.Register]: 'register',
        [RootStackRoute.SeasonSettings]: 'season/:seasonId/settings',
        [RootStackRoute.SeasonMeManager]: 'season/:seasonId/manager',
        [RootStackRoute.SeasonMeReferee]: 'season/:seasonId/referee',
        [RootStackRoute.OrganizationSeasonNew]: 'season/create',
        [RootStackRoute.SeasonParticipants]: 'season/:seasonId/members',
        [RootStackRoute.SeasonParticipantsAdd]: 'season/:seasonId/members/add',
        [RootStackRoute.SeasonStructure]: 'season/:seasonId/structure',
        [RootStackRoute.SeasonSettingsProfile]: 'season/:seasonId/edit',
        [RootStackRoute.DivisionPositionNew]: 'position/create'
    }
}

export default navigationConfig
