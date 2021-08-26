import { authTokenVar } from 'apollo/reactiveVars'

export default function isAuthValid(): boolean {
    return !!authTokenVar()
}
