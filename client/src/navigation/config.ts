import { RootStackRoutes } from '../core/App/Root/Stack'

const NavigationConfig = {
    screens: {
        [RootStackRoutes.AuthSignIn]: 'sign-in',
        [RootStackRoutes.AuthEmailSent]: 'email/sent',
        [RootStackRoutes.AuthEmailReceiveLinkAlt]: '__/auth/action',
        [RootStackRoutes.AuthEmailReceiveLink]: 'email/link',
        [RootStackRoutes.Register]: 'register',
        [RootStackRoutes.Home]: 'home',
        [RootStackRoutes.SeasonStructure]: 'season/structure',
        [RootStackRoutes.PositionCreate]: 'position/create',
        [RootStackRoutes.DivisionCreate]: 'division/create',
        [RootStackRoutes.OrgCreate]: 'organization/create'
    }
}

export default NavigationConfig
