import MockAppProvider from '@/components/MockAppProvider'
import RegisterUserForm from '@/components/RegisterUserForm'
import { createRender } from '@/utils/testing'

export default function renderRegistrationForm() {
    return createRender((client) => (
        <MockAppProvider client={client}>
            <RegisterUserForm />
        </MockAppProvider>
    ))
}
