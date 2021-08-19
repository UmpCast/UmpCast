import Constants from 'expo-constants';

interface AppConfig {
    server_uri: string
}

function environmentConfig(node_env: string): AppConfig {
    switch(node_env) {
        case "development":
            return Constants.manifest?.extra?.DEVELOPMENT
        case "production":
        default:
            return Constants.manifest?.extra?.PRODUCTION
    }
}

const appConfig = environmentConfig(process.env.NODE_ENV || "production")

export default appConfig