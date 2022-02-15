import {
    act,
    fireEvent,
    render,
    waitFor,
    within
} from '@testing-library/react-native'

import AppMockProvider from '@/core/App/Mock/Provider'
import { RootStackRoutes } from '@/core/App/Root/Stack'
import navigationNative from '@/mock/modules/navigationNative'
import { createRender } from '@/mock/render'

import SeasonStructureEditor from './Editor'

export const setup = () => {
    const navigate = jest.fn()

    navigationNative.useNavigation.mockReturnValue({
        navigate
    })

    const utils = createRender((client) => (
        <AppMockProvider client={client}>
            <SeasonStructureEditor seasonId="season-1" />
        </AppMockProvider>
    ))

    return {
        utils,
        navigate
    }
}

it('should render correctly when shown', async () => {
    const { utils } = setup()

    utils.resolvers.Query.season.mockReturnValue({
        divisionList: [
            {
                name: 'division 1',
                positionList: [
                    {
                        name: 'position 1'
                    },
                    {
                        name: 'position 2'
                    }
                ]
            },
            {
                name: 'division 2'
            }
        ]
    })

    await utils.findByText(/division 1/i)
    await utils.findByText(/division 2/i)
    await utils.findByText(/position 1/i)
    await utils.findByText(/position 2/i)

    expect(utils.resolvers.Query.season.mock.calls[0][1]).toMatchObject({
        id: 'season-1'
    })
})

it('should navigate to position create when pressed', async () => {
    const { utils, navigate } = setup()

    utils.resolvers.Query.season.mockReturnValue({
        divisionList: [
            {
                id: 'division-1'
            }
        ]
    })

    const createButton = await utils.findByTestId(
        'division-1-position-create-button'
    )

    fireEvent.press(createButton)
    await waitFor(() => {
        expect(navigate).toHaveBeenCalledWith(RootStackRoutes.PositionCreate, {
            divisionId: 'division-1'
        })
    })
})
