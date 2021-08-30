import { authTokenVar } from 'global/client'

export default function isAuthValid(): boolean {
    return !!authTokenVar()
}
