import { parameratizableScreenSetup } from '@/testing/setup'
import { fireEvent, waitFor } from '@testing-library/react-native'
import AccountScreen, { AccountScreenProps } from '.'

const setup = parameratizableScreenSetup<AccountScreenProps>(AccountScreen)

it('saves account information', async () => {
    const {
        resolvers: {
            Query: { viewer },
            Mutation: { updateUser }
        },
        render
    } = setup()

    viewer.mockImplementation(() => {
        return {
            id: 'user-1'
        }
    })
    const app = render(undefined)
    const saveButton = await app.findByText(/save/i)
    await app.fillForm({
        firstName: 'User',
        lastName: '1',
        phoneNumber: '',
        state: 'CA',
        city: 'San Francisco',
        streetAddress: 'Pier 39',
        zipCode: '12345'
    })
    expect(viewer.mock.calls[0][1]).toMatchObject({})

    fireEvent.press(saveButton)
    await waitFor(() => {
        expect(updateUser.mock.calls[0][1]).toMatchObject({
            input: {
                userId: 'user-1',
                firstName: 'User',
                lastName: '1',
                profilePictureB64: null,
                phoneNumber: null,
                state: 'CA',
                city: 'San Francisco',
                streetAddress: 'Pier 39',
                zipCode: '12345'
            }
        })
    })
})
