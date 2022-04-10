import { fireEvent, waitFor } from '@testing-library/react-native'

import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { parameratizableScreenSetup } from '@/testing/setup'

import MeScreen, { MeScreenProps } from '.'

const setup = parameratizableScreenSetup<MeScreenProps>(MeScreen)

it('renders correctly', async () => {
    const {
        resolvers: {
            Query: { viewer }
        },
        render
    } = setup()

    viewer.mockImplementationOnce(() => ({
        id: 'user-1',
        firstName: 'user',
        lastName: '1',
        profilePictureUrl: 'user-1.pfp'
    }))
    const app = render(undefined)
    await app.findByText(/user 1/i)
})

it('navigates to account profile', async () => {
    const {
        render,
        navigation: { navigate }
    } = setup()

    const app = render(undefined)
    const accountItem = await app.findByText(/account/i)

    fireEvent.press(accountItem)
    await waitFor(() => {
        expect(navigate).toHaveBeenCalledWith(
            RootStackRoute.AccountSettings,
            undefined
        )
    })
})
