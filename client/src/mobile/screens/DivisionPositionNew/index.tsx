import { VStack, Heading } from 'native-base'

import PositionCreateForm from '@/features/Position/Create/Form'
import usePositionCreateForm from '@/features/Position/Create/useForm'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'

type ScreenProps = RootStackScreenProps<RootStackRoute.DivisionPositionNew>

export default function DivisionPositionNewScreen({
    route,
    navigation
}: ScreenProps) {
    const { divisionId } = route.params

    const { control, onSubmit } = usePositionCreateForm({
        divisionId,
        onSuccess: () => {
            navigation.goBack()
        }
    })

    return (
        <VStack p={4} space={4}>
            <Heading textAlign="center">Create Position</Heading>
            <PositionCreateForm control={control} onSubmit={onSubmit} />
        </VStack>
    )
}
