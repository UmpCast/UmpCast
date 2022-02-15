import { fireEvent, within, waitFor } from '@testing-library/react-native'

import { CreateRenderAPI } from '@/mock/render'

import { setup } from './Editor.helper'

beforeEach(() => {
    jest.useFakeTimers()
})

const withDivisionActionSheet = async (utils: CreateRenderAPI) => {
    utils.resolvers.Query.season.mockReturnValue({
        divisionList: [
            {
                id: 'division-1',
                name: 'division 1'
            }
        ]
    })

    fireEvent.press(await utils.findByTestId(/edit-icon-division-1/i))
}

const withDivisionDeleteConfirm = async (utils: CreateRenderAPI) => {
    await withDivisionActionSheet(utils)

    const actionSheet = within(
        await utils.findByTestId(/division-action-sheet/i)
    )
    const deleteButton = await actionSheet.findByText(/delete/i)

    fireEvent.press(deleteButton)
}

it('should render division action sheet correctly', async () => {
    const { utils } = setup()
    await withDivisionActionSheet(utils)

    const actionSheet = await utils.findByTestId(/division-action-sheet/i)
    await within(actionSheet).findByText(/division 1/i)
})

it('should render division delete confirmation modal correctly', async () => {
    const { utils } = setup()
    await withDivisionDeleteConfirm(utils)

    await utils.findByText(/delete division/i)
    await utils.findByTestId(/division-delete-modal/i)
})

it('should hide division delete confirmation when canceled', async () => {
    const { utils } = setup()
    await withDivisionDeleteConfirm(utils)

    const modal = within(await utils.findByTestId(/division-delete-modal/i))
    const cancelButton = await modal.findByText(/cancel/i)

    fireEvent.press(cancelButton)

    await waitFor(() => {
        expect(utils.queryByTestId(/division-delete-modal/i)).toBeNull()
    })

    await utils.findByTestId(/division-action-sheet/i)
    expect(utils.resolvers.Mutation.deleteDivision).not.toBeCalled()
})

it('should delete a division when confirmed', async () => {
    const { utils } = setup()
    await withDivisionDeleteConfirm(utils)

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
