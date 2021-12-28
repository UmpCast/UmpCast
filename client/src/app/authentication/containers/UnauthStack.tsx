import { createNativeStackNavigator } from '@react-navigation/native-stack'

export enum UnauthRoutes {
    SignIn = 'SignIn',
    EmailSignInSent = 'EmailSignInSent',
    EmailSignInRedirect = 'EmailSignInRedirect'
}

export type UnauthStackParamList = {
    [UnauthRoutes.SignIn]: undefined
    [UnauthRoutes.EmailSignInSent]: {
        email: string
    }
    [UnauthRoutes.EmailSignInRedirect]: undefined
}

export const UnauthStack = createNativeStackNavigator<UnauthStackParamList>()
