import { act, fireEvent, waitFor, within } from '@testing-library/react-native'

import AppMockProvider from '@/core/App/Mock/Provider'
import navigationNative from '@/mock/modules/navigationNative'
import { createRender } from '@/mock/render'
import { RootStackRoutes } from '@/navigation'

import SeasonStructureEditor from './Editor'

const setup = () =>
    createRender((client) => (
        <AppMockProvider client={client} withNavigation>
            <SeasonStructureEditor seasonId="season-1" />
        </AppMockProvider>
    ))

const setupDivision = () => {
    const utils = setup()

    utils.resolvers.Query.season.mockReturnValue({
        divisionList: [
            {
                id: 'division-1',
                name: 'division 1',
                positionList: [
                    {
                        id: 'position-1',
                        name: 'position 1'
                    }
                ]
            }
        ]
    })

    const selectDeleteAction = async () => {
        const deleteButton = await utils.findByText(/delete/i)
        fireEvent.press(deleteButton)
    }

    const openDivisionActionsheet = async () => {
        const editIcon = await utils.findByTestId('edit-icon-division-1')
        fireEvent.press(editIcon)
    }

    const openDivisionDeleteConfirm = async () => {
        await openDivisionActionsheet()
        await selectDeleteAction()
    }

    const openPositionActionsheet = async () => {
        const editIcon = await utils.findByText('position 1')
        fireEvent.press(editIcon)
    }

    const openPositionDeleteConfirm = async () => {
        await openPositionActionsheet()
        await selectDeleteAction()
    }

    return {
        ...utils,
        openDivisionActionsheet,
        openDivisionDeleteConfirm,
        openPositionActionsheet,
        openPositionDeleteConfirm
    }
}

it('should render correctly when shown', async () => {
    const utils = setup()

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

it('should render division action sheet correctly', async () => {
    const utils = setupDivision()

    await act(utils.openDivisionActionsheet)

    const actionSheet = await utils.findByTestId(/division-action-sheet/i)
    await within(actionSheet).findByText(/division 1/i)
})

it('should render position action sheet correctly', async () => {
    const utils = setupDivision()

    await act(utils.openPositionActionsheet)

    const actionSheet = await utils.findByTestId(/position-action-sheet/i)
    await within(actionSheet).findByText(/position 1/i)
})

it('should render division delete confirmation modal correctly', async () => {
    const utils = setupDivision()

    await act(utils.openDivisionDeleteConfirm)

    await utils.findByText(/delete division/i)
    await utils.findByTestId(/division-delete-modal/i)
})

it('should render position delete confirmation correctly', async () => {
    const utils = setupDivision()

    await act(utils.openPositionDeleteConfirm)

    await utils.findByText(/delete position/i)
    await utils.findByTestId(/position-delete-modal/i)
})

it('should delete a division when confirmed', async () => {
    const utils = setupDivision()

    await act(utils.openDivisionDeleteConfirm)

    const confirmButton = await utils.findByText(/confirm/i)

    utils.resolvers.Query.season.mockReturnValue({
        divisionList: []
    })

    fireEvent.press(confirmButton)

    await waitFor(() => {
        expect(utils.queryByText(/division 1/i)).toBeNull()
        expect(utils.queryByTestId(/division-action-sheet/i)).toBeNull()
        expect(utils.queryByTestId(/division-delete-modal/i)).toBeNull()
    })

    expect(
        utils.resolvers.Mutation.deleteDivision.mock.calls[0][1]
    ).toMatchObject({
        id: 'division-1'
    })
})

it.only('should delete a position when confirmed', async () => {
    const utils = setupDivision()

    await act(utils.openPositionDeleteConfirm)

    const confirmButton = await utils.findByText(/confirm/i)

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
    await waitFor(() => {
        expect(utils.queryByTestId(/position-action-sheet/i)).toBeNull()
        expect(utils.queryByTestId(/position-delete-modal/i)).toBeNull()
    })
    expect(utils.resolvers.Query.season).toHaveBeenCalled()
})

it('should hide division delete confirmation when canceled', async () => {
    const utils = setupDivision()

    await act(utils.openDivisionDeleteConfirm)

    const cancelButton = await utils.findByText(/cancel/i)

    fireEvent.press(cancelButton)

    await waitFor(() => {
        expect(utils.queryByTestId(/division-delete-modal/i)).toBeNull()
    })

    await utils.findByTestId(/division-action-sheet/i)
    expect(utils.resolvers.Mutation.deleteDivision).not.toBeCalled()
})

it('should hide position delete confirmation when canceled', async () => {})

it('should navigate to position create when pressed', async () => {
    const utils = setupDivision()

    const createButton = await utils.findByTestId(
        'division-1-position-create-button'
    )

    fireEvent.press(createButton)
    await waitFor(() => {
        expect(navigationNative.navigate).toHaveBeenCalledWith(
            RootStackRoutes.PositionCreate,
            {
                divisionId: 'division-1'
            }
        )
    })
})
