import { AuthToken } from 'app/auth/models/token'
import { authTokenVar } from 'app/cache'

export default function getAuth(): AuthToken | null {
  return authTokenVar()
}
