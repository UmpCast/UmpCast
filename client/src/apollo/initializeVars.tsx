import recoverAuth from 'app/auth/graphql/mutations/recoverAuth'

export default async function initializeVars(): Promise<void> {
    await recoverAuth()
}
