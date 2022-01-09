import { idField } from './helpers'

export default function buildAuth() {
    return {
        accessToken: idField('accessToken'),
        idToken: idField('idToken'),
        credential: idField('credential')
    }
}
