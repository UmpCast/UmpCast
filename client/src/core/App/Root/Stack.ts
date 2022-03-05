import { NavigatorScreenParams } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { SignInParams } from '../../Auth/models'
import { AppBottomTabParamList } from '../Bottom/Tabs'

export enum RootStackRoutes {
    AuthSignIn = 'AuthSignIn',
    AuthEmailSent = 'AuthEmailSent',
    AuthEmailReceiveLink = 'AuthEmailReceiveLink',
    AuthEmailReceiveLinkAlt = 'AuthEmailReceiveLinkAlt',
    DivisionCreate = 'DivisionCreate',
    Home = 'Home',
    OrgCreate = 'OrgCreate',
    OrgEdit = 'OrgEdit',
    OrgSettings = 'OrgSettings',
    OrgMembers = 'OrgMembers',
    OrgSeasons = 'OrgSeasons',
    PositionCreate = 'PositionCreate',
    Register = 'Register',
    SeasonCreate = 'SeasonCreate',
    SeasonSettings = 'SeasonSettings',
    SeasonMembers = 'SeasonMembers',
    SeasonStructure = 'SeasonStructure'
}

export type RootStackParamList = {
    [RootStackRoutes.AuthSignIn]: undefined
    [RootStackRoutes.AuthEmailSent]: {
        email: string
    }
    [RootStackRoutes.AuthEmailReceiveLinkAlt]: SignInParams
    [RootStackRoutes.AuthEmailReceiveLink]: SignInParams
    [RootStackRoutes.Register]: undefined
    [RootStackRoutes.Home]: NavigatorScreenParams<AppBottomTabParamList>
    [RootStackRoutes.SeasonStructure]: {
        id: string
    }
    [RootStackRoutes.PositionCreate]: {
        divisionId: string
    }
    [RootStackRoutes.DivisionCreate]: {
        seasonId: string
    }
    [RootStackRoutes.OrgCreate]: undefined
    [RootStackRoutes.OrgEdit]: {
        id: string
    }
    [RootStackRoutes.OrgSettings]: {
        id: string
    }
    [RootStackRoutes.OrgMembers]: {
        id: string
    }
    [RootStackRoutes.OrgSeasons]: {
        id: string
    }
    [RootStackRoutes.SeasonSettings]: {
        id: string
    }
    [RootStackRoutes.SeasonCreate]: {
        orgId: string
    }
    [RootStackRoutes.SeasonMembers]: {
        id: string
    }
}

export const RootStack = createStackNavigator<RootStackParamList>()
