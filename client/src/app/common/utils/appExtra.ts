import Constants from 'expo-constants'

export interface AppExtra {
    APP_NAME: string
    INTENT_FILTER_DATA: {}
    NODE_ENV: string
    FIREBASE_CONFIG: {}
    GOOGLE_CLIENT_ID: string
    FACEBOOK_CLIENT_ID: string
    ANDROID_PACKAGE: string
    DYNAMIC_LINK_DOMAIN: string
    APP_URL: string
    SERVER_GRAPHQL_URL: string
    APP_SCHEME: string
}

export const loadAppExtra = () => Constants.manifest?.extra as AppExtra
