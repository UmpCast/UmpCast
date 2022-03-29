import {
    fireEvent,
    render as rtlRender,
    RenderAPI,
    waitFor
} from '@testing-library/react-native'
import React from 'react'
import { Client } from 'urql'

import createMockClient from '@/server/client'

import { TestID, TestIDArg } from './testID'
import { stubResolvers } from './stub'

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

export const extendedAPI = (api: RenderAPI) => ({
    ...api,
    findById: byIdWrapper(api.findByTestId),
    getById: byIdWrapper(api.getByTestId),
    queryById: byIdWrapper(api.queryByTestId),
    fillForm: async (input: Record<string, string>) => {
        /* eslint-disable */
        for (const [field, value] of Object.entries(input)) {
            const inputElement = await api.findByTestId(
                `${TestID.FORM_INPUT}:${field}`
            )
            fireEvent.changeText(inputElement, value)
        }
        /* eslint-enable */
    },
    repeatedDebug: () =>
        waitFor(
            () => {
                api.debug()
                return Promise.reject()
            },
            { timeout: 500, interval: 100 }
        )
})

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
