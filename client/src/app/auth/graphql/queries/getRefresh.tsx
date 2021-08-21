import { SessionToken } from '../../models/token'

export default function getRefresh(): SessionToken | null {
  const stringified_refresh_token = localStorage.getItem('refreshToken')
  if (stringified_refresh_token === null) return null

  const refreshToken = JSON.parse(stringified_refresh_token) as SessionToken

  return refreshToken
}
