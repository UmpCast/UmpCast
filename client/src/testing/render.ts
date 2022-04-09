import {
    fireEvent,
    render as rtlRender,
    RenderAPI,
    within as rtlWithin,
    waitFor,
    Queries
} from '@testing-library/react-native'
import React from 'react'
import { Client } from 'urql'

import createMockClient from '@/server/client'

import { stubResolvers } from './stub'
import { TestID, TestIDArg } from './testID'

function byIdWrapper(fn: (id: string) => any) {
    return <TKey extends keyof TestIDArg>(
        type: TKey,
        id: TestIDArg[TKey],
        ...rest: string[]
    ) => {
        const testId = [type, id, ...rest].join(':')
        return fn(testId)
    }
}

export const extendedQueries = (queries: Queries) => {
    return {
        ...queries,
        findById: byIdWrapper(queries.findByTestId),
        getById: byIdWrapper(queries.getByTestId),
        queryById: byIdWrapper(queries.queryByTestId),
        fillForm: async (input: Record<string, string>) => {
            /* eslint-disable */
            for (const [field, value] of Object.entries(input)) {
                const inputElement = await queries.findByTestId(
                    `${TestID.FORM_INPUT}:${field}`
                )
                fireEvent.changeText(inputElement, value)
            }
            /* eslint-enable */
        }
    }
}

export const extendedAPI = (api: RenderAPI) => {
    return {
        ...extendedQueries(api),
        repeatedDebug: () =>
            waitFor(
                () => {
                    api.debug()
                    return Promise.reject()
                },
                { timeout: 500, interval: 100 }
            )
    }
}

export function within(instance: any) {
    return extendedQueries(rtlWithin(instance))
}

export function createRender(render: (client: Client) => React.ReactElement) {
    const resolvers = stubResolvers()
    const client = createMockClient({ resolvers })
    const element = render(client)
    return {
        ...extendedAPI(rtlRender(element)),
        resolvers,
        client
    }
}
