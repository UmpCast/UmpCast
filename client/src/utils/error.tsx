import { GraphQLError } from 'graphql'

export type ErrorFinderFn = (errors: readonly GraphQLError[]) => boolean

export function createErrorFinder(messages: string[]): ErrorFinderFn {
    return (errors) => errors.some((err) => messages.includes(err.message))
}
