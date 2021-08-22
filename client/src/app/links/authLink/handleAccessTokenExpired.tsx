import {
  CORRUPT_REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRED,
} from 'app/auth/constants'
import refreshAccess from 'app/auth/graphql/mutations/refreshAccess'
import setAuth from 'app/auth/graphql/mutations/setAuth'
import getAuth from 'app/auth/graphql/queries/getAuth'

export default async function handleAccessTokenExpired(): Promise<boolean> {
  const authToken = getAuth()
  if (!authToken) return false

  try {
    const accessToken = await refreshAccess(authToken)

    setAuth({
      ...authToken,
      accessToken,
    })
  } catch (err) {
    if (![CORRUPT_REFRESH_TOKEN, REFRESH_TOKEN_EXPIRED].includes(err.message)) {
      throw err
    }
    return false
  }

  return true
}
