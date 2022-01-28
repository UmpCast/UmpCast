import SolidButton from '@/components/Button/Solid'
import NBControlledInput from '@/components/NB/ControlledInput'
import { VStack, Text } from 'native-base'

interface DivisionCreateFormProps {
    seasonId: string
    onCreate: (input: CreateDivisionInput) => void
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
            <SolidButton disabled={false} onPress={onSubmit}>
                <Text bold fontSize="lg">
                    Create
                </Text>
            </SolidButton>
        </VStack>
    )
}
