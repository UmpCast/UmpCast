export default class MockOperation {
    context: {}

    constructor() {
        this.context = {}
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
