const PUBLIC_VERSION = '1.0'
const RUNTIME_VERSION = '45.0.0'

type AppType = 'development' | 'production'

type AppData = {
    name: string
    android: {}
    ios: {}
    extra: {}
}

module.exports = () => {
    const common = {
        slug: 'UmpCast',
        owner: 'umpcast',
        version: PUBLIC_VERSION,
        orientation: 'portrait',
        icon: './assets/icon.png',
        splash: {
            image: './assets/splash.png',
            background: '#ffffff'
        },
        assetBundlePatterns: ['assets/*'],
        ios: {
            supportsTablet: true
        },
        android: {
            adaptiveIcon: {
                foregroundImage: './assets/adaptive-icon.png',
                backgroundColor: '#FFC91B'
            }
        },
        updates: {
            url: 'https://u.expo.dev/deaa87f7-d18d-439d-a4cc-2bc96913fc65'
        },
        web: {
            favicon: './assets/favicon.png'
        },
        extra: {
            eas: {
                projectId: 'deaa87f7-d18d-439d-a4cc-2bc96913fc65'
            }
        }
    }

    switch (process.env.APP_ENV || 'development') {
        case 'development':
            return {
                ...common,
                name: 'UmpCast DEV',
                runtimeVersion: RUNTIME_VERSION,
                android: {
                    ...common.android,
                    package: 'com.umpcast.dev'
                },
                ios: {
                    ...common.ios,
                    bundleIdentifier: 'com.umpcast.dev'
                },
                extra: {
                    ...common.extra,
                    FIREBASE_CONFIG: {
                        apiKey: 'AIzaSyDXTbxQk3zH4YqDAEi5qtX_iMAyd10Wo1g',
                        authDomain: 'umpcast-dev-194ba.firebaseapp.com',
                        projectId: 'umpcast-dev-194ba',
                        storageBucket: 'umpcast-dev-194ba.appspot.com',
                        messagingSenderId: '924216948824',
                        appId: '1:924216948824:web:c2d43b722eb8dcd616722d',
                        measurementId: 'G-1XHKRNP44B'
                    },
                    GOOGLE_AUTH_CONFIG: {
                        webClientId:
                            '924216948824-1akkia3ccs7tkifq3nsr0qsq6nknvgin.apps.googleusercontent.com',
                        androidClientId:
                            '924216948824-cb6u434u84u7gvobrb0oa4o47h1go2s0.apps.googleusercontent.com',
                        iosClientId:
                            '924216948824-hroc26o72u2pn6kkmg2m09s4p4nkd7s9.apps.googleusercontent.com'
                    },
                    NODE_ENV: 'development',
                    SERVER_GRAPHQL_URL: 'http://localhost:8000'
                }
            }
        case 'production':
            return {
                ...common,
                name: 'UmpCast',
                android: {
                    ...common.android,
                    package: 'com.umpcast'
                },
                ios: {
                    ...common.ios,
                    bundleIdentifier: 'com.umpcast'
                },
                extra: {
                    ...common.extra,
                    FIREBASE_CONFIG: {
                        apiKey: 'AIzaSyDuUA-j2d6kK_YlBnn1azBZVfXycqVce9A',
                        authDomain: 'umpcast-prod-e360a.firebaseapp.com',
                        projectId: 'umpcast-prod-e360a',
                        storageBucket: 'umpcast-prod-e360a.appspot.com',
                        messagingSenderId: '761745393800',
                        appId: '1:761745393800:web:39f7f2b115cbe7f58bb73d',
                        measurementId: 'G-SW0B0JWQCW'
                    },
                    GOOGLE_AUTH_CONFIG: {
                        webClientId:
                            '761745393800-2cevsb7rfma38j3lv3bukrfpk3mg1om0.apps.googleusercontent.com',
                        androidClientId:
                            '761745393800-t27f9raujm814enlkoq3duelfdj63dkh.apps.googleusercontent.com',
                        iosClientId:
                            '761745393800-lqtomoveneu108jash4icddb883gdgb3.apps.googleusercontent.com'
                    },
                    NODE_ENV: 'production',
                    SERVER_GRAPHQL_URL: 'http://localhost:8000'
                }
            }
    }
}
