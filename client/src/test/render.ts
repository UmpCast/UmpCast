import { fireEvent, RenderAPI } from '@testing-library/react-native'

export const extendedAPI = (utils: RenderAPI) => ({
    ...utils,
    fillForm: async (input: Record<string, string>) => {
        /* eslint-disable */
        for (const [field, value] of Object.entries(input)) {
            const inputElement = await utils.findByTestId(`${field}-input`)
            fireEvent.changeText(inputElement, value)
        }
        /* eslint-enable */
    }
})
