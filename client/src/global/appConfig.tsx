export interface Config {
    serverUri: string
}

const getEnv = (node_env: string | undefined): Config => {
    switch (node_env) {
        case 'development':
            return {
                serverUri: 'http://localhost:8000/graphql/'
            }
        case 'production':
        default:
            return {
                serverUri: ''
            }
    }
}

const AppConfig = getEnv(process.env.NODE_ENV)

export default AppConfig
