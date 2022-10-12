import { AppExtra } from '@/utils/expo'

const appEnvRegistry: Record<string, AppExtra> = {
    development: {
        APP_PACKAGE_NAME: 'com.umpcast.dev',
        ANDROID_MINIMUM_VERSION: '12',
        APP_NAME: 'UmpCast (DEV)',
        APP_SCHEME: 'umpcast-dev',
        APP_URL: 'http://localhost:19006',
        FIREBASE_AUTH_URL: 'https://umpcast-dev.firebaseapp.com',
        FIREBASE_CONFIG: {
            apiKey: 'AIzaSyCmoJ2VxNNaDbBpaaLum5DlvxFzonGehoE',
            appId: '1:636979164986:web:2936b3d4e9d5315c438203',
            authDomain: 'umpcast-dev.firebaseapp.com',
            measurementId: 'G-4HJQQSY8HQ',
            messagingSenderId: '636979164986',
            projectId: 'umpcast-dev',
            storageBucket: 'umpcast-dev.appspot.com'
        },
        GOOGLE_CLIENT_ID:
            '636979164986-g8k04vsdhk8kjml9skpvu132oabpksmv.apps.googleusercontent.com',
        NODE_ENV: 'development',
        SERVER_GRAPHQL_URL: 'http://localhost:8000'
    },
    preview: {
        APP_PACKAGE_NAME: 'com.umpcast.preview',
        ANDROID_MINIMUM_VERSION: '12',
        APP_NAME: 'UmpCast (PREVIEW)',
        APP_SCHEME: 'umpcast-test',
        APP_URL: 'https://umpcast-preview.web.app',
        FIREBASE_AUTH_URL: 'https://umpcast-preview.firebaseapp.com',
        FIREBASE_CONFIG: {
            apiKey: 'AIzaSyCSVUHXC0wyLZJ5PrA3QqSSAdIatZ8Njh4',
            appId: '1:909064890223:web:ed19203af196acf93aaa9a',
            authDomain: 'umpcast-preview.firebaseapp.com',
            measurementId: 'G-4C89N2WMEB',
            messagingSenderId: '909064890223',
            projectId: 'umpcast-preview',
            storageBucket: 'umpcast-preview.appspot.com'
        },
        GOOGLE_CLIENT_ID:
            '909064890223-t9khn69tr8t8i8lmjkp5afvmekpljj2l.apps.googleusercontent.com',
        NODE_ENV: 'production',
        SERVER_GRAPHQL_URL: 'TODO'
    },
    production: {
        APP_PACKAGE_NAME: 'com.umpcast',
        ANDROID_MINIMUM_VERSION: '12',
        APP_NAME: 'UmpCast',
        APP_SCHEME: 'umpcast-prod',
        APP_URL: 'https://umpcast-prod.web.app',
        FIREBASE_AUTH_URL: 'https://umpcast-prod.firebaseapp.com',
        FIREBASE_CONFIG: {
            apiKey: 'AIzaSyDRbSZ-qGdZXIYwLIqQdpsKfXIlVdcLUSI',
            appId: '1:717703160244:web:88f69ae6f32dbfcd3e52e1',
            authDomain: 'umpcast-prod.firebaseapp.com',
            measurementId: 'G-9080TTQR77',
            messagingSenderId: '717703160244',
            projectId: 'umpcast-prod',
            storageBucket: 'umpcast-prod.appspot.com'
        },
        GOOGLE_CLIENT_ID:
            '717703160244-710vo3kahjd28v8nh1ioackhh7erp5j0.apps.googleusercontent.com',
        NODE_ENV: 'production',
        SERVER_GRAPHQL_URL: 'TODO'
    }
}

const appEnv = appEnvRegistry[process.env.APP_ENV as string]

export const expo = {
    name: appEnv.APP_NAME,
    scheme: appEnv.APP_SCHEME,
    currentFullName: '@umpcast/UmpCast',
    originalFullName: '@umpcast/UmpCast',
    slug: 'UmpCast',
    owner: 'umpcast',
    version: '1.0.0',
    runtimeVersion: '44.3',
    orientation: 'portrait',
    icon: './assets/icon.png',
    splash: {
        image: './assets/splash.png',
        resizeMode: 'contain',
        backgroundColor: '#ffffff'
    },
    updates: {
        fallbackToCacheTimeout: 30
    },
    assetBundlePatterns: ['**/*'],
    ios: {
        bundleIdentifier: appEnv.APP_PACKAGE_NAME,
        supportsTablet: true
    },
    android: {
        package: appEnv.APP_PACKAGE_NAME,
        versionCode: 443,
        icon: './assets/icon.png',
        adaptiveIcon: {
            foregroundImage: './assets/adaptive-icon.png',
            backgroundColor: '#FFC91B'
        }
    },
    web: {
        favicon: './assets/favicon.png'
    },
    extra: {
        ...appEnv,
        eas: {
            projectId: '73b11c2b-10f7-48f8-b549-9b490bb4743a'
        }
    }
}
