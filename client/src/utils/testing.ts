import { fireEvent, render } from '@testing-library/react-native'

export function extendedRender(element: JSX.Element) {
    const utils = render(element)

    const typeInput = async (field: string, text: string) =>
        fireEvent.changeText(await utils.findByTestId(`${field}-input`), text)

    return {
        typeInput,
        ...utils
    }
}

export default function stubResolvers() {
    return {
        Query: {
            isRegistered: jest.fn()
        },
        Mutation: {
            register: jest.fn()
        }
    }
}
