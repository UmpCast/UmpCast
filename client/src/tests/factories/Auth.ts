import { idField } from '@/tests/data'

function Response() {
    return {
        accessToken: idField('accessToken'),
        idToken: idField('idToken'),
        credential: idField('credential')
    }
}

export default {
    Response
}
