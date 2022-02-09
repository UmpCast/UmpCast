import { VStack, Text } from 'native-base'

import SignInButton from '@/core/Auth/SignIn/Solid'
import NBControlledInput from '@/lib/NB/ControlledInput'

import { DivisionCreateInput } from './useForm'
import { Control } from 'react-hook-form'

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
