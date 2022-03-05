import { VStack, Text } from 'native-base'
import { Control } from 'react-hook-form'

import SignInButton from '@/core/Auth/SignIn/Solid'
import NBControlledInput from '@/components/NB/ControlledInput'

import { DivisionCreateInput } from './useForm'

interface DivisionCreateFormProps {
    control: Control<DivisionCreateInput>
    onSubmit: () => any
}

export default function DivisionCreateForm({
    control,
    onSubmit
}: DivisionCreateFormProps) {
    return (
        <VStack space={4}>
            <NBControlledInput control={control} name="name" title="Name" />
            <SignInButton disabled={false} onPress={onSubmit}>
                <Text bold fontSize="lg">
                    Create
                </Text>
            </SignInButton>
        </VStack>
    )
}
