import * as ExpoFacebook from 'expo-facebook'
import { mocked } from 'jest-mock'

const mockExpoFacebook = mocked(ExpoFacebook, true)

function logInWithReadPermissionsAsync({
    accessToken
}: {
    accessToken: string
}) {
    mockExpoFacebook.logInWithReadPermissionsAsync.mockReturnValue({
        type: 'success',
        token: accessToken
    } as any)
}

export default {
    mock: {
        logInWithReadPermissionsAsync
    },
    ...mockExpoFacebook
}
