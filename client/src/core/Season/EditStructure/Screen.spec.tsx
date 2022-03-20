import { fireEvent, waitFor, within } from '@testing-library/react-native'

import { _useNavigation, _useRoute } from '@/testing/modules/reactNavigation'
import { BaseSetup } from '@/testing/setup'

import SeasonEditStructureScreen from './Screen'
import { AppRootStackRoute } from '@/core/App/Root/Stack'

beforeEach(() => {
    jest.useFakeTimers()
})

class Setup extends BaseSetup {
    constructor() {
        super(<SeasonEditStructureScreen />)
    }

    render() {
        const api = super.render()
        return {
            ...api,
            openDivisionActionSheet: async () => {
                this.resolvers.Query.season.mockReturnValue({
                    divisions: [
                        {
                            id: 'division-1',
                            name: 'division 1'
                        }
                    ]
                })

                fireEvent.press(await api.findByTestId(/edit-icon-division-1/i))
            },
            selectDivisionDelete: async () => {
                const actionSheet = within(
                    await api.findByTestId(/division-action-sheet/i)
                )

                const deleteButton = await actionSheet.findByText(/delete/i)

                fireEvent.press(deleteButton)
            },
            openPositionActionSheet: async () => {
                this.resolvers.Query.season.mockReturnValue({
                    divisions: [
                        {
                            positions: [
                                {
                                    id: 'position-1',
                                    name: 'position 1'
                                }
                            ]
                        }
                    ]
                })

                fireEvent.press(await api.findByText(/position 1/i))
            },
            selectPositionDelete: async () => {
                const actionSheet = within(
                    await api.findByTestId(/position-action-sheet/i)
                )
                const deleteButton = await actionSheet.findByText(/delete/i)

                fireEvent.press(deleteButton)
            }
        }
    }
}

it('deletes a division', async () => {
    const setup = new Setup()

    _useRoute.mockReturnValue({ params: { seasonId: 'season-1' } })
    const api = setup.render()
    await api.openDivisionActionSheet()
    await api.selectDivisionDelete()

    const modal = within(await api.findByTestId(/division-delete-modal/i))
    const confirmButton = await modal.findByText(/confirm/i)

    setup.resolvers.Mutation.deleteDivision.mockImplementation(() => {
        setup.resolvers.Query.season.mockClear()
    })

    fireEvent.press(confirmButton)

    await waitFor(() => {
        expect(
            setup.resolvers.Mutation.deleteDivision.mock.calls[0][1]
        ).toMatchObject({
            input: {
                divisionId: 'division-1'
            }
        })
    })

    expect(api.queryByTestId(/division-action-sheet/i)).toBeNull()
    expect(api.queryByTestId(/division-delete-modal/i)).toBeNull()
    expect(setup.resolvers.Query.season).toHaveBeenCalled()
})

it('deletes a position', async () => {
    const setup = new Setup()

    _useRoute.mockReturnValue({ params: { seasonId: 'season-1' } })
    const api = setup.render()
    await api.openPositionActionSheet()
    await api.selectPositionDelete()

    const modal = within(await api.findByTestId(/position-delete-modal/i))
    const confirmButton = await modal.findByText(/confirm/i)

    setup.resolvers.Mutation.deletePosition.mockImplementation(() => {
        setup.resolvers.Query.season.mockClear()
    })

    fireEvent.press(confirmButton)

    await waitFor(() => {
        expect(
            setup.resolvers.Mutation.deletePosition.mock.calls[0][1]
        ).toMatchObject({
            input: {
                positionId: 'position-1'
            }
        })
    })

    expect(api.queryByTestId(/position-action-sheet/i)).toBeNull()
    expect(api.queryByTestId(/position-delete-modal/i)).toBeNull()
    expect(setup.resolvers.Query.season).toHaveBeenCalled()
})

it('should navigate to position create when pressed', async () => {
    const setup = new Setup()

    _useRoute.mockReturnValue({ params: { seasonId: 'season-1' } })
    const api = setup.render()
    const createButton = await api.findByTestId(
        'division-1-position-create-button'
    )

    setup.resolvers.Query.season.mockReturnValue({
        divisions: [
            {
                id: 'division-1'
            }
        ]
    })
    fireEvent.press(createButton)
    expect(_useNavigation.navigate).toHaveBeenCalledWith(
        AppRootStackRoute.PositionCreate,
        {
            divisionId: 'division-1'
        }
    )
})
