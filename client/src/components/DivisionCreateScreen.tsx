import { StackScreenProps } from '@react-navigation/stack'
import { VStack } from 'native-base'

import { RootStackParamList, RootStackRoutes } from './AppRootStack'
import DivisionCreateForm from './DivisionCreateForm'
import useDivisionCreateForm from '../hooks/useDivisionCreateForm'

type Props = StackScreenProps<
    RootStackParamList,
    RootStackRoutes.DivisionCreate
>

export default function DivisionCreateScreen({ route, navigation }: Props) {
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
