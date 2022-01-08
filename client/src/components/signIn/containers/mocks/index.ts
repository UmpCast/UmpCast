import * as Environment from './environment'
import * as Factory from './factory'
import * as Stage from './stage'

export const emailReceived = {
    build: Factory.emailReceived,
    setup: Environment.emailReceived,
    render: Stage.emailReceived
}

export const facebookButton = {
    build: Factory.facebookButton,
    setup: Environment.facebookButton,
    render: Stage.facebookButton
}

export const googleButton = {
    build: Factory.googleButton,
    setup: Environment.googleButton,
    render: Stage.googleButton
}

export const emailForm = {
    build: Factory.emailForm,
    setup: Environment.emailForm,
    render: Stage.emailForm
}
