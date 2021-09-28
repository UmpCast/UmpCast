import 'dotenv/config'

const { env } = process

export interface Config {
    serverUri: string
}

const AppConfig = {
    serverUri:
        env.NODE_ENV === 'development'
            ? env.DEVELOPMENT_SERVER_URI
            : env.PRODUCTION_SERVER_URI
}

export default AppConfig as Config
