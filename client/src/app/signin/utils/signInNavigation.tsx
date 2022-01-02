export enum SignInRoutes {
    SignIn = 'SignIn',
    EmailSignInSent = 'EmailSignInSent',
    EmailSignInRecievedAlt = 'EmailSignInRecievedAlt',
    EmailSignInRecieved = 'EmailSignInReceived'
}

export type EmailSignInParamList = {
    apiKey: string
    mode: string
    oobCode: string
}

export type SignInParamList = {
    [SignInRoutes.SignIn]: undefined
    [SignInRoutes.EmailSignInSent]: {
        email: string
    }
    [SignInRoutes.EmailSignInRecievedAlt]: EmailSignInParamList
    [SignInRoutes.EmailSignInRecieved]: EmailSignInParamList
}
