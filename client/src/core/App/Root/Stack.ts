import { UserGroupTabParamList } from '@/core/User/Group/Tab'
import { NavigatorScreenParams } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { SignInParams } from '../../Auth/models'

export enum RootStackRoutes {
    AuthSignIn = 'AuthSignIn',
    AuthEmailSent = 'AuthEmailSent',
    AuthEmailReceiveLink = 'AuthEmailReceiveLink',
    AuthEmailReceiveLinkAlt = 'AuthEmailReceiveLinkAlt',
    Register = 'Register',
    Home = 'Home',
    SeasonStructure = 'SeasonStructure',
    PositionCreate = 'PositionCreate',
    DivisionCreate = 'DivisionCreate',
    OrgCreate = 'OrgCreate',
    UserGroup = 'UserGroup'
}

export type RootStackParamList = {
    [RootStackRoutes.AuthSignIn]: undefined
    [RootStackRoutes.AuthEmailSent]: {
        email: string
    }
    [RootStackRoutes.AuthEmailReceiveLinkAlt]: SignInParams
    [RootStackRoutes.AuthEmailReceiveLink]: SignInParams
    [RootStackRoutes.Register]: undefined
    [RootStackRoutes.Home]: undefined
    [RootStackRoutes.SeasonStructure]: {
        seasonId: string
    }
    [RootStackRoutes.PositionCreate]: {
        divisionId: string
    }
    [RootStackRoutes.DivisionCreate]: {
        seasonId: string
    }
    [RootStackRoutes.OrgCreate]: undefined
    [RootStackRoutes.UserGroup]: NavigatorScreenParams<UserGroupTabParamList>
}

export const RootStack = createStackNavigator<RootStackParamList>()
