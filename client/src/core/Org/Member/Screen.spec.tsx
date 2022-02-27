import { BaseSetup } from '@/mock/render'
import OrgMemberScreen from './Screen'

class Setup extends BaseSetup {
    constructor() {
        super(<OrgMemberScreen />)
    }
}

it('shows organization members', () => {})
