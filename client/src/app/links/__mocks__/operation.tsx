export default class MockOperation {
    context: {}

    request: boolean

    constructor() {
        this.context = {}
        this.request = true
    }

    setContext(update: {}) {
        this.context = {
            ...this.context,
            update
        }
    }

    getContext() {
        return this.context
    }
}
