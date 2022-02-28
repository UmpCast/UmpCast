import { fireEvent, waitFor, within } from '@testing-library/react-native'

import AppMockProvider from '@/core/App/Mock/Provider'
import { RootStackRoutes } from '@/core/App/Root/Stack'
import { _useNavigation } from '@/mock/modules/reactNavigation'
import { createRender, CreateRenderAPI } from '@/mock/render'

import SeasonStructureEditor from './Editor'

beforeEach(() => {
    jest.useFakeTimers()
})

class Setup {
    utils: CreateRenderAPI

    constructor() {
        this.utils = createRender((client) => (
            <AppMockProvider client={client}>
                <SeasonStructureEditor seasonId="season-1" />
            </AppMockProvider>
        ))
    }

    async openDivisionActionSheet() {
        this.utils.resolvers.Query.season.mockReturnValue({
            divisionList: [
                {
                    id: 'division-1',
                    name: 'division 1'
                }
            ]
        })

        fireEvent.press(await this.utils.findByTestId(/edit-icon-division-1/i))
    }

    async selectDivisionDelete() {
        const actionSheet = within(
            await this.utils.findByTestId(/division-action-sheet/i)
        )

        const deleteButton = await actionSheet.findByText(/delete/i)

        fireEvent.press(deleteButton)
    }

    async openPositionActionSheet() {
        this.utils.resolvers.Query.season.mockReturnValue({
            divisionList: [
                {
                    positionList: [
                        {
                            id: 'position-1',
                            name: 'position 1'
                        }
                    ]
                }
            ]
        })

        fireEvent.press(await this.utils.findByText(/position 1/i))
    }

    async selectPositionDelete() {
        const actionSheet = within(
            await this.utils.findByTestId(/position-action-sheet/i)
        )
        const deleteButton = await actionSheet.findByText(/delete/i)

        fireEvent.press(deleteButton)
    }
}

it('deletes a division', async () => {
    const setup = new Setup()
    await setup.openDivisionActionSheet()
    await setup.selectDivisionDelete()

    const { utils } = setup

    const modal = within(await utils.findByTestId(/division-delete-modal/i))
    const confirmButton = await modal.findByText(/confirm/i)

    utils.resolvers.Mutation.deleteDivision.mockImplementation(() => {
        utils.resolvers.Query.season.mockClear()
    })

    fireEvent.press(confirmButton)

    await waitFor(() => {
        expect(
            utils.resolvers.Mutation.deleteDivision.mock.calls[0][1]
        ).toMatchObject({
            id: 'division-1'
        })
    })

    expect(utils.queryByTestId(/division-action-sheet/i)).toBeNull()
    expect(utils.queryByTestId(/division-delete-modal/i)).toBeNull()
    expect(utils.resolvers.Query.season).toHaveBeenCalled()
})

it('deletes a position', async () => {
    const setup = new Setup()
    await setup.openPositionActionSheet()
    await setup.selectPositionDelete()

    const { utils } = setup

    const modal = within(await utils.findByTestId(/position-delete-modal/i))
    const confirmButton = await modal.findByText(/confirm/i)

    utils.resolvers.Mutation.deletePosition.mockImplementation(() => {
        utils.resolvers.Query.season.mockClear()
    })

    fireEvent.press(confirmButton)

    await waitFor(() => {
        expect(
            utils.resolvers.Mutation.deletePosition.mock.calls[0][1]
        ).toMatchObject({
            id: 'position-1'
        })
    })

    expect(utils.queryByTestId(/position-action-sheet/i)).toBeNull()
    expect(utils.queryByTestId(/position-delete-modal/i)).toBeNull()
    expect(utils.resolvers.Query.season).toHaveBeenCalled()
})

it('should navigate to position create when pressed', async () => {
    const setup = new Setup()

    const { utils } = setup

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
        expect(_useNavigation.navigate).toHaveBeenCalledWith(
            RootStackRoutes.PositionCreate,
            {
                divisionId: 'division-1'
            }
        )
    })
})
