import recoverAuth from 'app/auth/graphql/mutations/recoverAuth'

export async function initializeApp(): Promise<void> {
    await recoverAuth()
}
