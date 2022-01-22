import MockAppProvider from '@/components/MockAppProvider'
import { createRender } from '@/tests/setup'
import {
    act,
    fireEvent,
    waitFor,
    within
} from '@testing-library/react-native'
import SeasonStruct from '.'

const setup = () => {
    return createRender((client) => (
        <MockAppProvider client={client}>
            <SeasonStruct seasonId="1" />
        </MockAppProvider>
    ))
}

const setupDivision = () => {
    const utils = setup()

    utils.resolvers.Query.season.mockReturnValue({
        divisionList: [
            {
                id: '1',
                name: 'division 1'
            }
        ]
    })

    const openActionSheet = async () => {
        const editIcon = await utils.findByTestId('division-edit-icon-1')
        fireEvent.press(editIcon)
    }
    const openDeleteConfirm = async () => {
        await openActionSheet()
        const deleteButton = await utils.findByText(/delete/i)
        fireEvent.press(deleteButton)
    }

    return {
        ...utils,
        openActionSheet,
        openDeleteConfirm
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
        id: '1'
    })
})

it('should render division action sheet correctly', async () => {
    const utils = setupDivision()

    await act(utils.openActionSheet)

    const actionSheet = await utils.findByTestId(/division-action-sheet/i)
    await within(actionSheet).findByText(/division 1/i)
})

it('should render division confirmation modal correctly', async () => {
    const utils = setupDivision()

    await act(utils.openDeleteConfirm)

    await utils.findByText(/delete division/i)
    await utils.findByTestId(/division-delete-modal/i)
})

it('should delete a division when confirmed', async () => {
    const utils = setupDivision()

    await act(utils.openDeleteConfirm)
    const confirmButton = await utils.findByText(/confirm/i)

    fireEvent.press(confirmButton)

    await waitFor(() => {
        expect(utils.queryByText(/division 1/i)).toBeNull()
        expect(utils.queryByTestId(/division-action-sheet/i)).toBeNull()
        expect(utils.queryByTestId(/division-delete-modal/i)).toBeNull()
    })

    expect(
        utils.resolvers.Mutation.deleteDivision.mock.calls[0][1]
    ).toMatchObject({
        id: '1'
    })
})

it('should hide division delete confirmation when canceled', async () => {
    const utils = setupDivision()

    await act(utils.openDeleteConfirm)

    const cancelButton = await utils.findByText(/cancel/i)

    fireEvent.press(cancelButton)

    await waitFor(() => {
        expect(utils.queryByTestId(/division-delete-modal/i)).toBeNull()
    })

    await utils.findByTestId(/division-action-sheet/i)
    expect(utils.resolvers.Mutation.deleteDivision).not.toBeCalled()
})
