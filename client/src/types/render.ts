import { IResolvers } from '@graphql-tools/utils'

type MockRootFieldResolver = Record<string, jest.Mock<any, any>>
type RootField = 'Query' | 'Mutation' | 'Subscription'
export type MockResolvers = Partial<Record<RootField, MockRootFieldResolver>>

export interface TestRenderOptions<T> {
    resolvers?: MockResolvers | IResolvers
    uses?: T
}
