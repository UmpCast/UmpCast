export default function mockFetchResponse(body: {}, status: number = 200) {
    return {
        status,
        text: () => Promise.resolve(JSON.stringify(body))
    }
}
