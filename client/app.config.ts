import { AppExtra } from '@/app/common/utils/appExtra'
import { runtimeVersion } from './app.build.json'

const extra = ((): AppExtra => {
    switch (process.env.APP_ENV) {
        case 'development':
            return {
                ANDROID_PACKAGE: 'com.umpcast.umpcast_dev',
                APP_NAME: 'UmpCast (DEV)',
                APP_SCHEME: 'umpcast-dev',
                APP_URL: 'http://localhost:19006',
                DYNAMIC_LINK_DOMAIN: 'umpcastdev.page.link',
                FACEBOOK_CLIENT_ID: '946144599651720',
                FACEBOOK_DISPLAY_NAME: 'Umpcast (DEV)',
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
                INTENT_FILTER_DATA: [
                    {
                        host: 'localhost:19006',
                        scheme: 'http'
                    },
                    {
                        host: 'umpcast-dev.firebaseapp.com',
                        scheme: 'https'
                    }
                ],
                NODE_ENV: 'development',
                SERVER_GRAPHQL_URL: 'http://localhost:8000'
            }
        case 'preview':
            return {
                ANDROID_PACKAGE: 'com.umpcast.umpcast_preview',
                APP_NAME: 'UmpCast (PREVIEW)',
                APP_SCHEME: 'umpcast-test',
                APP_URL: 'https://umpcast-preview.web.app',
                DYNAMIC_LINK_DOMAIN: 'umpcasttest.page.link',
                FACEBOOK_CLIENT_ID: '594964265135542',
                FACEBOOK_DISPLAY_NAME: 'UmpCast (PREVIEW)',
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
                INTENT_FILTER_DATA: [
                    {
                        host: 'umpcast-preview.web.app',
                        scheme: 'https'
                    }
                ],
                NODE_ENV: 'production',
                SERVER_GRAPHQL_URL: 'TODO'
            }
        case 'production':
        default:
            return {
                ANDROID_PACKAGE: 'com.umpcast.umpcast',
                APP_NAME: 'UmpCast',
                APP_SCHEME: 'umpcast-prod',
                APP_URL: 'https://umpcast-prod.web.app',
                DYNAMIC_LINK_DOMAIN: 'umpcast.page.link',
                FACEBOOK_CLIENT_ID: '383993826857453',
                FACEBOOK_DISPLAY_NAME: 'UmpCast',
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
                INTENT_FILTER_DATA: [
                    {
                        host: 'umpcast-prod.firebaseapp.com',
                        scheme: 'https'
                    }
                ],
                NODE_ENV: 'production',
                SERVER_GRAPHQL_URL: 'TODO'
            }
    }
})()

const getVersionCode = (version: string) => Number(version.split('.').join(''))

export const expo = {
    name: extra.APP_NAME,
    scheme: extra.APP_SCHEME,
    currentFullName: '@umpcast/UmpCast',
    originalFullName: '@umpcast/UmpCast',
    facebookScheme: `fb${extra.FACEBOOK_CLIENT_ID}`,
    facebookAppId: extra.FACEBOOK_CLIENT_ID,
    facebookDisplayName: extra.FACEBOOK_DISPLAY_NAME,
    slug: 'UmpCast',
    owner: 'umpcast',
    version: '1.0.0',
    runtimeVersion,
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
        supportsTablet: true
    },
    android: {
        package: extra.ANDROID_PACKAGE,
        versionCode: getVersionCode(runtimeVersion),
        adaptiveIcon: {
            foregroundImage: './assets/adaptive-icon.png',
            backgroundColor: '#FFFFFF'
        },
        intentFilters: [
            {
                action: 'VIEW',
                autoVerify: true,
                data: extra.INTENT_FILTER_DATA,
                category: ['BROWSABLE', 'DEFAULT']
            }
        ]
    },
    web: {
        favicon: './assets/favicon.png'
    },
    extra
}
