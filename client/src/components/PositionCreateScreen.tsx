import usePositionCreateForm from '@/hooks/usePositionCreateForm'
import { StackScreenProps } from '@react-navigation/stack'
import { VStack, Heading } from 'native-base'

import { RootStackParamList, RootStackRoutes } from './AppRootStack'
import PositionCreateForm from './PositionCreateForm'

type Props = StackScreenProps<
    RootStackParamList,
    RootStackRoutes.PositionCreate
>

export default function PositionCreateScreen({ route, navigation }: Props) {
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
