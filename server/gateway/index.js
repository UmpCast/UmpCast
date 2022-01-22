import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway'
import { ApolloServer } from 'apollo-server'
import verifyIdToken from './firebase_auth.js'

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
    willSendRequest({ request, context }) {
        request.http.headers.set('user-id', context.id)
        request.http.headers.set('user-email', context.email)
        request.http.headers.set('user-email-verified', context.emailVerified)
    }
}

const gateway = new ApolloGateway({
    serviceList: [
        { name: 'users', url: 'http://users-service:8000/graphql' },
        {
            name: 'organizations',
            url: 'http://organizations-service:8000/graphql',
        },
    ],
    buildService({ name, url }) {
        return new AuthenticatedDataSource({ url })
    },
})

const server = new ApolloServer({
    gateway,
    context: async ({ req }) => {
        try {
            const idToken = req.headers.authorization
            const user = await verifyIdToken(idToken)
            return {
                id: user.user_id,
                email: user.email,
                emailVerified: user.email_verified,
            }
        } catch (error) {
            return {
                id: '',
                email: '',
                emailVerified: false,
            }
        }
    },
})

server
    .listen()
    .then(({ url }) => {
        console.log(`🚀 Gateway ready at ${url}`)
    })
    .catch((err) => {
        console.error(err)
    })
