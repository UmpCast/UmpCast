import { ApolloGateway } from '@apollo/gateway'
import { ApolloServer } from 'apollo-server'

const gateway = new ApolloGateway({
    serviceList: [
        { name: 'users', url: 'http://users-service:8000/graphql/' },
        {
            name: 'organizations',
            url: 'http://organizations-service:8000/graphql/',
        },
        { name: 'permits', url: 'http://permits-service:8000/graphql/' },
    ],
})

const server = new ApolloServer({
    gateway,
})

server
    .listen()
    .then(({ url }) => {
        console.log(`🚀 Gateway ready at ${url}`)
    })
    .catch((err) => {
        console.error(err)
    })
