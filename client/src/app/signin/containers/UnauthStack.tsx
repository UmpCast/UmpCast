import { createNativeStackNavigator } from '@react-navigation/native-stack'

export enum UnauthRoutes {
    SignIn = 'SignIn',
    EmailSignInSent = 'EmailSignInSent',
    EmailSignInAlt = 'EmailSignInAlt',
    EmailSignInRecieved = 'EmailSignInReceived'
}

export type EmailSignInParamList = {
    apiKey: string
    mode: string
    oobCode: string
}

export type UnauthStackParamList = {
    [UnauthRoutes.SignIn]: undefined
    [UnauthRoutes.EmailSignInSent]: {
        email: string
    }
    [UnauthRoutes.EmailSignInAlt]: EmailSignInParamList
    [UnauthRoutes.EmailSignInRecieved]: EmailSignInParamList
}

export const UnauthStack = createNativeStackNavigator<UnauthStackParamList>()
