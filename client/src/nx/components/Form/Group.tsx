import { VStack } from 'native-base'

import FormErrorMessage from './ErrorMessage'

interface Props {
    label?: JSX.Element
    children: JSX.Element
    errorMessage?: boolean
}

export default function Group({ label, children, errorMessage = true }: Props) {
    return (
        <VStack space={2}>
            {label}
            <VStack space={1}>
                {children}
                {errorMessage && <FormErrorMessage />}
            </VStack>
        </VStack>
    )
}
