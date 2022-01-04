import { createNativeStackNavigator } from '@react-navigation/native-stack'

export enum RootStackRoutes {
    SignIn = 'sign-in',
    SignInEmailSent = 'email-sent',
    SignInEmailRecieved = 'email-recieved',
    SignInEmailRecievedAlt = 'email-recieved-alt',
    Register = 'register',
    Home = 'home'
}

export type EmailSignInParamList = {
    apiKey: string
    mode: string
    oobCode: string
}

export type RootStackParamList = {
    [RootStackRoutes.SignIn]: undefined
    [RootStackRoutes.SignInEmailSent]: {
        email: string
    }
    [RootStackRoutes.SignInEmailRecievedAlt]: EmailSignInParamList
    [RootStackRoutes.SignInEmailRecieved]: EmailSignInParamList
    [RootStackRoutes.Register]: undefined
    [RootStackRoutes.Home]: undefined
}

const RootStack = createNativeStackNavigator<RootStackParamList>()

export default RootStack
