import { ApolloLink, Observable } from '@apollo/client'

import mockLinkExecution from 'app/links/__mocks__/linkExecution'

import retryLink from '../retryLink'

describe('retryLink (network)', () => {
    beforeEach(() => {
        jest.useFakeTimers()
    })
    afterEach(() => {
        jest.useRealTimers()
    })

    it('does not retry while status code is 400', async () => {
        let attempted = false
        const terminatingLink = new ApolloLink(
            () =>
                new Observable((sub) => {
                    sub.error({
                        statusCode: attempted ? 400 : 500
                    })
                    attempted = true
                })
        )
        const spyRequest = jest.spyOn(terminatingLink, 'request')

        mockLinkExecution(retryLink, terminatingLink)

        jest.runAllTimers()
        expect(spyRequest).toHaveBeenCalledTimes(2)
    })

    it('retries 5 times if status code is non-400 each time', async () => {
        const terminatingLink = new ApolloLink(
            () =>
                new Observable((sub) => {
                    sub.error({
                        statusCode: 500
                    })
                })
        )

        const spyRequest = jest.spyOn(terminatingLink, 'request')

        mockLinkExecution(retryLink, terminatingLink)

        jest.runAllTimers()
        expect(spyRequest).toHaveBeenCalledTimes(5)
    })
})
