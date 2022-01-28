import { StackScreenProps } from '@react-navigation/stack'
import { VStack, Heading } from 'native-base'

import { RootStackParamList, RootStackRoutes } from '@/navigation'

import DivisionCreateForm from './Form'

type Props = StackScreenProps<
    RootStackParamList,
    RootStackRoutes.CreateDivision
>

export default function DivisionCreateScreen({ route, navigation }: Props) {
    const { seasonId } = route.params

    const onCreatePostion = () => {
        navigation.goBack()
    }

    return (
        <VStack p={4} space={4}>
            <Heading textAlign="center">Create Division</Heading>
            <DivisionCreateForm
                seasonId={seasonId}
                onCreate={onCreatePostion}
            />
        </VStack>
    )
}
