import { authTokenVar } from 'app/cache/reactiveVars'

export default function isAuthValid(): boolean {
    return !!authTokenVar()
}
