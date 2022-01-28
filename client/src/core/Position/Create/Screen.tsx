import { StackScreenProps } from '@react-navigation/stack'
import { VStack, Heading } from 'native-base'

import { RootStackParamList, RootStackRoutes } from '@/navigation'

import PositionCreateForm from './Form'

type Props = StackScreenProps<
    RootStackParamList,
    RootStackRoutes.CreatePosition
>

export default function PositionCreateScreen({ route, navigation }: Props) {
    const { divisionId } = route.params

    const onCreatePostion = () => {
        navigation.navigate(RootStackRoutes.SeasonStructure)
    }

    return (
        <VStack p={4} space={4}>
            <Heading textAlign="center">Create Position</Heading>
            <PositionCreateForm
                divisionId={divisionId}
                onCreate={onCreatePostion}
            />
        </VStack>
    )
}
