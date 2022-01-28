import DivisionEditList from '@/core/Division/Edit/List'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList, RootStackRoutes } from '@/navigation'
import { Box } from 'native-base'

type ScreenProps = StackScreenProps<
    RootStackParamList,
    RootStackRoutes.SeasonStructure
>

export default function SeasonStructureScreen({ route }: ScreenProps) {
    const { params } = route
    return (
        <Box p={4}>
            <DivisionEditList seasonId={params.seasonId} />
        </Box>
    )
}
