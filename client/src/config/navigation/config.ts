import { AppRootStackRoute } from '@/core/App/Root/Stack'
import { UserGroupsTopTabRoute } from '@/core/User/Groups/TopTab'
import { UserHomeBottomTabRoute } from '@/core/User/Home/BottomTab'

const navigationConfig = {
    screens: {
        [AppRootStackRoute.AuthSignIn]: 'sign-in',
        [AppRootStackRoute.AuthEmailSent]: 'email/sent',
        [AppRootStackRoute.AuthEmailReceiveLinkAlt]: '__/auth/action',
        [AppRootStackRoute.AuthEmailReceiveLink]: 'email/link',
        [AppRootStackRoute.DivisionCreate]: 'division/create',
        [AppRootStackRoute.Home]: 'home',
        [AppRootStackRoute.Home]: {
            screens: {
                [UserHomeBottomTabRoute.Groups]: {
                    screens: {
                        [UserGroupsTopTabRoute.Season]: 'groups/season',
                        [UserGroupsTopTabRoute.Org]: 'groups/organization'
                    }
                }
            }
        },
        [AppRootStackRoute.OrgCreate]: 'organization/create',
        [AppRootStackRoute.OrgEdit]: 'organization/:id/edit',
        [AppRootStackRoute.OrgMembers]: 'organization/:id/members',
        [AppRootStackRoute.OrgSeasons]: 'organization/:id/seasons',
        [AppRootStackRoute.OrgSettings]: 'organization/:id/settings',
        [AppRootStackRoute.Register]: 'register',
        [AppRootStackRoute.SeasonAbout]: 'season/:seasonId/about',
        [AppRootStackRoute.SeasonAboutManager]:
            'season/:seasonId/about/manager',
        [AppRootStackRoute.SeasonAboutReferee]:
            'season/:seasonId/about/referee',
        [AppRootStackRoute.SeasonCreate]: 'season/create',
        [AppRootStackRoute.SeasonParticipants]: 'season/:seasonId/members',
        [AppRootStackRoute.SeasonParticipantsAdd]:
            'season/:seasonId/members/add',
        [AppRootStackRoute.SeasonStructure]: 'season/:seasonId/structure',
        [AppRootStackRoute.SeasonEdit]: 'season/:seasonId/edit',
        [AppRootStackRoute.PositionCreate]: 'position/create'
    }
}

export default navigationConfig
