import { sdkVersion, runtimeVersion, versionCode } from './app.build.json'

import { AppBuild } from './src/app/common/utils/appBuild'

const getBuild = (): AppBuild => {
    switch (process.env.APP_ENV) {
        case 'development':
            return {
                name: 'UmpCast (DEV)',
                androidPackage: 'com.umpcast.umpcast_dev',
                appScheme: 'umpcast-dev',
                extra: {
                    NODE_ENV: 'development',
                    FIREBASE_CONFIG: {
                        apiKey: 'AIzaSyCmoJ2VxNNaDbBpaaLum5DlvxFzonGehoE',
                        authDomain: 'umpcast-dev.firebaseapp.com',
                        projectId: 'umpcast-dev',
                        storageBucket: 'umpcast-dev.appspot.com',
                        messagingSenderId: '636979164986',
                        appId: '1:636979164986:web:2936b3d4e9d5315c438203',
                        measurementId: 'G-4HJQQSY8HQ'
                    },
                    ANDROID_PACKAGE: 'com.umpcast.umpcast_dev',
                    DYNAMIC_LINK_DOMAIN: 'umpcastdev.page.link',
                    APP_URL: 'http://localhost:19006',
                    SERVER_GRAPHQL_URL: 'http://localhost:8000',
                    APP_SCHEME: 'umpcast-dev'
                }
            }
        case 'preview':
            return {
                name: 'UmpCast (TEST)',
                androidPackage: 'com.umpcast.umpcast_test',
                appScheme: 'umpcast-test',
                extra: {
                    NODE_ENV: 'production',
                    FIREBASE_CONFIG: {
                        apiKey: 'AIzaSyCSVUHXC0wyLZJ5PrA3QqSSAdIatZ8Njh4',
                        authDomain: 'umpcast-preview.firebaseapp.com',
                        projectId: 'umpcast-preview',
                        storageBucket: 'umpcast-preview.appspot.com',
                        messagingSenderId: '909064890223',
                        appId: '1:909064890223:web:ed19203af196acf93aaa9a',
                        measurementId: 'G-4C89N2WMEB'
                    },
                    ANDROID_PACKAGE: 'com.umpcast.umpcast_test',
                    DYNAMIC_LINK_DOMAIN: 'umpcasttest.page.link',
                    APP_URL: 'https://umpcast-preview.web.app',
                    SERVER_GRAPHQL_URL: 'TODO',
                    APP_SCHEME: 'umpcast-test'
                }
            }
        case 'production':
        default:
            return {
                name: 'UmpCast',
                androidPackage: 'com.umpcast.umpcast',
                appScheme: 'umpcast-prod',
                extra: {
                    NODE_ENV: 'production',
                    FIREBASE_CONFIG: {
                        apiKey: 'AIzaSyDRbSZ-qGdZXIYwLIqQdpsKfXIlVdcLUSI',
                        authDomain: 'umpcast-prod.firebaseapp.com',
                        projectId: 'umpcast-prod',
                        storageBucket: 'umpcast-prod.appspot.com',
                        messagingSenderId: '717703160244',
                        appId: '1:717703160244:web:88f69ae6f32dbfcd3e52e1',
                        measurementId: 'G-9080TTQR77'
                    },
                    ANDROID_PACKAGE: 'com.umpcast.umpcast',
                    DYNAMIC_LINK_DOMAIN: 'umpcast.page.link',
                    APP_URL: 'https://umpcast-prod.web.app',
                    SERVER_GRAPHQL_URL: 'TODO',
                    APP_SCHEME: 'umpcast-prod'
                }
            }
    }
}

const build = getBuild()

export default {
    expo: {
        name: build.name,
        scheme: build.appScheme,
        slug: 'UmpCast',
        owner: 'umpcast',
        version: '1.0.0',
        sdkVersion,
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
            package: build.androidPackage,
            versionCode,
            adaptiveIcon: {
                foregroundImage: './assets/adaptive-icon.png',
                backgroundColor: '#FFFFFF'
            }
        },
        web: {
            favicon: './assets/favicon.png'
        },
        extra: build.extra
    }
}
