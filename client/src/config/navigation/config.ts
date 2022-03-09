import { AppBottomTabsRoute } from '@/core/App/Bottom/Tabs'
import { UserGroupTabsRoute } from '@/core/User/Group/Tabs'

import { RootStackRoutes } from '../../core/App/Root/Stack'

const navigationConfig = {
    screens: {
        [RootStackRoutes.AuthSignIn]: 'sign-in',
        [RootStackRoutes.AuthEmailSent]: 'email/sent',
        [RootStackRoutes.AuthEmailReceiveLinkAlt]: '__/auth/action',
        [RootStackRoutes.AuthEmailReceiveLink]: 'email/link',
        [RootStackRoutes.DivisionCreate]: 'division/create',
        [RootStackRoutes.Home]: 'home',
        [RootStackRoutes.Home]: {
            screens: {
                [AppBottomTabsRoute.Groups]: {
                    screens: {
                        [UserGroupTabsRoute.Season]: 'groups/season',
                        [UserGroupTabsRoute.Org]: 'groups/organization'
                    }
                }
            }
        },
        [RootStackRoutes.OrgCreate]: 'organization/create',
        [RootStackRoutes.OrgEdit]: 'organization/:id/edit',
        [RootStackRoutes.OrgMembers]: 'organization/:id/members',
        [RootStackRoutes.OrgSeasons]: 'organization/:id/seasons',
        [RootStackRoutes.OrgSettings]: 'organization/:id/settings',
        [RootStackRoutes.Register]: 'register',
        [RootStackRoutes.SeasonAbout]: 'season/:seasonId/about',
        [RootStackRoutes.SeasonAboutManager]: 'season/:seasonId/about/manager',
        [RootStackRoutes.SeasonAboutReferee]: 'season/:seasonId/about/referee',
        [RootStackRoutes.SeasonCreate]: 'season/create',
        [RootStackRoutes.SeasonMembers]: 'season/:seasonId/members',
        [RootStackRoutes.SeasonMembersAdd]: 'season/:seasonId/members/add',
        [RootStackRoutes.SeasonStructure]: 'season/:id/structure',
        [RootStackRoutes.SeasonEdit]: 'season/:seasonId/edit',
        [RootStackRoutes.PositionCreate]: 'position/create'
    }
}

export default navigationConfig
