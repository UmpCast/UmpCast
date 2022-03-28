import { ComponentSetup } from './component'

export class ScreenSetup<
    TParamList extends { [k: string]: any },
    TRoute extends string
> extends ComponentSetup {
    navigation = {
        navigate: jest.fn(),
        goBack: jest.fn()
    }

    render(params: TParamList[TRoute]) {
        return super.render({
            route: {
                params
            },
            navigation: this.navigation
        })
    }
}
