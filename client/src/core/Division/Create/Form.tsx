import { VStack, Text } from 'native-base'

import SignInButton from '@/core/Auth/SignIn/Solid'
import NBControlledInput from '@/lib/NB/ControlledInput'

import useDivisionCreateForm, { DivisionCreateInput } from './useForm'

interface DivisionCreateFormProps {
    seasonId: string
    onCreate: (input: DivisionCreateInput) => void
}

export default function DivisionCreateForm({
    seasonId,
    onCreate
}: DivisionCreateFormProps) {
    const { control, onSubmit } = useDivisionCreateForm({
        seasonId,
        onCreate
    })

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
