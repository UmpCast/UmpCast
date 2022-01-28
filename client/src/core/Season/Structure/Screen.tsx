import { StackScreenProps } from '@react-navigation/stack'
import { Box } from 'native-base'

import DivisionEditList from '@/core/Division/Edit/List'
import { RootStackParamList, RootStackRoutes } from '@/navigation'

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
