import { firebaseAuth } from '@/utils/mock'

export const setupInitializedApp = () => {
    const onAuthStateChanged = jest.fn()

    firebaseAuth.getAuth.mockReturnValue({
        onAuthStateChanged
    } as any)

    const triggerAuthStateChange = (authenticated: boolean) => {
        onAuthStateChanged.mock.calls[0][0](authenticated ? {} : null)
    }

    return {
        triggerAuthStateChange
    }
}
