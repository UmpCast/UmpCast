import { fireEvent, RenderAPI } from '@testing-library/react-native'
import { CreateRenderAPI } from './setup'

export const extendedAPI = (utils: CreateRenderAPI) => {
    return {
        ...utils,
        fillForm: async (input: Record<string, string>) => {
            /* eslint-disable */
            for (const [field, value] of Object.entries(input)) {
                const inputElement = await utils.findByTestId(`${field}-input`)
                fireEvent.changeText(inputElement, value)
            }
            /* eslint-enable */
        }
    }
}
