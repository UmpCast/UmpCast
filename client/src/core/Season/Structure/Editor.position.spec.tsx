import { fireEvent, within, waitFor } from '@testing-library/react-native'

import { CreateRenderAPI } from '@/mock/render'

import { setup } from './Editor.helper'

beforeEach(() => {
    jest.useFakeTimers()
})

const withPositionActionsheet = async (utils: CreateRenderAPI) => {
    utils.resolvers.Query.season.mockReturnValue({
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

    fireEvent.press(await utils.findByText(/position 1/i))
}

const withPositionDeleteConfirm = async (utils: CreateRenderAPI) => {
    await withPositionActionsheet(utils)

    const actionSheet = within(
        await utils.findByTestId(/position-action-sheet/i)
    )
    const deleteButton = await actionSheet.findByText(/delete/i)

    fireEvent.press(deleteButton)
}

it('should render position action sheet correctly', async () => {
    const { utils } = setup()
    await withPositionActionsheet(utils)

    const actionSheet = await utils.findByTestId(/position-action-sheet/i)
    await within(actionSheet).findByText(/position 1/i)
})

it('should render position delete confirmation correctly', async () => {
    const { utils } = setup()
    await withPositionDeleteConfirm(utils)

    await utils.findByText(/delete position/i)
    await utils.findByTestId(/position-delete-modal/i)
})

it('should hide position delete confirmation when canceled', async () => {
    const { utils } = setup()
    await withPositionDeleteConfirm(utils)

    const modal = within(await utils.findByTestId(/position-delete-modal/i))
    const cancelButton = await modal.findByText(/cancel/i)

    fireEvent.press(cancelButton)

    await waitFor(() => {
        expect(utils.queryByTestId(/position-delete-modal/i)).toBeNull()
    })

    await utils.findByTestId(/position-action-sheet/i)
    expect(utils.resolvers.Mutation.deletePosition).not.toBeCalled()
})

it('should delete a position when confirmed', async () => {
    const { utils } = setup()
    await withPositionDeleteConfirm(utils)

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
