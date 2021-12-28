import { createNativeStackNavigator } from '@react-navigation/native-stack'

export enum UnauthRoutes {
    SignIn = 'SignIn',
    EmailSignInSent = 'EmailSignInSent',
    EmailSignInAlt = 'EmailSignInAlt',
    EmailSignIn = 'EmailSignIn'
}

export type UnauthStackParamList = {
    [UnauthRoutes.SignIn]: undefined
    [UnauthRoutes.EmailSignInSent]: {
        email: string
    }
    [UnauthRoutes.EmailSignInAlt]: undefined
    [UnauthRoutes.EmailSignIn]: undefined
}

export const UnauthStack = createNativeStackNavigator<UnauthStackParamList>()
