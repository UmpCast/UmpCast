import { fireEvent, waitFor } from '@testing-library/react-native'

import { createRender } from '@/testing/render'

import SeasonStructureRightHeader from './ScreenRightHeader'
import { AppRootStackRoute } from '@/core/App/Root/Stack'
import AppMockProvider from '@/testing/AppMockProvider'
import { IconID, TestID } from '@/testing/testID'

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
    const createButton = await utils.findById(
        TestID.ICON,
        IconID.DIVISION_CREATE
    )
    fireEvent.press(createButton)

    await waitFor(() => {
        expect(utils.mockNavigate).toHaveBeenCalledWith(
            AppRootStackRoute.DivisionCreate,
            {
                seasonId: 'season-1'
            }
        )
    })
})
