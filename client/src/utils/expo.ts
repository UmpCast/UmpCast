import Constants from 'expo-constants'

export interface AppExtra {
    ANDROID_MINIMUM_VERSION: string
    APP_PACKAGE_NAME: string
    APP_NAME: string
    APP_SCHEME: string
    APP_URL: string
    FIREBASE_CONFIG: {}
    FIREBASE_AUTH_URL: string
    GOOGLE_CLIENT_ID: string
    NODE_ENV: string
    SERVER_GRAPHQL_URL: string
}

export const loadAppExtra = () => Constants.manifest?.extra as AppExtra

export const expoEnv = Constants.manifest?.extra as AppExtra
