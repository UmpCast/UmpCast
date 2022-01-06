import { NativeBaseProvider } from 'native-base'
import AppMockingProvider from '@/mock/components/AppMockingProvider'
import { useGetMyIdQuery } from '@/urql/generated'

const TestComponent = () => {
    const [result] = useGetMyIdQuery()
    console.log(result.data)

    return null
}

export default function Dev() {
    return (
        <AppMockingProvider>
            <NativeBaseProvider>
                <TestComponent />
            </NativeBaseProvider>
        </AppMockingProvider>
    )
}
