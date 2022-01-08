const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');

const gateway = new ApolloGateway({
    serviceList: [
        { name: 'users', url: 'http://users:8000/graphql' },
        { name: 'organizations', url: 'http://organizations:8000/graphql' },
    ]
});

const server = new ApolloServer({gateway});

server.listen().then(({ url }) => {
  console.log(`🚀 Gateway ready at ${url}`);
}).catch(err => {console.error(err)});