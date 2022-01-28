import { fireEvent, waitFor } from '@testing-library/react-native'

import AppMockProvider from '@/core/App/Mock/Provider'
import { createRender } from '@/mock/render'
import { RootStackRoutes } from '@/navigation'

import SeasonStructureRightHeader from './RightHeader'

jest.mock('@react-navigation/native')

function setup() {
    const mockNavigate = jest.fn()
    const utils = createRender((client) => (
        <AppMockProvider client={client}>
            <SeasonStructureRightHeader
                navigation={{ navigate: mockNavigate } as any}
                route={{ params: { seasonId: 'season-1' } } as any}
            />
        </AppMockProvider>
    ))

    return {
        ...utils,
        mockNavigate
    }
}

it('should redirect to create division when pressed', async () => {
    const utils = setup()
    const createButton = await utils.findByTestId('create-division-button')
    fireEvent.press(createButton)

    await waitFor(() => {
        expect(utils.mockNavigate).toHaveBeenCalledWith(
            RootStackRoutes.DivisionCreate,
            {
                seasonId: 'season-1'
            }
        )
    })
})
