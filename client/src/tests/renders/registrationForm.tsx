import MockAppProvider from '@/components/MockAppProvider'
import RegisterUserForm from '@/components/RegisterUserForm'
import { createRender } from '@/tests/setup'

export default function renderRegistrationForm() {
    return createRender((client) => (
        <MockAppProvider client={client}>
            <RegisterUserForm />
        </MockAppProvider>
    ))
}
