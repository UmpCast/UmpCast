import { IResolvers } from '@graphql-tools/utils'

export interface TestRenderOptions<T> {
    resolvers?: IResolvers
    uses?: T
}
