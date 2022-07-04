import { VStack } from 'native-base'

import DivisionCreateForm from '@/features/Division/Create/Form'
import useDivisionCreateForm from '@/features/Division/Create/useForm'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'

type Props = RootStackScreenProps<RootStackRoute.SeasonDivisionNew>

export default function SeasonDivisionNewScreen({ route, navigation }: Props) {
    const { seasonId } = route.params

    const { control, onSubmit } = useDivisionCreateForm({
        seasonId,
        onSuccess: () => {
            navigation.goBack()
        }
    })

    return (
        <VStack p={4} space={4}>
            <DivisionCreateForm control={control} onSubmit={onSubmit} />
        </VStack>
    )
}
