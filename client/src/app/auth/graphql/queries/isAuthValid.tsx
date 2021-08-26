import { authTokenVar } from 'global/reactiveVars'

export default function isAuthValid(): boolean {
    return !!authTokenVar()
}
