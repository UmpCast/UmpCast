import { AppBuild } from './src/app/common/utils/appBuild'

const getBuild = (): AppBuild => {
    switch (process.env.APP_ENV) {
        case 'development':
            return {
                name: 'UmpCast (DEV)',
                androidPackage: 'com.umpcast.umpcast_dev',
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
                    APP_DOMAIN: 'localhost:19006'
                }
            }
        case 'preview':
            return {
                name: 'UmpCast (TEST)',
                androidPackage: 'com.umpcast.umpcast_test',
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
                    APP_DOMAIN: 'umpcast-preview.web.app'
                }
            }
        case 'production':
        default:
            return {
                name: 'UmpCast',
                androidPackage: 'com.umpcast.umpcast',
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
                    APP_DOMAIN: 'umpcast-prod.web.app'
                }
            }
    }
}

const build = getBuild()

export default {
    expo: {
        name: build.name,
        slug: 'UmpCast',
        owner: 'umpcast',
        version: '1.0.0',
        sdkVersion: '43.0.0',
        runtimeVersion: '43.0',
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
            versionCode: 5,
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
