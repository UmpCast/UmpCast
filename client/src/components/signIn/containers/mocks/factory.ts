import { loadAppExtra } from '@/utils/expo'
import { addURLParams } from '@/utils/web'
import faker from 'faker'

export const emailReceived = () => {
    const webUrl = loadAppExtra().APP_URL
    const mobileUrl = loadAppExtra().FIREBASE_AUTH_URL
    const params = {
        apiKey: faker.datatype.uuid(),
        oobCode: faker.datatype.uuid(),
        mode: 'signIn'
    }

    const getRoute = (baseUrl: string) => {
        const initialUrl = new URL('email-received', baseUrl)
        addURLParams(initialUrl, params)
        return {
            name: 'email-recieved',
            path: initialUrl.pathname + initialUrl.search,
            params
        }
    }

    return {
        params,
        email: faker.internet.email(),
        web: {
            url: webUrl,
            route: getRoute(webUrl)
        },
        mobile: {
            url: mobileUrl,
            route: getRoute(mobileUrl)
        }
    }
}

export const facebookButton = () => ({
    accessToken: faker.datatype.uuid(),
    credential: faker.datatype.uuid()
})

export const googleButton = () => ({
    idToken: faker.datatype.uuid(),
    credential: faker.datatype.uuid()
})

export const emailForm = () => ({
    email: faker.internet.email(),
    serverErrors: [
        {
            key: 'email',
            message: faker.lorem.sentence()
        }
    ]
})
