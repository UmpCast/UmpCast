import DivisionList from '@/components/DivisionList'
import MockAppProvider from '@/components/MockAppProvider'
import { createRender } from '../setup'

export default function renderDivisionList() {
    return createRender((client) => (
        <MockAppProvider client={client}>
            <DivisionList />
        </MockAppProvider>
    ))
}
