import Constants from 'expo-constants'

export interface AppExtra {
    NODE_ENV: string
    FIREBASE_CONFIG: {}
    ANDROID_PACKAGE: string
    DYNAMIC_LINK_DOMAIN: string
    APP_URL: string
    SERVER_GRAPHQL_URL: string
    APP_SCHEME: string
}

export interface AppBuild {
    name: string
    androidPackage: string
    appScheme: string
    extra: AppExtra
}

export const loadAppExtra = () => Constants.manifest?.extra as AppExtra
