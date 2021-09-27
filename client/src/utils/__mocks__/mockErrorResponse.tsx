export default function mockErrorResponse(messages: string[]) {
    return {
        errors: messages.map((message) => ({
            message
        }))
    }
}
