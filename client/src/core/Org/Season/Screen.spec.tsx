import ErrorBoundary from '@/mock/ErrorBoundary'
import { _useRoute } from '@/mock/modules/reactNavigation'
import { BaseSetup } from '@/mock/render'
import OrgSeasonScreen from './Screen'

class Setup extends BaseSetup {
    org = {
        id: 'organization-1'
    }

    constructor() {
        super(
            <ErrorBoundary>
                <OrgSeasonScreen />
            </ErrorBoundary>
        )
    }

    withRoute() {
        _useRoute.mockReturnValue({
            params: {
                id: this.org.id
            }
        })
    }
}

it('shows active seasons', async () => {
    const setup = new Setup()
    setup.withRoute()
    const {
        resolvers: {
            Query: { organization }
        }
    } = setup

    organization.mockImplementationOnce((...args) => {
        console.log(args)
        return {
            seasonList: [
                {
                    name: 'season 1'
                },
                {
                    name: 'season 2'
                }
            ]
        }
    })
    const api = setup.render()
    await api.findByText(/season 1/i)
    await api.findByText(/season 2/i)
})
